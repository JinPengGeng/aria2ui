const path = require('path');
const { spawn } = require('child_process');
const crypto = require('crypto');
const { app, BrowserWindow, session, protocol } = require('electron');

const minimist = require('minimist');
const getPort = require('get-port');
const { aria2cPath } = require('get-aria2');
const { cloneDeep } = require('lodash');

const webuiDir = path.join(__dirname, '..', "webui-aria2", "docs");
let window;
let argv = minimist(process.argv.slice(1));
let aria2cProcess;

const aria2_path = process.env.ARIA2_PATH || aria2cPath();

async function gui(clientConfig) {
    let configCookie = { 
        name: "aria2conf",
        value: encodeURIComponent(JSON.stringify(clientConfig)),
        url: `file://${path.join(webuiDir, "index.html")}`
    };

    await new Promise((resolve, reject) => {
        session.defaultSession.cookies.set(configCookie, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });

    window = new BrowserWindow({ height: 768, width: 1024, icon: path.join(__dirname, "..", "icons", "app-icon.png") });

    window.loadFile(path.join(webuiDir, "index.html"));

    window.on('closed', () => {
        window = null;
    });
}

async function generateRandomToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buffer) => {
            if (err) return reject(err);
            resolve(buffer);
        });
    });
}

async function aria2() {
    let secret = argv['rpc-secret'];
    let port = argv['rpc-listen-port']
    if (!secret) {
        secret = await generateRandomToken();
        secret = secret.toString('base64');
    }

    if (!port) 
        port = await getPort();

    argv['rpc-secret'] = secret;
    argv['rpc-listen-port'] = port;
    argv['enable-rpc'] = void(0);

    let args = [];
    for (let key in argv) {
        if (key === '_') continue;
        let prefix = key.length === 1 ? '-' : '--';
        let value = argv[key];
        value = (typeof(value) === 'undefined' || value === null) ? '' : value;

        args = args.concat([`${prefix}${key}`, value].filter(Boolean));
    }

    return new Promise((resolve, reject) => {
        aria2cProcess = spawn(aria2_path, args , {
            stdio: [ "ignore", "pipe", "pipe" ]
        });

        aria2cProcess.stdout.pipe(process.stdout);
        aria2cProcess.stderr.pipe(process.stderr);

        let onData = (buf) => {
            let data = buf.toString();
            if (data.indexOf('listening on TCP port') !== -1) {
                aria2cProcess.removeListener('data', onData);
                resolve({ port, secret });
            }
        };

        aria2cProcess.stdout.on('data', onData);

        aria2cProcess.on('close', (code) => {
            process.exit(code);
        });
    });
}

protocol.registerStandardSchemes(["file"], { secure: true });

app.once('ready', async () =>  {
    try {
        let { port, secret } = await aria2();
        let clientConfig = cloneDeep(require('./default_client_config'));
        clientConfig.port = port;
        clientConfig.auth = { token: secret };
        await gui(clientConfig);
    } catch (error) {
        console.error(error.stack);
        process.exit(1);
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
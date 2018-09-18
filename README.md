# aria2ui

aria2ui is an Electron wrapper for [ziahamza/webui-aria2](https://github.com/ziahamza/webui-aria2). This package bundles the aria2c binary with the webui-aria2 interface.

## Installation
To install, run `npm install`. To start locally run `npm start`. 

For global installation run `npm run build`. This will package the application into an installable exectuable under "build/". On MacOS it will generate a ".app" folder, on Windows a ".exe".

Upon installation it will download the latest version of aria2 binary for your platform.

## Config

Using [get-aria2](https://github.com/znetstar/get-aria2) aria2ui will download the latest aria2c binary for your platform. To use a different aria2c binary, set the `ARIA2_PATH` environment variable. To use an aria2c binary in the `PATH` use `ARIA2_PATH=aria2c`.
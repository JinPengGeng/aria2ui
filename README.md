# aria2ui

aria2ui is an Electron wrapper for [ziahamza/webui-aria2](https://github.com/ziahamza/webui-aria2). This package bundles the aria2c binary with the webui-aria2 interface.

## Installation
To install, run `npm install` then run `npm start` to start locally. 

To bundle into an executable run `npm run build`. This will package the application into an installable exectuable under "build/".

Upon installation it will download the latest version of aria2 binary for your platform.

## Config

All command line arguments will be forwarded to `aria2c` so `aria2ui --dir="~/Downloads"` would work the same way `aria2c --dir="~/Downloads"` does. By default aria2c will listen to a random port and use a random rpc secret. To use a custom port and/or secret use the `rpc-listen-port` and `rpc-secret` arguments, aria2ui will connect to the specified port and use the specified secret.

Using [get-aria2](https://github.com/znetstar/get-aria2) aria2ui will download the latest aria2c binary for your platform. To use a different aria2c binary, set the `ARIA2_PATH` environment variable. To use an aria2c binary in the `PATH` use `ARIA2_PATH=aria2c`.

## Building

To build run `npm run build`. By default it will build an executable for the platform you're currently using. To build for all platforms run `npm build-all`.

To build for Windows on a non-Windows machine you'll need Wine 1.6 or higher.

To build for Mac you need `iconutil` to render the ".icns" file for the icon. I'm not sure you can build for Mac on a non-Mac platform notwithstanding.
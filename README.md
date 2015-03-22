aria2ui
=============

Aria2 UI is a node-webkit wrapper around "ziahamza/webui-aria2". webui-aria2 is by far the best aria2 gui I've found, however I hated having to open "aria2c", then WAMP just to get aria2 going.

This starts the interface on a small webserver, then pulls up the page using node-webkit.

* Installing

Since downloading aria2c on windows can be a pain, I've included binaries for both 32/64 bit Windows which will be automatically used.

On Linux and OS X the app will look for aria2 in the system PATH. Most package managers have it, but if not compiling usually isn't very hard.

For Debian and Ubuntu: apt-get install aria2
For OS X (using brew): brew install aria2

* Customizing

The launcher will set the default download dir to the home folder, and will save the aria2 config in $HOME/.aria2/aria2.conf. Changes made on the web interface are persistent.

* Bugs

Feel free to open an issue on GitHub. I will say in advance this project depends on other heavily developed projects so it would be best to open issues on their respective pages rather than this one.

For the web interface: https://github.com/ziahamza/webui-aria2
For the launcher: https://github.com/nwjs/nw.js/
And of course for aria2: https://github.com/tatsuhiro-t/aria2
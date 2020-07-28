import { app, BrowserWindow, shell, webContents } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log); // eslint-disable-line no-console
};

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  // Window creation
  const fullscreen = process.platform === 'linux';
  win = new BrowserWindow(
    { 
      width: 1440, 
      height: 900, 
      minWidth: 1280, 
      minHeight: 720, 
      title: 'ArTIFFact Control', 
      show: false, 
      fullscreen,
      webPreferences: { 
        nodeIntegration: true 
      } 
    });

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
  win.webContents.once('dom-ready', () => {
    if (process.env.NODE_ENV !== 'production') {
      win!.webContents.openDevTools();
    } else {
      win!.setMenu(null);
      win!.webContents.openDevTools();
    }

    // Fullscreen
    win!.maximize();
    win!.show();
  });

  const handleRedirect = (event: any, url: string) => {
    if(url !== win?.webContents.getURL()) {
      event.preventDefault();
      shell.openExternal(url);
    }
  }

  win.webContents.on('will-navigate', handleRedirect);
  win.webContents.on('new-window', handleRedirect);

  win.on('closed', () => {
    win = null;
  });

  win.on('page-title-updated', function (e) {
    e.preventDefault()
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

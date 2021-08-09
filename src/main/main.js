// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : `file://${path.join(__dirname, '../renderer/index.html')}`;

function createWindow() {
  /**
   * Initial window options
   * see https://electronjs.org/docs/api/browser-window#new-browserwindowoptions
   */
  mainWindow = new BrowserWindow({
    width: 820,
    height: 563,
    // minWidth: 500,
    // minHeight: 563,
    x: 0,
    y:0,
    useContentSize: true,
    resizable:false,
    autoHideMenuBar: false,
    title:'Dot File Setting ',
    // vibrancy: 'ultra-dark',
    // center: true,
    // titleBarStyle: 'customButtonsOnHover',
    titleBarStyle: 'hidden',
    // frame: false,
    icon:'./icons/dot.png',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      // devTools: false,
      // contextIsolation: false
    }
  });

  mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const { app, BrowserWindow } = require('electron')
const config = require('./config')


function createWindow () {
  // Create windows.
    const win = new BrowserWindow({
    // Windows
    width: 900,
    height: 1000,
    // icon: __dirname + '',
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    // frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

// Icon
// mainWindows = new BrowserWindow({ width: })

// Url Website
win.loadURL(config.url)

// and load the index.html of the app.
//   win.loadFile('index.html')

// Open the DevTools.
// win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu 
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.
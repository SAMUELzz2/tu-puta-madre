const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");


function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    // Carga el proyecto React
    win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
    
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle("seleccionar-carpeta", async() =>{
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    });
    
    if (result.canceled) return null; 
    return result.filePaths[0];
});

ipcMain.handle("leer-carpeta", async(_, ruta) => {
    return fs.readdirSync(ruta);
});

ipcMain.handle("borrar-carpeta", async(_, ruta) => {
    try {
        fs.rmSync(ruta, { recursive : true, force: true});
        return "ok";
    } catch (err) {
        return "error";
    }
});

function enviarMensaje(msg) {
    BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.send("mensaje", msg);
    });
}

enviarMensaje("hola, bonitos")
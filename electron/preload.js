const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    mensaje: () => "Hola Sam, esto viene desde Electron",

    seleccionarCarpeta: () => ipcRenderer.invoke("seleccionar-carpeta"),

    leerCarpeta: (ruta) => ipcRenderer.invoke("leer-carpeta", ruta),

    borrarCarpeta: (ruta) => ipcRenderer.invoke("borrar-carpeta", ruta),

    onMensaje: (callback) => ipcRenderer.on("mensaje",(_, data) => callback(data)),

});

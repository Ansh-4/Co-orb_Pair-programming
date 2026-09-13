const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900
    });

    const loginPage = path.join(
        __dirname,
        "..",
        "info",
        "login",
        "login.html"
    );

    win.loadFile(loginPage);

    // Open DevTools so we can see errors if the page doesn't load
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
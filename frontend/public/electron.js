const path = require("path");
const { app, BrowserWindow, ipcMain, Notification, Tray } = require("electron");
const isDev = require("electron-is-dev");

const dockIcon = path.join(__dirname, "Icon.png");
const trayIcon = path.join(__dirname, "Icon.png");

function createSplashWindow() {
	const win = new BrowserWindow({
		autoHideMenuBar: true,
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	win.maximize();
	win.loadFile("public/splash.html");
	return win;
}

function createWindow() {
	const win = new BrowserWindow({
		autoHideMenuBar: true,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});
	win.maximize();
	win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
	return win;
}

if (process.platform === "darwin") {
	app.dock.setIcon(dockIcon);
}

let tray = null;
app.whenReady().then(() => {
	tray = new Tray(trayIcon);
	const splash = createSplashWindow();
	const mainApp = createWindow();
	mainApp.once("ready-to-show", () => {
		mainApp.hide();
		setTimeout(() => {
			splash.destroy();
			mainApp.show();
		}, 3000);
	});
});

ipcMain.on("notify", (_, message) => {
	new Notification({ title: "Notification", body: message }).show();
});

ipcMain.on("app-quit", () => {
	app.quit();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

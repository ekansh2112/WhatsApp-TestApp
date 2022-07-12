const path = require("path");
const { app, BrowserWindow, ipcMain, Notification, Tray } = require("electron");
const isDev = require("electron-is-dev");

const dockIcon = path.join(__dirname, "Icon.png");
const trayIcon = path.join(__dirname, "Icon.png");

function createSplashWindow() {
	const win = new BrowserWindow({
		autoHideMenuBar: true,
		// width: 1200,
		// height: 800,
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: true,
			//   worldSafeExecuteJavaScript: true,
			//   contextIsolation: true,
		},
	});
	win.maximize();
	win.loadFile("public/splash.html");
	return win;
}

function createWindow() {
	const win = new BrowserWindow({
		autoHideMenuBar: true,
		// width: 1200,
		// height: 800,
		// backgroundColor: "#fff",
		// show: false,
		webPreferences: {
			nodeIntegration: true,
			// worldSafeExecuteJavaScript: true,
			// contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});
	win.maximize();
	win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
	// if (isDev) {
	// 	win.webContents.openDevTools({ mode: "detach" });
	// }
	return win;
}

// if (isDev) {
// 	require("electron-reload")(__dirname, {
// 		electron: path.join(__dirname, "node_modules", ".bin", "electron"),
// 	});
// }

if (process.platform === "darwin") {
	app.dock.setIcon(dockIcon);
}

// app.whenReady().then(createWindow);

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

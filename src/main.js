const electron = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

let mainWindow; //need to keep a ref to the window object, or it will be collected
                // by the garbage collector and closed.

function createWindow(){
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });


    mainWindow.loadURL(
        isDev
        ?'http://localhost:3000/'
        : `file://${path.join(__dirname, '../build/index.html')}`,
    );
    if(isDev){
        mainWindow.webContents.openDevTools({ mode: 'detach'});
    }

    // start flask backend
    let backend;
    backend = path.join(process.cwd(), 'backend/dist/app.exe'); //finds built app.py
                                                                          // that was built using pyinstaller
                                                                          // See README.
    var execfile = require('child_process').execFile;

    execfile(
        backend,
        {
            windowsHide: true,
        },
        (err, stdout,stderr) => {
            if(err){
                console.log(err);
            }

            if(stdout){
                console.log(stdout);
            }

            if(stderr){
                console.log(stderr);
            }
        }
    )

    mainWindow.on('closed', function (){
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }

    // Killing app.exe (flask backend)
    const {exec} = require('child_process');

    exec(`taskkill /f /t /im app.exe`, (err, stdout, stderr) => {
        if(err){
            console.log(err);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
})
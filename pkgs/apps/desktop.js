/*
	Desktop for AzuOS
	Written by: MTSyntho @ AzuSystem 2024
*/

loadCSS('index.css');
loadCSS('button.css');
// loadTheme('default-theme.css');
// loadTheme('dark-mode.css');
loadTheme('light-mode.css');
loadCSS('notification.css');

// Load all the individial CSS files for elements.
loadCSS('ui/button.css');

unloadCSS('boot.css');
unloadCSS('login.css');
unloadPackage('system:bootscreen.js');
unloadPackage('system:logindisplay.js');
loadPackage('apps:desktop/wallpaper.js');
loadPackage('apps:desktop/watermark.js');
loadPackage('apps:desktop/taskbar.js');
loadPackage('apps:desktop/icons.js');
sounds.play("login")

// windowManager('start');

// I asked ChatGPT to remake each HTML component into JS
// taskbar.js may be rewritten to make sense to myself
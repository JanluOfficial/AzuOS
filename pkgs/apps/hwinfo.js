var cpu_data = pywebview.api.cpu_data()
var memory_data = pywebview.api.memory_data()
var drive_data = pywebview.api.drive_data()


win.create('Hardware Info', 'hwinfowin').then(win => win
    .setWidth(640)
    .setHeight(360)
    .confirm()
)

element.create('div', '', 'hwinfodiv').then(elm => elm
	.window('hwinfowin')
    .flex()
    .gap("8px")
    .vertical()
	.padding('20px')
);

element.create('h1', `Hardware Info`, '').then(elm => elm
    .margin(0)
    .parent("hwinfodiv")
)

element.create('p', 'Loading...', 'loadingtexthwinfo').then(elm => elm
    .margin(0)
    .parent("hwinfodiv")
);

cpu_data.then(result => {
    element.get('loadingtexthwinfo')[0].remove()
    element.create('h2', 'Core Hardware', '').then(elm => elm
        .margin(0)
        .parent("hwinfodiv")
    );
    element.create('p', 'CPU: ' + result.brand_raw, '').then(elm => elm
        .margin(0)
        .parent("hwinfodiv")
    );
    memory_data.then(result => {
        element.create('p', 'Total Memory: ' + result.memoryTotal + " GB (" + result.memoryUsed + " GB Used, " + result.memoryAvailable + " GB available)", '').then(elm => elm
            .margin(0)
            .parent("hwinfodiv")
        );
        element.create('h2', 'Drives', '').then(elm => elm
            .margintop("8px")
            .marginBottom(0)
            .parent("hwinfodiv")
        );
        drive_data.then(result => {
            for (let drive of result) {
                element.create('div', '', "drvInfo" + drive.device.slice(0, 1) + "div").then(elm => elm
                    .flex()
                    .backgroundcolor("var(--azu-button-bg)")
                    .padding("8px")
                    .radius("8px")
                    .parent("hwinfodiv")
                )
                element.create('p', drive.device + " (" + drive.usedSpace + "GB / " + drive.totalSpace + "GB", '').then(elm => elm
                    .margin(0)
                    .parent("drvInfo" + drive.device.slice(0, 1) + "div")
                );
            }
        });
    });
});
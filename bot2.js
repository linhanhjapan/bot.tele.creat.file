const TeleBot = require('telebot');
const BUTTONS = {
    creat: {
        label: 'Tạo File abc.txt',
        command: '/creat'
    },
    Delete_File: {
        label: 'Xóa nội dung ',
        command: '/Delete_File'
    },
    Show_Content: {
        label: 'Xem nội dung',
        command: '/Show_Content'
    },
    Add_Content: {
        label: 'Add noi dung',
        command: '/Add_Content'
    }
};

    // .CREAT BOT
const bot = new TeleBot({
    token: '1957876389:AAGg-_ukeoo3maxsh7jYvOc0Vg04q0vBKAk',
    usePlugins: ['namedButtons','askUser'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS
        }
    }

});

    // .START APP 
bot.on('/start', (msg) => {
    let replyMarkup = bot.keyboard([
        [BUTTONS.creat.label],
        ['/Add_Content', '/Show_Content'],
        ['/Delete_File']
    ], {resize: true});
    return bot.sendMessage(msg.from.id, '👉 Hãy chọn các chức năng',{replyMarkup});

});


    // <----------------------------------CREAT----------------------------------->

bot.on('/creat', (msg) => {
    let { exec } = require("child_process");

    exec("cd /var/www/bot1\ntouch abc.txt", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);

    return bot.sendMessage(msg.from.id, '👉 Bạn đã tạo file abc.txt');
    });

   
});

;

    // .SHOW
bot.on('/Show_Content', (msg) => {

    let { exec } = require("child_process");

    exec("cd /var/www/bot2\ncat abc.txt", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    return bot.sendMessage(msg.from.id, `👉 Nội dung file là:\n${stdout}`);
    });


});


    // .ADD CONTENT
bot.on('/Add_Content', (msg) => {

    bot.sendMessage(msg.from.id, '👉Hãy nhập nội dung muốn thêm',{ask: 'noi_dung'});

});

bot.on('ask.noi_dung', msg => {

    const id = msg.from.id;
    const noi_dung = msg.text;
    let file = 'cd /var/www/bot2\n' ;
    let cmdd = 'echo' + " '" + noi_dung + "' " + '>> ' + 'abc.txt';
    console.log(cmdd);
        let { exec } = require("child_process");

    exec(cmdd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    return bot.sendMessage(msg.from.id, `👉 Đã thêm nội dung: ${noi_dung} ` );
    });


});

    // .DELETE FILE
bot.on('/Delete_File', (msg) => {

    let { exec } = require("child_process");
    let xoa='cd /var/www/bot2\n' + 'rm abc.txt';
    console.log(xoa);
    exec(xoa, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    return bot.sendMessage(msg.from.id, '👉 Bạn đã xóa file abc.txt');
    });


});



bot.start();
const fs = require("fs")
const path = require("path")
const proc = require('process');
const {stdin, stdout} = proc
fs.writeFile(path.join(__dirname,"text.txt"), "", (err) => console.log(err))

stdin.on("data", data => {
    data = data.toString().split("").splice(0,data.length-2).join("")
    if (data == "exit") {
        proc.exit(0)
    }
    fs.appendFile(path.join(__dirname,"text.txt"),data+"\n",(err) => console.log(err))
})

proc.on("exit", (code) => {
    console.log("Программа завершена, прощайте!");
  });

// При вводе exit оно нормально отлавливает событие выхода,
// но при Ctrl + c как минимум у меня не работает
// Каковы причины? Неизвестно...
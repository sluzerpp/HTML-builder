const { Console } = require("console");
const fs = require("fs")
const path = require("path")
const proc = require('process');
const {stdin, stdout} = proc
fs.writeFile(path.join(__dirname,"text.txt"), "", (err) => {
  if (err) {
    throw err
  }
})

console.log("Введите текст:")

stdin.on("data", data => {
    data = data.toString().trim()
    if (data == "exit") {
        proc.exit(0)
    }
    fs.appendFile(path.join(__dirname,"text.txt"),data+"\n",(err) => {
      if (err) {
        throw err
      }
    })
})

proc.on("exit", (code) => {
    console.log("Программа завершена, прощайте!");
  });

  process.on('SIGINT', () => {
    process.exit()
  });

const { stat } = require('fs');
const fs = require('fs/promises');
const path = require('path');
fs.readdir(path.join(__dirname,"secret-folder"),{withFileTypes:true})
.then(files => {
    for (let file of files) {
        if (!file.isDirectory()) {
            let filePath = path.join(__dirname,"secret-folder",file.name)
            fs.stat(filePath,(err) => console.log(err))
            .then(st => {
                console.log(`${path.parse(filePath).name} - ${path.extname(filePath)} - ${st.size / 1024}kb`)
            })
        }
    }
})

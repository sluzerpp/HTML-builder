const fs = require('fs/promises');
const path = require('path');

fs.mkdir(path.join(__dirname,"files-copy"),{recursive:true})

fs.readdir(path.join(__dirname,"files"),{withFileTypes:true})
.then(files => {
    for (let file of files) {
        console.log(path.join(__dirname,"files",file.name))
        let fromPath = path.join(__dirname,"files",file.name),
            toPath = path.join(__dirname,"files-copy",file.name);
        fs.copyFile(fromPath,toPath)
    }
})

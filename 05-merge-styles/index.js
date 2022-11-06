const fs = require('fs')
const path = require('path')
let stylesPath = path.join(__dirname,"styles")

fs.writeFile(path.join(__dirname,"project-dist","bundle.css"),"",err=>console.log(err))

fs.promises.readdir(stylesPath,{withFileTypes:true})
.then(files => {

    for (let file of files) {
        if(!file.isDirectory() && path.parse(file.name).ext == ".css") {
            fs.readFile(path.join(stylesPath,file.name), (err,data)=>{
                if(err) throw err;
                fs.appendFile(path.join(__dirname,"project-dist","bundle.css"),data.toString(),err=>console.log(err))
            })
        }
    }

})
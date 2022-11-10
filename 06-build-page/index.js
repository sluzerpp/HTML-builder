const { exists } = require('fs');
const fs = require('fs/promises');
const path = require('path');
const { formatWithOptions } = require('util');

const distPath = path.join(__dirname,"project-dist")
const assetsPath = path.join(distPath,"assets")

fs.mkdir(distPath,{recursive:true})
fs.mkdir(assetsPath,{recursive:true})

copyAssets(path.join(__dirname,"assets"),assetsPath)
bundleCSS(path.join(__dirname,"styles"),distPath)
bundleHTML(__dirname,distPath)

async function bundleHTML(fromPath,toPath) {
    htmlPath = path.join(toPath,"index.html")
    fs.rm(htmlPath,{force:true})
    let dt = await fs.readFile(path.join(fromPath,"template.html"))
    let objects = await fs.readdir(path.join(fromPath,"components"),{withFileTypes:true})
    let dat = dt.toString()
    for (let obj of objects) {
        if (path.parse(obj.name).ext == ".html") {
            await fs.readFile(path.join(fromPath,"components",obj.name))
            .then(compData => {
                dat = dat.replace(`{{${path.parse(obj.name).name}}}`,compData.toString())
                fs.writeFile(htmlPath,dat,err=>console.log(err)).finally(()=>console.log(obj.name))
            })
        }
    }    
}

function bundleCSS(fromPath, toPath) {
    let cssPath = path.join(toPath,"style.css")
    fs.writeFile(cssPath,"",(err)=>{console.log(err)})
    
    fs.readdir(fromPath,{withFileTypes:true})
    .then(objects => {
        for (let obj of objects) {
            if (path.parse(obj.name).ext == ".css") {
                fs.readFile(path.join(fromPath,obj.name))
                .then(data => {
                    fs.appendFile(cssPath,data.toString(),err=>console.log(err))
                })
            }
        }
    })
}


async function copyAssets(fromPath, toPath) {
    await fs.rm(toPath,{recursive:true,force:true})
    copyDirectory(fromPath, toPath)
}

async function copyDirectory(fromPath, toPath) {
    let objects = await fs.readdir(fromPath,{withFileTypes:true})
    for (let obj of objects) {
        if (obj.isDirectory()) {
            await fs.mkdir(path.join(toPath,obj.name), {recursive:true})
            copyDirectory(path.join(fromPath,obj.name), path.join(toPath,obj.name))
        } else {
            fs.copyFile(path.join(fromPath,obj.name),path.join(toPath,obj.name))
        }
    }
}
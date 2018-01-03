/* eslint no-var: 0 */
var command = require("./command");
var config = require("./buildConfig.js");

function doWeHaveSourceFileOrFiles(files){
    if(files){
        if(Array.isArray(files)) {
            if(files.length > 0) {
                return true
            }

        } else if(typeof sourceFiles === "string"){
            if(files.length > 0) {
                return true
            }
        }
        else{
            console.error("Source files has to be Array or String")
        }
    }
    return false
}

function isStandardFileType(type){
    if(type == "html" || type == "css" || type == "json"){
        return true;
    }
    return false;
}

/*------ Copy ------*/



function copy(config,command){
    if(config["html"]){
        copyType(config["html"],"html",command)
    }

    if(config["css"]){
        copyType(config["css"],"css",command)
    }

    if(config["json"]){
        copyType(config["json"],"json",command)
    }

    if(config["other"]){
        copyType(config["other"],"other",command)
    }
}

function getPath(dirPath,filePath,type){
    var isFileTypeStd = isStandardFileType(type);
    if(isFileTypeStd){
        if(dirPath){
            dirPath = dirPath + "/";
        }else{
            dirPath = "";
        }
        if(filePath.endsWith("." + type)){
            return dirPath + filePath;
        }else{
            return dirPath + filePath + "." + type;
        }
    }
}


function copyType(config,type,command){
    if(config){
        const sourceDir = config.sourceDir;
        const sourceFiles = config.sourceFiles;
        const destinationDir = config.destinationDir;
        if (sourceDir || sourceFiles) {
            var isFileOrFilesGiven = doWeHaveSourceFileOrFiles(sourceFiles);
            if(isFileOrFilesGiven){
                if(Array.isArray(sourceFiles)){
                    sourceFiles.map(function(filePath){
                        var srcPath = getPath(sourceDir, filePath, type);
                        var destinationPath = getPath(destinationDir, filePath, type);
                        command.copyFile(srcPath, destinationPath);
                    })
                }else{
                    var filePath = sourceFiles;
                    var srcPath = getPath(sourceDir, filePath, type);
                    var destinationPath = getPath(destinationDir, filePath, type);
                    command.copyFile(srcPath, destinationPath);
                }
            }else{
                if(sourceDir){
                    if(destinationDir){
                        command.copyDir(sourceDir,destinationDir);
                    }else{
                        console.error("Destination Directory Missing")
                    }
                }else{
                    console.error("Source Directory Missing")
                }
            }
        }
    }
}

copy(config.copy,command);





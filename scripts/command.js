/* eslint no-var: 0 */
var exec = require("child_process").exec;
var fs = require("fs-extra");

function moveFile(filePath,destinationPath,callback){
    if(!destinationPath){
        throw new Error("Destination directory missing");
    }
    if(!filePath){
        throw new Error("Source file missing");
    }

    fs.move(filePath,destinationPath,function(error){
        if(error){
            return console.error(error)
        }else{
            console.log("Move: " + filePath + " moved to " + destinationPath)
            if(callback){
                callback()
            }
        }
    });
}

function copyFile(filePath,destinationPath,callback){
    if(!destinationPath){
        throw new Error("Destination directory missing");
    }
    if(!filePath){
        throw new Error("Source file missing");
    }

    fs.copy(filePath,destinationPath,function(error){
        if(error){
            return console.error(error)
        }else{
            console.log("COPY: " + filePath + " copied to " + destinationPath)
            if(callback){
                callback()
            }
        }
    });
}

function copyDir(source,dest,callback){
    if(!source){
        throw new Error("Source directory missing");
    }
    if(!dest){
        throw new Error("Destination directory missing");
    }

    fs.copy(source,dest,function(error){
        if(error){
            return console.error(error)
        }else{
            console.log( "COPY: " + source + " copied to " + dest)
            if(callback){
                callback();
            }
        }
    });
}

function createDir(dirPath,callback){
    if(!dirPath){
        throw new Error("directory path missing");
    }


    fs.ensureDir(dirPath,function(error){
        if(error){
            return console.error(error)
        }else{
            console.log( "Directory created at : " + dirPath)
            if(callback){
                callback();
            }
        }
    });
}

function remove(source,callback){
    fs.remove(source, function(error) {
        if (error) {
            return console.error(error)
        }
        console.log("REMOVE: " + source + " deleted")
        if(callback){
            callback();
        }
    })
}

function writeJson(source,json){
    fs.writeJson(source,json, function(error) {
        if (error) {
            return console.error(error)
        }
        console.log("WRITE: " + source + " created")
    })
}

function updateJson(source,newJson,callback){
    fs.readJson(source,function(error,sourceJson){
        var json = Object.assign({},sourceJson,newJson);
        fs.outputJson(source,json, function(error) {
            if (error) {
                return console.error(error)
            }
            console.log("WRITE: " + source + " created")
            if(callback){
                callback();
            }
        })
    })

}

function changeCurrentWorkingDirTemporarily(dirPath, command){
    //For this Node process "bower install" working directory is changed to build/client
//upon completion Node cwd will shift back to root where we started this process.
    execute(command, false,{
        cwd:dirPath
    });
}

function execute(commands,setNodeEnv,options,callback){
    if(Array.isArray(commands)){
        commands.map(function(cmdLine){
            _execute(cmdLine,setNodeEnv,options,callback);
        })
    }else {
        _execute(commands,setNodeEnv,options,callback);
    }
}

function _execute(cmdLine,setNodeEnv,options,callback){

    if(typeof cmdLine !== "string"){
        throw new Error("String format expected for commands")
    }
    if(setNodeEnv){
        var environ = "production";
        if (process.argv[2] && process.argv[2].indexOf("development")){
            environ = "development";
        }
        if (process.platform === "win32") {
            cmdLine = "set NODE_ENV=" + environ + "&& " + cmdLine;
        } else {
            cmdLine = "NODE_ENV=" + environ + " " + cmdLine;
        }
    }

    var command;
    if(options) {
        command = exec(cmdLine,options,(error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if(callback){
                callback();
            }
        });
    }else {
        command = exec(cmdLine,(error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            if(stdout){
                console.log(`stdout: ${stdout}`);
            }
            if(stderr){
                console.log(typeof stderr, stderr);
                console.log(`stderr: ${stderr}`);
            }
            if(callback){
                callback();
            }
        });
    }
    if(command){
        /* eslint-disable */
        command.stdout.on("data", function(data) {
            process.stdout.write(data);
        });
        command.stderr.on("data", function(data) {
            process.stderr.write(data);
        });
        command.on("error", function(err) {
            process.stderr.write(err);
        });
        /* eslint-enable */
    }




}



module.exports = {
    moveFile,
    copyFile,
    copyDir,
    createDir,
    remove,
    writeJson,
    updateJson,
    execute,
    changeCurrentWorkingDirTemporarily
};


const app = require('electron').remote.app;
const path = require('path');
const fs = require('fs');

const USER_CREDENTIAL_FILE_NAME = "credentials.json";
const USER_DATA_FILE_NAME = "data.json";

export function SerializeUserCredential(userCredential){
    SerializeToJson(userCredential, USER_CREDENTIAL_FILE_NAME);
}

export function SerializeUserData(userData) {
    SerializeToJson(userData, USER_DATA_FILE_NAME);
}

export function DeserializeUserCredential() {
    return DeserializeFromJson(USER_CREDENTIAL_FILE_NAME);
}

export function DeserializeUserData() {
    return DeserializeFromJson(USER_DATA_FILE_NAME);
}

async function SerializeToJson(data, fileName){
    let json = JSON.stringify(data);
    
    fs.writeFile(path.join(app.getPath('userData'), fileName), json, function(err) {
        if (err) {
            throw err;
        }
        console.log(`SerializeToJson ${fileName} success`);
    });
    return;
}

function DeserializeFromJson(fileName) {
    let savePath = path.join(app.getPath('userData'), fileName);
    console.log(savePath);
    try {
        if (fs.existsSync(savePath)){  
            return JSON.parse(fs.readFileSync(savePath));
        }
    } catch (err) {
        console.error(err);
    }
    return null;
}
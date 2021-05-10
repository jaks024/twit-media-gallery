import { UserData } from './UserData.js';

const app = require('electron').remote.app;
const path = require('path');
const fs = require('fs');

const USER_CREDENTIAL_FILE_NAME = "credentials.json";
const USER_DATA_FILE_NAME = "data.json";

export function SerializeUserCredential(userCredential){
    SerializeToJson(userCredential, USER_CREDENTIAL_FILE_NAME);
}

export function SerializeUserData(userData) {
    SerializeUserDataToJson(userData, USER_DATA_FILE_NAME);
}

export function DeserializeUserCredential() {
    return DeserializeFromJson(USER_CREDENTIAL_FILE_NAME);
}

export function DeserializeUserData() {
    return DeserializeUserDataFromJson(USER_DATA_FILE_NAME);
}

function replacer(key, value) {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
}

function reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
}

async function SerializeUserDataToJson(data, fileName){
    let json = JSON.stringify(data, replacer);
    fs.writeFile(path.join(app.getPath('userData'), fileName), json, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`SerializeToJson ${fileName} success`);
    });
}

async function SerializeToJson(data, fileName){
    console.log(data);
    let json = JSON.stringify(data);
    
    fs.writeFile(path.join(app.getPath('userData'), fileName), json, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`SerializeToJson ${fileName} success`);
    });
}

function DeserializeUserDataFromJson(fileName){
    let savePath = path.join(app.getPath('userData'), fileName);
    console.log(savePath);
    try {
        if (fs.existsSync(savePath)){  
            return JSON.parse(fs.readFileSync(savePath), reviver);
        }
    } catch (err) {
        console.error(err);
    }
    return null;
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
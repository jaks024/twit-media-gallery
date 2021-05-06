import {
    DeserializeUserData,
    SerializeUserData
} from './UserFileSerializer.js';
import { UserData, AddTwitterUserToUserData } from './UserData.js';



var userData = DeserializeUserData();
console.log(userData);
export function Initialize(){
    if (userData == null) {
        userData = new UserData(false);
        SerializeUserData(userData);
    } 
}

export function AddNewTwitterUserToUser(tu){
    AddTwitterUserToUserData(userData, tu);
    SerializeUserData(userData);
    //console.log(userData);
}
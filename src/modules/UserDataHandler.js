import {
    DeserializeUserData,
    SerializeUserData
} from './UserFileSerializer.js';
import { UserData, AddTwitterUserToUserData } from './UserData.js';
import { InsertNewUserBlock } from './GalleryLoader.js';



var userData = DeserializeUserData();
console.log(userData);
export function Initialize(){
    if (userData == null) {
        userData = new UserData(false);
        SerializeUserData(userData);
    } else {
        LoadAllTwitterUserBlocks(userData.twitterUserList);
    }
}

export async function AddNewTwitterUserToUser(tu){
    let result = await AddTwitterUserToUserData(userData, tu);
    SerializeUserData(userData);
    if (result == 1) {
        InsertNewUserBlock(tu);
    } else {
        // insert new img into existing blocks
    }
    
    //console.log(userData);
}

function LoadAllTwitterUserBlocks(tuList){
    tuList.forEach(twitterUser => {
        InsertNewUserBlock(twitterUser);
    });
}
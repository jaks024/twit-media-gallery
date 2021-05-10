import {
    DeserializeUserData,
    SerializeUserData
} from './UserFileSerializer.js';
import { UserData, AddTwitterUserToUserData, NOT_IN_LIST } from './UserData.js';
import { InsertNewImgIntoExistingBlock, InsertNewUserBlock } from './GalleryLoader.js';



var userData = DeserializeUserData();
console.log(userData);
export function Initialize(){
    if (userData == null) {
        userData = new UserData(false);
        SerializeUserData(userData);
    } else {
        LoadAllTwitterUserBlocks(userData.twitterUserMap);
    }
}

export async function AddNewTwitterUserToUser(tu){
    let result = await AddTwitterUserToUserData(userData, tu);
    SerializeUserData(userData);
    if (result == NOT_IN_LIST) {
        InsertNewUserBlock(tu);
    } else {
        InsertNewImgIntoExistingBlock(tu.id, result)
    }
    
    console.log(userData);
}

function LoadAllTwitterUserBlocks(tuMap){
    for (let twitterUser of tuMap.values()) {
        InsertNewUserBlock(twitterUser);
    }
}
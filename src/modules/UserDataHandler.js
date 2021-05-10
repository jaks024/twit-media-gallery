import {
    DeserializeUserData,
    SerializeUserData
} from './UserFileSerializer.js';
import { UserData, AddTwitterUserToUserData, NOT_IN_LIST, RemoveImageFromTwitterUser } from './UserData.js';
import { InsertNewImgIntoExistingBlock, InsertNewUserBlock } from './GalleryLoader.js';
import { UpdateImageCount } from './GalleryEventHandler.js';



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
        InsertNewImgIntoExistingBlock(tu.id, result);
        UpdateImageCount(userData.twitterUserMap);
    }
    
    console.log(userData);
}

export function RemoveImageFromSelectedTwitterUser(twitterUserId, mediaKey) {
    RemoveImageFromTwitterUser(userData, twitterUserId, mediaKey);
    UpdateImageCount(userData.twitterUserMap);
}

export function SaveData(){
    SerializeUserData(userData);
}

function LoadAllTwitterUserBlocks(tuMap){
    for (let twitterUser of tuMap.values()) {
        InsertNewUserBlock(twitterUser);
    }
}
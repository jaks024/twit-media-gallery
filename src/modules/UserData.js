export function UserData(hasCredentials){
    this.hasCredentials = hasCredentials;
    this.twitterUserList = [];
}

export function AddTwitterUserToUserData(userData, twitterUser){
    userData.twitterUserList.push(twitterUser);
}
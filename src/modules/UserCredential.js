export function UserCredential(consumerKey, consumerSecret, accessToken, accessTokenSecret) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
}

export function IsUserCredentialValid(userCred) {
    return userCred.consumerKey.length > 0 && userCred.consumerSecret.length > 0 &&
        userCred.accessToken.length > 0 && userCred.accessTokenSecret.length > 0;
}
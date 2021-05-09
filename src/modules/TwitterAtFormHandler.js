import { DisplayErrorMessage } from './ErrorMsgPopupManager.js';
import {
    GetUserDataAndTimelineByUsername
} from './TwitterDataGetter.js';
import {
    userTwit
} from './UserCredentialFormHandler.js'
import { TwitterUser } from './TwitterUser.js';
import { AddNewTwitterUserToUser } from './UserDataHandler.js';


const twitterUserFormElement = document.getElementById('twitter-user-form');

twitterUserFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(twitterUserFormElement);
});

twitterUserFormElement.addEventListener('formdata', (e) => {
    let userat = e.formData.get('user-at');
    let tweetCount = e.formData.get('tweet-count');
    console.log(`@${userat}, #:${tweetCount}`);
    OnFormDataReceived(userat, tweetCount);
});

async function OnFormDataReceived(userat, tweetCount) {
    if (userTwit == null) {
        DisplayErrorMessage("One or more of the Twitter Keys are invalid");
        return;
    }
    let datas = await GetUserDataAndTimelineByUsername(userTwit, userat, tweetCount)
    if (datas == null) {
        DisplayErrorMessage("error when retrieving timeline")
        return;
    }
    let user = datas[0];
    let tl = datas[1];
    console.log(datas);
    var newTwitterUser = new TwitterUser(user.name, user.username, user.id, 
        user.profile_image_url, tl.media, user.public_metrics.tweet_count,
        tl.newestId, tl.oldestId, user.created_at);
    
    AddNewTwitterUserToUser(newTwitterUser);
    console.log(newTwitterUser);
}


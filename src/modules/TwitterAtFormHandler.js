import {
    DisplayErrorMessage
} from './ErrorMsgPopupManager.js';
import {
    GetUserDataAndTimelineByUsername,
    GetUserDataAndTimelineByUsernamePagination
} from './TwitterDataGetter.js';
import {
    userTwit
} from './UserCredentialFormHandler.js'
import {
    TwitterUser
} from './TwitterUser.js';
import {
    AddNewTwitterUserToUser
} from './UserDataHandler.js';


const twitterUserFormElement = document.getElementById('twitter-user-form');
const YES_PAGINATION = 'pagination';
var submitBtnValue = '';


twitterUserFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtnValue = e.submitter.value;
    new FormData(twitterUserFormElement);
});

twitterUserFormElement.addEventListener('formdata', (e) => {
    let userat = e.formData.get('user-at');
    let tweetCount = e.formData.get('tweet-count');
    console.log(`@${userat}, #:${tweetCount}`);
    console.log(submitBtnValue.localeCompare(YES_PAGINATION) == 0);
    OnFormDataReceived(userat, tweetCount, submitBtnValue.localeCompare(YES_PAGINATION) == 0);
});

function MediaListToMap(mediaList){
    let mediaMap = new Map();
    for (let i = 0; i < mediaList.length; ++i) {
        mediaMap.set(mediaList[i].media_key, mediaList[i]);
    }
    return mediaMap;
}

async function OnFormDataReceived(userat, tweetCount, pagination) {
    if (userTwit == null) {
        DisplayErrorMessage("One or more of the Twitter Keys are invalid");
        return;
    }
    let datas = null;
    if (pagination) {
        datas = await GetUserDataAndTimelineByUsernamePagination(userTwit, userat, tweetCount);
    } else {
        datas = await GetUserDataAndTimelineByUsername(userTwit, userat, tweetCount)
    }

    if (datas == null) {
        DisplayErrorMessage("error when retrieving timeline")
        return;
    }
    let user = datas[0];
    let tl = datas[1];
    console.log(datas);
    let newTwitterUser = new TwitterUser(user.name, user.username, user.id,
            user.profile_image_url, MediaListToMap(tl.media), user.public_metrics.tweet_count,
            tl.newestId, tl.oldestId, user.created_at);
    AddNewTwitterUserToUser(newTwitterUser);
    console.log(newTwitterUser);
}

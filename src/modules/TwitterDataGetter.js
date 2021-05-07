import { DisplayErrorMessage } from './ErrorMsgPopupManager.js';

// T: Twit, username: String
export function GetUserDataByUsername(T, username) {
    return new Promise(resolve => {
        T.get(`https://api.twitter.com/2/users/by/username/${username}` +
            `?user.fields=profile_image_url,url`,
            function (err, data, response) {
                //console.log(data.data);
                if (err) {
                    //console.log("error when GetUserDataByUsername");
                    // show error message popup here
                    console.log(data);
                    DisplayErrorMessage("username is invalid");
                    resolve(null);
                }
                resolve(data.data);
            });
    })

}

// T: Twit, userid: String, maxResult: int
export function GetTweetTimeline(T, userid, maxResult) {
    return new Promise(resolve => {
        T.get(`https://api.twitter.com/2/users/${userid}/tweets` +
            `?expansions=attachments.media_keys` +
            `&media.fields=url` +
            `&exclude=retweets,replies` +
            `&max_results=${maxResult}`,
            function (err, data, response) {
                //console.log(data);
                if (err) {
                    //console.log("error when GetTweetTimeline");
                    // show error message popup here
                    console.log(data);
                    DisplayErrorMessage("something has gone wrong in retrieving timeline");
                    resolve(null);
                }
                resolve(data);
            });
    });
}

// T: Twit, username: String, maxResults: int
export async function GetUserDataAndTimelineByUsername(T, username, maxResults) {
    var twitterUserData = await GetUserDataByUsername(T, username);
    console.log(twitterUserData);
    if (twitterUserData == null) {
        DisplayErrorMessage("Either username is invalid or some of Twitter Keys are invalid")
        return null;
    } 
    var timelineData = await GetTweetTimeline(T, twitterUserData.id, maxResults);
    //console.log(timelineData.data);
    return [twitterUserData, timelineData];
}

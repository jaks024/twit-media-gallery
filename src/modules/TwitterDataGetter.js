import {
    DisplayErrorMessage
} from './ErrorMsgPopupManager.js';

// T: Twit, username: String
export function GetUserDataByUsername(T, username) {
    return new Promise(resolve => {
        T.get(`https://api.twitter.com/2/users/by/username/${username}` +
            `?user.fields=profile_image_url,public_metrics,created_at`,
            function (err, data, response) {
                console.log(data);
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
            `&exclude=retweets` +
            `&max_results=${maxResult}`,
            function (err, data, response) {
                console.log(data);
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

export function GetTweetTimelinePagination(T, userid, maxResult, paginationToken) {
    return new Promise(resolve => {
        T.get(`https://api.twitter.com/2/users/${userid}/tweets` +
            `?expansions=attachments.media_keys` +
            `&media.fields=url` +
            `&exclude=retweets` +
            `&max_results=${maxResult}` +
            `&pagination_token=${paginationToken}`,
            function (err, data, response) {
                console.log(data);
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


function TimelineResult() {
    this.newestId = '';
    this.oldestId = '';
    this.media = [];
}

function ArrayPushPhotoCheck(dest, mediaList) {
    mediaList.forEach(media => {
        if (media.type.localeCompare('photo') === 0 && media.url !== undefined) {
            dest.push(media);
        }
    });
}

// T: Twit, username: String, maxResults: int
export async function GetUserDataAndTimelineByUsername(T, username, maxResults) {
    var twitterUserData = await GetUserDataByUsername(T, username);
    //console.log(twitterUserData);
    if (twitterUserData == null) {
        DisplayErrorMessage("Either username is invalid or some of Twitter Keys are invalid")
        return null;
    }
    let result = new TimelineResult();
    let timelineData = await GetTweetTimeline(T, twitterUserData.id, maxResults);
    if (timelineData == null || (timelineData.status != undefined && timelineData.status == 401)) {
        DisplayErrorMessage(`request is ${timelineData.title}: ${timelineData.detail}. status: ${timelineData.status}}`);
        return null;
    }
    result.newestId = timelineData.meta.newest_id;
    result.oldestId = timelineData.meta.oldest_id;
    if (timelineData.includes != undefined) {
        console.log(timelineData.includes);
        ArrayPushPhotoCheck(result.media, timelineData.includes.media);
    }
    console.log(result);
    return [twitterUserData, result];
}

// T: Twit, username: String, maxResults: int
export async function GetUserDataAndTimelineByUsernamePagination(T, username, maxResults) {
    var twitterUserData = await GetUserDataByUsername(T, username);
    //console.log(twitterUserData);
    if (twitterUserData == null) {
        DisplayErrorMessage("Either username is invalid or some of Twitter Keys are invalid")
        return null;
    }

    let timelinePaginationResult = new TimelineResult();
    let firstResult = await GetTweetTimeline(T, twitterUserData.id, maxResults);
    if (firstResult == null || (firstResult.status != undefined && firstResult.status == 401)) {
        DisplayErrorMessage(`request is ${firstResult.title}: ${firstResult.detail}. status: ${firstResult.status}}`);
        return null;
    }
    //initial request
    let nextToken = firstResult.meta.next_token;
    timelinePaginationResult.newestId = firstResult.meta.newest_id;
    timelinePaginationResult.oldestId = firstResult.meta.oldest_id;
    if (firstResult.includes != undefined) {
        console.log(firstResult.includes);
        ArrayPushPhotoCheck(timelinePaginationResult.media, firstResult.includes.media);
    }
    // pagination
    while (nextToken != undefined) {
        let page = await GetTweetTimelinePagination(T, twitterUserData.id, maxResults, nextToken);
        if (page != null) {
            timelinePaginationResult.oldestId = page.meta.oldest_id;
            if (page.includes != undefined) {
                ArrayPushPhotoCheck(timelinePaginationResult.media, page.includes.media);
            }
            nextToken = page.meta.next_token;
        } else {
            break;
        }
    }
    console.log(timelinePaginationResult);
    //console.log(timelineData.data);
    return [twitterUserData, timelinePaginationResult];
}
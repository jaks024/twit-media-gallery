export function TwitterUser(name, username, id, profileImgUrl,
    timelineMedia, tweetCount, newestTweetId, oldestTweetId, createdDate) {
    this.name = name;
    this.username = username;
    this.id = id;
    this.profileImgUrl = profileImgUrl;
    this.timelineMedia = timelineMedia; //an array
    this.tweetCount = tweetCount;
    this.newestTweetId = newestTweetId;
    this.oldestTweetId = oldestTweetId; 
    this.createdDate = createdDate;
}

/*
    timelineMedia[i] fields: media_key, type, url
*/

export function TwitterUserAddMedia(tUser, newMedia){
    newMedia.array.forEach(element => {
        tUser.timelineMedia.push(element);
    });
}
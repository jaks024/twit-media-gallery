export function TwitterUser(name, username, id, profileImgUrl,
    timelineMedia, tweetCount, newestTweetId, oldestTweetId, createdDate) {
    this.name = name;
    this.username = username;
    this.id = id;
    this.profileImgUrl = profileImgUrl;
    this.timelineMedia = timelineMedia; //an Map
    this.tweetCount = tweetCount;
    this.newestTweetId = newestTweetId;
    this.oldestTweetId = oldestTweetId; 
    this.createdDate = createdDate;
}

/*
    timelineMedia[i] fields: media_key, type, url
*/

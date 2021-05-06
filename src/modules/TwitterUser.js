export function TwitterUser(name, username, id, profileImgUrl, profileUrl, timelineMedia) {
    this.name = name;
    this.username = username;
    this.id = id;
    this.profileImgUrl = profileImgUrl;
    this.profileUrl = profileUrl;
    this.timelineMedia = timelineMedia; //an array
}

/*
    timelineMedia[i] fields: media_key, type, url
*/

export function TwitterUserAddMedia(tUser, newMedia){
    newMedia.array.forEach(element => {
        tUser.timelineMedia.push(element);
    });
}
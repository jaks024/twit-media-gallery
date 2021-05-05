export function TwitterUser(name, username, id, profileImgUrl, profileUrl, timelineMedia) {
    this.name = name;
    this.username = username;
    this.id = id;
    this.profileImgUrl = profileImgUrl;
    this.timelineMedia = timelineMedia;
}

export function TwitterUserAddMedia(tUser, newMedia){
    newMedia.array.forEach(element => {
        tUser.timelineMedia.push(element);
    });
}
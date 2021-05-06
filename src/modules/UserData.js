export function UserData(hasCredentials){
    this.twitterUserList = [];
}

// extremely inefficient
export function AddTwitterUserToUserData(userData, twitterUser){
    let addedIntoExisting = false;
    userData.twitterUserList.forEach(existingUsers => {
        if (existingUsers.id.localeCompare(twitterUser.id) == 0) {
            twitterUser.timelineMedia.forEach(media => {
                if (!TimelineMediaIncludes(existingUsers.timelineMedia, media)) {
                    existingUsers.timelineMedia.push(media);
                }
            });
            addedIntoExisting = true;
            return;
        }
    });
    if (!addedIntoExisting) {
        userData.twitterUserList.push(twitterUser);
    }
}

function TimelineMediaIncludes(timelineMedia, media){
    let contains = false;
    timelineMedia.forEach(element => {
        if (element.media_key.localeCompare(media.media_key)){
            contains = true;
            return;
        }
    });
    return contains;
}
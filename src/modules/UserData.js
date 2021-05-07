export function UserData(hasCredentials){
    this.twitterUserList = [];
}

// extremely inefficient
export function AddTwitterUserToUserData(userData, twitterUser){
    return new Promise(resolve => {
        let addedIntoExisting = false;
        userData.twitterUserList.forEach(existingUsers => {
            if (existingUsers.id.localeCompare(twitterUser.id) == 0) {
                twitterUser.timelineMedia.forEach(media => {
                    if (!media.type.localeCompare('photo') || media.url != undefined)
                    if (!TimelineMediaIncludes(existingUsers.timelineMedia, media)) {
                        existingUsers.timelineMedia.push(media);
                    }
                });
                addedIntoExisting = true;
                resolve(0);
            }
        });
        if (!addedIntoExisting) {
            userData.twitterUserList.push(twitterUser);
        }
        resolve(1);
    });
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
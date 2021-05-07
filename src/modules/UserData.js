export function UserData() {
    this.twitterUserList = [];
}

// extremely inefficient
export function AddTwitterUserToUserData(userData, twitterUser) {
    return new Promise(resolve => {
        let addedIntoExisting = false;
        userData.twitterUserList.forEach(existingUsers => {
            if (existingUsers.id.localeCompare(twitterUser.id) == 0) {
                for (let i = 0; i < twitterUser.timelineMedia.length; ++i) {
                    const media = twitterUser.timelineMedia[i];
                    if (media.type.localeCompare('photo') != 0 || media.url == undefined) {
                        continue;
                    }
                    if (!TimelineMediaIncludes(existingUsers.timelineMedia, media)) {
                        existingUsers.timelineMedia.push(media);
                    }
                }
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

function TimelineMediaIncludes(timelineMedia, media) {
    for (let i = 0; i < timelineMedia.length; ++i) {
        const element = timelineMedia[i];
        if (element.media_key.localeCompare(media.media_key) == 0) {
            return true;
        }
    }
    return false;
}
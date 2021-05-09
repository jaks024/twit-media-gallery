export function UserData() {
    this.twitterUserList = [];
}

export const NOT_IN_LIST = null;

// extremely inefficient
export function AddTwitterUserToUserData(userData, twitterUser) {
    return new Promise(resolve => {
        for (let k = 0; k < userData.twitterUserList.length; ++k) {
            const existingUser = userData.twitterUserList[k]; 
            if (existingUser.id.localeCompare(twitterUser.id) == 0) {
                let mediaDifference = [];
                for (let i = 0; i < twitterUser.timelineMedia.length; ++i) {
                    const media = twitterUser.timelineMedia[i];
                    if (media.type.localeCompare('photo') !== 0 || media.url === undefined) {
                        continue;
                    }
                    if (!TimelineMediaIncludes(existingUser.timelineMedia, media)) {
                        existingUser.timelineMedia.push(media);
                        mediaDifference.push(media);
                    }
                }
                console.log("returned");
                return resolve(mediaDifference);
            }
        }
        console.log("still added");
        userData.twitterUserList.push(twitterUser);
        resolve(NOT_IN_LIST);
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
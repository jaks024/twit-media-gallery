export function UserData() {
    this.twitterUserMap = new Map();
}

export const NOT_IN_LIST = null;


export function AddTwitterUserToUserData(userData, twitterUser) {
    return new Promise(resolve => {
        let tuMap = userData.twitterUserMap;
        if (tuMap.has(twitterUser.id)) {
            let userTimelineMedia = tuMap.get(twitterUser.id).timelineMedia;
            let mediaDifference = [];
            for (let [mediaKey, media] of twitterUser.timelineMedia.entries()) {
                if (media.type.localeCompare('photo') !== 0 || media.url === undefined) {
                    continue;
                }
                if (!userTimelineMedia.has(mediaKey)) {
                    userTimelineMedia.set(mediaKey, media);
                    mediaDifference.push(media);
                }
            }
            return resolve(mediaDifference);
        }
        tuMap.set(twitterUser.id, twitterUser);
        resolve(NOT_IN_LIST);
    });
}


export function RemoveImageFromTwitterUser(userData, twitterUserId, mediaKey){
    userData.twitterUserMap.get(twitterUserId).timelineMedia.delete(mediaKey);
    console.log(`deleted: ${mediaKey} from twitter user: ${twitterUserId}`);
}
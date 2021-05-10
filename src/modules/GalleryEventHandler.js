var userImageCountMap = new Map();

export function AddNewImageCount(twitterUserId, imageCountElement){
    userImageCountMap.set(twitterUserId, imageCountElement);
}

export function UpdateImageCount(twitterUserMap) {
    for (let [twitterUserId, imageCountElement] of userImageCountMap.entries()){
        if (twitterUserMap.has(twitterUserId)){
            imageCountElement.textContent = `${twitterUserMap.get(twitterUserId).timelineMedia.size} Images`;
        }
    }
    console.log('updated image count of twitter users');
}
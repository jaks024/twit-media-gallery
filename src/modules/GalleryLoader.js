const userBlockParentElement = document.getElementById('gallery-section');
const delayTimer = ms => new Promise(res => setTimeout(res, ms));
const IMG_LOAD_DELAY = 150;

export async function InsertNewUserBlock(twitterUser){
    let userBlock = document.createElement('div');
    userBlock.classList.add('user-block');

    let userInfoBlock = document.createElement('div');
    userInfoBlock.classList.add('user-info-block');
    
    let userProfileImg = document.createElement('div');
    userProfileImg.classList.add('user-profile-img');
    let profileImg = document.createElement('img');
    profileImg.src = twitterUser.profileImgUrl;
    userProfileImg.appendChild(profileImg);

    userInfoBlock.appendChild(userProfileImg);

    let userInfoDetails = document.createElement('div');
    userInfoDetails.classList.add('user-info-details');

    let userInfoUsername = document.createElement('div');
    userInfoUsername.classList.add('user-info-username');
    userInfoUsername.textContent = twitterUser.name;
    userInfoDetails.appendChild(userInfoUsername);

    let userInfoAt = document.createElement('a');
    userInfoAt.classList.add('user-info-at');
    userInfoAt.href = `https://twitter.com/${twitterUser.username}`;
    userInfoAt.target = '_blank';
    userInfoAt.textContent = `@${twitterUser.username}`;
    userInfoDetails.appendChild(userInfoAt);

    let userImgCount = document.createElement('div');
    userImgCount.classList.add('user-info-count');
    userImgCount.textContent = `${twitterUser.timelineMedia.length} Images`;
    userInfoDetails.appendChild(userImgCount);

    userInfoBlock.appendChild(userInfoDetails);


    userBlock.appendChild(userInfoBlock);

    userBlockParentElement.appendChild(userBlock);

    let userImgGrid = document.createElement('div');
    userImgGrid.classList.add('user-img-grid');
    userImgGrid.id = twitterUser.id;
    userBlock.appendChild(userImgGrid);
    for (let i = 0; i < twitterUser.timelineMedia.length; ++i) {
        userImgGrid.appendChild(CreateImgItem(twitterUser.timelineMedia[i]));
        await delayTimer(IMG_LOAD_DELAY);
    }

    //userBlock.appendChild(await CreateNewUserImgGrid(twitterUser.timelineMedia, twitterUser.id));

    
    console.log(`appended html user block of: ${twitterUser.name}`)
}

async function CreateNewUserImgGrid(timelineMedia, id){
    let userImgGrid = document.createElement('div');
    userImgGrid.classList.add('user-img-grid');
    userImgGrid.id = id;
    for (let i = 0; i < timelineMedia.length; ++i) {
        userImgGrid.appendChild(CreateImgItem(timelineMedia[i]));
        await delayTimer(IMG_LOAD_DELAY);
    }
    return userImgGrid;
}

function CreateImgItem(media){
    let userImgCrop = document.createElement('div');
    userImgCrop.classList.add('user-img-crop');

    let img = document.createElement('img');
    img.src = media.url;

    userImgCrop.appendChild(img);
    return userImgCrop;
}



export async function InsertNewImgIntoExistingBlock(userId, newMedias){
    let userImgGrid = document.getElementById(userId);
    for (let i = 0; i < newMedias.length; ++i) {
        userImgGrid.appendChild(CreateImgItem(newMedias[i]));
        await delayTimer(IMG_LOAD_DELAY);
    }
}
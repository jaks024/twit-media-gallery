const userBlockParentElement = document.getElementById('gallery-section');

export function InsertNewUserBlock(twitterUser){
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

    let userInfoAt = document.createElement('div');
    userInfoAt.classList.add('user-info-at');
    userInfoAt.textContent = `@${twitterUser.username}`;
    userInfoDetails.appendChild(userInfoAt);

    userInfoBlock.appendChild(userInfoDetails);

    userBlock.appendChild(userInfoBlock);
    userBlock.appendChild(CreateNewUserImgGrid(twitterUser.timelineMedia, twitterUser.id));

    userBlockParentElement.appendChild(userBlock);
    console.log(`appended html user block of: ${twitterUser.name}`)
}

function CreateNewUserImgGrid(timelineMedia, id){
    let userImgGrid = document.createElement('div');
    userImgGrid.classList.add('user-img-grid');
    userImgGrid.id = id;
    timelineMedia.forEach(media => {
        userImgGrid.appendChild(CreateImgItem(media));
    });
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

export function InsertNewImgIntoExistingBlock(userId, newMedias){
    let userImgGrid = document.getElementById(userId);
    newMedias.forEach(media => {
        userImgGrid.appendChild(CreateImgItem(media));
    });
}
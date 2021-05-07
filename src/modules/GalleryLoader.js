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
    userBlock.appendChild(CreateNewUserImgGrid(twitterUser.timelineMedia));

    userBlockParentElement.appendChild(userBlock);
    console.log(`appended html user block of: ${twitterUser.name}`)
}

function CreateNewUserImgGrid(timelineMedia){
    let userImgGrid = document.createElement('div');
    userImgGrid.classList.add('user-img-grid');
    timelineMedia.forEach(element => {
        let userImgCrop = document.createElement('div');
        userImgCrop.classList.add('user-img-crop');

        let img = document.createElement('img');
        img.src = element.url;

        userImgCrop.appendChild(img);
        userImgGrid.appendChild(userImgCrop);
    });
    return userImgGrid;
}
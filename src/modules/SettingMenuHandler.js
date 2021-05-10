const settingMenuElement = document.getElementById('setting-menu');
const openSettingBtn = document.getElementById('open-setting-btn');
openSettingBtn.addEventListener('click', function (e) {
    e.preventDefault();
    settingMenuElement.style.display = 'flex';

});

const closeSettingBtn = document.getElementById('close-setting-btn');
closeSettingBtn.addEventListener('click', function(e) {
    e.preventDefault();
    settingMenuElement.style.display = 'none'
});
const selectionModeToggleElement = document.getElementById('selection-toggle');
const selectedCountText = document.getElementById('selected-count-text');
const clearSelectionBtn = document.getElementById('clear-selection-btn');
clearSelectionBtn.addEventListener('click', ClearSelectedImages);
const deleteSelectionBtn = document.getElementById('delete-selection-btn');
deleteSelectionBtn.addEventListener('click', DeleteSelectedImages);

const SELECTED_CLASS = 'selected';

selectionModeToggleElement.addEventListener('click', ToggleSelectionMode);


var selectedImageMap = new Map(); 
export var isInSelectionMode = false;

export function SelectedImage(twitterUserId, timelineMedia, htmlElement){
    this.twitterUserId = twitterUserId;
    this.timelineMedia = timelineMedia;
    this.htmlElement = htmlElement;
}

export function AddToSelectedImages(mediaKey, twitterUserId, timelineMedia, htmlElement){
    let selectedImage = new SelectedImage(twitterUserId, timelineMedia, htmlElement);
    let element = selectedImage.htmlElement;
    if (element.classList.contains(SELECTED_CLASS)) {
        element.classList.remove(SELECTED_CLASS);
        RemoveFromSelectedImages(media.media_key)
    } else {
        element.classList.add(SELECTED_CLASS);
        selectedImageMap.set(mediaKey, selectedImage);
        console.log(selectedImageMap);
    }
    UpdateSelectedCount();
}

function RemoveFromSelectedImages(mediaKey){
    selectedImageMap.delete(mediaKey);
    console.log(selectedImageMap);
}

function UpdateSelectedCount(){
    selectedCountText.textContent = selectedImageMap.size;
}

function ToggleSelectionMode(){
    isInSelectionMode = selectionModeToggleElement.checked;
    if (!isInSelectionMode) {
        ClearSelectedImages();
        UpdateSelectedCount();
    }
}

function ClearSelectedImages(){
    for (let value of selectedImageMap.values()) {
        value.htmlElement.classList.remove(SELECTED_CLASS);
    }
    selectedImageMap.clear();
    UpdateSelectedCount();
}

function DeleteSelectedImages(){
    for (let [key, value] of selectedImageMap.entries()) {
        value.htmlElement.remove();
    }
    selectedImageMap.clear();
    UpdateSelectedCount();
}

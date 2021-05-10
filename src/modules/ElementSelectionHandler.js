import { RemoveImageFromSelectedTwitterUser, SaveData } from "./UserDataHandler.js";

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

export function SelectedImage(twitterUserId, media, htmlElement){
    this.twitterUserId = twitterUserId;
    this.media = media;
    this.htmlElement = htmlElement;
}

export function AddToSelectedImages(mediaKey, twitterUserId, media, htmlElement){
    let selectedImage = new SelectedImage(twitterUserId, media, htmlElement);
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
    for (let [mediaKey, selectedImage] of selectedImageMap.entries()) {
        selectedImage.htmlElement.remove();
        RemoveImageFromSelectedTwitterUser(selectedImage.twitterUserId, mediaKey);
    }
    selectedImageMap.clear();
    SaveData();
    UpdateSelectedCount();
}

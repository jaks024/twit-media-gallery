import {
    UserCredential, IsUserCredentialValid
} from "./UserCredential.js";
import {
    DeserializeUserCredential,
    SerializeUserCredential
} from "./UserFileSerializer.js";

const Twit = require('twit');


export var userTwit = null;
var userCredentialData = null;


const consumerKeyInput = document.getElementById('ucf-consumer-key-input');
const consumerSecretKeyInput = document.getElementById('ucf-consumer-secret-key-input');
const accessTokenInput = document.getElementById('ucf-access-token-input');
const accessTokenSecretInput = document.getElementById('ucf-access-token-secret-input');
const userCredsformElement = document.getElementById('user-credential-form');


userCredsformElement.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(userCredsformElement);
});

userCredsformElement.addEventListener('formdata', (e) => {
    let data = e.formData;
    userCredentialData = new UserCredential(data.get('consumer-key'), data.get('consumer-secret-key'),
        data.get('access-token'), data.get('access-token-secret'));
    console.log(userCredentialData);
    OnFormDataReceived(userCredentialData);
});

async function OnFormDataReceived(userCreds) {
    await SerializeUserCredential(userCreds);
    userTwit = CreateNewTwit(userCreds);
}

// userCreds: UserCredential
function CreateNewTwit(userCreds) {
    if (!IsUserCredentialValid(userCreds)) {
        return null;
    }
    return new Twit({
        consumer_key: userCreds.consumerKey,
        consumer_secret: userCreds.consumerSecret,
        access_token: userCreds.accessToken,
        access_token_secret: userCreds.accessTokenSecret,
        timeout_ms: 60*1000
    });
}


function FillFormFromSerializedData() {
    let data = DeserializeUserCredential();
    if (data != null) {
        consumerKeyInput.value = data.consumerKey;
        consumerSecretKeyInput.value = data.consumerSecret;
        accessTokenInput.value = data.accessToken;
        accessTokenSecretInput.value = data.accessTokenSecret;
        userCredentialData = data;
        userTwit = CreateNewTwit(data);
    }
}

FillFormFromSerializedData();
var exec = require('cordova/exec');

module.exports  = {
    init: function(speechKey, serviceRegion, successCallback, errorCallback) {

        validateParameter(speechKey, 'speechKey');
        validateParameter(serviceRegion, 'serviceRegion');

        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'SetSubscription', [speechKey, serviceRegion]);
    },

    startSpeaking: function (speechText, successCallback, errorCallback) {
        validateString(speechText);
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'StartSpeaking', [speechText]);
    },

    startSpeakingSsml: function (speechText, successCallback, errorCallback) {
        validateString(speechText);
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'SpeakSsml', [speechText]);
    },

    startListening: function(successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'StartListening' );
    },

    stopListening: function (successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'StopListening');
    },

    stopSpeaking: function (successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'StopSpeaking');
    }

}

function validateParameter(param, name) {
    if (param === undefined) {
        throw new Error(name + " is required");
    }

    if (typeof param !== 'string'){
        throw new Error(name + " must be of type string");
    }
}
function validateString(text) {
    if (text === undefined || typeof text !== 'string') {
        throw new Error("Text must be of type string");
    }
}


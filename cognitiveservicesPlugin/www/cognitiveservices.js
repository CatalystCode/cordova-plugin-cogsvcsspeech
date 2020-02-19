
var exec = require('cordova/exec');

module.exports  = {
    init: function(speechKey, serviceRegion, successCallback, errorCallback) {

        validateParameter(speechKey, 'speechKey');
        validateParameter(serviceRegion, 'serviceRegion');

        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'SetSubscription', [speechKey, serviceRegion]);
    },

    SpeakText: function(speechText, successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'SpeakText', [speechText]);
    },

   SpeakTextAsync: function(speechText, successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'SpeakTextAsync', [speechText]);
    },

    SpeakSsml: function(speechText, successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'SpeakSsml', [speechText]);
    },

    SpeakSsmlAsync: function(speechText, successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'SpeakSsmlAsync', [speechText]);
    },

    StartListening: function(successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'StartListening' );
    },

    StopListening: function(successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'StopListening' );
    },

    SpeakStop: function(successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'SpeakStop' );
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

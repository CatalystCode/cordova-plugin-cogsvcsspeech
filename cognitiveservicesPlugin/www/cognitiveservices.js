
var exec = require('cordova/exec');

module.exports  = {
    SetSubscription: function(speechSubscriptionKey, serviceRegion, successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'SetSubscription', [speechSubscriptionKey, serviceRegion]);
    },

    startSpeaking: function(speechText, successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'startSpeaking', [speechText]);
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

    RecognizeFromMicrophone: function(successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'RecognizeFromMicrophone' );
    },

    StopListening: function(successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'StopListening' );
    },

    SpeakStop: function(successCallback, errorCallback) {
        return cordova.exec(successCallback, errorCallback, 'CognitiveServices', 'SpeakStop' );
    }

}

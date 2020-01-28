package com.microsoft.cognitiveservices.speech.plugin;

import android.Manifest;
import android.util.Log;

import org.json.JSONArray;

import java.util.concurrent.Future;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;

import com.microsoft.cognitiveservices.speech.ResultReason;
import com.microsoft.cognitiveservices.speech.SpeechConfig;
import com.microsoft.cognitiveservices.speech.SpeechSynthesisCancellationDetails;
import com.microsoft.cognitiveservices.speech.SpeechSynthesisResult;
import com.microsoft.cognitiveservices.speech.SpeechSynthesizer;

public class CognitiveServices extends CordovaPlugin {

    private SpeechConfig speechConfig;
    private SpeechSynthesizer synthesizer;

    private static final String LOGTAG = "CognitiveServices";

    private static final String subscriptionError = "Please run SetSubscription with the Cognitive Services subscription key and region.";

    private static final String INTERNET = Manifest.permission.INTERNET;
    private static final int INTERNET_REQ_CODE = 5;

    @Override
    public boolean execute(final String action, final JSONArray data, final CallbackContext callbackContext) {
        Log.d(LOGTAG, "Plugin Called: " + action);

        switch(action) {
            case "SpeakText":
                getPermission(INTERNET, INTERNET_REQ_CODE);
                cordova.getThreadPool().execute(new Runnable() {
                    public void run() {
                        callbackContext.sendPluginResult(SpeakText(data));
                    }
                });
                break;
            case "SpeakTextAsync": 
                getPermission(INTERNET, INTERNET_REQ_CODE);
                callbackContext.sendPluginResult(SpeakTextAsync(data));
                break;
            case "SpeakSsml":
                getPermission(INTERNET, INTERNET_REQ_CODE);
                    cordova.getThreadPool().execute(new Runnable() {
                        public void run() {
                            callbackContext.sendPluginResult(SpeakSsml(data));
                        }
                    });
                break;
            case "SpeakSsmlAsync":
                getPermission(INTERNET, INTERNET_REQ_CODE);
                callbackContext.sendPluginResult(SpeakSsmlAsync(data));
                break;
            case "SetSubscription":
                callbackContext.sendPluginResult(setSubscription(data));
                break;
            default:
                callbackContext.sendPluginResult(new PluginResult(Status.ERROR, "Unexpected error calling Cognitive Services plugin"));
                }

        return true;
    }

    private PluginResult setSubscription(final JSONArray data) {

        // Initialize speech synthesizer and its dependencies
        try {
            final String speechSubscriptionKey = data.getString(0);
            final String serviceRegion = data.getString(1);
            speechConfig = SpeechConfig.fromSubscription(speechSubscriptionKey, serviceRegion);
        }
        catch (final Exception ex) {
            return new PluginResult(Status.ERROR, "Error setting cognitive services subscription. Error detail: " + System.lineSeparator()
                    + ex.getMessage());
        }

        try {
            synthesizer = new SpeechSynthesizer(speechConfig);
        }
        catch (final Exception err) {
            return new PluginResult(Status.ERROR, "Error setting creating speech synthesizer. Error detail: " + System.lineSeparator()
                    + err.getMessage());
        }

        return new PluginResult(Status.OK);
    }

    private PluginResult SpeakText(final JSONArray data) {
        if (synthesizer == null) {
            return new PluginResult(Status.ERROR, subscriptionError);
        }

        try {
            final SpeechSynthesisResult result = synthesizer.SpeakText(data.getString(0));
            return setResult(result);
        } catch (final Exception ex) {
            return new PluginResult(Status.ERROR, "Speak Text error " + ex.getMessage());
        }
    }

    private PluginResult SpeakTextAsync(final JSONArray data) {
        if (synthesizer == null) {
            return new PluginResult(Status.ERROR, subscriptionError);
        }

        try {
            final Future<SpeechSynthesisResult> result = synthesizer.SpeakTextAsync(data.getString(0));
            return setResult(result.get());
        } catch (final Exception ex) {
            return new PluginResult(Status.ERROR, "Speak Text error " + ex.getMessage());
        }
    }

    private PluginResult SpeakSsml(final JSONArray data) {
        if (synthesizer == null) {
            return new PluginResult(Status.ERROR, subscriptionError);
        }

        try {

            final SpeechSynthesisResult result = synthesizer.SpeakSsml(data.getString(0));
            return setResult(result);
        } catch (final Exception ex) {
            return new PluginResult(Status.ERROR, "Speak SSML error " + ex.getMessage());
        }
    }

    private PluginResult SpeakSsmlAsync(final JSONArray data) {
        if (synthesizer == null) {
            return new PluginResult(Status.ERROR, subscriptionError);
        }

        try {
            final Future<SpeechSynthesisResult> result = synthesizer.SpeakSsmlAsync(data.getString(0));
            return setResult(result.get());
        } catch (final Exception ex) {
            return new PluginResult(Status.ERROR, "Speak Text error " + ex.getMessage());
        }
    }

    private PluginResult setResult(final SpeechSynthesisResult result) {
        if (result.getReason() == ResultReason.Canceled) {
            final String cancellationDetails = SpeechSynthesisCancellationDetails.fromResult(result).toString();
            return new PluginResult(Status.ERROR, "Error synthesizing. Error detail: " + System.lineSeparator()
                    + cancellationDetails);
        }

        result.close();

        return new PluginResult(Status.OK);
    }

    protected void getPermission(final String strCode, final int requestCode) {
        if (!cordova.hasPermission(strCode)) {
            cordova.requestPermission(this, requestCode, strCode);
        }
    }

    
    @Override 
    public void onDestroy() {
      // Release speech synthesizer and its dependencies 
      synthesizer.close();
      speechConfig.close(); 
    }
}

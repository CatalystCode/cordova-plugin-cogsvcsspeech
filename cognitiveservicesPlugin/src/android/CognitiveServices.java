package com.microsoft.cognitiveservices.speech.plugin;

import android.Manifest;
import android.content.pm.PackageManager;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

import java.util.concurrent.Future;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;

import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
import com.microsoft.cognitiveservices.speech.CancellationDetails;
import com.microsoft.cognitiveservices.speech.ResultReason;
import com.microsoft.cognitiveservices.speech.SpeechConfig;
import com.microsoft.cognitiveservices.speech.SpeechRecognitionResult;
import com.microsoft.cognitiveservices.speech.SpeechRecognizer;
import com.microsoft.cognitiveservices.speech.SpeechSynthesisCancellationDetails;
import com.microsoft.cognitiveservices.speech.SpeechSynthesisResult;
import com.microsoft.cognitiveservices.speech.SpeechSynthesizer;

public class CognitiveServices extends CordovaPlugin {

    private SpeechConfig speechConfig;
    private SpeechSynthesizer synthesizer;
    private JSONArray executeData;
    private CallbackContext callbackContext;

    private static final String LOGTAG = "CognitiveServices";

    private static final String subscriptionError = "Please run init with the Cognitive Services subscription key and region.";

    private static final String INTERNET = Manifest.permission.INTERNET;
    private static final int INTERNET_REQ_CODE = 1;
    private static final int INTERNET_REQ_CODE_SSML = 2;
    private static final String RECORD_AUDIO_PERMISSION = Manifest.permission.RECORD_AUDIO;
    private static final int RECORD_AUDIO_REQ_CODE = 3;

    @Override
    public boolean execute(final String action, final JSONArray data, final CallbackContext callbackContxt) {
        callbackContext = callbackContxt;
        executeData = data;
        switch(action) {
            case "StartSpeaking":
                getPermission(INTERNET, INTERNET_REQ_CODE);
                break;
            case "SpeakSsml":
                getPermission(INTERNET, INTERNET_REQ_CODE_SSML);
                break;
            case "SetSubscription":
                cordova.getThreadPool().execute(new Runnable() {
                    public void run() {
                        callbackContxt.sendPluginResult(setSubscription(data));
                    }
                });
                break;
            case "StartListening":
                getPermission(RECORD_AUDIO_PERMISSION, RECORD_AUDIO_REQ_CODE);
                break;
            default:
            callbackContxt.sendPluginResult(new PluginResult(Status.ERROR, "Unexpected error calling Cognitive Services plugin"));
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

        return new PluginResult(Status.OK);
    }

    private PluginResult startSpeaking(final JSONArray data) {
        if (speechConfig == null) {
            return new PluginResult(Status.ERROR, subscriptionError);
        }

        try {
            synthesizer = new SpeechSynthesizer(speechConfig);
            final SpeechSynthesisResult result = synthesizer.SpeakText(data.getString(0));
            return setResult(result);
        } catch (final Exception ex) {
            return new PluginResult(Status.ERROR, "Speak Text error: " + ex.getMessage());
        }
    }

    private PluginResult speakSsml(final JSONArray data) {
        if (speechConfig==null) {
            return new PluginResult(Status.ERROR, "Speak SSML error: " + subscriptionError); 
        }

        try {
            synthesizer = new SpeechSynthesizer(speechConfig);
            final SpeechSynthesisResult result = synthesizer.SpeakSsml(data.getString(0));
            return setResult(result);
        } catch (final Exception ex) {
            return new PluginResult(Status.ERROR, "Speak SSML error " + ex.getMessage());
        }
    }

    private void startListening(){

        if (speechConfig==null) {
            callbackContext.sendPluginResult(new PluginResult(Status.ERROR, "Start Listening error: " + subscriptionError));
            return;
        }

        //final AudioConfig audioInput = AudioConfig.fromDefaultMicrophoneInput();
        final SpeechRecognizer recognizer = new SpeechRecognizer(speechConfig);

        try {

            JSONObject resultsMap = new JSONObject();

            // Subscribes to events.
            recognizer.recognizing.addEventListener((s, e) -> {
                try{

                resultsMap.put("isFinal", "false");
                resultsMap.put("result", e.getResult().getText());
                }
                catch (JSONException err) {
                    callbackContext.sendPluginResult(new PluginResult(Status.ERROR, "Start Listening error: " + err.getMessage()));
                }
                PluginResult pluginResult = new PluginResult(Status.OK, resultsMap);
                pluginResult.setKeepCallback(true);
                callbackContext.sendPluginResult(pluginResult);
                return;
            });

            final Future<SpeechRecognitionResult> task = recognizer.recognizeOnceAsync();
            SpeechRecognitionResult result = task.get();
            
            ResultReason resultReason = result.getReason();
            PluginResult pluginResult;

            resultsMap.put("isFinal", "true");

            if (resultReason==ResultReason.Canceled)
            {
                pluginResult = new PluginResult(Status.OK, "Canceled: " + CancellationDetails.fromResult(result).getErrorDetails());
            }
            else if (resultReason==ResultReason.RecognizedSpeech)
            {
                resultsMap.put("result", result.getText());
                pluginResult = new PluginResult(Status.OK, resultsMap);
            }
            //Capture if silence was detected.
            else if (resultReason==null)
            {
                resultsMap.put("result", result.getText());
                pluginResult = new PluginResult(Status.OK, resultsMap);
            }
            else
            {
                pluginResult = new PluginResult(Status.ERROR, "Start Listening error: " + result.getReason().toString());
            }
           
            pluginResult.setKeepCallback(false);
            callbackContext.sendPluginResult(pluginResult);

    } 
    catch (Exception ex) {
            callbackContext.sendPluginResult(new PluginResult(Status.ERROR, "Start Listening error: " + ex.getMessage()));
        }
    finally{
            recognizer.close();
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
        else
        {
            executeActions(requestCode);
        }
    }

    public void onRequestPermissionResult(int requestCode, String[] permissions,
                                         int[] grantResults) throws JSONException
    {
        for(int r:grantResults)
        {
            if(r == PackageManager.PERMISSION_DENIED)
            {
               callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "Permission Denied"));
                return;
            }
        }
        executeActions(requestCode);
    }

    private void executeActions(int requestCode)
    { 
        switch(requestCode)
        {
            case INTERNET_REQ_CODE:
                cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    callbackContext.sendPluginResult(startSpeaking(executeData));
                    }
                });
                break;
            case INTERNET_REQ_CODE_SSML:
                cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    callbackContext.sendPluginResult(speakSsml(executeData));
                    }
                });
                break;
            case RECORD_AUDIO_REQ_CODE:
                cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    startListening();
                    }
                });
                break;    
            default:
                callbackContext.sendPluginResult(new PluginResult(Status.ERROR, "Unexpected error calling Cognitive Services plugin"));
        }
    }


    @Override
    public void onDestroy() {
      // Release speech synthesizer and its dependencies
      synthesizer.close();
      speechConfig.close();
    }
}

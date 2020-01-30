
# Cognitive Services Cordova Plugin

A [Cordova
Plugin](https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/)
for Speech to Text and Text to Speech using Microsoft's Cognitive
Services

## Installation

```bash
cordova plugin add <folder location>/cognitiveservicesPlugin
```

## Uninstall

```bash
cordova plugin rm microsoft-plugin-cognitiveservices
```

## Supported Platforms

- Android

- iOS

## Usage

This plugin requires internet connection and an Azure Speech Resource.
To create a Speech Resource, follow the instructions in the Azure
documentation: [Try the Speech service for
free](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/get-started#create-a-speech-resource-in-azure).

### SetSubscription (string speechSubscriptionKey, string serviceRegion)

```js
microsoft.plugin.cognitiveservices.SetSubscription(string speechSubscriptionKey,
string serviceRegion, Function successCallback, Function errorCallback)
```

**Speech Subscription Key**: Speech API subscription key obtained by
following instructions in [Microsoft Cognitive Services
subscription](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/get-started)

**Service Region**: The Azure region the speech resource was created.
For more information read [About
regions](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/get-started#about-regions)

SetSubscription creates the Cognitive Services speech configuration and
requires the subscription and region of the Azure Speech resource.

SetSubscription must be called before the plugin can be used by other
method. Recommended to call the SetSubscription method in the
InitializingApp method.

### SpeakText (string speechText)

**Speech Text**: The text that will be spoken by the audio player.

```js
microsoft.plugin.cognitiveservices.SpeakText(string speechText, Function
successCallback, Function errorCallback)
```

SpeakText uses the Speech SDK to playback the text that is sent to the
function.

### SpeakSsml (string speechText)

```js
microsoft.plugin.cognitiveservices.SpeakSsml(string speechText, Function
successCallback, Function errorCallback)
```

**Speech Text**: The SSML Xml string that is used to specify the text
spoken as well as the voice, language, and other variables of the
playback.

SpeakSsml uses the Speech SDK to playback the text that is sent to the
function. Speech Synthesis Markup Language (SSML) is an XML-based markup
language that lets developers specify how input text is converted into
synthesized speech using the text-to-speech service. Compared to plain
text, SSML allows developers to fine-tune the pitch, pronunciation,
speaking rate, volume, and more of the text-to-speech output.

### RecognizeFromMicrophone ()

```js
microsoft.plugin.cognitiveservices.RecognizeFromMicrophone (Function
successCallback, Function errorCallback)
```

Starts the recognition process by listening to the spoken words through
the microphone and sending the results back as a series of text strings.

The function uses the
[SpeechRecognizer](https://docs.microsoft.com/en-us/javascript/api/microsoft-cognitiveservices-speech-sdk/speechrecognizer?view=azure-node-latest)
object to the Speech SDK. The
[recognizing](https://docs.microsoft.com/en-us/javascript/api/microsoft-cognitiveservices-speech-sdk/speechrecognizer?view=azure-node-latest#recognizing)
event is used to gather and return the text as the Speech SDK is
processing the spoken words.

The return value is a set of string values.

iOS Only.

### StopListening()

```js
microsoft.plugin.cognitiveservices.stopListening(Function successCallback,
Function errorCallback)
```

Stop the recognition process. No return value.

iOS Only.

### SpeakStop()

```js
microsoft.plugin.cognitiveservices.speakStop(Function successCallback, Function errorCallback)
```

Stops the AVPlayer from playing. No return value.

iOS Only.

## Plugin Files

The following files are found under the cognitiveServicesPlugin/src/
directory. For details on the configuration files, please select the
link:

- [**Config.xml**](https://cordova.apache.org/docs/en/latest/config_ref/index.html)
-- Name and Description of plugin.

- [**Plugin.xml**](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html)
-- Plugin.xml file defines the structure and settings required for your
plugin. The file includes the configuration values of the iOS and
Android sections.

The following files are found under the cognitiveServicesPlugin/www/
directory:

- **cognitiveservices.js**  -- The javascript file used to execute the
functions.

For an example of how to build a plugin and the use of the www directory
refer to the following walkthrough: [How to write Cordova
Plugin](https://medium.com/ionic-and-the-mobile-web/how-to-write-cordova-plugins-864e40025f2).

The plugin was created using the [create
command](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#create-the-app).
Additional files were added during the create process, but were not
changed.

## Ionic Usage

## app.module.ts

```typescript
import { CognitiveServices } from '@ionic-native/cognitiveservices/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    ...
  CognitiveServices
  ]
```

## app.component.ts

```typescript
import { CognitiveServices } from '@ionic-native/cognitiveservices/ngx';

constructor(private cognitiveServices: CognitiveServices) { }
…
// Set the subscription information
initializeApp() {
        this.platform.ready().then(() => {
       this.cognitiveServices.SetSubscription(
                     environment.subscriptionKey,
               environment.serviceRegion).then(
                   () => { },
                   (error: any) => { alert(error); });
         });
}
```

## Page.ts

```typescript
import { CognitiveServices } from '@ionic-native/cognitiveservices/ngx';

constructor(private cognitiveServices: CognitiveServices) { }

...

// Start the recognition process (iOS only)
 this.cognitiveServices.RecognizeFromMicrophone().subscribe(
        results => {
          if (!results.isFinal) {
              matches = results.result;
              console.log(results.result);
            });
          } else {
            match = results.result;
            console.log(results.result);
          }
        },
        (error: any) => { alert(error); }
      );


// Stop the recognition process (iOS only)
this.cognitiveServices.StopListening();

// Speak the text in the speakText variable
this.cognitiveServices.SpeakText(speakText).then(
        () => {},
        (error: any) => {alert(error);}
      );

// Speak using the SSML xml values
this.cognitiveServices.SpeakSsml(speakSsml).then(
        () => {},
        (error: any) => {alert(error); }
      );

// Stop the speaking process (iOS only)
this.cognitiveServices.SpeakStop();
```

## Ionic Native

The for iOS to work in an ionic application, the plugin must use an
ionic-native wrapper. Ionic Native is a TypeScript wrapper for
Cordova/PhoneGap plugins. Ionic Native wraps plugin callbacks in a
Promise or an Observable, providing a common interface for all plugins
and ensuring that native events trigger change detection in Angular.

The ionic-native wrapper is included in the cognitiveservices folder. To
add the ionic native code to the project, the following command must be
ran in the project folder.

```bash
cp -r <folder location>/cognitiveservices <ionic application folder>/node_modules/@ionic-native/
```

See [Ionic Native
documentation](https://ionicframework.com/docs/v3/native/)
and [Ionic Native
Development](https://github.com/ionic-team/ionic-native).

## Android

### Requirements

- [RECORD\_AUDIO](https://developer.android.com/reference/android/Manifest.permission.html#RECORD_AUDIO)
permission

- [INTERNET](https://developer.android.com/reference/android/Manifest.permission.html#INTERNET)
    permission

- The Cognitive Services plugin supports Node version 10.9 or greater.

### How it works

The Java SDK for Android is packaged as an AAR (Android Library), which
includes the necessary libraries and required Android permissions. The
Speech AAR is included with the plugin code.

### Files

The following files are found under the
cognitiveServicesPlugin/src/android directory:

- **CognitiveServices.gradle** -- The build file used to import the
client-sdk-1.8.0 AAR dependency

- **CognitiveServices.java** -- The Android plugin implementation

The following file is found under the cognitiveServicesPlugin/aar
directory:

- **client-sdk-1.8.0.aar** -- The Cognitive Services Android Library

### Further readings

- <https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-sdk#android>

- <https://docs.microsoft.com/en-us/java/api/com.microsoft.cognitiveservices.speech?view=azure-java-stable>

## iOS

### Requirements

- The target set to iOS version 9.3 or later
- The Cognitive Services plugin supports Node version 10.9 or greater.

### How it works

The Cognitive Services Speech SDK for iOS is currently distributed as a
Cocoa Framework. The SDK was downloaded
from <https://aka.ms/csspeech/iosbinary> and linked manually.

The plugin works
in [AVAudioSessionCategoryMultiRoute](https://developer.apple.com/documentation/avfoundation/avaudiosessioncategorymultiroute?language=objc)
mode
to enable playing audio.

### Files

The following files are found under the cognitiveServicesPlugin/src/ios
directory:

- **CDVCognitiveServices.h**  -- The iOS header file that defines the
public functions that can be called.

- **CDVCognitiveServices.m** --  The iOS plugin implementation

**MicrosoftCognitiveServicesSpeech.framework** -- The iOS Speech SDK
that is contained in the <https://aka.ms/csspeech/iosbinary> zip file.

### Further readings

- <https://docs.microsoft.com/en-us/objectivec/cognitive-services/speech/>

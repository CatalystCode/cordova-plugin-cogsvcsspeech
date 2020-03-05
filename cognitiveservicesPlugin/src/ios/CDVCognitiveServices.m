#import "CDVCognitiveServices.h"
#import <MicrosoftCognitiveServicesSpeech/SPXSpeechApi.h>
#import <AVFoundation/AVFoundation.h>
#import <Cordova/CDV.h>

@implementation CDVCognitiveServices

- (void)SetSubscription: (CDVInvokedUrlCommand*)command {

    CDVPluginResult* pluginResult = nil;
    NSString* speechSubscriptionKey = [command.arguments objectAtIndex:0];
    NSString* serviceRegion = [command.arguments objectAtIndex:1];

    speechConfig = [[SPXSpeechConfiguration alloc] initWithSubscription:speechSubscriptionKey region:serviceRegion];

    if (!speechConfig) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Could not load speech config"];
        NSLog(@"Could not load speech config");
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)StopListening:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{

        if (self->speechRecognizer) {
            [self->speechRecognizer stopContinuousRecognition];
        }

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)StartListening: (CDVInvokedUrlCommand*)command {

    CDVPluginResult* pluginResult = nil;

    listenerCallbackId = command.callbackId;

    AVAudioSession *audioSession = [AVAudioSession sharedInstance];
    [audioSession setCategory:AVAudioSessionCategoryMultiRoute error:nil];
    
    NSLog(@"Recognizing...");

    speechRecognizer = [[SPXSpeechRecognizer alloc] init:speechConfig];
    
    if (!speechRecognizer) {
        NSLog(@"Could not create speech recognizer");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:(@"Could not create speech recognizer, please make sure to run SetSubscription")];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }

    NSMutableDictionary *resultsDict = [[NSMutableDictionary alloc] init];

     // connect callback
    [speechRecognizer addRecognizingEventHandler: ^ (SPXSpeechRecognizer *recognizer, SPXSpeechRecognitionEventArgs *eventArgs) {
        [resultsDict setValue:[NSNumber numberWithBool:NO] forKey:@"isFinal"];
        [resultsDict setValue:eventArgs.result.text forKey:@"result"];
        [resultsDict setValue:self->listenerCallbackId forKey:@"id"];

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultsDict];
        [pluginResult setKeepCallbackAsBool:YES];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self->listenerCallbackId];
        return;
    }];
    
    //SPXSpeechRecognitionResult *speechResult = [speechRecognizer recognizeOnce];
    [self.commandDelegate runInBackground:^{
    [self->speechRecognizer recognizeOnceAsync: ^ (SPXSpeechRecognitionResult * speechResult){
        CDVPluginResult* pluginResult = nil;
    if (SPXResultReason_Canceled == speechResult.reason) {
        SPXCancellationDetails *details = [[SPXCancellationDetails alloc] initFromCanceledRecognitionResult:speechResult];
        NSLog(@"Speech recognition was canceled: %@.", details.errorDetails);
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:([NSString stringWithFormat:@"Canceled: %@", details.errorDetails ])];
    } else if (SPXResultReason_RecognizedSpeech == speechResult.reason) {
          [resultsDict setValue:[NSNumber numberWithBool:YES] forKey:@"isFinal"];
          [resultsDict setValue:speechResult.text forKey:@"result"];
          [resultsDict setValue:command.callbackId forKey:@"id"];
          pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultsDict];
    } else if (!speechResult.reason) {
        //Nothing was detected
        [resultsDict setValue:[NSNumber numberWithBool:YES] forKey:@"isFinal"];
        [resultsDict setValue:speechResult.text forKey:@"result"];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultsDict];
    } else {
        NSLog(@"There was an error.");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:([NSString stringWithFormat:@"Speech Recognition Error: %@", speechResult.reason ])];
    }
    [pluginResult setKeepCallbackAsBool:NO];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
    }];

}

- (void)StopSpeaking: (CDVInvokedUrlCommand*)command {
    if (player)
    {
        //player is playing
        if ([player rate]) {
            [player stop];
        }
    }

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];


}

- (void)SpeakSsml: (CDVInvokedUrlCommand*)command {

    CDVPluginResult* pluginResult = nil;

    [speechConfig setSpeechSynthesisOutputFormat:SPXSpeechSynthesisOutputFormat_Audio16Khz32KBitRateMonoMp3];
    SPXSpeechSynthesizer *speechSynthesizer = [[SPXSpeechSynthesizer alloc] initWithSpeechConfiguration:speechConfig audioConfiguration:nil];
    
    NSString* inputText = [command.arguments objectAtIndex:0];

    NSLog(@"Start synthesizing...");
    
    SPXSpeechSynthesisResult *speechResult = [speechSynthesizer speakSsml:inputText];
    
    // Checks result.
    if (SPXResultReason_Canceled == speechResult.reason) {
        SPXSpeechSynthesisCancellationDetails *details = [[SPXSpeechSynthesisCancellationDetails alloc] initFromCanceledSynthesisResult:speechResult];
        NSLog(@"Speech synthesis was canceled: %@. Did you pass the correct key/region combination?", details.errorDetails);
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:([NSString stringWithFormat:@"Canceled: %@", details.errorDetails ])];
    } else if (SPXResultReason_SynthesizingAudioCompleted == speechResult.reason) {
        NSLog(@"Speech synthesis was completed");
        // Play audio.
        player = [[AVAudioPlayer alloc] initWithData:[speechResult audioData] error:nil];
        [player prepareToPlay];
        [player play];
        NSLog(@"The synthesis is completed.");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    } else {
        NSLog(@"There was an error.");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:(@"Synthesis error")];
    }

     [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)StartSpeaking: (CDVInvokedUrlCommand*)command {

    CDVPluginResult* pluginResult = nil;

    [speechConfig setSpeechSynthesisOutputFormat:SPXSpeechSynthesisOutputFormat_Audio16Khz32KBitRateMonoMp3];
    SPXSpeechSynthesizer *speechSynthesizer = [[SPXSpeechSynthesizer alloc] initWithSpeechConfiguration:speechConfig audioConfiguration:nil];
    
    NSString* inputText = [command.arguments objectAtIndex:0];

    NSLog(@"Start synthesizing...");
    
    SPXSpeechSynthesisResult *speechResult = [speechSynthesizer speakText:inputText];
    
    // Checks result.
    if (SPXResultReason_Canceled == speechResult.reason) {
        SPXSpeechSynthesisCancellationDetails *details = [[SPXSpeechSynthesisCancellationDetails alloc] initFromCanceledSynthesisResult:speechResult];
        NSLog(@"Speech synthesis was canceled: %@. Did you pass the correct key/region combination?", details.errorDetails);
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:([NSString stringWithFormat:@"Canceled: %@", details.errorDetails ])];
    } else if (SPXResultReason_SynthesizingAudioCompleted == speechResult.reason) {
        NSLog(@"Speech synthesis was completed");
        // Play audio.
        player = [[AVAudioPlayer alloc] initWithData:[speechResult audioData] error:nil];
        [player prepareToPlay];
        [player play];
        NSLog(@"The synthesis is completed.");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    } else {
        NSLog(@"There was an error.");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:(@"Synthesis error")];
    }

     [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

@end
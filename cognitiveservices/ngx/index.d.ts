import { IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs';
/**
 * @name cognitiveservices
 * @description
 * This plugin does something
 *
 * @usage
 * ```typescript
 * import { cognitiveservices } from '@ionic-native/cognitiveservices';
 *
 *
 * constructor(private cognitiveservices: cognitiveservices) { }
 *
 * ...
 *
 *
 * this.cognitiveservices.functionName('Hello', 123)
 *   .then((res: any) => console.log(res))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
export interface SpeechVoiceOptions {
    language?: string;
    pitch?: string;
    voice?: string;
}
export declare class CognitiveServices extends IonicNativePlugin {
    /**
     * This function does something
     * @param arg1 {string} Some param to configure something
     * @param arg2 {number} Another param to configure something
     * @return {Promise<any>} Returns a promise that resolves when something happens
     */
    SetSubscription(speechSubscriptionKey: string, serviceRegion: string): Promise<void>;
    RecognizeFromMicrophone(): Observable<Array<Object>>;
    SpeakSsml(speechText: string): Promise<string>;
    SpeakSsmlAsync(speechText: string): Promise<string>;
    StartSpeaking(speechText: string): Promise<string>;
    SpeakTextAsync(speechText: string): Promise<string>;
    StopListening(): Promise<void>;
    SpeakWithVoiceOptions(speechText: string, options?: SpeechVoiceOptions): Promise<void>;
    SpeakStop(): Promise<void>;
}

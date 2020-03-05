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
    init(speechKey: string, serviceRegion: string): Promise<void>;
    startListening(): Observable<Array<Object>>;
    startSpeakingSsml(speechText: string): Promise<string>;
    startSpeaking(speechText: string): Promise<string>;
    stopListening(): Promise<void>;
    SpeakWithVoiceOptions(speechText: string, options?: SpeechVoiceOptions): Promise<void>;
    stopSpeaking(): Promise<void>;
}

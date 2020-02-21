import {Component, ViewChild, ElementRef} from '@angular/core';
import {CognitiveServices} from '@ionic-native/cognitiveservices/ngx';


@Component({
    selector: 'app-speechToTextTab',
    templateUrl: 'speechToText.page.html',
    styleUrls: ['speechToText.page.scss']
})

export class SpeechToTextPage {
    captureButtonText = 'Capture Speech';
    captureButtonColor = 'primary';
    capturePressed = false;
    capturedText: string[];

    constructor(private cognitiveServices: CognitiveServices) {
    }

    captureSpeechButtonClicked() {
        this.toggleSpeechButton(!this.capturePressed);

    }

    stopAudioCapture() {
        this.toggleSpeechButton(false);
    }

    toggleSpeechButton(state: boolean) {
        if (state) {
            this.startListening();
            this.capturePressed = true;
            this.captureButtonText = 'Stop Capture';
            this.captureButtonColor = 'danger';
        } else {
            this.stopListening();
            this.capturePressed = false;
            this.captureButtonText = 'Capture Speech';
            this.captureButtonColor = 'primary';
        }
    }

    startListening() {
        this.cognitiveServices.RecognizeFromMicrophone().subscribe(results => {
            this.capturedText = results['result'];
        }, (str: any) => {
            alert(str);
        });
    }

    stopListening() {
        this.cognitiveServices.StopListening();
    }
}

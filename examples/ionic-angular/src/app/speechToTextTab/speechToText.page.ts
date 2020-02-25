import {Component, ViewChild, ElementRef, NgZone, ChangeDetectorRef} from '@angular/core';
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

    constructor(private zone: NgZone,
                private cognitiveServices: CognitiveServices,
                private cdr: ChangeDetectorRef) {
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
        this.cognitiveServices.startListening().subscribe(results => {
            if (!results['isFinal']) {
                this.zone.run(() => {
                    this.capturedText = results['result'];
                    this.cdr.detectChanges();
                });
            } else {
                this.capturePressed = false;
                this.captureButtonText = 'Capture Speech';
                this.captureButtonColor = 'primary';
            }
        }, (str: any) => {
            alert(str);
        });
    }

    stopListening() {
        this.cognitiveServices.stopListening();
    }
}

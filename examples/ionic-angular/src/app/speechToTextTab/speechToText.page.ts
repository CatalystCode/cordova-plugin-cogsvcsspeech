import {Component, OnInit, NgZone, ChangeDetectorRef} from '@angular/core';
import {CognitiveServices} from '@ionic-native/cognitiveservices/ngx';


@Component({
    selector: 'app-speechToTextTab',
    templateUrl: 'speechToText.page.html',
    styleUrls: ['speechToText.page.scss']
})

export class SpeechToTextPage implements OnInit {
    capturedText: string[];
    isListening = false;

    constructor(private zone: NgZone,
                private cognitiveServices: CognitiveServices,
                private cdr: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
    }

    captureSpeechButtonClicked() {
        if (this.isListening) {
            this.stopAudioCapture();
            return;
        }
        this.isListening = true;
        this.startListening();
    }

    stopAudioCapture() {
        this.isListening = false;
        this.stopListening();
    }

    startListening() {
        this.cognitiveServices.startListening().subscribe(results => {
            console.log(results['isFinal']);
            console.log(typeof results['isFinal']);
            this.zone.run(() => {
                    if (results['isFinal'] === 'false') {
                    this.capturedText = results['result'];
                    } else {
                        console.log(results['result']);
                        this.capturedText = results['result'];
                        this.isListening = false;
                    }
                });
        }, (str: any) => {
            alert(str);
            this.isListening = false;
        });
    }

    stopListening() {
        this.cognitiveServices.stopListening();
    }
}

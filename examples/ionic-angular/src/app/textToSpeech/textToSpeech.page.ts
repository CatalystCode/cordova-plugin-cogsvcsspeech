import {Component} from '@angular/core';
import {CognitiveServices} from '@ionic-native/cognitiveservices/ngx';
// import {XMLWriter} from 'xml-writer';
import XMLWriter from 'xml-writer';

@Component({
    selector: 'app-textToSpeechTab',
    templateUrl: 'textToSpeech.page.html',
    styleUrls: ['textToSpeech.page.scss']
})

export class TextToSpeechPage {
    playbackButtonText = 'Start Speaking';
    playbackButtonColor = 'primary';
    playbackButtonPressed = false;
    text = 'The quick brown fox jumps over the lazy dog';
    xmlWriter = new XMLWriter();
    useSSML = false;

    constructor(private cognitiveServices: CognitiveServices) {
    }

    playbackButtonClicked() {
        this.togglePlaybackButton(!this.playbackButtonPressed);
    }

    dataChanged(e: any) {
        this.useSSML = e.currentTarget.checked;
    }

    stopAudioPlayback() {
        this.togglePlaybackButton(false);
    }

    togglePlaybackButton(state: boolean) {
        if (state) {
            this.playbackButtonPressed = true;
            this.playbackButtonText = 'Stop Playback';
            this.playbackButtonColor = 'danger';
            if (this.useSSML) {
                this.textToSpeechSSML();
            } else {
                this.textToSpeech();
            }
        } else {
            this.playbackButtonPressed = false;
            this.playbackButtonText = 'Speak Text';
            this.playbackButtonColor = 'primary';
        }
    }

    textToSpeech() {
        this.cognitiveServices.StartSpeaking(this.text).then(
            () => {
            },
            (error: any) => {
                alert(error);
            }
        );
    }

    textToSpeechSSML() {
        const options = {
            language: 'en-US',
            voice: 'Guy24KRUS'
        };
        const ssml = this.createSsml(this.text, options);
        this.cognitiveServices.SpeakSsml(ssml).then(
            () => {
            },
            (error: any) => {
                alert(error);
            }
        );

    }

    createSsml(text, options) {
        const language = options.language || 'en-US';
        const voice = options.voice || 'Guy24KRUS';
        this.xmlWriter = new XMLWriter();
        const xmlBody = this.xmlWriter
            .startDocument()
            .startElement('speak')
            .writeAttribute('version', '1.0')
            .writeAttribute('xml:lang', language)
            .writeAttribute('xmlns', 'https://www.w3.org/2001/10/synthesis')
            .startElement('voice')
            .writeAttribute('name', language + '-' + voice)
            .text(text)
            .endElement()
            .endElement()
            .endDocument();
        return xmlBody.toString();
    }
}

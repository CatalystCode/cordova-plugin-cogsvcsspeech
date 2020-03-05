import {Component, OnInit} from '@angular/core';
import {CognitiveServices} from '@ionic-native/cognitiveservices/ngx';
import XMLWriter from 'xml-writer';
import {config} from '../app.config';

@Component({
    selector: 'app-textToSpeechTab',
    templateUrl: './textToSpeech.page.html',
    styleUrls: ['./textToSpeech.page.scss']
})

export class TextToSpeechPage implements OnInit {
    isPlaying = false;
    text = 'The quick brown fox jumps over the lazy dog.';
    xmlWriter = new XMLWriter();
    useSSML = false;

    constructor(private cognitiveServices: CognitiveServices) {
    }

    public ngOnInit(): void {
    }

    playbackButtonClicked() {
        if (this.isPlaying) {
            this.stopAudioPlayback();
            return;
        }
        this.isPlaying = true;
        if (this.useSSML) {
            this.textToSpeechSSML();
        } else {
            this.textToSpeech();
        }
    }

    stopAudioPlayback() {
        this.isPlaying = false;
    }

    dataChanged(e: any) {
        this.useSSML = e.currentTarget.checked;
    }

    textToSpeech() {
        this.cognitiveServices.startSpeaking(this.text).then(
            () => {
                this.isPlaying = false;
            },
            (error: any) => {
                alert(error);
            }
        );
    }

    textToSpeechSSML() {

        const ssml = this.createSsml(this.text);
        this.cognitiveServices.startSpeakingSsml(ssml).then(
            () => {
                this.isPlaying = false;
            },
            (error: any) => {
                alert(error);
            }
        );

    }

    createSsml(text) {
        this.xmlWriter = new XMLWriter();
        const xmlBody = this.xmlWriter
            .startDocument()
            .startElement('speak')
            .writeAttribute('version', '1.0')
            .writeAttribute('xml:lang', config.ssml.language)
            .writeAttribute('xmlns', 'https://www.w3.org/2001/10/synthesis')
            .startElement('voice')
            .writeAttribute('name', config.ssml.language + '-' + config.ssml.voice)
            .startElement('express-as')
            .writeAttribute('type', config.ssml.type)
            .text(text)
            .endElement()
            .endElement()
            .endDocument();
        return xmlBody.toString();
    }
}

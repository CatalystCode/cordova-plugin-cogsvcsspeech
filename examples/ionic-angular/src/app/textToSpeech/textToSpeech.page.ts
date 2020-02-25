import { Component, OnInit  } from '@angular/core';
import { CognitiveServices } from '@ionic-native/cognitiveservices/ngx';


@Component({
  selector: 'app-textToSpeechTab',
  templateUrl: './textToSpeech.page.html',
  styleUrls: ['./textToSpeech.page.scss']
})

export class TextToSpeechPage implements OnInit {
  isPlaying = false;
  playbackButtonText = 'Start Speaking';
  playbackButtonPressed = false;
  text = 'The quick brown fox jumps over the lazy dog.';


  constructor(private cognitiveServices: CognitiveServices) { }

  public ngOnInit(): void {
  }

  playbackButtonClicked() {
    if (this.isPlaying) {
        this.stopAudioPlayback();
        return;
    }
    this.isPlaying = true;
    this.textToSpeech();
  }

  stopAudioPlayback() {
    this.isPlaying = false;
  }

  textToSpeech() {
    this.cognitiveServices.startSpeaking(this.text).then(
        () => {
          this.isPlaying = false;
        },
        (error: any) => {alert(error); }
    );
  }
}

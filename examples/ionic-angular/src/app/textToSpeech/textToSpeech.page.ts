import { Component } from '@angular/core';
import { CognitiveServices } from '@ionic-native/cognitiveservices/ngx';


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

  constructor(private cognitiveServices: CognitiveServices) { }

  playbackButtonClicked() {
    this.togglePlaybackButton(!this.playbackButtonPressed);
  }

  stopAudioPlayback() {
    this.togglePlaybackButton(false);
  }

  togglePlaybackButton(state: boolean) {
    if (state) {
      this.playbackButtonPressed = true;
      this.playbackButtonText = 'Stop Playback';
      this.playbackButtonColor = 'danger';
      this.textToSpeech();
    } else {
      this.playbackButtonPressed = false;
      this.playbackButtonText = 'Speak Text';
      this.playbackButtonColor = 'primary';
    }
  }

  textToSpeech() {
    this.cognitiveServices.startSpeaking(this.text).then(
        () => {},
        (error: any) => {alert(error); }
    );
  }
}

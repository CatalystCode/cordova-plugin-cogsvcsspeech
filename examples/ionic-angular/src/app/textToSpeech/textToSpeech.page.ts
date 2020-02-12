import { Component } from '@angular/core';

@Component({
  selector: 'app-textToSpeechTab',
  templateUrl: 'textToSpeech.page.html',
  styleUrls: ['textToSpeech.page.scss']
})

export class TextToSpeechPage {
  playbackButtonText = 'Speak Text';
  playbackButtonColor = 'primary';
  playbackButtonPressed = false;

  constructor() {}

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
    } else {
      alert('Playback stopped');
      this.playbackButtonPressed = false;
      this.playbackButtonText = 'Speak Text';
      this.playbackButtonColor = 'primary';
    }
  }
}

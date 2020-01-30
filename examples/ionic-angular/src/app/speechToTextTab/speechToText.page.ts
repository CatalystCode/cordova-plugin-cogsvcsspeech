import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-speechToTextTab',
  templateUrl: 'speechToText.page.html',
  styleUrls: ['speechToText.page.scss']
})

export class SpeechToTextPage {
  captureButtonText = 'Capture Speech';
  captureButtonColor = 'primary';
  capturePressed = false;

  constructor() { }

  captureSpeechButtonClicked() {
    this.toggleSpeechButton(!this.capturePressed);
  }

  stopAudioCapture() {
    this.toggleSpeechButton(false);
  }

  toggleSpeechButton(state: boolean) {
    if (state) {
      this.capturePressed = true;
      this.captureButtonText = 'Stop Capture';
      this.captureButtonColor = 'danger';
    } else {
      alert('Audio capture ended');
      this.capturePressed = false;
      this.captureButtonText = 'Capture Speech';
      this.captureButtonColor = 'primary';
    }
  }
}

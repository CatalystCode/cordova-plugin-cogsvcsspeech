import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TextToSpeechPage } from './textToSpeech.page';

describe('TextToSpeechPage', () => {
  let component: TextToSpeechPage;
  let fixture: ComponentFixture<TextToSpeechPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextToSpeechPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TextToSpeechPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

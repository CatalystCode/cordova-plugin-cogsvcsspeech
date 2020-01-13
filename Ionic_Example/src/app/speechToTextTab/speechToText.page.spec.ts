import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpeechToTextPage } from './speechToText.page';

describe('SpeechToTextPage', () => {
  let component: SpeechToTextPage;
  let fixture: ComponentFixture<SpeechToTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpeechToTextPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeechToTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

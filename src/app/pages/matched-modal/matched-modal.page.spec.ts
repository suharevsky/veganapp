import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatchedModalPage } from './matched-modal.page';

describe('MatchedModalPage', () => {
  let component: MatchedModalPage;
  let fixture: ComponentFixture<MatchedModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchedModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

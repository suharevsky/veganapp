import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UIComponent } from './ui.component';

describe('UIComponent', () => {
  let component: UIComponent;
  let fixture: ComponentFixture<UIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

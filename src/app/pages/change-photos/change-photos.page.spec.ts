import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangePhotosPage } from './change-photos.page';

describe('ChangePhotosPage', () => {
  let component: ChangePhotosPage;
  let fixture: ComponentFixture<ChangePhotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhotosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

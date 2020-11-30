import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicBarComponent } from './magic-bar.component';

describe('MagicBarComponent', () => {
  let component: MagicBarComponent;
  let fixture: ComponentFixture<MagicBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagicBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

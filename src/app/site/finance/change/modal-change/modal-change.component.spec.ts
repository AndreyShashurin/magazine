import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeComponent } from './modal-change.component';

describe('ModalChangeComponent', () => {
  let component: ModalChangeComponent;
  let fixture: ComponentFixture<ModalChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

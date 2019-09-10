import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuladasComponent } from './anuladas.component';

describe('AnuladasComponent', () => {
  let component: AnuladasComponent;
  let fixture: ComponentFixture<AnuladasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnuladasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

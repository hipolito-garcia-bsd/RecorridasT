import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularComponent } from './anular.component';

describe('AnularComponent', () => {
  let component: AnularComponent;
  let fixture: ComponentFixture<AnularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

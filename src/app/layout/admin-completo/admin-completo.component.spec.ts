import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompletoComponent } from './admin-completo.component';

describe('AdminCompletoComponent', () => {
  let component: AdminCompletoComponent;
  let fixture: ComponentFixture<AdminCompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

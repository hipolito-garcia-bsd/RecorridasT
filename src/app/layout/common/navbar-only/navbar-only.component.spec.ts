import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOnlyComponent } from './navbar-only.component';

describe('NavbarOnlyComponent', () => {
  let component: NavbarOnlyComponent;
  let fixture: ComponentFixture<NavbarOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

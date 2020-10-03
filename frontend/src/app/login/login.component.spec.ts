import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let email: AbstractControl;
  let password: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Form Elements
    email = component.loginForm.controls.email;
    password = component.loginForm.controls.password;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login form', () => {
    const element = fixture.nativeElement;

    expect(element.querySelector('form')).toBeTruthy();
    expect(element.querySelector('#email')).toBeTruthy();
    expect(element.querySelector('#password')).toBeTruthy();
    expect(element.querySelector('button[type=submit]')).toBeTruthy();
  });

  it('should validate email field as required', () => {
    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy();
  });

  it('should validate password field as required', () => {
    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  });

  it('should fail to validate with bad email', () => {
    email.setValue('badEmail');

    const errors = email.errors;

    expect(errors.pattern).toBeTruthy();
    expect(email.valid).toBeFalsy();
  });

  it('should succeed to validate with a good email', () => {
    email.setValue('test@gmail.com');

    const errors = email.errors || {};

    expect(errors.pattern).toBeFalsy();
    expect(email.valid).toBeTruthy();
  });
});

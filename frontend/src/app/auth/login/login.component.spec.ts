import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let email: AbstractControl;
  let password: AbstractControl;
  let submitButton: any;
  let elements: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Form Elements
    email = component.loginForm.controls.email;
    password = component.loginForm.controls.password;
    submitButton = fixture.nativeElement.querySelector('button[type=submit]');
    elements = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login form', () => {
    expect(elements.querySelector('form')).toBeTruthy();
    expect(elements.querySelector('#email')).toBeTruthy();
    expect(elements.querySelector('#password')).toBeTruthy();
    expect(elements.querySelector('button[type=submit]')).toBeTruthy();
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

    const errors = email.errors || {};

    expect(errors.pattern).toBeTruthy();
    expect(email.valid).toBeFalsy();
  });

  it('should succeed to validate with a good email', () => {
    email.setValue('test@gmail.com');

    const errors = email.errors || {};

    expect(errors.pattern).toBeFalsy();
    expect(email.valid).toBeTruthy();
  });

  it('should render an error message when the submitted email is not valid', () => {
    expect(elements.querySelector('#email-required-error')).toBeFalsy();

    submitButton.click();

    fixture.detectChanges();

    expect(elements.querySelector('#email-required-error')).toBeTruthy();
    expect(
      elements.querySelector('#email-required-error').textContent.trim()
    ).toBe('Please enter a valid email.');
  });

  it('should render an error message when the submitted email doesnt match the pattern', () => {
    expect(elements.querySelector('#email-pattern-error')).toBeFalsy();

    email.setValue('a');

    submitButton.click();

    fixture.detectChanges();

    expect(elements.querySelector('#email-pattern-error')).toBeTruthy();
    expect(
      elements.querySelector('#email-pattern-error').textContent.trim()
    ).toBe('Email must be a valid address.');
  });

  it('should render an error message when the submitted password is not valid', () => {
    expect(elements.querySelector('#password-required-error')).toBeFalsy();

    submitButton.click();

    fixture.detectChanges();

    expect(elements.querySelector('#password-required-error')).toBeTruthy();
    expect(
      elements.querySelector('#password-required-error').textContent.trim()
    ).toBe('Please enter a valid password.');
  });
});

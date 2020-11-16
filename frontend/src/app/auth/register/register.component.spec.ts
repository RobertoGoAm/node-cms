import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { MockAuthService } from '../service/mock-auth';
import { RegisterComponent } from './register.component';

describe('registerComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let name: AbstractControl;
  let email: AbstractControl;
  let emailConfirm: AbstractControl;
  let password: AbstractControl;
  let passwordConfirm: AbstractControl;
  let submitButton: HTMLButtonElement;
  let elements: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Form Elements
    name = component.registerForm.controls.name;
    email = component.registerForm.controls.email;
    emailConfirm = component.registerForm.controls.emailConfirm;
    password = component.registerForm.controls.password;
    passwordConfirm = component.registerForm.controls.passwordConfirm;
    submitButton = fixture.nativeElement.querySelector('button[type=submit]');
    elements = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render register form', () => {
    expect(elements.querySelector('form')).toBeTruthy();
    expect(elements.querySelector('#name')).toBeTruthy();
    expect(elements.querySelector('#email')).toBeTruthy();
    expect(elements.querySelector('#emailConfirm')).toBeTruthy();
    expect(elements.querySelector('#password')).toBeTruthy();
    expect(elements.querySelector('#passwordConfirm')).toBeTruthy();
    expect(elements.querySelector('button[type=submit]')).toBeTruthy();
  });

  it('should validate name field as required', () => {
    expect(name.valid).toBeFalsy();
    expect(name.errors.required).toBeTruthy();
  });

  it('should validate email field as required', () => {
    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy();
  });

  it('should validate emailConfirm field as required', () => {
    expect(emailConfirm.valid).toBeFalsy();
    expect(emailConfirm.errors.required).toBeTruthy();
  });

  it('should validate password field as required', () => {
    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  });

  it('should validate passwordConfirm field as required', () => {
    expect(passwordConfirm.valid).toBeFalsy();
    expect(passwordConfirm.errors.required).toBeTruthy();
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

  it('should fail to validate with bad emailConfirm', () => {
    emailConfirm.setValue('badEmailConfirm');

    const errors = emailConfirm.errors || {};

    expect(errors.pattern).toBeTruthy();
    expect(emailConfirm.valid).toBeFalsy();
  });

  it('should fail to validate with a bad emailConfirm', () => {
    email.setValue('test@gmail.com');
    emailConfirm.setValue('testConfirm@gmail.com');

    const errorsEmail = email.errors || {};
    const errorsEmailConfirm = emailConfirm.errors || {};

    expect(errorsEmail.pattern).toBeFalsy();
    expect(errorsEmailConfirm.pattern).toBeFalsy();
    expect(errorsEmail.emailMustMatch).toBeTruthy();
    expect(errorsEmailConfirm.emailMustMatch).toBeTruthy();
    expect(email.valid).toBeFalsy();
    expect(emailConfirm.valid).toBeFalsy();
  });

  it('should succeed to validate with a good emailConfirm', () => {
    email.setValue('test@gmail.com');
    emailConfirm.setValue('test@gmail.com');

    const errorsEmail = email.errors || {};
    const errorsEmailConfirm = emailConfirm.errors || {};

    expect(errorsEmail.pattern).toBeFalsy();
    expect(errorsEmailConfirm.pattern).toBeFalsy();
    expect(errorsEmail.emailMustMatch).toBeFalsy();
    expect(errorsEmailConfirm.emailMustMatch).toBeFalsy();
    expect(email.valid).toBeTruthy();
    expect(emailConfirm.valid).toBeTruthy();
  });

  it('should fail to validate with a bad passwordConfirm', () => {
    password.setValue('password');
    passwordConfirm.setValue('passwordConfirm');

    const errorsPassword = password.errors || {};
    const errorsPasswordConfirm = passwordConfirm.errors || {};

    expect(errorsPassword.passwordMustMatch).toBeTruthy();
    expect(errorsPasswordConfirm.passwordMustMatch).toBeTruthy();
    expect(password.valid).toBeFalsy();
    expect(passwordConfirm.valid).toBeFalsy();
  });

  it('should succeed to validate with a good passwordConfirm', () => {
    password.setValue('password');
    passwordConfirm.setValue('password');

    const errorsPassword = password.errors || {};
    const errorsPasswordConfirm = passwordConfirm.errors || {};

    expect(errorsPassword.passwordMustMatch).toBeFalsy();
    expect(errorsPasswordConfirm.passwordMustMatch).toBeFalsy();
    expect(password.valid).toBeTruthy();
    expect(passwordConfirm.valid).toBeTruthy();
  });

  it('should change submit button disabled property based on the form being valid', () => {
    expect(submitButton.disabled).toBe(true);

    name.setValue('name');
    email.setValue('invalid email');
    emailConfirm.setValue('invalid email');
    password.setValue('valid password');
    passwordConfirm.setValue('valid password');

    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);

    email.setValue('valid@email.com');
    emailConfirm.setValue('valid@email.com');
    password.setValue('');
    passwordConfirm.setValue('');

    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);

    password.setValue('valid password');
    passwordConfirm.setValue('valid password');

    fixture.detectChanges();

    expect(submitButton.disabled).toBe(false);
  });

  it('should trigger fromEvent on submit and request register if everything checks out', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'register').and.callThrough();

    name.setValue('name');
    email.setValue('valid@email.com');
    emailConfirm.setValue('valid@email.com');
    password.setValue('valid password');
    passwordConfirm.setValue('valid password');

    fixture.detectChanges();

    submitButton.click();

    fixture.detectChanges();

    expect(component.formSubmitted).toBe(true);
    expect(authService.register).toHaveBeenCalledTimes(1);
  });

  it('should catch errors on submit', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'register').and.returnValue(throwError('Error'));
    spyOn(component, 'handleServiceErrors').and.callThrough();

    name.setValue('name');
    email.setValue('valid@email.com');
    emailConfirm.setValue('valid@email.com');
    password.setValue('valid password');
    passwordConfirm.setValue('valid password');

    fixture.detectChanges();

    submitButton.click();

    fixture.detectChanges();

    expect(component.formSubmitted).toBe(true);
    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(component.handleServiceErrors).toHaveBeenCalledTimes(1);
  });
});

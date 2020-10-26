import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { MockAuthService } from '../shared/mock-auth';
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
});

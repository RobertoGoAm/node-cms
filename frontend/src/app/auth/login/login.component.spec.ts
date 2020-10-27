import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MockAuthService } from '../service/mock-auth';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let email: AbstractControl;
  let password: AbstractControl;
  let submitButton: HTMLButtonElement;
  let elements: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
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

  it('should change submit button disabled property based on the form being valid', () => {
    expect(submitButton.disabled).toBe(true);

    email.setValue('invalid email');
    password.setValue('valid password');

    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);

    email.setValue('valid@email.com');
    password.setValue('');

    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);

    password.setValue('valid password');

    fixture.detectChanges();

    expect(submitButton.disabled).toBe(false);
  });

  it('should trigger fromEvent on submit and request login if everything checks out', () => {
    const authService = TestBed.get(AuthService);
    const loginSpy = spyOn(authService, 'login').and.callThrough();

    email.setValue('valid@email.com');
    password.setValue('valid password');

    fixture.detectChanges();

    submitButton.click();

    fixture.detectChanges();

    expect(component.formSubmitted).toBe(true);
    expect(loginSpy).toHaveBeenCalled();
  });
});


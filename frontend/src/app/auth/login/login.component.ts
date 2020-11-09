import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { fromEvent } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { EMAIL_REGEX } from '../../../constants/regex';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form #loginFormRef [formGroup]="loginForm">
      <div class="form-group">
        <label for="email">Email</label>

        <input
          type="email"
          class="form-control"
          formControlName="email"
          id="email"
          placeholder="Email"/>

        <span
          id="email-required-error"
          *ngIf="validate('required','email')">
          Please enter a valid email.
        </span>

        <span
          id="email-pattern-error"
          *ngIf="validate('pattern', 'email')">
          Email must be a valid address.
        </span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>

        <input
          type="password"
          class="form-control"
          formControlName="password"
          id="password"
          placeholder="******"/>

        <span
          id="password-required-error"
          *ngIf="validate('required', 'password')">
          Please enter a valid password.
        </span>
      </div>

      <button [disabled]="loginForm.invalid" type="submit">Log in</button>
    </form>
`,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginFormRef', { static: true }) loginFormRef: ElementRef;
  loginForm: FormGroup;
  formSubmitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToFormSubmit();
  }

  // Form
  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', Validators.required],
    });
  }

  subscribeToFormSubmit(): void {
    fromEvent(this.loginFormRef.nativeElement, 'submit')
      .pipe(
        switchMap(() => {
          this.formSubmitted = true;

          return this.authService.login(
            this.emailField.value,
            this.passwordField.value
          );
        }),
        catchError((error, caught) => {
          // console.log(error);

          return caught;
        })
      )
      .subscribe();
  }

  validate(property: string, controlName: string): boolean {
    return (
      (this.loginForm.get(controlName).touched || this.formSubmitted) &&
      this.loginForm.get(controlName).hasError(property)
    );
  }

  // Getters
  get emailField(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get passwordField(): AbstractControl {
    return this.loginForm.controls.password;
  }
}

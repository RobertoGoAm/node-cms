import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fromEvent } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { EMAIL_REGEX } from '../../../constants/regex';
import { MustMatch } from '../../../helpers/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerFormRef', { static: true }) registerFormRef: ElementRef;
  registerForm: FormGroup;
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
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
        emailConfirm: [
          '',
          [Validators.required, Validators.pattern(EMAIL_REGEX)],
        ],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: [
          MustMatch('password', 'passwordConfirm'),
          MustMatch('email', 'emailConfirm'),
        ],
      }
    );
  }

  subscribeToFormSubmit(): void {
    fromEvent(this.registerFormRef.nativeElement, 'submit')
      .pipe(
        switchMap(() => {
          this.formSubmitted = true;

          const emailOK =
            this.emailField.value &&
            this.emailConfirmField.value &&
            this.emailField.value === this.emailConfirmField.value;
          const passwordOK =
            this.passwordField.value &&
            this.passwordConfirmField.value &&
            this.passwordField.value === this.passwordConfirmField.value;

          if (this.nameField.value && emailOK && passwordOK) {
            return this.authService.register(
              this.nameField.value,
              this.emailField.value,
              this.passwordField.value
            );
          }
        }),
        catchError((error, caught) => {
          // console.log(error);

          return caught;
        }),
      )
      .subscribe();
  }

  // Getters
  get nameField(): AbstractControl {
    return this.registerForm.controls.name;
  }

  get emailField(): AbstractControl {
    return this.registerForm.controls.email;
  }

  get emailConfirmField(): AbstractControl {
    return this.registerForm.controls.emailConfirm;
  }

  get passwordField(): AbstractControl {
    return this.registerForm.controls.password;
  }

  get passwordConfirmField(): AbstractControl {
    return this.registerForm.controls.passwordConfirm;
  }
}

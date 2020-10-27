import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { EMAIL_REGEX } from '../../../constants/regex';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginFormRef', {static: true}) loginFormRef: ElementRef;
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

        if (this.emailField && this.passwordField && this.loginForm.valid) {
          return this.authService.login(this.emailField.value, this.passwordField.value);
        }
      }),
      catchError((error, caught) => {
        // console.log(error);

        return caught;
      })
    ).subscribe(() => console.log('Success!'));
  }

  // Getters
  get emailField(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get passwordField(): AbstractControl {
    return this.loginForm.controls.password;
  }
}

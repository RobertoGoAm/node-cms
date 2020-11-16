import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { EMAIL_REGEX } from '../../../constants/regex';
import { MustMatch } from '../../../helpers/form';
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

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

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
        emailConfirm: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: [MustMatch('password', 'passwordConfirm'), MustMatch('email', 'emailConfirm')],
      }
    );
  }

  subscribeToFormSubmit(): void {
    fromEvent(this.registerFormRef.nativeElement, 'submit')
      .pipe(
        switchMap(() => {
          this.formSubmitted = true;

          return this.authService.register(this.nameField.value, this.emailField.value, this.passwordField.value);
        }),
        catchError((error, caught) => {
          this.handleServiceErrors(error);
          return caught;
        })
      )
      .subscribe();
  }

  handleServiceErrors(error: any): void {
    // console.log('Do something');
  }

  validate(property: string, controlName: string): boolean {
    return (
      (this.registerForm.get(controlName).touched || this.formSubmitted) &&
      this.registerForm.get(controlName).hasError(property)
    );
  }

  // Getters
  get nameField(): AbstractControl {
    return this.registerForm.controls.name;
  }

  get emailField(): AbstractControl {
    return this.registerForm.controls.email;
  }

  get passwordField(): AbstractControl {
    return this.registerForm.controls.password;
  }
}

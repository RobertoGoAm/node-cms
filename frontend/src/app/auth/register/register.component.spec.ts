import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { MockAuthService } from '../shared/mock-auth';
import { RegisterComponent } from './register.component';

describe('registerComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
});

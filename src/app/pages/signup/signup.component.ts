import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.initialiseForms();
  }

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  initialiseForms() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      reenterPassword: ['', [Validators.required]],
    })
  }

  submitForm() {
    const signupValue = this.signupForm.value;
    this.authService.signUp(signupValue).subscribe((userSignup) => {
      console.log(userSignup);
      this.signupForm.reset();
    })
  }
}

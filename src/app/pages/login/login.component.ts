import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  hide = signal(true);
  loginForm!: FormGroup;
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.initialiseForms();
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  initialiseForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.authService.login(formValue).subscribe((userLogin: any) => {
        if (userLogin.message === 'Login Success') {
          const notyf = new Notyf({
            position: {
              x: 'center',
              y: 'bottom'
            },
            duration: 3000
          })
          notyf.success('Logged in successfully!');
        } else {
          const notyf = new Notyf({
            position: {
              x: 'center',
              y: 'bottom'
            },
            duration: 2000
          })
          notyf.success('Invalid Email or Password.');
        }
        setTimeout(() => {
          this.router.navigateByUrl('dashboard');
          this.loginForm.reset();
        }, 2000)
      })
    } else {
      const notyf = new Notyf({
        position: {
          x: 'center',
          y: 'bottom'
        },
        duration: 3000
      })
      notyf.error('Please fill out all required fields.');
    }
  }
}

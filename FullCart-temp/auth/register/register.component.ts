import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserRegisterRequest } from 'shared/models/UserRegisterRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userRequest: UserRegisterRequest;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl(''),
      }),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  register() {
    this.setUserRequest();
    this.authService.register(this.userRequest).subscribe({
      next: () => {
        this.toastr.success('User registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error(err.error);
        this.registerForm.reset();
      },
    });
  }

  setUserRequest() {
    const { username, email, password } = this.registerForm.value;
    let firstName: string =
      username.firstName.charAt(0).toUpperCase() +
      username.firstName.slice(1, username.firstName.length).toLowerCase();
    let lastName: string =
      username.lastName.charAt(0).toUpperCase() +
      username.lastName.slice(1, username.lastName.length).toLowerCase();
    this.userRequest = {
      username: firstName + ' ' + lastName,
      password: password,
      email: email.toLowerCase(),
      role: 'User'
    };
  }
}

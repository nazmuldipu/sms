import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword = false;
  loginForm: FormGroup;
  user: User;
  
  constructor(private builder: FormBuilder,
    private auth: AuthService) { 
    this.user = new User();
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.builder.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      remember: false,
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.authenticate(this.user);
    }
  }

}

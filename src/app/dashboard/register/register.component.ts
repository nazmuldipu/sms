import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword = false;
  user: User;
  
  constructor(private builder: FormBuilder) {
    this.user = new User();
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.builder.group({
      name: ['', Validators.required],
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      remember: false,
    });
  }

  register(){
    console.log(this.user);
    console.log(this.registerForm);
  }

}

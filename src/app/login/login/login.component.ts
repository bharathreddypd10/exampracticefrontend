import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form group with controls
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Username field with required validation
      password: ['', Validators.required]  // Password field with required validation
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      // Perform login action here (e.g., call an API or route to another page)
    } else {
      console.log('Form is invalid!');
    }
  }

}

import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { SignupService } from '../../signupservice/signup.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule,MatFormFieldModule,MatLabel,MatDatepickerModule,MatNativeDateModule,MatInputModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  errorMessage: string="";
  fileControl: any;
  url:string='http://127.0.0.1:5000';

  constructor(private fb: FormBuilder,private signupService: SignupService,private router:Router,private http:HttpClient){}
  ngOnInit(): void {
    // Using FormBuilder to create the form
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#]).+$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  // Convenience getter for easy access to form fields in the template
  get f() { return this.signupForm.controls; }

  // Handle form submission
  onSubmit(): void {
    this.submitted = true;
   
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      // For example, you might send the form data (including file) via an HTTP request:
      const formData = new FormData();
      formData.append('firstName', this.signupForm.value.firstName);
      formData.append('lastName', this.signupForm.value.lastName);
      formData.append('email', this.signupForm.value.email);
      formData.append('phoneNumber', this.signupForm.value.phoneNumber);
      formData.append('gender', this.signupForm.value.gender);
        // Format the date to YYYY-MM-DD before sending
      const dob = this.signupForm.value.dob;
      if (dob) {
        formData.append('dob', dob.toISOString().split('T')[0]);  // Convert Date to string YYYY-MM-DD
      }
      formData.append('address', this.signupForm.value.address);
      formData.append('password', this.signupForm.value.password);
      formData.append('file', this.signupForm.value.file);

      this.http.post(`${this.url}/usersignup`,formData).subscribe({
        next:(response)=>{
          console.log(response);
          // Reset the form after successful submission
          this.signupForm.reset();
          this.signupForm.markAsPristine();
          this.signupForm.markAsUntouched();
        },
        error:(e)=>{
          console.log(e);
        }   
      });

    } else {
      this.errorMessage = 'Enter Required Fields';
      return;
    }
  }
  onFieldChange(): void {
    // Clear error message when user interacts with any form field
    if (this.submitted) {
      this.errorMessage = '';
    }
  }

  // Handle the file selection event
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Optionally, set the file to the form control (optional, but allows the form to manage the file)
      this.fileControl.setValue(file);
    }
  }
  
}

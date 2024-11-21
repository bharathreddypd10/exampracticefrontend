import { Component, OnInit } from '@angular/core';
import { LoginService } from '../loginservice/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [FormsModule,CommonModule,MatInputModule,MatButtonModule,MatFormFieldModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit{
  userDetails: any = { // Initialize userDetails
    profilePicture: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender:'',
    dob:'',
    address: ''
  }; 
  isEditing: boolean = false; 
  updateSuccess: boolean = false; // Flag to indicate successful update
  updateError: boolean = false; // Flag to indicate an error during update

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const decodedToken = this.loginService.decodeToken();

    if (decodedToken) {
      this.userDetails = {
        email: decodedToken.email,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        phoneNumber: decodedToken.phoneNumber || '', // Handle undefined case
        address: decodedToken.address || '' ,    // Handle undefined case
        dob:decodedToken.dob, 
        gender:decodedToken.gender
      };
      console.log('User Details:', this.userDetails);  // Log to see the details
    } else {
      console.error('Invalid token or no token available');
    }
  }
  toggleEdit(): void {
    this.isEditing = !this.isEditing; // Toggle the edit mode
    this.updateSuccess = false; // Reset success message on edit
    this.updateError = false; // Reset error message on edit
  }

  // saveProfile(): void {
  //   // Logic to save updated profile details
  //   this.loginService.updateUserDetails(this.userDetails.email,this.userDetails).subscribe({
  //     next:(response) => {
  //       console.log('Profile updated:', response);
  //       this.isEditing = false; // Turn off editing mode after saving
  //       this.updateSuccess = true; // Set success flag
  //       // Ensure userDetails are updated with the new data from response
  //       if (response.user) {
  //         this.userDetails = { ...response.user };
  //       } else {
  //         console.warn("Updated driver details not received in response");
  //       }
  //     },
  //     error:(error) => {
  //       console.error('Error updating profile:', error);
  //       this.updateError = true; // Set error flag
  //     }
  // });
  // }

}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  loggedInUser: any = {};
  profileForm!: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loggedInUser = this.authService.currentUser();

    this.profileForm = this.fb.group({
      name: [this.loggedInUser.user.name ? this.loggedInUser.user.name : ''],
      age: [this.loggedInUser.user.age ? this.loggedInUser.user.age : ''],
      location: [this.loggedInUser.user.location ? this.loggedInUser.user.location : ''],
      title: [this.loggedInUser.user.title ? this.loggedInUser.user.title : ''],
      bio: [this.loggedInUser.user.bio ? this.loggedInUser.user.bio : ''],
      email: [this.loggedInUser.user.email, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
 * convenience getter for easy access to form fields
 */
   get formValues(): { [key: string]: AbstractControl; } { return this.profileForm.controls; }


  onSubmit(): void {
    this.formSubmitted = true;
  }

}

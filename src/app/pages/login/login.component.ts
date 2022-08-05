import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  returnUrl: string = '/';
  loginForm!: FormGroup;
  loading: boolean = false;
  formSubmitted: boolean = false;
  error: string = '';

  showPassword: boolean = false;
  errCode: string = '';
  errMessage: string = '';
  feedback: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnDestroy() {
  }

  /**
 * convenience getter for easy access to form fields
 */
   get formValues(): { [key: string]: AbstractControl; } { return this.loginForm.controls; }

   /**
   * On submit form
   */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.authenticationService.login(this.formValues['email'].value, this.formValues['password'].value).pipe(first()).subscribe(
        (data: any) => {
          this.loading = false;
          if (data.status == 'KO') {
            this.errCode = data.code;
            this.errMessage = data.message;
            this.feedback = true;
          }
          else {
            this.router.navigate([this.returnUrl]);
          }
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        });
    }
  }

}

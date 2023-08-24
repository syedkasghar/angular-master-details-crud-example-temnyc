import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services';
import { MustMatch } from '../_helpers';

@Component({ templateUrl: 'login-form.component.html' })
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authenticateUser();
    //this.router.navigate(['../'], { relativeTo: this.route });
  }

  private authenticateUser() {
    console.log(this.form.value);
    this.authenticationService
      .login(this.form.value.username, this.form.value.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Authentication Successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['home'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}

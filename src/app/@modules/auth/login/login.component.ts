import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Logger } from 'src/app/@core';
import { Subject } from 'rxjs';

const log = new Logger('LoginComponent');
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  error = false;
  click$: Subject<any> = new Subject<any>();

  constructor() {}

  ngOnInit() {}

  login() {}

  ngOnDestroy() {}
}

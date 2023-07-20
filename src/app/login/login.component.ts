import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formlogin!:FormGroup;

  constructor(private fb:FormBuilder,private  authservice:AuthService,private router:Router) { }

  ngOnInit(): void {

    this.formlogin=this.fb.group({
      username:this.fb.control(''),
      password:this.fb.control('')
    })
  }

  handleLogin() {
  let username=this.formlogin.value.username;
  let password=this.formlogin.value.password;
  this.authservice.login(username,password).subscribe(
    {
      next:data => {
        this.authservice.loadprofile(data);
        this.router.navigateByUrl("/admin");

      },error:err => {
        console.log(err);
      }
    }
  )
  }
}

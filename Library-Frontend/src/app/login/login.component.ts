import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    // this.authService.login(this.User).subscribe((data)=>{
    //   console.log(data);
    // });
  }
  image:string='/assets/images/book2.jpg';
  User={
    useremail: '',
    userpassword:''
  };
  
  loginUser(){
    this.authService.loginUser(this.User)
    .subscribe(
      res=>{
      //  alert(res.message);
        console.log('sucessfully loggedin');
        localStorage.setItem('token',res.token);
        this.router.navigate(['/books']);
     
  },
  (error:HttpErrorResponse)=>{
    alert('Incorrect Email Adderess Or Password');
    
  },
  )
  }
}

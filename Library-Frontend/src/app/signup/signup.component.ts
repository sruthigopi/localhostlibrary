import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  image:string='/assets/images/book1.jpg';
  User={
    email: '',
    username:'',
    password:''
  };
  signup(){
    this.authService.signup(this.User);
    console.log('called');
    alert('Congratulations, Your Account Has Been Successfully Created.');
    this.router.navigate(['/login']);
  }
}

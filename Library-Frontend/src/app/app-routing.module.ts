import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { NewBookComponent } from './new-book/new-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';

const routes: Routes = [{path:'',component:HomeComponent},
                        {path:'signup',component:SignupComponent},
                        {path:'login',component:LoginComponent},
                        {path:'books',component:BooksComponent},
                        {path:'add', canActivate:[AuthGuard],component:NewBookComponent},
                        {path:'update',canActivate:[AuthGuard],component:UpdateBookComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { BookModel } from './book.model';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  title:string='BOOKS';
  books:BookModel[]  |any;
  imageWidth:number =75;
  imageMargin:number =5; 
  showImage:boolean=false;
  constructor(private bookService:BookService,private router:Router) { }
  
  toggleImage(){
    this.showImage=!this.showImage;
  } 

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data)=>{
      this.books=JSON.parse(JSON.stringify(data));
    })
  }
  // edit book
  editBooks(book:any){
    localStorage.setItem("editBookId",book._id.toString())
    this.router.navigate(['update']);
      }
// deletebook
deleteBooks(book:any){
    
  this.bookService.deleteBooks(book._id)
  .subscribe((data)=>{
     this.books =this.books.filter((p: any)=>p! == book);
     this.ngOnInit();
    });
    
    }
}

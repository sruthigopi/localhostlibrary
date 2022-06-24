import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { BookModel } from '../books/book.model';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  title:string='ADD NEW BOOK'
  image:string='/assets/images/book3.jpg';
  constructor(private  bookService: BookService,private router:Router) { }
  bookItem = new BookModel('','','','');
  ngOnInit(): void {
  }
  AddBook(){
    this.bookService.newBook(this.bookItem);
    console.log('called');
    alert('NEW BOOK DETAILS ADDED SUCCESSFULLY');
    this.router.navigate(['/books']);
  }
}

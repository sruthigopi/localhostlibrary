import { Component, OnInit } from '@angular/core';
import { BookModel } from '../books/book.model';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  title:string='UPDATE THE BOOK';
  image:string='/assets/images/book4.jpg';
  constructor(private  bookService: BookService,private router:Router) { }
  bookItem = new BookModel('','','','');
  ngOnInit(): void {
    // id for update
    console.log('initialisation');
    let productId=localStorage.getItem("editBookId");
    this.bookService.getBookUpdate(productId).subscribe((data)=>{
      this.bookItem=JSON.parse(JSON.stringify(data));
    })
  }
  editBook(){
    // product item is passing to service file
    this.bookService.editBook(this.bookItem);
    alert('BOOK DETAILS UPDATED SUCCESSFULLY');
    this.router.navigate(["books"]);
  }


}

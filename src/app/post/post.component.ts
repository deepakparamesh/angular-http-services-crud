import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(http: Http) {
    http.get( 'https://jsonplaceholder.typicode.com/posts' )
    .subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit() {
  }

}

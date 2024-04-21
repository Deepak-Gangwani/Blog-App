import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {

  articles: any;

  constructor( private data: DataService){}

  ngOnInit(): void {
    this.data.getAll()
      .subscribe(
        res=>{
          this.articles=res;
        },
        err=>{
          console.log(err);
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit {

  id: any;
  author: any;
  articles: any;

  constructor(private act: ActivatedRoute, private _auth: AuthService, private data: DataService) {
  }

  ngOnInit(): void {

    this.id = this.act.snapshot.paramMap.get('id');
    this._auth.getById(this.id)
      .subscribe(
        res => {
          this.author = res;
          console.log(this.author);
        }
      );

    this.data.getArticleByIdAuthor(this.id)
      .subscribe(
        res => {
          this.articles = res;
        },
        err => {
          console.log(err)
        }
      );

  }

}

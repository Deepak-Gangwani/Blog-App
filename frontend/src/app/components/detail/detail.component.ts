import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {


  id:any;
  article:any; 
  constructor(private act: ActivatedRoute, private data: DataService){}

  ngOnInit(): void {
    this.id=this.act.snapshot.paramMap.get('id');

    this.data.getArticleById(this.id)
      .subscribe(
        res=>{
          this.article=res;
        }
      )
  }

}

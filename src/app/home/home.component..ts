import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Parfuem } from '../shared/parfuem';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredParfuems: Parfuem[] = [];

  constructor(private bs: BackendService) {}

  ngOnInit(): void {
    this.bs.getAll()
      .then(data => {
        this.featuredParfuems = data.filter(p => p.featured).slice(0, 3);
      });
  }
}
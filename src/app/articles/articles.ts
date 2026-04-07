import { Component, computed, effect, inject, signal } from '@angular/core';
import { Articles, ArticlesService } from './articles.service';

@Component({
  selector: 'app-articles',
  imports: [],
  templateUrl: './articles.html',
  styleUrl: './articles.css',
})
export class ArticlesComponent {
  private articlesService = inject(ArticlesService)
  articles = signal<Articles[]>([])
  
  constructor() {
    this.articlesService.getAll().subscribe((articles) => {
      this.articles.set(articles)
    })
  }
}

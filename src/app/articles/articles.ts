import { Component, inject, signal } from '@angular/core';
import { Article, ArticlesService } from './articles.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-articles',
  imports: [],
  templateUrl: './articles.html',
  styleUrl: './articles.css',
})
export class Articles {
  private articlesService = inject(ArticlesService)
  readonly articles = toSignal(this.articlesService.getArticles(), {
    initialValue: []
  })
}

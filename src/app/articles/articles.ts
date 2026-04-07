import { Component, computed, effect, inject, signal } from '@angular/core';
import { Articles, ArticlesService } from './articles.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-articles',
  imports: [],
  templateUrl: './articles.html',
  styleUrl: './articles.css',
})
export class ArticlesComponent {
  private articlesService = inject(ArticlesService)
  articles = toSignal(this.articlesService.getAll())
}

import { Component, computed, effect, inject, REQUEST, RESPONSE_INIT, signal } from '@angular/core';
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
  private request = inject(REQUEST)
  private responseInit = inject(RESPONSE_INIT)
  articles = toSignal(this.articlesService.getAll())

  constructor() {
    console.log(this.request)
    if (this.responseInit) {
      this.responseInit.headers = {
        'Cache-Control': 'max-age=3600'
      }
    }
  }
}

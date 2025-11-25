import { Component, inject, PendingTasks, REQUEST, RESPONSE_INIT, signal } from '@angular/core';
import { Article, ArticlesService } from './articles.service';
import { pendingUntilEvent, toSignal } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';

@Component({
  selector: 'app-articles',
  imports: [],
  templateUrl: './articles.html',
  styleUrl: './articles.css',
})
export class Articles {
  private request = inject(REQUEST)
  private responseInit = inject(RESPONSE_INIT)
  private articlesService = inject(ArticlesService)
  readonly articles = toSignal(this.articlesService.getArticles())
  isUserConnected = signal(false)

  constructor() {
    if (this.responseInit) {
      this.responseInit.headers = {
        'Cache-Control': 'max-age=7200'
      }
    }
    
  }
}

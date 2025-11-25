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
  private pendingTasks = inject(PendingTasks)
  private responseInit = inject(RESPONSE_INIT)
  private articlesService = inject(ArticlesService)
  readonly articles = toSignal(this.articlesService.getArticles().pipe(
    pendingUntilEvent()
  ), {
    initialValue: []
  })
  isUserConnected = signal(false)

  constructor() {
    if (this.responseInit) {
      this.responseInit.headers = {
        'Cache-Control': 'max-age=7200'
      }
    }
    // this.pendingTasks.run(() => {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       console.log('test')
    //       resolve(true)
    //     }, 10000)
    //   })
    // })
    
  }
}

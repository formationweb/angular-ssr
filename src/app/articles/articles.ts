import { Component, inject, PendingTasks, REQUEST, REQUEST_CONTEXT, RESPONSE_INIT, signal } from '@angular/core';
import { Article, ArticlesService } from './articles.service';
import { pendingUntilEvent, toSignal } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';

interface Request {
  abTest: string
}

@Component({
  selector: 'app-articles',
  imports: [],
  templateUrl: './articles.html',
  styleUrl: './articles.css',
})
export class Articles {
  private request = inject(REQUEST)
  private requestContext = inject(REQUEST_CONTEXT)
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
    console.log(this.requestContext)
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

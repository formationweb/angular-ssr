import { Component, computed, effect, inject, makeStateKey, PendingTasks, PLATFORM_ID, REQUEST, RESPONSE_INIT, signal, TransferState } from '@angular/core';
import { Articles, ArticlesService } from './articles.service';
import { pendingUntilEvent, toSignal } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { Example } from "../test";

const ARTICLES_KEY = makeStateKey<Articles[]>('articles')

@Component({
  selector: 'app-articles',
  imports: [Example],
  templateUrl: './articles.html',
  styleUrl: './articles.css',
})
export class ArticlesComponent {
  private platformId = inject(PLATFORM_ID)
  private articlesService = inject(ArticlesService)
  // private request = inject(REQUEST)
  // private responseInit = inject(RESPONSE_INIT)
  private pendingTasks = inject(PendingTasks)
  private transferState = inject(TransferState)
  
  articles = toSignal(this.articlesService.getFetchAll().pipe(
    pendingUntilEvent()
  ))

  test() {
    console.log('test')
  }

  isAdmin = signal(false)

  //articles = signal<Articles[]>([])

 /* constructor() {
    const cached = this.transferState.get(ARTICLES_KEY, null)

    if (cached) {
      this.articles.set(cached)
      if (isPlatformBrowser(this.platformId)) {
        this.transferState.remove(ARTICLES_KEY)
      }
      return
    }

    this.pendingTasks.run(async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts')
          .then((res) => res.json())
         this.articles.set(data)
         this.transferState.set(ARTICLES_KEY, data)
    })

    //this.transferState.set(ARTICLES_KEY, 'toto')
    // console.log(this.request)
    // if (this.responseInit) {
    //   this.responseInit.headers = {
    //     'Cache-Control': 'max-age=3600'
    //   }
    // }
    // this.pendingTasks.run(async () => {
    //    await fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then((res) => res.json())
    //     .then(data => this.articles.set(data))
    // })
   
  }*/
}

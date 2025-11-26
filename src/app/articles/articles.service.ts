import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { IndexedDbService } from '../core/indexeddb';
import { RxDbService } from '../core/rxdbservice';

export interface Article {
  id: number
  title: string
  body: string
  userId: number
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private http = inject(HttpClient)
  //private indexedDbService = inject(IndexedDbService)
  private rxDb = inject(RxDbService)
  readonly url = 'https://jsonplaceholder.typicode.com/posts'
  readonly storeName = 'articles'

  // getArticles(): Observable<Article[]> {
  //   return this.http.get<Article[]>(this.url).pipe(
  //     switchMap((articles) => {
  //       return this.indexedDbService.setItems<Article>(this.storeName, articles)
  //     }),
  //     catchError(() => {
  //       return this.indexedDbService.getItems<Article>(this.storeName)
  //     })
  //   )
  // }

  getArticles(): Observable<Article[]> {
    // return this.http.get<Article[]>(this.url).pipe(
    //   switchMap((articles) => {
    //     return from(this.rxDb!.collectionArticles.bulkInsert(articles)).pipe(
    //       map(() => articles)
    //     )
    //   }),
    //   catchError(() => {
    //     return this.rxDb!.collectionArticles.find().$
    //   })
    // )
    return this.rxDb!.collectionArticles.find().$
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  readonly url = 'https://jsonplaceholder.typicode.com/posts'

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url)
  }
}

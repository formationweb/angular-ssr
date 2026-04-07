import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Articles {
    userId: number
    id: number
    title: string
    body: string
}

@Injectable({
    providedIn: 'root'
})
export class ArticlesService {
    private http = inject(HttpClient)
    readonly url = 'https://jsonplaceholder.typicode.com/posts'

    getAll(): Observable<Articles[]> {
        return this.http.get<Articles[]>(this.url)
    }
}
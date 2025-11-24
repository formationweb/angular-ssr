import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { lastValueFrom } from 'rxjs';
import { ArticlesService } from './articles/articles.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
    // headers: {
    //   'Cache-Control': 'max-age=3600'
    // }
  },
  {
    path: 'article/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const articlesService = inject(ArticlesService)
      const articles = await lastValueFrom(articlesService.getArticles())
      return articles.map(article => {
        return {
          id: ''+article.id
        }
      })
    }
  },
  {
    path: '404',
    renderMode: RenderMode.Server,
    status: 404
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

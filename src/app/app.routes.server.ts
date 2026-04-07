import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { ArticlesService } from './articles/articles.service';
import { lastValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'draw',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'article/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const articleService = inject(ArticlesService)
      const articles = await lastValueFrom(articleService.getAll())
      return articles.map(article => {
        return {
          id: ''+article.id
        }
      })
    },
    fallback: PrerenderFallback.Server
  },
  {
    path: '404',
    renderMode: RenderMode.Server,
    status: 404,
    headers: {
      'Cache-Control': 'max-age=3600'
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];

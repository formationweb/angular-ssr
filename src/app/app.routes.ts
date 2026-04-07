import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles';
import { Draw } from './draw/draw';
import { authGuard } from './core/auth.guard';
import { Article } from './article/article';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
  },
  {
    path: 'article/:id',
    component: Article,
  },
  {
    path: 'draw',
    component: Draw,
    canActivate: [authGuard],
  },
  {
    path: '404',
    component: NotFound
  }
];

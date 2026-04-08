import { RenderMode } from '@angular/ssr';
import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles';
import { Draw } from './draw/draw';
import { authGuard } from './core/auth.guard';
import { Article } from './article/article';
import { NotFound } from './not-found/not-found';
import { Example } from './test';
import { Group } from './group/group';

export const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent
  },
   {
    path: 'test',
    component: Example
  },
  {
    path: 'article/:id',
    component: Article,
  },
   {
    path: 'article/:id/comment',
    component: Article,
  },
  {
    path: 'draw',
    component: Draw,
    canActivate: [authGuard],
  },
  {
    path: 'abgroup',
    component: Group
  },
  {
    path: '404',
    component: NotFound
  }
];

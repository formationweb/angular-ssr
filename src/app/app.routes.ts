import { Routes } from '@angular/router';
import { Articles } from './articles/articles';
import { authGuard } from './core/guards/auth';
import { ArticleComponent } from './article/article';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [{
    path: '',
    component: Articles,
    canActivate: [authGuard]
}, {
    path: 'article/:id',
    component: ArticleComponent
}, {
    path: '404',
    component: NotFound
}];

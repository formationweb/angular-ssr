import { Routes } from '@angular/router';
import { Articles } from './articles/articles';
import { authGuard } from './core/guards/auth';
import { ArticleComponent } from './article/article';
import { NotFound } from './not-found/not-found';
import { Summary } from './blog/summary/summary';
import { Trending } from './blog/trending/trending';
import { AuthorInfo } from './blog/author-info/author-info';
import { LiveFeed } from './blog/live-feed/live-feed';

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
}, {
    path: 'blog/summary',
    component: Summary
}, {
    path: 'blog/trending/:id',
    component: Trending
}, {
    path: 'blog/author-info',
    component: AuthorInfo
}, {
    path: 'blog/live-feed',
    component:LiveFeed
}];

import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles';
import { Draw } from './draw/draw';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [{
    path: '',
    component: ArticlesComponent
}, {
    path: 'draw',
    component: Draw,
    canActivate: [authGuard]
}];

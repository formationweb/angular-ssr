import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles';
import { Draw } from './draw/draw';

export const routes: Routes = [{
    path: '',
    component: ArticlesComponent
}, {
    path: 'draw',
    component: Draw
}];

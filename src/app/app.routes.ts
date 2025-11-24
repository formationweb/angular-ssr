import { Routes } from '@angular/router';
import { Articles } from './articles/articles';
import { authGuard } from './core/guards/auth';

export const routes: Routes = [{
    path: '',
    component: Articles,
    canActivate: [authGuard]
}];

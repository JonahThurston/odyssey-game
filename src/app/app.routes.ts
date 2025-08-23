import { Routes } from '@angular/router';
import { Home } from './pages/home-page/home';
import { GamePage } from './pages/game-page/game-page';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: Home,
  },
  {
    title: 'Game',
    path: 'game',
    component: GamePage,
  },
];

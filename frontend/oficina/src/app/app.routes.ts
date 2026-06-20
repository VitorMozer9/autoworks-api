import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Agendamento } from './pages/agendamento/agendamento';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: Login
  },
  {
    path: "home",
    component: Home
  },
  {
    path: "agendamento",
    component: Agendamento
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

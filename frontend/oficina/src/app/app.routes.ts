import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Agendamento } from './pages/agendamento/agendamento';
import { Agendamentos } from './pages/agendamentos/agendamentos';
import { Servico } from './pages/servico/servico';
import { Cadastro } from './pages/cadastro/cadastro';

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
    path: "novo-agendamento",
    component: Agendamento
  },
  {
    path: "agendamentos",
    component: Agendamentos
  },
  {
    path: "servico",
    component: Servico
  },
  {
    path: "cadastro",
    component: Cadastro
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

import { Routes } from '@angular/router';
import { roleGuard } from './guards/role-guard';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Agendamento } from './pages/agendamento/agendamento';
import { Agendamentos } from './pages/agendamentos/agendamentos';
import { Servico } from './pages/servico/servico';
import { Cadastro } from './pages/cadastro/cadastro';
import { Pecas } from './pages/pecas/pecas';

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
    component: Home,
    canActivate: [roleGuard]
  },
  {
    path: "novo-agendamento",
    component: Agendamento,
    canActivate: [roleGuard]
  },
  {
    path: "agendamentos",
    component: Agendamentos,
    canActivate: [roleGuard]
  },
  {
    path: "servico",
    component: Servico,
    canActivate: [roleGuard]
  },
  {
    path: "cadastro",
    component: Cadastro,
    canActivate: [roleGuard]
  },
  {
    path: "pecas",
    component: Pecas,
    canActivate: [roleGuard]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

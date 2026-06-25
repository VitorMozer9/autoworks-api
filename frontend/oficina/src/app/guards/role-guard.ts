import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const dadosSalvos = localStorage.getItem('usuarioLogado');

  if (!dadosSalvos) {
    router.navigate(['/login']);
    return false;
  }

  const usuario = JSON.parse(dadosSalvos);
  const cargo = usuario.areaAtuacao;
  const rotaDestino = route.routeConfig?.path;

  if (cargo === 'ADMINISTRADOR') return true;

  if (cargo === 'VENDEDOR') {
    if (rotaDestino === 'home' || rotaDestino === 'pecas') return true;
  }

  if (cargo === 'MECANICO_ESPECIALISTA' || cargo === 'MECANICO_ESPECIFICO') {
    if (rotaDestino === 'home' || rotaDestino === 'servico' || rotaDestino === 'agendamentos' || rotaDestino === 'novo-agendamento') return true;
  }

  alert('Acesso negado. Você não tem permissão para visualizar esta página.');
  router.navigate(['/home']);
  return false;
};

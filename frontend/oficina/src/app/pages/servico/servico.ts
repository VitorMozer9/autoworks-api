import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { BaseUi } from '../../components/base-ui/base-ui';
import { BotaoSecundario } from '../../components/botao-secundario/botao-secundario';
import { BotaoPrimario } from '../../components/botao-primario/botao-primario';
import { ServicoOficina, ServicoService } from '../../services/servico-service';

@Component({
  selector: 'app-servico',
  imports: [CommonModule, BaseUi, NavBar, BotaoSecundario, BotaoPrimario],
  templateUrl: './servico.html',
  styleUrl: './servico.scss',
})

export class Servico implements OnInit {
  servicos: ServicoOficina[] = [];

  constructor(private router: Router, private servicoService: ServicoService) { }

  ngOnInit() {
    this.carregarServicos();
  }

  carregarServicos() {
    this.servicoService.getTodos(undefined, true).subscribe({
      next: (servicos) => this.servicos = servicos,
      error: (erro) => {
        console.error('Erro ao buscar serviços:', erro);
        alert('Erro ao buscar serviços.');
      }
    });
  }

  agendar() {
    this.router.navigate(['/novo-agendamento']);
  }

  formatarMoeda(valor: number): string {
    return 'R$ ' + Number(valor).toFixed(2).replace('.', ',');
  }
}

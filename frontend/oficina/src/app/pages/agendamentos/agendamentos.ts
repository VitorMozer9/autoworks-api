import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgendamentoService, AgendamentoOS } from '../../services/agendamento-service';
import { NavBar } from "../../components/nav-bar/nav-bar";
import { BaseUi } from "../../components/base-ui/base-ui";
import { BotaoSecundario } from "../../components/botao-secundario/botao-secundario";
import { BotaoTerceiro } from "../../components/botao-terceiro/botao-terceiro";

@Component({
  selector: 'app-agendamento',
  imports: [CommonModule, NavBar, BaseUi, BotaoSecundario, BotaoTerceiro, FormsModule],
  templateUrl: './agendamentos.html',
  styleUrls: ['./agendamentos.scss']
})
export class Agendamentos implements OnInit {
  agendamentos: AgendamentoOS[] = [];
  carregando = false;
  // Controle do Modal
  modalAberto = false;
  modoEdicao = false;
  itemSelecionado: Partial<AgendamentoOS> = {};

  constructor(private agendamentoService: AgendamentoService, private router: Router) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  formatarServico(valor: string | undefined): string {
    switch (valor) {
      case 'revisao': return 'Revisão Geral';
      case 'troca-oleo': return 'Troca de Óleo';
      case 'funilaria': return 'Funilaria';
      case 'retifica-cabecote': return 'Retífica de Cabeçote';
      default: return valor || ''; // Retorna o texto original se não achar na lista
    }
  }

  formatarStatus(valor: string | undefined): string {
    switch (valor?.toLowerCase()) {
      case 'pendente': return 'Pendente';
      case 'em-andamento': return 'Em andamento';
      case 'concluido': return 'Concluído';
      default: return valor || ''; // Retorna o original se não achar
    }
  }

  carregarDados() {
    this.carregando = true;
    this.agendamentoService.getTodos().subscribe({
      next: (dadosDaApi) => {
        console.log('Agendamentos retornados pela API:', dadosDaApi);
        this.agendamentos = Array.isArray(dadosDaApi) ? dadosDaApi : [];
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao buscar ordens:', erro);
        this.carregando = false;
        alert('Erro ao buscar agendamentos.');
      }
    });
  }

  abrirDetalhes(item: AgendamentoOS) {
    this.itemSelecionado = { ...item }; // Copia os dados
    this.modoEdicao = false;
    this.modalAberto = true;
  }

  abrirEdicao(item: AgendamentoOS) {
    this.itemSelecionado = { ...item };
    this.modoEdicao = true;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  salvarEdicao() {
    if (this.itemSelecionado.id) {
      if (typeof this.itemSelecionado.valor === 'string') {
        this.itemSelecionado.valor = parseFloat(this.itemSelecionado.valor.replace(',', '.'));
      }

      this.agendamentoService.atualizar(this.itemSelecionado.id, this.itemSelecionado as AgendamentoOS).subscribe({
        next: () => {
          this.carregarDados();
          this.fecharModal();
        },
        error: (erro) => {
          console.error('Erro ao editar:', erro);
          alert('Erro ao editar agendamento.');
        }
      });
    }
  }

  cancelarAgendamento(id: number) {
    if (confirm('Deseja cancelar?')) {


      this.agendamentoService.remover(id).subscribe({
        next: () => {
          this.carregarDados();
        },
        error: (erro) => {
          console.error('Erro ao excluir:', erro);
          alert('Erro ao excluir agendamento.');
        }
      });

    }
  }

  irParaNovoAgendamento() {
    this.router.navigate(['/novo-agendamento']);
  }
}

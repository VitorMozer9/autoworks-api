import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

  // Controle do Modal
  modalAberto = false;
  modoEdicao = false;
  itemSelecionado: Partial<AgendamentoOS> = {};

  constructor(private agendamentoService: AgendamentoService, private router: Router) {}

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

  carregarDados() {
    // ATUAL (Teste local)
    this.agendamentos = this.agendamentoService.getTodos();

    // BACKEND:
    /*
    this.agendamentoService.getTodos().subscribe({
      next: (dadosDaApi) => {
        this.agendamentos = dadosDaApi;
      },
      error: (erro) => {
        console.error('Erro ao buscar ordens:', erro);
      }
    });
    */
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

      // ATUAL (Teste local)
      this.agendamentoService.atualizar(this.itemSelecionado.id, this.itemSelecionado as AgendamentoOS);
      this.carregarDados();
      this.fecharModal();

      // BACKEND:
      /*
      this.agendamentoService.atualizar(this.itemSelecionado.id, this.itemSelecionado as AgendamentoOS).subscribe({
        next: () => {
          this.carregarDados(); // Recarrega a lista do banco
          this.fecharModal();
        },
        error: (erro) => console.error('Erro ao editar:', erro)
      });
      */
    }
  }

  cancelarAgendamento(id: number) {
    if (confirm('Deseja cancelar?')) {
      // ATUAL (Teste local)
      this.agendamentoService.remover(id);
      this.carregarDados();

      // BACKEND:
      /*
      this.agendamentoService.remover(id).subscribe({
        next: () => {
          this.carregarDados();
        },
        error: (erro) => console.error('Erro ao excluir:', erro)
      });
      */
    }
  }

  irParaNovoAgendamento() {
    this.router.navigate(['/novo-agendamento']);
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
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
  salvandoAgendamento = false;
  removendoAgendamento = false;

  // Controle do Modal
  modalAberto = false;
  modoEdicao = false;
  itemSelecionado: Partial<AgendamentoOS> = {};

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

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
    this.changeDetectorRef.detectChanges();

    this.agendamentoService.getTodos().pipe(
      finalize(() => {
        this.carregando = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe({
      next: (dadosDaApi) => {
        this.agendamentos = this.extrairLista(dadosDaApi);
      },
      error: (erro) => {
        console.error('Erro ao buscar ordens:', erro);
        this.agendamentos = [];
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
    if (!this.itemSelecionado.id || this.salvandoAgendamento) {
      return;
    }

    const valor = typeof this.itemSelecionado.valor === 'string'
      ? Number(this.itemSelecionado.valor.replace(/\./g, '').replace(',', '.'))
      : Number(this.itemSelecionado.valor);

    if (Number.isNaN(valor) || valor < 0) {
      alert('Valor deve ser maior ou igual a zero.');
      return;
    }

    this.itemSelecionado.valor = valor;
    this.salvandoAgendamento = true;
    this.changeDetectorRef.detectChanges();

    this.agendamentoService.atualizar(this.itemSelecionado.id, this.itemSelecionado as AgendamentoOS).pipe(
      finalize(() => {
        this.salvandoAgendamento = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.fecharModal();
        alert('Agendamento atualizado com sucesso.');
        this.carregarDados();
      },
      error: (erro) => {
        console.error('Erro ao editar:', erro);
        alert('Erro ao editar agendamento.');
      }
    });
  }

  cancelarAgendamento(id: number) {
    if (!confirm('Deseja cancelar?') || this.removendoAgendamento) {
      return;
    }

    this.removendoAgendamento = true;
    this.changeDetectorRef.detectChanges();

    this.agendamentoService.remover(id).pipe(
      finalize(() => {
        this.removendoAgendamento = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.agendamentos = this.agendamentos.filter((agendamento) => agendamento.id !== id);
        alert('Agendamento removido com sucesso.');
        this.carregarDados();
      },
      error: (erro) => {
        console.error('Erro ao excluir:', erro);
        alert('Erro ao excluir agendamento.');
      }
    });
  }

  irParaNovoAgendamento() {
    this.router.navigate(['/novo-agendamento']);
  }

  private extrairLista(resposta: AgendamentoOS[] | { content?: AgendamentoOS[]; data?: AgendamentoOS[] }): AgendamentoOS[] {
    if (Array.isArray(resposta)) return [...resposta];
    if (Array.isArray(resposta?.content)) return [...resposta.content];
    if (Array.isArray(resposta?.data)) return [...resposta.data];
    return [];
  }
}

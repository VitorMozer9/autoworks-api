import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { BaseUi } from '../../components/base-ui/base-ui';
import { BotaoSecundario } from '../../components/botao-secundario/botao-secundario';
import { BotaoPrimario } from '../../components/botao-primario/botao-primario';
import { ServicoOficina, ServicoService } from '../../services/servico-service';

@Component({
  selector: 'app-servico',
  imports: [CommonModule, FormsModule, BaseUi, NavBar, BotaoSecundario, BotaoPrimario],
  templateUrl: './servico.html',
  styleUrl: './servico.scss',
})

export class Servico implements OnInit {
  servicos: ServicoOficina[] = [];
  modalAberto = false;
  salvandoServico = false;
  carregandoServicos = false;
  servicoForm: Partial<ServicoOficina> = { ativo: true };

  constructor(
    private router: Router,
    private servicoService: ServicoService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.carregarServicos();
  }

  carregarServicos() {
    this.carregandoServicos = true;
    this.changeDetectorRef.detectChanges();

    this.servicoService.getTodos(undefined, true).pipe(
      finalize(() => {
        this.carregandoServicos = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe({
      next: (servicos) => this.servicos = [...this.extrairLista(servicos)],
      error: (erro) => {
        console.error('Erro ao buscar serviços:', erro);
        alert('Erro ao buscar serviços.');
      }
    });
  }

  agendar() {
    this.router.navigate(['/novo-agendamento']);
  }

  abrirModalAdicionar() {
    this.servicoForm = { ativo: true };
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.salvandoServico = false;
    this.servicoForm = { ativo: true };
  }

  salvarServico() {
    const erro = this.validarServico();

    if (erro) {
      alert(erro);
      return;
    }

    if (this.salvandoServico) {
      return;
    }

    this.salvandoServico = true;
    this.changeDetectorRef.detectChanges();

    this.servicoService.adicionar(this.servicoForm as ServicoOficina).pipe(
      finalize(() => {
        this.salvandoServico = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.fecharModal();
        alert('Serviço salvo com sucesso.');
        this.carregarServicos();
      },
      error: (erro) => {
        console.error('Erro ao salvar serviço:', erro);
        alert('Erro ao salvar serviço. Verifique os dados informados.');
      }
    });
  }

  private validarServico(): string | null {
    if (!this.servicoForm.codigo?.trim()) return 'Código é obrigatório.';
    if (!this.servicoForm.nome?.trim()) return 'Nome é obrigatório.';

    const valorBase = Number(this.servicoForm.valorBase);
    if (Number.isNaN(valorBase) || valorBase < 0) return 'Valor base deve ser maior ou igual a zero.';

    this.servicoForm.valorBase = valorBase;
    this.servicoForm.ativo = this.servicoForm.ativo ?? true;

    return null;
  }

  formatarMoeda(valor: number): string {
    return 'R$ ' + Number(valor).toFixed(2).replace('.', ',');
  }

  private extrairLista(resposta: ServicoOficina[] | { content?: ServicoOficina[]; data?: ServicoOficina[] }): ServicoOficina[] {
    if (Array.isArray(resposta)) return resposta;
    if (Array.isArray(resposta?.content)) return resposta.content;
    if (Array.isArray(resposta?.data)) return resposta.data;
    return [];
  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AgendamentoService, AgendamentoOS } from '../../services/agendamento-service';
import { BaseUi } from "../../components/base-ui/base-ui";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { FormsModule } from '@angular/forms';
import { BotaoSecundario } from "../../components/botao-secundario/botao-secundario";

@Component({
  selector: 'app-agendamento',
  imports: [BaseUi, NavBar, FormsModule, BotaoSecundario],
  templateUrl: './agendamento.html',
  styleUrl: './agendamento.scss',
})
export class Agendamento {
  dadosForm: Partial<AgendamentoOS> = {
    servico: "revisao"
  };
  salvandoAgendamento = false;

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  agendar() {
    if (this.salvandoAgendamento) {
      return;
    }

    const erro = this.validarAgendamento();
    if (erro) {
      alert(erro);
      return;
    }

    this.salvandoAgendamento = true;
    this.changeDetectorRef.detectChanges();

    this.agendamentoService.adicionar(this.dadosForm as AgendamentoOS).pipe(
      finalize(() => {
        this.salvandoAgendamento = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe({
      next: (respostaDaApi) => {
        console.log('Salvo no banco com sucesso:', respostaDaApi);
        alert('Agendamento salvo com sucesso.');
        this.router.navigate(['/agendamentos']);
      },
      error: (erro) => {
        console.error('Erro ao salvar no banco:', erro);
        alert('Ocorreu um erro ao salvar o agendamento. Verifique os dados informados.');
      }
    });
  }

  cancelar() {
    this.dadosForm = { servico: 'revisao' };
    this.router.navigate(['/agendamentos']);
  }

  private validarAgendamento(): string | null {
    if (!this.dadosForm.servico?.trim()) return 'Serviço é obrigatório.';
    if (!this.dadosForm.nomeCliente?.trim()) return 'Nome do cliente é obrigatório.';

    const valor = typeof this.dadosForm.valor === 'string'
      ? Number(this.dadosForm.valor.replace(/\./g, '').replace(',', '.'))
      : Number(this.dadosForm.valor);

    if (Number.isNaN(valor) || valor < 0) return 'Valor deve ser maior ou igual a zero.';

    this.dadosForm.valor = valor;

    return null;
  }
}

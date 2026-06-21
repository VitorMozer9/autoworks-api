import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  dadosForm: Partial<AgendamentoOS> = {};
  servicoSelecionado: string = "revisao";

  constructor(private agendamentoService: AgendamentoService, private router: Router) {}

  agendar() {
    if (typeof this.dadosForm.valor === 'string') {
      this.dadosForm.valor = parseFloat(this.dadosForm.valor.replace(',', '.'));
    }

    // ATUAL (Teste local)
    this.agendamentoService.adicionar(this.dadosForm as AgendamentoOS);
    console.log('Agendamento salvo:', this.dadosForm);
    this.router.navigate(['/agendamentos']);

    // BACKEND:
    /*
    this.agendamentoService.adicionar(this.dadosForm as AgendamentoOS).subscribe({
      next: (respostaDaApi) => {
        console.log('Salvo no banco com sucesso:', respostaDaApi);
        this.router.navigate(['/agendamentos']);
      },
      error: (erro) => {
        console.error('Erro ao salvar no banco:', erro);
        alert('Ocorreu um erro ao salvar o agendamento.');
      }
    });
    */
  }

  cancelar() {
    this.dadosForm = {};
  }
}

import { Component } from '@angular/core';
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
  dadosForm: any = {
    servico: '',
    nomeCliente: '',
    telefone: '',
    email: '',
    cpf: '',
    endereco: '',
    placa: '',
    modelo: '',
    nomeMecanico: ''
  };

  // Realiza o agendamento do cliente
  agendar() {
    alert('Agendamento realizado com sucesso! Veja no console do navegador.');
    console.log(this.dadosForm);
  }

  // Limpa os dados do formulário
  limpar() {
    this.dadosForm = {
      servico: '',
      nomeCliente: '',
      telefone: '',
      email: '',
      cpf: '',
      endereco: '',
      placa: '',
      modelo: '',
      nomeMecanico: ''
    };
  }
}

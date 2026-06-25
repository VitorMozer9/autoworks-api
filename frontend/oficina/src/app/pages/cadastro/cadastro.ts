import { Component } from '@angular/core';
import { BaseUi } from '../../components/base-ui/base-ui';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { BotaoSecundario } from '../../components/botao-secundario/botao-secundario';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-cadastro',
  imports: [BaseUi, BotaoSecundario, NavBar, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  dadosForm: any = {
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
    endereco: '',
    senha: '',
    areaAtuacao: ''
  };

  constructor(private authService: AuthService) {}

  cadastrar() {
    if (!this.dadosForm.nome || !this.dadosForm.email || !this.dadosForm.senha) {
      alert('Nome, Email e Senha são obrigatórios para o cadastro.');
      return;
    }

    this.authService.cadastrar({ ...this.dadosForm });
    alert('Funcionário cadastrado com sucesso!');
    this.cancelar();
  }

  cancelar() {
    this.dadosForm = {
      nome: '',
      telefone: '',
      email: '',
      cpf: '',
      endereco: '',
      senha: '',
      areaAtuacao: ''
    };
  }
}

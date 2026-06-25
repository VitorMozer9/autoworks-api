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
    if (!this.dadosForm.email || !this.dadosForm.senha) {
      alert('Email e Senha são obrigatórios para o cadastro.');
      return;
    }

    this.authService.cadastrar(this.dadosForm).subscribe({
      next: () => {
        alert('Funcionário cadastrado com sucesso!');
        this.cancelar();
      },
      error: (erro) => {
        console.error('Erro ao cadastrar funcionário:', erro);
        alert('Erro ao cadastrar funcionário. Verifique os dados informados.');
      }
    });
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

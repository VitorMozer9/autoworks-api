import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BotaoPrimario } from '../../components/botao-primario/botao-primario';
import { BaseUi } from "../../components/base-ui/base-ui";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, BotaoPrimario, BaseUi],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  cadastro = {
    nome: '',
    email: '',
    senha: ''
  };
  login = {
    nome: '',
    email: '',
    senha: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  cadastrarUsuario() {


    this.authService.cadastrar({
      nome: this.cadastro.nome,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      areaAtuacao: '',
      telefone: '',
      cpf: '',
      endereco: ''
    }).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso!');
        this.cadastro = { nome: '', email: '', senha: '' };
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        console.error('Erro ao cadastrar:', erro);
        alert('Erro ao cadastrar usuário. Verifique os dados informados.');
      }
    });

  }

  logarUsuario() {
    this.authService.login({ email: this.login.email, senha: this.login.senha }).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (erro) => {
        console.error('Erro no login:', erro);
        alert('Email ou senha inválidos.');
      }
    });

  }
}

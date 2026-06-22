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
  cadastro: any = {
    nome: '',
    email: '',
    senha: ''
  };
  login: any = {
    nome: '',
    email: '',
    senha: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  cadastrarUsuario() {
    // ATUAL (Teste local)
    this.authService.cadastrar(this.cadastro);
    alert('Cadastro simulado com sucesso!');
    this.cadastro = { email: '', senha: '' };

    // BACKEND:
    /*
    this.authService.cadastrar(this.cadastro).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso! Faça o login.');
        this.cadastro = { email: '', senha: '' }; // Limpa o formulário
      },
      error: (erro) => console.error('Erro ao cadastrar:', erro)
    });
    */
  }

  logarUsuario() {
    // ATUAL (Teste local)
    this.authService.login(this.login);
    this.router.navigate(['/home']);

    // BACKEND:
    /*
    this.authService.login(this.login).subscribe({
      next: (resposta: any) => {
        // Se a API retornar um token (ex: JWT), você pode salvar aqui
        // localStorage.setItem('token', resposta.token);

        this.router.navigate(['/home']); // Redireciona para a Home
      },
      error: (erro) => {
        console.error('Erro no login:', erro);
        alert('Email ou senha inválidos.');
      }
    });
    */
  }
}

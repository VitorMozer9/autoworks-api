import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BotaoPrimario } from '../../components/botao-primario/botao-primario';
import { BaseUi } from "../../components/base-ui/base-ui";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, BotaoPrimario, BaseUi],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  cadastro: any = {
    email: '',
    senha: ''
  };

  login: any = {
    email: '',
    senha: ''
  }

  cadastrarUsuario() {
    console.log('Enviar para a API:', this.cadastro);
    // Chamada para o auth.service aqui
    this.cadastro = {
      email: '',
      senha: ''
    };

  }

  logarUsuario() {
    console.log("Enviar para a API: ", this.login);
    // Chamada para o auth.service aqui
    this.login = {
      email: '',
      senha: ''
    };
  }
}

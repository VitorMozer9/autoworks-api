import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: REMOVER ARRAY QUANDO O BACKEND ESTIVER CONECTADO
  private usuariosMock: any[] = [
    {
      nome: 'Admin',
      email: 'admin@oficina.com',
      senha: 'admin',
      areaAtuacao: 'ADMINISTRADOR'
    }
  ];

  cadastrar(dados: any) {
    this.usuariosMock.push(dados);
    console.log('Simulando envio de cadastro...', dados);
  }

  login(dados: any): boolean {
    const usuarioEncontrado = this.usuariosMock.find(u => u.email === dados.email && u.senha === dados.senha);

    if (usuarioEncontrado) {
      const dadosParaSalvar = {
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        areaAtuacao: usuarioEncontrado.areaAtuacao
      };
      localStorage.setItem('usuarioLogado', JSON.stringify(dadosParaSalvar));
      return true;
    }

    alert('Acesso Negado: Usuário não cadastrado ou senha incorreta.');
    return false;
  }

  getUsuarioAtual() {
    const dados = localStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : { nome: 'Visitante', email: '', areaAtuacao: '' };
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
  }
}

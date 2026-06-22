import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // === QUANDO O BACKEND ESTIVER PRONTO ===
  // private apiUrl = 'http://localhost:8080/api/auth';
  // constructor(private http: HttpClient) {}

  // Simula um banco de dados temporário para o teste local
  private usuariosMock: any[] = [];

  cadastrar(dados: any) {
    // ATUAL (Teste local): Salva no array
    this.usuariosMock.push(dados);
    console.log('Simulando envio de cadastro...', dados);

    // BACKEND:
    // return this.http.post(`${this.apiUrl}/cadastro`, dados);
  }

  login(dados: any) {
    console.log('Simulando validação de login...', dados);

    // Tenta achar o usuário no mock.
    // Se não achar (ex: a página recarregou), pega o nome que foi digitado direto na tela de Login.
    const usuarioEncontrado = this.usuariosMock.find(u => u.email === dados.email);
    const nomeUsuario = usuarioEncontrado ? usuarioEncontrado.nome : (dados.nome || 'Visitante');

    const dadosParaSalvar = {
      nome: nomeUsuario,
      email: dados.email
    };

    // Salva no armazenamento do navegador
    localStorage.setItem('usuarioLogado', JSON.stringify(dadosParaSalvar));

    // BACKEND:
    // return this.http.post(`${this.apiUrl}/login`, dados);
  }

  // ==========================================
  // FUNÇÕES PARA A NAVBAR LER OS DADOS
  // ==========================================
  getUsuarioAtual() {
    const dados = localStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : { nome: 'Visitante', email: '' };
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
  }
}

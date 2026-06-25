import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CadastroRequest extends LoginRequest {
  nome?: string;
  areaAtuacao?: string;
  telefone?: string;
  cpf?: string;
  endereco?: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  cadastrar(dados: CadastroRequest): Observable<LoginResponse> {
    const payload: LoginRequest = {
      email: dados.email,
      senha: dados.senha
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/cadastro`, payload).pipe(
      tap((resposta) => this.salvarSessao(dados.email, resposta.token, dados.nome, dados.areaAtuacao))
    );
  }

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, dados).pipe(
      tap((resposta) => this.salvarSessao(dados.email, resposta.token))
    );
  }

  getUsuarioAtual() {
    const dados = localStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : { nome: 'Visitante', email: '', areaAtuacao: '' };
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('token');
  }

  private salvarSessao(email: string, token: string, nome = email, areaAtuacao = '') {
    localStorage.setItem('usuarioLogado', JSON.stringify({ nome, email, areaAtuacao }));
    localStorage.setItem('token', token);
  }
}

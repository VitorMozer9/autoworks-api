import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthCredentials {
  email: string;
  senha: string;
}

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
  areaAtuacao: string;
  telefone: string;
  cpf: string;
  endereco: string;
}

export interface UsuarioLogado {
  nome: string;
  email: string;
  areaAtuacao: string;
}

export interface LoginResponse {
  token: string;
  usuario?: UsuarioLogado;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  cadastrar(dados: CadastroRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/cadastro`, dados).pipe(
      tap((resposta) => this.salvarSessao(dados.email, resposta.token, resposta.usuario))
    );
  }

  login(dados: AuthCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, dados).pipe(
      tap((resposta) => this.salvarSessao(dados.email, resposta.token, resposta.usuario))
    );
  }

  getUsuarioAtual(): UsuarioLogado {
    const dados = localStorage.getItem('usuarioLogado');

  
return dados
  ? JSON.parse(dados)
  : { nome: 'Visitante', email: '', areaAtuacao: '' };


  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('token');
  }

  private salvarSessao(email: string, token: string, usuario?: UsuarioLogado): void {
    const usuarioParaSalvar = usuario ?? {
      nome: email,
      email,
      areaAtuacao: ''
    };

    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioParaSalvar));
    localStorage.setItem('token', token);

  }
}

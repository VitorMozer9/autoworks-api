import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // === QUANDO O BACKEND ESTIVER PRONTO ===
  // private apiUrl = 'http://localhost:8080/api/auth';
  // constructor(private http: HttpClient) {}

  cadastrar(dados: any) {
    console.log('Simulando envio de cadastro...', dados);
    // BACKEND:
    // return this.http.post(`${this.apiUrl}/cadastro`, dados);
  }

  login(dados: any) {
    console.log('Simulando validação de login...', dados);
    // BACKEND:
    // return this.http.post(`${this.apiUrl}/login`, dados);
  }
}

import { Injectable } from '@angular/core';
// TODO: DESCOMENTAR importações abaixo quando for conectar com o backend
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

/* FORMATOS ESPERADOS PELO BACKEND (JSON):
  Login (POST): { "email": "string", "senha": "string" }
  Retorno Login: { "token": "string", "usuario": { "nome": "string", "email": "string", "areaAtuacao": "string" } }

  Cadastro (POST): { "nome": "string", "email": "string", "senha": "string", "areaAtuacao": "string", "telefone": "string", "cpf": "string", "endereco": "string" }
*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: DESCOMENTAR URL E CONSTRUTOR NA INTEGRAÇÃO
  // private apiUrl = 'http://localhost:8080/api/auth';
  // constructor(private http: HttpClient) {}

  // ==========================================
  // TODO: REMOVER ARRAY QUANDO O BACKEND ESTIVER CONECTADO
  private usuariosMock: any[] = [
    {
      nome: 'admin',
      email: 'admin@oficina.com',
      senha: 'admin',
      areaAtuacao: 'ADMINISTRADOR'
    }
  ];
  // ==========================================

  cadastrar(dados: any) {
    // TODO: REMOVER bloco abaixo (Teste Local)
    this.usuariosMock.push(dados);
    console.log('Simulando envio de cadastro...', dados);

    // TODO: DESCOMENTAR chamada real
    // return this.http.post(`${this.apiUrl}/cadastro`, dados);
  }

  login(dados: any): boolean {
    // TODO: REMOVER todo este bloco abaixo (Teste Local)
    const usuarioEncontrado = this.usuariosMock.find(u => u.email === dados.email && u.senha === dados.senha);

    if (usuarioEncontrado) {
      const dadosParaSalvar = {
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        areaAtuacao: usuarioEncontrado.areaAtuacao
      };

      localStorage.setItem('usuarioLogado', JSON.stringify(dadosParaSalvar));
      return true; // Login autorizado
    }

    alert('Acesso Negado: Usuário não cadastrado ou senha incorreta.');
    return false; // Login bloqueado

    // TODO: DESCOMENTAR E ADAPTAR PARA A CHAMADA REAL
    /*
    return this.http.post(`${this.apiUrl}/login`, dados).subscribe({
      next: (resposta: any) => {
        // O backend deve retornar um objeto contendo o Token e os dados do usuário
        localStorage.setItem('usuarioLogado', JSON.stringify(resposta.usuario));
        localStorage.setItem('token', resposta.token); // Salva o JWT para ser usado nas rotas protegidas
        // ... Lógica de redirecionamento para a Home
      },
      error: () => {
        alert('Acesso Negado: Credenciais inválidas.');
      }
    });
    */
  }

  // ==========================================
  // Métodos utilitários que NÃO precisam ser removidos na integração
  // ==========================================
  getUsuarioAtual() {
    const dados = localStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : { nome: 'Visitante', email: '', areaAtuacao: '' };
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    // TODO: DESCOMENTAR linha abaixo quando o sistema de JWT for implementado
    // localStorage.removeItem('token');
  }
}

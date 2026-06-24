import { Injectable } from '@angular/core';
// TODO: DESCOMENTAR importações abaixo quando for conectar com o backend
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

/* FORMATO DO DADO (JSON) ESPERADO:
  {
    "id": number (opcional na criação),
    "servico": string ("revisao", "troca-oleo", "funilaria", "retifica-cabecote"),
    "nomeCliente": string,
    "telefone": string,
    "email": string,
    "cpf": string,
    "endereco": string,
    "placa": string,
    "modelo": string,
    "nomeMecanico": string,
    "valor": number (decimal),
    "status": string ("pendente", "em-andamento", "concluido")
  }
*/
export interface AgendamentoOS {
  id?: number;
  servico: string;
  nomeCliente: string;
  telefone: string;
  email: string;
  cpf: string;
  endereco: string;
  placa: string;
  modelo: string;
  nomeMecanico: string;
  valor: number | string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  // TODO: DESCOMENTAR URL E CONSTRUTOR NA INTEGRAÇÃO
  // private apiUrl = 'http://localhost:8080/api/agendamentos';
  // constructor(private http: HttpClient) {}

  // ==========================================
  // TODO: REMOVER ESTE ARRAY QUANDO O BACKEND ESTIVER CONECTADO
  private agendamentos: AgendamentoOS[] = [
    {
      id: 1, servico: 'revisao', nomeCliente: 'João Silva', telefone: '(11) 99999-1111',
      email: 'joao@email.com', cpf: '111', endereco: 'Rua X', placa: 'ABC-1234',
      modelo: 'Fiat Argo', nomeMecanico: 'Carlos', valor: 450.00, status: 'pendente'
    }
  ];
  // ==========================================

  getTodos() {
    // TODO: REMOVER linha abaixo (Teste Local)
    return this.agendamentos;

    // TODO: DESCOMENTAR chamada real
    // return this.http.get<AgendamentoOS[]>(this.apiUrl);
  }

  adicionar(agendamento: AgendamentoOS) {
    // TODO: REMOVER bloco abaixo (Teste Local)
    agendamento.id = Date.now();
    agendamento.status = 'pendente';
    this.agendamentos.push(agendamento);

    // TODO: DESCOMENTAR chamada real
    // agendamento.status = 'pendente'; // Garante o status inicial
    // return this.http.post<AgendamentoOS>(this.apiUrl, agendamento);
  }

  atualizar(id: number, dadosAtualizados: AgendamentoOS) {
    // TODO: REMOVER bloco abaixo (Teste Local)
    const index = this.agendamentos.findIndex(a => a.id === id);
    if (index !== -1) this.agendamentos[index] = { ...dadosAtualizados };

    // TODO: DESCOMENTAR chamada real
    // return this.http.put<AgendamentoOS>(`${this.apiUrl}/${id}`, dadosAtualizados);
  }

  remover(id: number) {
    // TODO: REMOVER bloco abaixo (Teste Local)
    this.agendamentos = this.agendamentos.filter(a => a.id !== id);

    // TODO: DESCOMENTAR chamada real
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

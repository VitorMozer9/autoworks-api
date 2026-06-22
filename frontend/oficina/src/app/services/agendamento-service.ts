import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Necessário para o backend
import { Observable } from 'rxjs'; // Necessário para o backend

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
  // === QUANDO O BACKEND ESTIVER PRONTO: ===
  // 1. Descomente a linha abaixo e coloque a rota certa da sua API
  // private apiUrl = 'http://localhost:8080/api/agendamentos';

  // 2. Injete o HttpClient no construtor
  // constructor(private http: HttpClient) {}

  // === DADOS DE TESTE (Remover depois) ===
  private agendamentos: AgendamentoOS[] = [
    {
    id: 1,
    servico: 'revisao',
    nomeCliente: 'João Silva',
    telefone: '(11) 99999-1111',
    email: 'joao.silva@email.com',
    cpf: '111.111.111-11',
    endereco: 'Rua das Flores, 123, Centro',
    placa: 'ABC-1234',
    modelo: 'Fiat Argo 1.0',
    nomeMecanico: 'Carlos',
    valor: 450.00,
    status: 'pendente'
  },
  {
    id: 2,
    servico: 'troca-oleo',
    nomeCliente: 'Maria Souza',
    telefone: '(11) 98888-2222',
    email: 'maria.souza@email.com',
    cpf: '222.222.222-22',
    endereco: 'Av. Principal, 456, Bairro Alto',
    placa: 'XYZ-9876',
    modelo: 'Honda Civic 2.0',
    nomeMecanico: 'Roberto',
    valor: 280.50,
    status: 'em-andamento'
  },
  {
    id: 3,
    servico: 'Alinhamento e Balanceamento', // Exemplo de serviço fora das opções padrão do select
    nomeCliente: 'Pedro Alves',
    telefone: '(11) 97777-3333',
    email: 'pedro.alves@email.com',
    cpf: '333.333.333-33',
    endereco: 'Praça Central, 78',
    placa: 'DEF-5678',
    modelo: 'Toyota Corolla',
    nomeMecanico: 'Felipe',
    valor: 180.00,
    status: 'pendente'
  }];

  // ==========================================
  // BUSCAR TODOS (GET)
  // ==========================================
  getTodos() {
    return this.agendamentos;

    // BACKEND:
    // return this.http.get<AgendamentoOS[]>(this.apiUrl);
  }

  // ==========================================
  // CRIAR NOVO (POST)
  // ==========================================
  adicionar(agendamento: AgendamentoOS) {
    agendamento.id = Date.now();
    agendamento.status = 'pendente';
    this.agendamentos.push(agendamento);

    // BACKEND:
    // agendamento.status = 'Pendente'; // Pode definir aqui ou no backend
    // return this.http.post<AgendamentoOS>(this.apiUrl, agendamento);
  }

  // ==========================================
  // ATUALIZAR (PUT)
  // ==========================================
  atualizar(id: number, dadosAtualizados: AgendamentoOS) {
    const index = this.agendamentos.findIndex(a => a.id === id);
    if (index !== -1) this.agendamentos[index] = { ...dadosAtualizados };

    // BACKEND:
    // return this.http.put<AgendamentoOS>(`${this.apiUrl}/${id}`, dadosAtualizados);
  }

  // ==========================================
  // DELETAR (DELETE)
  // ==========================================
  remover(id: number) {
    this.agendamentos = this.agendamentos.filter(a => a.id !== id);

    // BACKEND:
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

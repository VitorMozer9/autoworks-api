import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = `${environment.apiUrl}/agendamentos`;

  constructor(private http: HttpClient) { }

  getTodos(): Observable<AgendamentoOS[]> {
    return this.http.get<AgendamentoOS[]>(this.apiUrl);
  }

  adicionar(agendamento: AgendamentoOS): Observable<AgendamentoOS> {
    return this.http.post<AgendamentoOS>(
      this.apiUrl,
      this.normalizarAgendamentoParaApi(agendamento)
    );
  }

  atualizar(id: number, dadosAtualizados: AgendamentoOS): Observable<AgendamentoOS> {
    return this.http.put<AgendamentoOS>(
      `${this.apiUrl}/${id}`,
      this.normalizarAgendamentoParaApi(dadosAtualizados)
    );
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private normalizarAgendamentoParaApi(agendamento: AgendamentoOS): AgendamentoOS {
    const { status, id, ...dados } = agendamento;

    return {
      ...dados,
      valor: Number(dados.valor)
    };

  }
}

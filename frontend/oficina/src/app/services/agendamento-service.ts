import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

type ListResponse<T> = T[] | { content?: T[]; data?: T[] };

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = `${environment.apiUrl}/agendamentos`;

  constructor(private http: HttpClient) { }

  getTodos(): Observable<AgendamentoOS[]> {
    return this.http.get<ListResponse<AgendamentoOS>>(this.apiUrl).pipe(
      map((resposta) => this.extrairLista(resposta))
    );
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

  private normalizarAgendamentoParaApi(agendamento: AgendamentoOS): Omit<AgendamentoOS, 'id' | 'status'> {
    const { status, id, ...dados } = agendamento;

    return {
      ...dados,
      valor: Number(dados.valor)
    };
  }

  private extrairLista(resposta: ListResponse<AgendamentoOS>): AgendamentoOS[] {
    if (Array.isArray(resposta)) return resposta;
    if (Array.isArray(resposta?.content)) return resposta.content;
    if (Array.isArray(resposta?.data)) return resposta.data;
    return [];
  }
}

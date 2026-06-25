import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ServicoOficina {
  id?: number;
  codigo: string;
  nome: string;
  descricao?: string;
  valorBase: number;
  ativo?: boolean;
}

type ListResponse<T> = T[] | { content?: T[]; data?: T[] };

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private apiUrl = `${environment.apiUrl}/servicos`;

  constructor(private http: HttpClient) {}

  getTodos(nome?: string, ativo?: boolean): Observable<ServicoOficina[]> {
    let params = new HttpParams();

    if (nome) params = params.set('nome', nome);
    if (ativo !== undefined) params = params.set('ativo', ativo);

    return this.http.get<ListResponse<ServicoOficina>>(this.apiUrl, { params }).pipe(
      map((resposta) => this.extrairLista(resposta))
    );
  }

  adicionar(servico: ServicoOficina): Observable<ServicoOficina> {
    return this.http.post<ServicoOficina>(this.apiUrl, {
      ...servico,
      valorBase: Number(servico.valorBase),
      ativo: servico.ativo ?? true
    });
  }

  private extrairLista(resposta: ListResponse<ServicoOficina>): ServicoOficina[] {
    if (Array.isArray(resposta)) return resposta;
    if (Array.isArray(resposta?.content)) return resposta.content;
    if (Array.isArray(resposta?.data)) return resposta.data;
    return [];
  }
}

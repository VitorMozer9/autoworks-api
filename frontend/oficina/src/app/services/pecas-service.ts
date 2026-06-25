import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Peca {
  id?: number;
  nome: string;
  codigo: string;
  quantidade: number;
  marca: string;
  dataAquisicao: string;
  valor: number;
  categoria: string;
}

export interface PecaFiltros {
  nome?: string;
  codigo?: string;
  categoria?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PecasService {
  private apiUrl = `${environment.apiUrl}/pecas`;

  constructor(private http: HttpClient) {}

  getTodos(filtros: PecaFiltros = {}): Observable<Peca[]> {
    let params = new HttpParams();

    if (filtros.nome) params = params.set('nome', filtros.nome);
    if (filtros.codigo) params = params.set('codigo', filtros.codigo);
    if (filtros.categoria) params = params.set('categoria', filtros.categoria);

    return this.http.get<Peca[]>(this.apiUrl, { params });
  }

  adicionar(peca: Peca): Observable<Peca> {
    return this.http.post<Peca>(this.apiUrl, this.normalizarPecaParaApi(peca));
  }

  atualizar(id: number, dadosAtualizados: Peca): Observable<Peca> {
    return this.http.put<Peca>(`${this.apiUrl}/${id}`, this.normalizarPecaParaApi(dadosAtualizados));
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private normalizarPecaParaApi(peca: Peca): Peca {
    return {
      ...peca,
      dataAquisicao: this.converterDataParaApi(peca.dataAquisicao),
      valor: Number(peca.valor),
      quantidade: Number(peca.quantidade)
    };
  }

  private converterDataParaApi(data: string): string {
    if (!data || /^\d{4}-\d{2}-\d{2}$/.test(data)) return data;

    const [dia, mes, ano] = data.split('/');
    if (!dia || !mes || !ano) return data;

    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }
}

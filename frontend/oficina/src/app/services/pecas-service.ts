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

  constructor(private http: HttpClient) { }

  getTodos(filtros: PecaFiltros = {}): Observable<Peca[]> {
    let params = new HttpParams();


    if (filtros.nome) {
      params = params.set('nome', filtros.nome);
    }

    if (filtros.codigo) {
      params = params.set('codigo', filtros.codigo);
    }

    if (filtros.categoria) {
      params = params.set('categoria', filtros.categoria);
    }

    return this.http.get<Peca[]>(this.apiUrl, { params });


  }

  adicionar(peca: Peca): Observable<Peca> {
    return this.http.post<Peca>(
      this.apiUrl,
      this.normalizarPecaParaApi(peca)
    );
  }

  atualizar(id: number, dadosAtualizados: Peca): Observable<Peca> {
    return this.http.put<Peca>(
      `${this.apiUrl}/${id}`,
      this.normalizarPecaParaApi(dadosAtualizados)
    );
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private normalizarPecaParaApi(peca: Peca): Omit<Peca, 'id'> {
    const { id, ...dados } = peca;


    return {
      ...dados,
      dataAquisicao: this.converterDataParaApi(dados.dataAquisicao),
      valor: Number(dados.valor),
      quantidade: Number(dados.quantidade)
    };


  }

  private converterDataParaApi(data: string): string {
    if (!data) {
      return data;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      return data;
    }

    const match = data.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!match) {
      throw new Error('Data de aquisição inválida. Use o formato DD/MM/AAAA.');
    }

    const [, dia, mes, ano] = match;

    return `${ano}-${mes}-${dia}`;
  }
}

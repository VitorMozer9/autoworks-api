import { Injectable } from '@angular/core';
// TODO: DESCOMENTAR importações abaixo quando for conectar com o backend
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

/* FORMATO DO DADO (JSON) ESPERADO PELO FRONT-END:
  {
    "id": number (opcional na criação),
    "nome": string,
    "codigo": string,
    "quantidade": number,
    "marca": string,
    "dataAquisicao": string (formato "DD/MM/AAAA"),
    "valor": number (decimal, ex: 35.50),
    "categoria": string ("MOTOR", "ELETRICA", "SUSPENSAO", "FUNILARIA", "OLEO", "OUTROS")
  }
*/
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

@Injectable({
  providedIn: 'root'
})
export class PecasService {
  // TODO: DESCOMENTAR URL E CONSTRUTOR NA INTEGRAÇÃO
  // private apiUrl = 'http://localhost:8080/api/pecas'; // Rota de exemplo
  // constructor(private http: HttpClient) {}

  // ==========================================
  // TODO: REMOVER ESTE ARRAY QUANDO O BACKEND ESTIVER CONECTADO
  private pecas: Peca[] = [
    { id: 1, nome: 'Filtro de Óleo', codigo: 'FLT-001', quantidade: 15, marca: 'Tecfil', dataAquisicao: '10/06/2026', valor: 35.50, categoria: 'OLEO' },
    { id: 2, nome: 'Pastilha de Freio', codigo: 'FRE-022', quantidade: 8, marca: 'Cobreq', dataAquisicao: '15/06/2026', valor: 120.00, categoria: 'SUSPENSAO' }
  ];
  // ==========================================

  getTodos() {
    // TODO: REMOVER linha abaixo (Teste Local)
    return this.pecas;

    // TODO: DESCOMENTAR chamada real (Retorna um Observable com array de Peca)
    // return this.http.get<Peca[]>(this.apiUrl);
  }

  adicionar(peca: Peca) {
    // TODO: REMOVER bloco abaixo (Teste Local)
    peca.id = Date.now();
    this.pecas.push(peca);

    // TODO: DESCOMENTAR chamada real (Envia JSON da Peca sem ID, retorna a Peca criada com ID)
    // return this.http.post<Peca>(this.apiUrl, peca);
  }

  atualizar(id: number, dadosAtualizados: Peca) {
    // TODO: REMOVER bloco abaixo (Teste Local)
    const index = this.pecas.findIndex(p => p.id === id);
    if (index !== -1) this.pecas[index] = { ...dadosAtualizados };

    // TODO: DESCOMENTAR chamada real (Envia ID na URL e JSON atualizado no corpo)
    // return this.http.put<Peca>(`${this.apiUrl}/${id}`, dadosAtualizados);
  }

  remover(id: number) {
    // TODO: REMOVER bloco abaixo (Teste Local)
    this.pecas = this.pecas.filter(p => p.id !== id);

    // TODO: DESCOMENTAR chamada real
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

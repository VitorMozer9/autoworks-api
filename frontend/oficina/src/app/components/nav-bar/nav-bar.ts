import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  // Lista de opções da navbar
  itens = ['SERVIÇOS', 'AGENDAMENTOS', 'PEÇAS', 'CADASTROS'];

  // Define qual item começa selecionado por padrão
  itemSelecionado: string = 'AGENDAMENTOS';

  selecionar(item: string) {
    this.itemSelecionado = item;
  }
}

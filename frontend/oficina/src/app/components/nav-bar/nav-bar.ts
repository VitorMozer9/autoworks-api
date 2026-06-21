import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements OnInit {
  itens = ['HOME', 'SERVIÇOS', 'AGENDAMENTOS', 'PEÇAS', 'CADASTROS'];
  itemSelecionado: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const url = this.router.url;

    if (url.includes('home') || url === '/') {
      this.itemSelecionado = 'HOME';
    } else if (url.includes('agendamento')) {
      this.itemSelecionado = 'AGENDAMENTOS';
    } else if (url.includes('servico')) {
      this.itemSelecionado = 'SERVIÇOS';
    }
  }

  selecionar(item: string) {
    switch (item) {
      case 'HOME':
        this.router.navigate(['/home']);
        break;
      case 'AGENDAMENTOS':
        this.router.navigate(['/agendamentos']);
        break;
      case 'SERVIÇOS':
        this.router.navigate(['/servico']);
        break;
    }
  }
}

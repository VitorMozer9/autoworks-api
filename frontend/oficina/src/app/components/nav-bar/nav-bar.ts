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
  itemSelecionado: string = ''; // Inicia vazio para ser preenchido dinamicamente

  constructor(private router: Router) {}

  // Executa assim que o componente é criado na tela
  ngOnInit() {
    const urlCorrente = this.router.url;

    if (urlCorrente.includes('home')) {
      this.itemSelecionado = 'HOME';
    } else if (urlCorrente.includes('agendamento')) {
      this.itemSelecionado = 'AGENDAMENTOS';
    } else if (urlCorrente.includes('servico')) {
      this.itemSelecionado = 'SERVIÇOS';
    }
  }

  selecionar(item: string) {
    this.itemSelecionado = item;

    switch (item) {
      case 'HOME':
        this.router.navigate(['/home']);
        break;
      case 'AGENDAMENTOS':
        this.router.navigate(['/agendamentos']);
        break;
      case 'SERVIÇOS':
        this.router.navigate(['/servico']);
        break
    }
  }
}

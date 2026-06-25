import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service'; // Importe o serviço

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements OnInit {
  itens: string[] = []; // Inicia vazio
  itemSelecionado: string = '';
  menuAberto: boolean = false;
  usuario: any = { nome: '', email: '', areaAtuacao: '' };
  iniciais: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const url = this.router.url;

    if (url.includes('home') || url === '/') this.itemSelecionado = 'HOME';
    else if (url.includes('agendamento')) this.itemSelecionado = 'AGENDAMENTOS';
    else if (url.includes('servico')) this.itemSelecionado = 'SERVIÇOS';
    else if (url.includes('cadastro')) this.itemSelecionado = 'CADASTROS';
    else if (url.includes('pecas')) this.itemSelecionado = 'PEÇAS';

    this.usuario = this.authService.getUsuarioAtual();
    this.iniciais = this.gerarIniciais(this.usuario.nome);

    // Chama a função que constrói o menu
    this.definirMenu(this.usuario.areaAtuacao);
  }

  definirMenu(cargo: string) {
    if (cargo === 'ADMINISTRADOR') {
      this.itens = ['HOME', 'SERVIÇOS', 'AGENDAMENTOS', 'PEÇAS', 'CADASTROS'];
    } else if (cargo === 'VENDEDOR') {
      this.itens = ['HOME', 'PEÇAS'];
    } else if (cargo === 'MECANICO_ESPECIALISTA' || cargo === 'MECANICO_ESPECIFICO') {
      this.itens = ['HOME', 'SERVIÇOS', 'AGENDAMENTOS'];
    } else {
      this.itens = ['HOME']; // Fallback de segurança
    }
  }

  gerarIniciais(nome: string): string {
    if (!nome || nome === 'Visitante') return 'V';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  }

  selecionar(item: string) {
    switch (item) {
      case 'HOME': this.router.navigate(['/home']); break;
      case 'AGENDAMENTOS': this.router.navigate(['/agendamentos']); break;
      case 'SERVIÇOS': this.router.navigate(['/servico']); break;
      case 'CADASTROS': this.router.navigate(['/cadastro']); break;
      case 'PEÇAS': this.router.navigate(['/pecas']); break;
    }
  }

  togglePerfil() {
    this.menuAberto = !this.menuAberto;
  }

  sair() {
    this.authService.logout(); // Limpa os dados
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseUi } from '../../components/base-ui/base-ui';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { PecasService, Peca } from '../../services/pecas-service';

@Component({
  selector: 'app-pecas',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseUi, NavBar],
  templateUrl: './pecas.html',
  styleUrls: ['./pecas.scss']
})
export class Pecas implements OnInit {
  pecasTotais: Peca[] = [];
  pecasFiltradas: Peca[] = [];

  filtroNome: string = '';
  filtroCodigo: string = '';
  categoriaAtiva: string = '';

  pecaSelecionadaId: number | null = null;

  // Controle do Modal
  modalAberto = false;
  modoEdicao = false;
  pecaForm: Partial<Peca> = {};

  constructor(private pecasService: PecasService) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.pecasService.getTodos({
      nome: this.filtroNome,
      codigo: this.filtroCodigo,
      categoria: this.categoriaAtiva
    }).subscribe({
      next: (pecas) => {
        this.pecasTotais = pecas;
        this.pecasFiltradas = pecas;
      },
      error: (erro) => {
        console.error('Erro ao buscar peças:', erro);
        alert('Erro ao buscar peças.');
      }
    });
  }

  selecionarCategoria(categoria: string) {
    this.categoriaAtiva = this.categoriaAtiva === categoria ? '' : categoria;
    this.carregarDados();
  }

  aplicarFiltros() {
    this.pecasFiltradas = this.pecasTotais.filter(peca => {
      const bateNome = peca.nome.toLowerCase().includes(this.filtroNome.toLowerCase());
      const bateCodigo = peca.codigo.toLowerCase().includes(this.filtroCodigo.toLowerCase());
      const bateCategoria = this.categoriaAtiva === '' || peca.categoria === this.categoriaAtiva;

      return bateNome && bateCodigo && bateCategoria;
    });
  }

  buscar() {
    this.carregarDados();
  }

  selecionarLinha(id: number | undefined) {
    if (!id) return;
    this.pecaSelecionadaId = this.pecaSelecionadaId === id ? null : id;
  }

  adicionarProduto() {
    this.modoEdicao = false;
    this.pecaForm = { categoria: 'MOTOR' }; // Valor padrão do select
    this.modalAberto = true;
  }

  editar() {
    if (!this.pecaSelecionadaId) {
      alert('Selecione uma peça na tabela para editar.');
      return;
    }

    const pecaSelecionada = this.pecasTotais.find(p => p.id === this.pecaSelecionadaId);
    if (pecaSelecionada) {
      this.pecaForm = { ...pecaSelecionada };

      // Transforma o número que vem do banco (ex: 35.5) em texto com vírgula (ex: "35,50") para o modal
      if (this.pecaForm.valor) {
        this.pecaForm.valor = Number(this.pecaForm.valor).toFixed(2).replace('.', ',') as any;
      }

      this.modoEdicao = true;
      this.modalAberto = true;
    }
  }

  fecharModal() {
    this.modalAberto = false;
    this.pecaForm = {};
  }

  salvarPeca() {
    // Garante que a quantidade nunca fique negativa caso passe pela interface
    if (Number(this.pecaForm.quantidade) < 0) {
      this.pecaForm.quantidade = 0;
    }

    // Pega o valor digitado com vírgula e converte de volta para o formato numérico americano
    if (typeof this.pecaForm.valor === 'string') {
      // Tira os pontos de milhar e troca a vírgula decimal por ponto
      let valorLimpo = (this.pecaForm.valor as string).replace(/\./g, '').replace(',', '.');
      this.pecaForm.valor = parseFloat(valorLimpo);
    }

    if (typeof this.pecaForm.quantidade === 'string') {
      this.pecaForm.quantidade = parseInt(this.pecaForm.quantidade, 10);
    }

    const requisicao = this.modoEdicao && this.pecaForm.id
      ? this.pecasService.atualizar(this.pecaForm.id, this.pecaForm as Peca)
      : this.pecasService.adicionar(this.pecaForm as Peca);

    requisicao.subscribe({
      next: () => {
        this.fecharModal();
        this.pecaSelecionadaId = null;
        this.carregarDados();
      },
      error: (erro) => {
        console.error('Erro ao salvar peça:', erro);
        alert('Erro ao salvar peça. Verifique os dados informados.');
      }
    });
  }

  remover() {
    if (!this.pecaSelecionadaId) {
      alert('Selecione uma peça na tabela para remover.');
      return;
    }
    if (confirm('Tem certeza que deseja remover esta peça?')) {
      this.pecasService.remover(this.pecaSelecionadaId).subscribe({
        next: () => {
          this.pecaSelecionadaId = null;
          this.carregarDados();
        },
        error: (erro) => {
          console.error('Erro ao remover peça:', erro);
          alert('Erro ao remover peça.');
        }
      });
    }
  }

  // Formata a data automaticamente (DD/MM/AAAA) enquanto o usuário digita
  formatarData(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (valor.length > 8) {
      valor = valor.substring(0, 8); // Limita a 8 dígitos reais
    }

    if (valor.length > 4) {
      valor = valor.replace(/^(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{1,2})/, '$1/$2');
    }

    this.pecaForm.dataAquisicao = valor;
    event.target.value = valor; // Força a atualização no input imediatamente
  }

  // Converte o valor para texto com vírgula para a tabela
  formatarMoeda(valor: number | undefined): string {
    if (valor === undefined || valor === null) return 'R$ 0,00';
    return 'R$ ' + Number(valor).toFixed(2).replace('.', ',');
  }

  // Pega a data do popup do calendário e joga no input de texto
  atualizarDataPeloCalendario(event: any) {
    const data = event.target.value; // O calendário nativo sempre devolve YYYY-MM-DD
    if (data) {
      const [ano, mes, dia] = data.split('-');
      this.pecaForm.dataAquisicao = `${dia}/${mes}/${ano}`;
    }
  }

  // Impede que o usuário digite o sinal de menos ou o "e" (de exponencial)
  evitarNegativo(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e' || event.key === 'E' || event.key === '+') {
      event.preventDefault();
    }
  }
}

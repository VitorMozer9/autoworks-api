import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
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
  salvandoPeca = false;
  carregandoPecas = false;
  removendoPeca = false;

  constructor(private pecasService: PecasService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.carregandoPecas = true;
    this.changeDetectorRef.detectChanges();

    this.pecasService.getTodos({
      nome: this.filtroNome,
      codigo: this.filtroCodigo,
      categoria: this.categoriaAtiva
    }).pipe(
      finalize(() => {
        this.carregandoPecas = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe({
      next: (pecas) => {
        const lista = this.extrairLista(pecas);
        this.pecasTotais = [...lista];
        this.pecasFiltradas = [...lista];
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
    this.salvandoPeca = false;
    this.pecaForm = {};
  }

  salvarPeca() {
    if (this.salvandoPeca) {
      return;
    }

    const erro = this.validarPeca();
    if (erro) {
      alert(erro);
      return;
    }

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

    this.salvandoPeca = true;
    this.changeDetectorRef.detectChanges();

    let requisicao;
    try {
      requisicao = this.modoEdicao && this.pecaForm.id
        ? this.pecasService.atualizar(this.pecaForm.id, this.pecaForm as Peca)
        : this.pecasService.adicionar(this.pecaForm as Peca);
    } catch (erro) {
      console.error('Erro ao preparar peça para salvar:', erro);
      alert(erro instanceof Error ? erro.message : 'Erro ao preparar peça para salvar.');
      this.salvandoPeca = false;
      this.changeDetectorRef.detectChanges();
      return;
    }

    requisicao.pipe(
      finalize(() => {
        this.salvandoPeca = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.fecharModal();
        this.pecaSelecionadaId = null;
        alert('Peça salva com sucesso.');
        this.carregarDados();
      },
      error: (erro) => {
        console.error('Erro ao salvar peça:', erro);
        alert('Erro ao salvar peça. Verifique os dados informados.');
      }
    });
  }

  private validarPeca(): string | null {
    if (!this.pecaForm.nome?.trim()) return 'Nome da peça é obrigatório.';
    if (!this.pecaForm.codigo?.trim()) return 'Código é obrigatório.';
    if (!this.pecaForm.categoria) return 'Categoria é obrigatória.';

    if (this.pecaForm.dataAquisicao && !/^\d{2}\/\d{2}\/\d{4}$/.test(this.pecaForm.dataAquisicao) && !/^\d{4}-\d{2}-\d{2}$/.test(this.pecaForm.dataAquisicao)) {
      return 'Data de aquisição inválida. Use DD/MM/AAAA.';
    }

    const quantidade = Number(this.pecaForm.quantidade);
    if (Number.isNaN(quantidade) || quantidade < 0) return 'Quantidade deve ser maior ou igual a zero.';

    const valor = typeof this.pecaForm.valor === 'string'
      ? Number((this.pecaForm.valor as string).replace(/\./g, '').replace(',', '.'))
      : Number(this.pecaForm.valor);

    if (Number.isNaN(valor) || valor < 0) return 'Valor unitário deve ser maior ou igual a zero.';

    this.pecaForm.quantidade = quantidade;
    this.pecaForm.valor = valor;

    return null;
  }

  remover() {
    if (!this.pecaSelecionadaId) {
      alert('Selecione uma peça na tabela para remover.');
      return;
    }
    if (!confirm('Tem certeza que deseja remover esta peça?') || this.removendoPeca) {
      return;
    }

    const idRemovido = this.pecaSelecionadaId;
    this.removendoPeca = true;
    this.changeDetectorRef.detectChanges();

    this.pecasService.remover(idRemovido).pipe(
      finalize(() => {
        this.removendoPeca = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.pecaSelecionadaId = null;
        this.pecasTotais = this.pecasTotais.filter((peca) => peca.id !== idRemovido);
        this.pecasFiltradas = this.pecasFiltradas.filter((peca) => peca.id !== idRemovido);
        alert('Peça removida com sucesso.');
        this.carregarDados();
      },
      error: (erro) => {
        console.error('Erro ao remover peça:', erro);
        alert('Erro ao remover peça.');
      }
    });
  }

  private extrairLista(resposta: Peca[] | { content?: Peca[]; data?: Peca[] }): Peca[] {
    if (Array.isArray(resposta)) return resposta;
    if (Array.isArray(resposta?.content)) return resposta.content;
    if (Array.isArray(resposta?.data)) return resposta.data;
    return [];
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

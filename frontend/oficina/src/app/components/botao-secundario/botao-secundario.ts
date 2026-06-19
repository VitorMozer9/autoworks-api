import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-secundario',
  imports: [],
  templateUrl: './botao-secundario.html',
  styleUrl: './botao-secundario.scss',
})
export class BotaoSecundario {
  @Input() textoBotao: string = '';
}

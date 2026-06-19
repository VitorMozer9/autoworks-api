import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-primario',
  imports: [],
  templateUrl: './botao-primario.html',
  styleUrl: './botao-primario.scss',
})
export class BotaoPrimario {
  @Input() textoBotao: string = '';

}

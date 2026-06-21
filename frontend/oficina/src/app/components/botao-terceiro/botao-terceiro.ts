import { Component, Input } from '@angular/core';
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-botao-terceiro',
  imports: [NgStyle],
  templateUrl: './botao-terceiro.html',
  styleUrl: './botao-terceiro.scss',
})
export class BotaoTerceiro {
  @Input() textoBotao: string = '';
  @Input() corBotao: string = '#1C1C1C';
}

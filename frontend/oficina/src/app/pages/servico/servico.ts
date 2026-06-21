import { Component } from '@angular/core';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { BaseUi } from '../../components/base-ui/base-ui';
import { BotaoSecundario } from '../../components/botao-secundario/botao-secundario';
import { BotaoPrimario } from '../../components/botao-primario/botao-primario';

@Component({
  selector: 'app-servico',
  imports: [BaseUi, NavBar, BotaoSecundario, BotaoPrimario],
  templateUrl: './servico.html',
  styleUrl: './servico.scss',
})
export class Servico {

}

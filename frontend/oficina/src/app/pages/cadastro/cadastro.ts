import { Component } from '@angular/core';
import { BaseUi } from '../../components/base-ui/base-ui';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { BotaoPrimario } from '../../components/botao-primario/botao-primario';
import { BotaoSecundario } from '../../components/botao-secundario/botao-secundario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [BaseUi, BotaoPrimario, BotaoSecundario, NavBar, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})

export class Cadastro {}

import { Component } from '@angular/core';
import { BaseUi } from '../../components/base-ui/base-ui';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { BotaoSecundario } from '../../components/botao-secundario/botao-secundario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [BaseUi, BotaoSecundario, NavBar, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})

export class Cadastro {}

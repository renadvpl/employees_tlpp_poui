import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PoMenuItem, PoMenuModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, PoToolbarModule, PoMenuModule,
    PoPageModule, RouterOutlet, PoMenuModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home'      , action: this.onClick.bind(this)    , link: '/' },
    { label: 'Visualizar', action: this.onClick.bind(this)    , link: '/' },
    { label: 'Incluir'   , action: this.addEmployee.bind(this), link: ':action/:mat' }
  ];

  private onClick() {
    alert('Cliquei no item do menu');
  }

  addEmployee() {
    alert('Cliquei no item do menu Incluir');
  }
}

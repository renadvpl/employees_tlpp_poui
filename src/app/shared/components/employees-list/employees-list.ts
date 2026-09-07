import { Component } from '@angular/core';
import { PoPageAction, PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-employees-list',
  imports: [PoPageModule],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.css',
})
export class EmployeesList {
  readonly pageActions: PoPageAction[] = [
    { label: 'Incluir' , action: this.addEmployee.bind(this) }
  ];

  addEmployee() {
    alert('Cliquei no item do menu Incluir');
  }

}

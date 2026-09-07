import { Component } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicSearchModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-employees-list',
  imports: [PoPageDynamicSearchModule],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.css',
})
export class EmployeesList {
  readonly pageActions: PoPageAction[] = [
    { label: 'Incluir' , action: this.addEmployee.bind(this) , icon: 'an an-plus-square'}
  ];

  readonly advancedSearchFields: PoPageDynamicSearchFilters[] = [
    {
      property: 'ra_mat_ge',
      label: 'Matricula De',
      divider: 'Matricula',
      gridColumns: 6
    },
    {
      property: 'ra_mat_le',
      label: 'Matricula Até',
      gridColumns: 6
    },
    {
      property: 'ra_cpf_ge',
      label: 'CPF De',
      divider: 'CPF',
      gridColumns: 6
    },
    {
      property: 'ra_cpf_le',
      label: 'CPF Até',
      gridColumns: 6
    }
  ];


  addEmployee() {
    alert('Cliquei no item do menu Incluir');
  }

  onQuickSearch(value: any) {
    console.log('onQuickSearch', value);
  }

  onAdvancedSearch(value: any) {
    console.log('onAdvancedSearch', value);
  }

  onChangeDisclaimers(value: any) {
    console.log('onChangeDisclaimers', value);
  }
}

import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { AdvancedSearchFields, SearchDisclaimers } from '../../interfaces/search';
import { EmployeeServ } from '../../services/employee-serv';

@Component({
  selector: 'app-employees-list',
  imports: [PoPageDynamicSearchModule, PoTableModule],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.css',
})
export class EmployeesList implements OnInit {

  tableColumns: PoTableColumn[] = [];
  tableItems: any[] = [];

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
      property: 'ra_cic_ge',
      label: 'CPF De',
      divider: 'CPF',
      gridColumns: 6
    },
    {
      property: 'ra_cic_le',
      label: 'CPF Até',
      gridColumns: 6
    }
  ];

  filters: string = '';

  constructor(
    private employeeService: EmployeeServ
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeFields().subscribe({
      next: (response) => {
        response.SRA.fields.forEach( field => {
          if (field.browse) {
            this.tableColumns.push({
              property: field.field.toLocaleLowerCase(),
              label: field.title
            })
          }
      })},
      error: (error) => {console.log(error)}
    });
    this.employeeService.getEmployeeData().subscribe({
      next: (resp) => {
        console.log(resp);
        this.tableItems = resp.items;
      },
      error: (e) => {console.log(e)}
    })
  }

  addEmployee(): void{
    alert('Cliquei no item do menu Incluir');
  }

  onQuickSearch(value: any) {
    if (value) {
      this.filters = `ra_mat eq '${value}'`;
    } else {
      this.filters = '';
    }
  }

  onAdvancedSearch(srchValues: AdvancedSearchFields) {
    const keys = Object.keys(srchValues);
    const values = Object.values(srchValues);
    const filters: any[] = [];
    for (let index = 0; index < keys.length; index++) {
      filters.push({
        property: keys[index],
        value: values[index],
        label: keys[index]
      });
    }
    this.setFilters(filters);
  }

  onChangeDisclaimers(values: SearchDisclaimers[]): void {
    this.setFilters(values);
  }

  setFilters(values: SearchDisclaimers[]): void {
    this.filters = '';
    if (values.length > 0) {
      values.forEach((value) => {
        switch (value.property) {
          case 'ra_mat_ge':
            this.filters += `ra_mat ge '${value.value}' and `;
            break;
          case 'ra_mat_le':
            this.filters += `ra_mat le '${value.value}' and `;
            break;
          case 'ra_cic_ge':
            this.filters += `ra_cic ge '${value.value}' and `;
            break;
          case 'ra_cic_le':
            this.filters += `ra_cic le '${value.value}' and `;
            break;
          default:
            break;
        }
      });
    };
      
    if(this.filters) {
      this.filters = this.filters.slice(0, -5);
    }

    console.log('Filters: ', this.filters);
  }
}

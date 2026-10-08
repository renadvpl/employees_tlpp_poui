import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoTableColumn, PoTableColumnLabel, PoTableColumnSort, PoTableModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { AdvancedSearchFields, SearchDisclaimers } from '../../interfaces/search';
import { EmployeeServ } from '../../services/employee-serv';
import { concatMap, map } from 'rxjs';

@Component({
  selector: 'app-employees-list',
  imports: [PoPageDynamicSearchModule, PoTableModule],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.css',
})
export class EmployeesList implements OnInit {
  tableColumns: PoTableColumn[] = [];
  tableItems: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  orderkey: string = 'ra_mat';

  readonly defaultTableColumns: string[] = [
    "ra_mat",
    "ra_nome",
    "ra_cc",
    "ra_sitfolh",
    "ra_admissa",
    "ra_demissa"
  ]

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
    this.getEmployeesData();
  }

  getEmployeesData(): void {
    this.employeeService.getEmployeeFields().pipe(
      concatMap(struct => 
        this.employeeService.getEmployeeData(struct.SRA.fields, this.defaultTableColumns, this.page, this.pageSize, this.orderkey).pipe(
          map(data => ({ struct, data }))
        ))
    ).subscribe({
      next: ({ struct, data}) => {
        // console.log(struct, data);
        struct.SRA.fields.forEach( field => {
          if (this.defaultTableColumns.includes(field.field.toLocaleLowerCase())) {
            this.tableColumns.push({
              property: field.field.toLocaleLowerCase(),
              label: field.title,
              format: field.field === "RA_ADMISSA" ? 'dd/MM/yyyy' : '',
              type: field.field === "RA_SITFOLH" ? 'label' : 'string',
              labels: this.getLabels()
            })
          }
          console.log(field.field)
        });
        this.tableItems = data.items;
      },
      error: err => {
        console.error("erro na requisição:", err);
      }
    });
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

  getLabels( ): PoTableColumnLabel[] {
    const labels: PoTableColumnLabel[] = [];
  
    labels.push(
      { value:'' , color:'caption-tag-18', label:'Ativo'},
      { value:'F', color:'caption-tag-22', label:'Em ferias'},
      { value:'D', color:'caption-tag-02', label:'Demitido'}
    )
    return labels
  }

  onSort(sortedBy: PoTableColumnSort) {
    this.orderkey = `${sortedBy.type === 'ascending' ? '' : '-'}${sortedBy.column?.property}`;
    this.tableItems = [];
    this.getEmployeesData();
  }
  
}

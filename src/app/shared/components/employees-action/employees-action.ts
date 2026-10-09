import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDialogService, PoNotificationService, PoPageAction, PoPageModule } from '@po-ui/ng-components';
import { EmployeeServ } from '../../services/employee-serv';
import { concatMap, map } from 'rxjs';

@Component({
  selector: 'app-employees-action',
  imports: [PoPageModule],
  templateUrl: './employees-action.html',
  styleUrl: './employees-action.css',
})
export class EmployeesAction implements OnInit{
  readonly pageActions: PoPageAction[] = [
    { label: 'Salvar'       , action: this.saveEmployee.bind(this) },
    { label: 'Salvar e Novo', action: this.saveAndNewEmployee.bind(this) },
    { label: 'Cancelar'     , action: this.cancelEmployee.bind(this), type: 'danger' }
  ];

  employeeId: string = "";
  employeeAction: string = "";
  defaultTableColumns: string[] = [];
  
  constructor(
    private dialogService: PoDialogService,
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeServ
  ) {}

  ngOnInit(): void {
    this.defaultTableColumns = this.employeeService.getDefaultTableColumns();
    this.route.paramMap.subscribe({
      next: (resp) => {
        this.employeeAction = resp.get('action') || "";
        this.employeeAction = this.employeeAction.trim().toLocaleLowerCase();
        this.employeeId = resp.get('id') || "";

        if ((this.employeeAction === 'new' && this.employeeId !== 'new') 
        || (this.employeeAction !== 'new' && this.employeeId === 'new')) {
          this.notificationService.error({ message: "Opcao invalida" });
          this.router.navigate(['']);
        } else {
            this.employeeService.getEmployeeFields().pipe(
              concatMap(struct => 
                this.employeeService.getEmployeeData(struct.SRA.fields, this.defaultTableColumns, 1, 1,
                'ra_mat', `ra_mat eq '${this.employeeId}'`).pipe(
                  map( (data:any) => ({ struct, data }) )
                ))
            ).subscribe({
              next: ( {struct, data} ) => {
                // console.log(struct, data);
              },
              error: err => {
                console.error("erro na requisição:", err);
              }
            });
        }

      }
    })
  }

  saveEmployee() {
    this.notificationService.success({
      message: 'Funcionário salvo com sucesso!'
    });
  }

  saveAndNewEmployee() {
    this.notificationService.error({
      message: 'Erro ao salvar funcionário'
    });
  }

  cancelEmployee() {
    this.dialogService.confirm({
      title: 'Cancelamento',
      message: 'Deseja realmente cancelar a inclusão do funcionário?',
      confirm: this.cancelConfirm.bind(this),
      literals: {
        confirm: 'Cancelar',
        cancel: 'Sair'
      }
    });
  }

  cancelConfirm() {
    this.router.navigate(['']);
  }

}

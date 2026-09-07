import { Component } from '@angular/core';
import { PoDialogService, PoNotificationService, PoPageAction, PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-employees-action',
  imports: [PoPageModule],
  templateUrl: './employees-action.html',
  styleUrl: './employees-action.css',
})
export class EmployeesAction {
  readonly pageActions: PoPageAction[] = [
    { label: 'Salvar'       , action: this.saveEmployee.bind(this) },
    { label: 'Salvar e Novo', action: this.saveAndNewEmployee.bind(this) },
    { label: 'Cancelar'     , action: this.cancelEmployee.bind(this), type: 'danger' }
  ];
  
  constructor(
    private dialogService: PoDialogService,
    private notificationService: PoNotificationService
  ) {}

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
    alert('Cancelado com sucesso');
  }

}

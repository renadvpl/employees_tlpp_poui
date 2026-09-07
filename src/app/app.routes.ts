import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/employees-list/employees-list')
          .then(m => m.EmployeesList)
    },
    {
        path: ':action/:mat',
        loadComponent: () => import('./shared/components/employees-action/employees-action')
          .then(m => m.EmployeesAction)
    }
];

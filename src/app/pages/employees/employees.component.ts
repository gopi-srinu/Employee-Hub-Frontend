import { Component, inject, OnInit } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Model/employee';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateComponent } from '../create/create.component';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-employees',
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    MatSidenavContainer,
    MatSidenav,
    MatIcon,
    MatListModule,
    MatToolbarModule,
    MatSidenavContent,
    RouterOutlet,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    CreateComponent
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  employees: Employee[] = [];
  isEmployeesDataPresent: boolean = false;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['S.No', 'Name', 'Phone Number', 'Role', 'Employee ID', 'City', 'State', 'Address', 'More Details'];

  showEditMode: boolean = false;
  selectedEmployeeForEdit: Employee | null = null;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private employeeService: EmployeeService) { }

  ngAfterViewInit() {
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe((result: { matches: any }) => {
      setTimeout(() => {
        if (result.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'over';
        }
      });
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  navigateToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((employees: any) => {
      if (employees.data.length > 0) {
        this.isEmployeesDataPresent = true;
        this.employees = employees.data;
      } else {
        this.isEmployeesDataPresent = false;
      }
    })
  }

  openMoreDetails(employeeid: number) {
    this.router.navigateByUrl(`employee/${employeeid}`);
  }

  editEmployee(employee: Employee) {
    this.selectedEmployeeForEdit = employee;
    this.showEditMode = true;
  }

  onEditComplete() {
    this.showEditMode = false;
    this.selectedEmployeeForEdit = null;
    this.getEmployees();
  }

  deleteEmployee(employeeid: number) {
    const notyf = new Notyf({
      position: {
        x: 'center',
        y: 'bottom'
      },
      duration: 3000
    });

    this.employeeService.deleteEmployee(employeeid).subscribe({
      next: (response) => {
        console.log('Employee deleted:', response);

        const employeeIndex = this.employees.findIndex((emp: any) => emp.employeeid === employeeid);
        if (employeeIndex !== -1) {
          this.employees.splice(employeeIndex, 1);
        }

        notyf.success('Employee deleted successfully.');
        this.getEmployees();
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        notyf.error('Failed to delete employee. Please try again.');
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Employee } from '../../Model/employee';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-employee',
  imports: [MatTableModule, CommonModule, RouterOutlet, MatIcon, MatListModule, MatToolbarModule, MatSidenav, MatSidenavContainer, MatSidenavContent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
  employee: Employee[] = [];
  id!: string;
  displayedColumns: string[] = ['firstName', 'lastName', 'employeeID', 'dateOfBirth', 'uploadFile', 'email', 'phone', 'address', 'city', 'state', 'pinCode', 'position', 'department', 'hireDate', 'salary', 'employmentStatus', 'employmentType', 'contactName', 'contactPhone', 'alternatePhone', 'emergencyContactRelationship'];
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = String(param.get('id'));
    });

    this.getSelectedEmployee();
  }


  getSelectedEmployee() {
    this.employeeService.getEmployee(Number(this.id)).subscribe((employeeData: any) => {
      this.employee = [employeeData.data];
    })
  }

  openImage(imageName: string) {
    window.open(`/${imageName}`, '_blank');
  }

  navigateToRoute(route: string) {
    this.router.navigateByUrl(route);
  }
}

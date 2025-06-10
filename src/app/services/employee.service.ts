import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Model/employee';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee> {
    const apiURL = `${this.apiURL}/getEmployees`;
    return this.http.get<Employee>(apiURL);
  }

  getEmployee(id: number): Observable<Employee> {
    const apiURL = `${this.apiURL}/getEmployee/${id}`;
    return this.http.get<Employee>(apiURL);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const apiURL = `${this.apiURL}/addEmployee`;
    return this.http.post<Employee>(apiURL, employee);
  }

  updateEmployee(employeeid: string, employeeForm: Employee): Observable<Employee> {
    const apiURL = `${this.apiURL}/edit/${employeeid}`;
    return this.http.put<Employee>(apiURL, employeeForm);
  }

  deleteEmployee(employeeid: number) {
    const apiURL = `${this.apiURL}/deleteEmployee/${employeeid}`;
    return this.http.delete<Employee>(apiURL);
  }
}

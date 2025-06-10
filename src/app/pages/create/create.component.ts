import { Component, inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import AOS from 'aos';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notyf } from 'notyf';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Model/employee';

@Component({
  selector: 'app-create',
  imports: [MatCardModule, MatSidenavContainer, MatSidenav, MatIcon, MatListModule, MatToolbarModule, MatSidenavContent, RouterOutlet, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  selectedFile: File | null = null;
  employeeForm!: FormGroup;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  @Input() editMode: boolean = false;
  @Input() employeeData: Employee | any = null;
  @Output() editComplete = new EventEmitter<void>();

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
    AOS.init();
    this.initialiseForms();

    if (this.editMode && this.employeeData) {
      this.populateFormForEdit();
    }
  }

  ngAfterViewInit() {
    if (!this.editMode) {
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
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      this.employeeForm.patchValue({
        uploadFile: this.selectedFile.name
      });

      this.employeeForm.get('uploadFile')?.markAsTouched();
    }
  }

  navigateToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  initialiseForms() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      employeeID: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      uploadFile: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      position: ['', [Validators.required]],
      department: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      employmentStatus: ['', [Validators.required]],
      employmentType: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      contactPhone: ['', [Validators.required]],
      alternatePhone: ['', [Validators.required]],
      emergencyContactRelationship: ['', [Validators.required]]
    })
  }

  populateFormForEdit() {
    if (this.employeeData) {
      this.employeeForm.disable();
      this.employeeForm.patchValue({
        firstName: this.employeeData.firstname,
        lastName: this.employeeData.lastname,
        employeeID: this.employeeData.employeeid,
        dateOfBirth: this.employeeData.dateofbirth,
        email: this.employeeData.email,
        phone: this.employeeData.phone,
        address: this.employeeData.address,
        city: this.employeeData.city,
        state: this.employeeData.state,
        pinCode: this.employeeData.pincode,
        position: this.employeeData.position,
        department: this.employeeData.department,
        hireDate: this.employeeData.hiredate,
        salary: this.employeeData.salary,
        employmentStatus: this.employeeData.employmentstatus,
        employmentType: this.employeeData.employmenttype,
        contactName: this.employeeData.contactname,
        contactPhone: this.employeeData.contactphone,
        alternatePhone: this.employeeData.alternatephone,
        emergencyContactRelationship: this.employeeData.emergencycontactrelationship
      });
    }
  }

  submitForm() {
    this.employeeForm.markAllAsTouched();

    if (this.employeeForm.invalid) {
      const notyf = new Notyf({
        position: { x: 'center', y: 'bottom' }
      });

      const errors: string[] = [];
      Object.keys(this.employeeForm.controls).forEach(key => {
        const control = this.employeeForm.get(key);
        if (control && control.invalid) {
          errors.push(this.getFieldName(key));
        }
      });

      notyf.error(`Please fill the following required fields: ${errors.join(', ')}`);
      return;
    }

    if (!this.editMode && !this.selectedFile) {
      const notyf = new Notyf({
        position: { x: 'center', y: 'bottom' }
      });
      notyf.error('Please upload a file.');
      return;
    }

    if (this.editMode) {
      this.employeeService.updateEmployee(String(this.employeeData?.employeeid), this.employeeForm.value).subscribe({
        next: (response: any) => {
          console.log('Employee updated:', response);
          new Notyf().success('Employee updated successfully!');
          this.editComplete.emit();
        },
        error: (err: any) => {
          console.error(err);
          new Notyf().error('Failed to update employee');
        }
      });
    } else {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe({
        next: (response) => {
          console.log('Employee added:', response);
          new Notyf().success('Employee added successfully!');
          this.employeeForm.reset();
          this.selectedFile = null;
        },
        error: (err) => {
          console.error(err);
          new Notyf().error('Failed to add employee');
        }
      });
    }
  }

  cancelEdit() {
    this.editComplete.emit();
  }

  private getFieldName(controlName: string): string {
    const fieldNames: { [key: string]: string } = {
      'firstName': 'First Name',
      'lastName': 'Last Name',
      'employeeID': 'Employee ID',
      'dateOfBirth': 'Date of Birth',
      'email': 'Email',
      'phone': 'Phone Number',
      'address': 'Address',
      'city': 'City',
      'state': 'State',
      'pinCode': 'Pin Code',
      'position': 'Position',
      'department': 'Department',
      'hireDate': 'Hire Date',
      'salary': 'Salary',
      'employmentStatus': 'Employment Status',
      'employmentType': 'Employment Type',
      'contactName': 'Emergency Contact Name',
      'contactPhone': 'Emergency Contact Phone',
      'alternatePhone': 'Alternate Phone',
      'emergencyContactRelationship': 'Emergency Contact Relationship'
    };
    return fieldNames[controlName] || controlName;
  }

  enableEditMode() {
    this.employeeForm.enable();
  }
}
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] = [];
  public editEmployee?: Employee;
  public deleteEmployee?: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  public getAllEmployees(): void {
    this.employeeService.getAllEmployees()
    .subscribe(
      (response: Employee[]) => {
        this.employees = response;
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee|null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    if (employee != null ){
      if(mode === 'edit') {
        this.editEmployee = employee;
        button.setAttribute('data-bs-target', '#updateEmployeeModal');
      }
      if(mode === 'delete') {
        this.deleteEmployee = employee;
        button.setAttribute('data-bs-target', '#deleteEmployeeModal');
      }
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getAllEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getAllEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteEmployee(employeeId: number | undefined): void{
    if(employeeId){
      this.employeeService.deleteEmployee(employeeId).subscribe(
        (response: void) => {
          console.log(response);
          this.getAllEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public searchEmployees(key: string):void {
    const results: Employee[] = [];
    for(const employee of this.employees) {
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ){
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length === 0 || !key) {
      this.getAllEmployees();
    }
  }
  
}

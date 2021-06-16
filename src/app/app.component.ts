import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] = [];

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
  
}

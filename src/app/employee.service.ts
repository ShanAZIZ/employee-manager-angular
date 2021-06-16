import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient ) {}

  public getAllEmployees(): Observable<Employee[]> { 
    return this.http.get<Employee[]>(this.apiServerUrl + '/employee/all')
  }
  
  public getEmployee(employeeId: number): Observable<Employee> { 
    return this.http.get<Employee>(this.apiServerUrl + '/employee/find/' + employeeId)
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiServerUrl + 'employee/create', employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiServerUrl + 'employee/update', employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(this.apiServerUrl + 'employee/delete/' + employeeId);
  }
}

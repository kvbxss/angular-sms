import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IStudent } from '../pages/shared/models/Student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  apiurl = 'http://localhost:8085/';
  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<ApiResponse<IStudent[]>> {
    return this.http.get<ApiResponse<IStudent[]>>(`${this.apiurl}`);
  }

  getStudent(id: string): Observable<ApiResponse<IStudent>> {
    return this.http.get<ApiResponse<IStudent>>(`${this.apiurl}/${id}`);
  }

  createStudent(student: IStudent): Observable<any> {
    return this.http.post(`${this.apiurl}`, student);
  }

  updateStudent(id: string, student: IStudent): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, student);
  }

  deleteStudent(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/${id}`);
  }
}
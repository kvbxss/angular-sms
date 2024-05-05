import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../services/student.service';
import { IStudent } from '../shared/models/Student';
@Component({
  selector: 'app-student',
  standalone: true,
  imports: [ModelComponent, StudentFormComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent implements OnInit {
  isModelOpen = false;
  students: IStudent[] = [];
  student!: IStudent;

  constructor(
    private studentService: StudentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (response) => {
        if (response.data) {
          this.students = response.data;
        }
      },
    });
  }

  loadStudent(student: IStudent) {
    this.student = student;
    this.openModel();
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getAllStudents();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllStudents();
  }
}
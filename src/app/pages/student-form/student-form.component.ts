import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
  } from '@angular/core';
  import { IStudent } from '../shared/models/Student';
  import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,
    ReactiveFormsModule,
  } from '@angular/forms';
  import { CommonModule, formatDate } from '@angular/common';
  import { RouterModule } from '@angular/router';
  import { StudentService } from '../../services/student.service';
  import { ToastrService } from 'ngx-toastr';
  @Component({
    selector: 'app-student-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './student-form.component.html',
    styleUrl: './student-form.component.scss',
  })
  export class StudentFormComponent implements OnChanges {
    @Input() data: IStudent | null = null;
    @Output() onCloseModel = new EventEmitter();
  
    studentForm!: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private studentService: StudentService,
      private toastr: ToastrService
    ) {
      this.studentForm = this.fb.group({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        mobile: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required]),
        doj: new FormControl('', [Validators.required]),
      });
    }
  
    onClose() {
      this.onCloseModel.emit(false);
    }
  
    ngOnChanges(): void {
      if (this.data) {
        this.studentForm.patchValue({
          name: this.data.name,
          email: this.data.email,
          mobile: this.data.mobile,
        });
      }
    }
  
    onSubmit() {
      if (this.studentForm.valid) {
        if (this.data) {
          this.studentService
            .updateStudent(this.data._id as string, this.studentForm.value)
            .subscribe({
              next: (response: any) => {
                this.resetStudentForm();
                this.toastr.success(response.message);
              },
            });
        } else {
          this.studentService.createStudent(this.studentForm.value).subscribe({
            next: (response: any) => {
              this.resetStudentForm();
              this.toastr.success(response.message);
            },
          });
        }
      } else {
        this.studentForm.markAllAsTouched();
      }
    }
  
    resetStudentForm() {
      this.studentForm.reset();
      this.onClose();
    }
  }

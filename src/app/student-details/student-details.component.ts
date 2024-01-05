import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentProfile } from '../entities/student-profile';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  studentProfile?: StudentProfile[];

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) {}

// loadStudentProfile():void{
//   this.studentService.getAllStudentProfileInfo().subscribe(
//     res => this.studentProfile = res
//   );
// }


  // getStudent(): void {
  //   let studId = String(this.activatedRoute.snapshot.paramMap.get('id'));
  //   this.student = this.studentService.getStudentById(studId);

  //   if (this.student == undefined) {
  //   }
  // }
  ngOnInit(): void {
    //this.loadStudentProfile();
    //this.getStudent();
  }
}

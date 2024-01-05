import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentProfile } from '../entities/student-profile';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-display-information',
  templateUrl: './display-information.component.html',
  styleUrls: ['./display-information.component.css'],
})
export class DisplayInformationComponent implements OnInit {
  isAdmin: boolean = false; //admin = student
  @Input() studentProfile?: StudentProfile[];
  isUser: boolean = false;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  // loadStudentProfiles(): void {
  //   this.studentService
  //     .getAllStudentProfileInfo()
  //     .subscribe((res) => (this.studentProfile = res));
  // }

  ngOnInit(): void {
    this.authService
      .getUserRoles()
      .then((res) =>
        res.indexOf('ADMIN') > -1
          ? (this.isAdmin = true)
          : (this.isAdmin = false)
      );
    //this.getStudent();
    //this.loadStudentProfiles();
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, EventType } from '@angular/router';
import { CollegeList } from '../entities/college-list';
import { StudentProfile } from '../entities/student-profile';
import { AuthService } from '../services/auth.service';
import { CollegeListService } from '../services/college-list.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.component.html',
  styleUrls: ['./student-account.component.css'],
})
export class StudentAccountComponent implements OnInit {
  isAdmin: boolean = false; //admin = student
  studentProfile?: StudentProfile[];
  isUser: boolean = false;
  totalSchools: number = 0;
  userEmail: string = '';
  eachStudentProfile?: StudentProfile;

  collegesId: any = [];
  //
  collegeList?: CollegeList[];
  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private collegeListService: CollegeListService
  ) {}

  // loadStudentProfiles(): void {
  //   this.studentService
  //     .getAllStudentProfileInfo()
  //     .subscribe((res) => (this.studentProfile = res));
  // }
  getStudentProfile(): void {
    this.studentService.getAllStudentProfileInfo().subscribe((res) => {
      this.studentProfile = res.filter(
        (details) => details.email == this.userEmail
      );
      console.log(this.studentProfile);
    });
  }

  loadColleges() {
    this.collegeListService.getCollegeList().subscribe((res) => {
      this.collegeList = res.filter(
        (college) => college.userEmail == this.userEmail
      );
      console.log(this.collegeList);
    });
  }
  ngOnInit(): void {
    this.authService.getUserEmail().then((res: any) => (this.userEmail = res));
    this.authService
      .getUserRoles()
      .then((res) =>
        res.indexOf('ADMIN') > -1
          ? (this.isAdmin = true)
          : (this.isAdmin = false)
      );
    //this.loadStudentProfiles();
    this.getStudentProfile();
    this.loadColleges();
  }
}

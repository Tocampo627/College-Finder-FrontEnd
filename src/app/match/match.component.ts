import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { College } from '../entities/college';
import { CollegeList } from '../entities/college-list';
import { StudentProfile } from '../entities/student-profile';
import { AuthService } from '../services/auth.service';
import { CollegeListService } from '../services/college-list.service';
import { EduApiService } from '../services/edu-api.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})
export class MatchComponent implements OnInit {
  schoolMatch1: any = [];

  //college EDU API  Variables
  colleges?: College[];
  filteredColleges?: College[];
  getSATSchools?: College[];
  //college List varibales

  //student profile variables
  studentProfile?: StudentProfile[];
  profileSat: number = 0;
  profileOwnership: string = '';
  profileLocationSize: string = '';
  profileMaxCost: number = 0;
  studentSat: any;

  //prepare save variables
  schoolId: number = 0;
  userEmail: string = '';
  schoolName: string = '';
  schoolCity: string = '';
  schoolState: string = '';
  schoolTuition: number = 0;
  schoolSat: number = 0;
  //snackabr
  durationInSeconds = 5;

  constructor(
    private schoolInfo: EduApiService,
    private studentService: StudentService,
    private collegeListService: CollegeListService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  loadColleges() {
    this.studentService.getAllStudentProfileInfo().subscribe((res) =>
      res.forEach((studentInfo) => {
        this.schoolInfo.getData().subscribe((data) =>
          data?.forEach((col) => {
            if (
              col.annualCost <= studentInfo.maxCostOfAttendance &&
              col.annualCost != null
            ) {
              //console.log(col);
              if (
                col.aveSATScore <= studentInfo.satScore &&
                col.aveSATScore != null
              ) {
                //console.log(col);
                this.schoolMatch1.push(col);
              }

              //this.filteredColleges=col;
            }
          })
        );
      })
    );
  }

  // search() {
  //   this.loadColleges();
  // }

  prepareListSave(): CollegeList {
    return new CollegeList(
      null,
      this.userEmail,
      this.schoolId,
      this.schoolName,
      this.schoolCity,
      this.schoolState,
      this.schoolTuition,
      this.schoolSat
    );
  }

  saveSchoolToList(
    schoolId: number,
    schoolName: string,
    schoolCity: string,
    schoolState: string,
    schoolTuition: number,
    schoolSat: number
  ): void {
    //open snackbar confirming add
    this.successSnackBar();
    this.schoolId = schoolId;
    this.schoolName = schoolName;
    this.schoolCity = schoolCity;
    this.schoolState = schoolState;
    this.schoolTuition = schoolTuition;
    this.schoolSat = schoolSat;
    //console.log(receiveSchoolId);
    let schoolSelected = this.prepareListSave();
    console.warn(schoolSelected);
    this.successSnackBar();
    this.collegeListService
      .postCollegeToUsersList(schoolSelected)
      .subscribe(() => window.location.reload());
  }

  successSnackBar() {
    this.snackBar.open('College Added To List 🎉 🎓', '', { duration: 3000 });
  }

  ngOnInit(): void {
    this.loadColleges();
    this.authService.getUserEmail().then((res: any) => (this.userEmail = res));
  }
}

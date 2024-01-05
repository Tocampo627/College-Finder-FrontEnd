import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAt, find, Observable } from 'rxjs';
import { College } from '../entities/college';
import { CollegeList } from '../entities/college-list';
import { StudentProfile } from '../entities/student-profile';
import { AuthService } from '../services/auth.service';
import { CollegeListService } from '../services/college-list.service';
import { EduApiService } from '../services/edu-api.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-college-list',
  templateUrl: './college-list.component.html',
  styleUrls: ['./college-list.component.css'],
})
export class CollegeListComponent implements OnInit {
  //entity Varibale
  @Input() collegeList?: CollegeList[];

  collegeListEntry?: CollegeList;

  //prepare save variables
  transactionId: string = '';
  schoolId: number = 0;
  userEmail: string = '';
  schoolName: string = '';
  schoolCity: string = '';
  schoolState: string = '';
  schoolTuition: number = 0;
  schoolSat: number = 0;

  constructor(
    private collegeListService: CollegeListService,
    private authService: AuthService
  ) {}

  // loadColleges() {
  //   this.collegeListService
  //     .getCollegeList()
  //     .subscribe((res) => (this.collegeList = res));
  // }
  // loadEntryById() {
  //   this.collegeListService
  //     .getEntryTransacationById(this.transactionId)
  //     .subscribe((res) => {
  //       this.collegeListEntry = res;
  //     });
  // }

  prepareListSave(): CollegeList {
    return new CollegeList(
      this.transactionId,
      this.userEmail,
      this.schoolId,
      this.schoolName,
      this.schoolCity,
      this.schoolState,
      this.schoolTuition,
      this.schoolSat
    );
  }
  removeCollegeFromMyList(college: any): void {
    this.transactionId = college.id;
    this.schoolId = college.schoolId;
    this.schoolName = college.schoolName;
    this.schoolCity = college.schoolCity;
    this.schoolState = college.schoolState;
    this.schoolTuition = college.schoolTuition;
    this.schoolSat = college.schoolSat;
    let schoolSelected = this.prepareListSave();
    this.collegeListService
      .putCollegeFromUserList(schoolSelected)

      .subscribe(() => window.location.reload());
  }

  ngOnInit(): void {
    console.log(this.collegeList);
    // this.loadEntryById();
    // this.loadColleges();
    this.authService.getUserEmail().then((res: any) => (this.userEmail = res));
  }
}

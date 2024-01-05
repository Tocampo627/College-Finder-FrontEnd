import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { College } from '../entities/college';
import { CollegeList } from '../entities/college-list';
import { StudentProfile } from '../entities/student-profile';
import { AuthService } from '../services/auth.service';
import { CollegeListService } from '../services/college-list.service';
import { EduApiService } from '../services/edu-api.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-college-search',
  templateUrl: './college-search.component.html',
  styleUrls: ['./college-search.component.css'],
  providers: [EduApiService],
})
export class CollegeSearchComponent implements OnInit {
  colleges?: College[];
  filteredColleges?: College[];
  searchText: string = '';
  studentProfile?: StudentProfile;
  show: boolean = false;
  buttonName: any = 'SHOW MORE';
  activatedRoute: any;
  studentProfileId?: number | null;

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
    private collegeListService: CollegeListService,
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loadColleges() {
    this.schoolInfo.getData().subscribe((data) => {
      //console.warn(data);
      this.colleges = this.filteredColleges = data;
    });
  }

  search() {
    this.filteredColleges = this.colleges?.filter(
      (col) =>
        col.name.includes(this.searchText) ||
        col.city.includes(this.searchText) ||
        col.schoolId.toString().includes(this.searchText)
    );
  }

  getMoreDetails() {
    this.show = !this.show;

    if (this.show) {
      this.buttonName = 'SHOW LESS';
    } else {
      this.buttonName = 'SHOW MORE';
    }
  }

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
    //console.warn(schoolSelected);

    this.collegeListService
      .postCollegeToUsersList(schoolSelected)
      .subscribe(() => this.successSnackBar());
  }

  successSnackBar() {
    this.snackBar.open('College Added To List 🎉 🎓', '', { duration: 2000 });
  }

  ngOnInit(): void {
    this.loadColleges();
    this.authService.getUserEmail().then((res) => (this.userEmail = res));
  }
}

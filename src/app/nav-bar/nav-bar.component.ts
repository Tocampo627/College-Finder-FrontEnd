import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentProfile } from '../entities/student-profile';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isAuthenticated?: boolean;
  studentProfile?: StudentProfile;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService
  ) {}

  // getStudentProfile(): void {
  //   let studentId = String(this.activatedRoute.snapshot.paramMap.get('id'));
  //   this.studentService.getStudentProfileById(studentId).subscribe((res) => {
  //     this.studentProfile = res;
  //   });
  // }

  signOut(): void {
    this.authService.signOut();

    this.router.navigate(['']);
  }
  ngOnInit(): void {
    //this.getStudentProfile();
    this.authService
      .isAuthenticated()
      .subscribe((res) => (this.isAuthenticated = res));
  }
}

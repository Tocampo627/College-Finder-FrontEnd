import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentProfile } from '../entities/student-profile';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentProfile?: StudentProfile[];
  //private baseUrl: string = 'http://localhost:8080/studentProfiles';
  private baseUrl: string =
    'http://959929collegefinderspringbooteb-env.eba-pymndmwj.us-west-2.elasticbeanstalk.com/studentProfiles';

  postHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getAllStudentProfileInfo(): Observable<StudentProfile[]> {
    return this.httpClient.get<StudentProfile[]>(this.baseUrl + '/all').pipe(
      map((res) => {
        this.studentProfile = res;
        return this.studentProfile;
      })
      //catchError(this.handleError)
    );
  }

  //post
  postStudentProfileInfo(student: StudentProfile): Observable<StudentProfile> {
    return this.httpClient
      .post<StudentProfile>(this.baseUrl + '/save', student, this.postHeaders)
      .pipe(
        map((res) => res)
        //catchError(this.handleError)
      );
  }
  //put

  putStudentProfileInfo(student: StudentProfile): Observable<StudentProfile> {
    return this.httpClient
      .put<StudentProfile>(this.baseUrl + '/update', student, this.postHeaders)
      .pipe(
        map((res) => res)
        //catchError(this.handleError)
      );
  }

  getStudentProfileById(id: string): Observable<StudentProfile | undefined> {
    if (!this.studentProfile) {
      return this.getAllStudentProfileInfo().pipe(
        map(() => this.studentProfile?.find((student) => student.id == id))
        //catchError(this.handleError)
      );
    } else {
      return of(this.studentProfile.find((student) => student.id == id));
    }
  }

  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `,
  //       error.error
  //     );
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     () => new Error('Something bad happened; please try again later.')
  //   );
  // }
}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { College } from '../entities/college';
import { CollegeList } from '../entities/college-list';

@Injectable({
  providedIn: 'root',
})
export class CollegeListService {
  private collegeList?: CollegeList[];

  //private baseUrl: string = 'http://localhost:8080/collegelist';

  private baseUrl: string =
    'http://959929collegefinderspringbooteb-env.eba-pymndmwj.us-west-2.elasticbeanstalk.com/collegelist';

  postHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // public myCollegeList: any = [];
  // public studentCollegeList?: CollegeList[];
  // private studentNewCollegeList!: CollegeList[];
  // public onlyColIds!: CollegeList[];
  // public colleges = new BehaviorSubject<any>([]); //acts as an subscriber/observable and emits data
  // collegeId: number = 0;

  constructor(private httpClient: HttpClient) {}

  getCollegeList(): Observable<CollegeList[]> {
    return this.httpClient.get<CollegeList[]>(this.baseUrl + '/all').pipe(
      map((res) => {
        this.collegeList = res;
        return this.collegeList;
      })
      //catchError(this.handleError)
    );
  }

  postCollegeToUsersList(college: CollegeList): Observable<CollegeList> {
    return this.httpClient
      .post<CollegeList>(this.baseUrl + '/save', college, this.postHeaders)
      .pipe(
        map((res) => res)
        //catchError(this.handleError)
      );
  }

  getEntryTransacationById(id: string): Observable<CollegeList | undefined> {
    if (!this.collegeList) {
      return this.getCollegeList().pipe(
        map(() => this.collegeList?.find((transaction) => transaction.id == id))
        //catchError(this.handleError)
      );
    } else {
      return of(this.collegeList.find((transaction) => transaction.id == id));
    }
  }

  putCollegeFromUserList(college: CollegeList): Observable<CollegeList> {
    return this.httpClient
      .put<CollegeList>(this.baseUrl + '/update', college, this.postHeaders)
      .pipe(
        map((res) => res)
        //catchError(this.handleError)
      );
  }

  collegeListCount(): number {
    return this.getCollegeList.length;
  }

  // deleteCollege(college: CollegeList): Observable<CollegeList> {
  //   return this.httpClient
  //     .delete<CollegeList>(this.baseUrl + '/delete', this.postHeaders)
  //     .pipe(
  //       map((res) => res),
  //       catchError(this.handleError)
  //     );
  // }

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

import { StudentProfile } from './student-profile';

export class CollegeList {
  constructor(
    public id: string | null,
    public userEmail: string,
    public schoolId: number,
    public schoolName: string,
    public schoolCity: string,
    public schoolState: string,
    public schoolTuition: number,
    public schoolSat: number
  ) {}
}

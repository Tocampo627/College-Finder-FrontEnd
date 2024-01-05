export class StudentProfile {
  constructor(
    public id: string | null,
    public email: string,
    public firstName: string,
    public lastName: string,
    public privatePublic: string,
    public regionUsa: string, //range 0-9
    public locationSize: string,
    public satScore: number,
    public maxCostOfAttendance: number
  ) {}
}

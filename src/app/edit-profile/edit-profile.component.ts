import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentProfile } from '../entities/student-profile';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  studentProfile?: StudentProfile;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  studentProfileForm = this.formBuilder.group({
    email: new FormControl({ value: '', disabled: true }),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    privatePublic: new FormControl('', [Validators.required]),
    regionUsa: new FormControl('', [Validators.required]),
    locationSize: new FormControl('', [Validators.required]),
    satScore: new FormControl('', [Validators.required]),
    maxCostOfAttendance: new FormControl('', [Validators.required]),
  });

  get firstName(): string {
    return String(this.studentProfileForm.get('firstName')?.value);
  }
  get lastName(): string {
    return String(this.studentProfileForm.get('lastName')?.value);
  }
  get privatePublic(): string {
    return String(this.studentProfileForm.get('privatePublic')?.value);
  }
  get regionUsa(): string {
    return String(this.studentProfileForm.get('regionUsa')?.value);
  }
  get locationSize(): string {
    return String(this.studentProfileForm.get('locationSize')?.value);
  }
  get satScore(): number {
    return parseInt(String(this.studentProfileForm.get('satScore')?.value));
  }
  get maxCostOfAttendance(): number {
    return parseInt(
      String(this.studentProfileForm.get('maxCostOfAttendance')?.value)
    );
  }

  set firstName(firstName: string) {
    this.studentProfileForm.get('firstName')?.setValue(firstName);
  }
  set lastName(lastName: string) {
    this.studentProfileForm.get('lastName')?.setValue(lastName);
  }
  set privatePublic(privatePublic: string) {
    this.studentProfileForm.get('privatePublic')?.setValue(privatePublic);
  }
  set regionUsa(regionUsa: string) {
    this.studentProfileForm.get('regionUsa')?.setValue(regionUsa);
  }
  set locationSize(locationSize: string) {
    this.studentProfileForm.get('locationSize')?.setValue(locationSize);
  }
  set satScore(satScore: number) {
    this.studentProfileForm.get('satScore')?.setValue(String(satScore));
  }
  set maxCostOfAttendance(maxCostOfAttendance: number) {
    this.studentProfileForm
      .get('maxCostOfAttendance')
      ?.setValue(String(maxCostOfAttendance));
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) {}

  prepareSave(): StudentProfile {
    return new StudentProfile(
      String(this.studentProfile?.id),
      String(this.studentProfile?.email),
      this.firstName,
      this.lastName,
      this.privatePublic, //
      this.regionUsa,
      this.locationSize,
      this.satScore,
      this.maxCostOfAttendance
    );
  }

  updateStudentProfile(): void {
    if (this.studentProfileForm.valid) {
      let student = this.prepareSave();
      this.studentService
        .putStudentProfileInfo(student)
        .subscribe(() => this.router.navigate(['/my-account']));
    }
  }

  getStudentProfile(): void {
    let studentId = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.studentService.getStudentProfileById(studentId).subscribe((res) => {
      this.studentProfile = res;
      this.setFormInitialValues();
    });
  }

  setFormInitialValues() {
    this.firstName = String(this.studentProfile?.firstName);
    this.lastName = String(this.studentProfile?.lastName);
    this.privatePublic = String(this.studentProfile?.privatePublic);
    this.regionUsa = String(this.studentProfile?.regionUsa);
    this.locationSize = String(this.studentProfile?.locationSize);
    this.satScore = Number(this.studentProfile?.satScore);
    this.maxCostOfAttendance = Number(this.studentProfile?.maxCostOfAttendance);
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit(): void {
    this.getStudentProfile();
  }
}

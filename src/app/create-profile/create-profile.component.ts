import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { StudentProfile } from '../entities/student-profile';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {


  
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  


  studentProfileForm = this.formBuilder.group({
    email: new FormControl({value: '', disabled: true}),
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    privatePublic: new FormControl('',[Validators.required]),
    regionUsa: new FormControl('',[Validators.required]),
    locationSize: new FormControl('',[Validators.required]),
    satScore: new FormControl('',[Validators.required]),
    maxCostOfAttendance: new FormControl('',[Validators.required]),

  });
 

  get email(): string {  return String(this.studentProfileForm.get('email')?.value)}
  get firstName(): string {  return String(this.studentProfileForm.get('firstName')?.value)}
  get lastName(): string { return String(this.studentProfileForm.get('lastName')?.value)}
  get privatePublic(): string {  return String(this.studentProfileForm.get('privatePublic')?.value)}
  get regionUsa(): string {  return String(this.studentProfileForm.get('regionUsa')?.value)}
  get locationSize(): string { return String(this.studentProfileForm.get('locationSize')?.value)}
  get satScore(): number { return parseInt( String(this.studentProfileForm.get('satScore')?.value))}
  get maxCostOfAttendance(): number { return parseInt( String(this.studentProfileForm.get('maxCostOfAttendance')?.value))}
  

  set email(email: string){ this.studentProfileForm.get('email')?.setValue(email)}
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private authService: AuthService
  ) { }

  prepareSave(): StudentProfile {
    return new StudentProfile(
      null,
      this.email,
      this.firstName,
      this.lastName,
      this.privatePublic,
      this.regionUsa,
      this.locationSize,
      this.satScore,
      this.maxCostOfAttendance
    )
  }

  saveStudent():void{

    if(this.studentProfileForm.valid){
      let student = this.prepareSave();
      this.studentService.postStudentProfileInfo(student).subscribe(
         () => this.router.navigate(['/my-account'])
      )
    }
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }




  ngOnInit(): void {
    this.authService.getUserEmail().then(
      email => this.email = email
    );
  }

}

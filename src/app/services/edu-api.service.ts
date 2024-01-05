import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { College } from '../entities/college';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EduApiService {
  apiURL: string =
    // 'https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=pH35o4GwaS1FkhjfLRl8XAu1yZrACIr89CKjfAqB&fields=';
    //'https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=pH35o4GwaS1FkhjfLRl8XAu1yZrACIr89CKjfAqB&fields=school.name,school.city,latest.admissions.admission_rate.overall,latest.admissions.sat_scores.average.overall,latest.cost.attendance.academic_year,school.school_url,school.price_calculator_url,school.ownership,school.state,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,latest.academics.program.bachelors&per_page=100&school.degrees_awarded.predominant=3&school.state_fips=17,12';
    'https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=pH35o4GwaS1FkhjfLRl8XAu1yZrACIr89CKjfAqB&fields=id,school.name,school.city,latest.admissions.admission_rate.overall,latest.admissions.sat_scores.average.overall,latest.cost.attendance.academic_year,school.school_url,school.price_calculator_url,school.ownership,school.state,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,latest.academics.program.bachelors&per_page=100&school.degrees_awarded.predominant=3&school.state_fips=17,12';
  colleges?: College[] = [];
  constructor(private http: HttpClient) {}

  getData(): Observable<College[] | undefined> {
    return this.http.get(this.apiURL).pipe(
      map((res: any) => {
        res['results'].forEach((col: any) => {
          this.colleges?.push(
            new College(
              col['id'],
              col['latest.admissions.admission_rate.overall'],
              col['latest.admissions.sat_scores.average.overall'],
              col['latest.cost.attendance.academic_year'],
              col['school.city'],
              col['school.name'],
              col['school.ownership'],
              col['school.price_calculator_url'],
              col['school.school_url'],
              col['school.state'],
              col['latest.cost.tuition.in_state'],
              col['latest.cost.tuition.out_of_state'],
              col['latest.academics.program.bachelors.agriculture'],
              col['latest.academics.program.bachelors.resources'],
              col['latest.academics.program.bachelors.architecture'],
              col['latest.academics.program.bachelors.ethnic_cultural_gender'],
              col['latest.academics.program.bachelors.communication'],
              col[
                'latest.academics.program.bachelors.communications_technology'
              ],
              col['latest.academics.program.bachelors.computer'],
              col['latest.academics.program.bachelors.personal_culinary'],
              col['latest.academics.program.bachelors.education'],
              col['latest.academics.program.bachelors.engineering'],
              col['latest.academics.program.bachelors.engineering_technology'],
              col['latest.academics.program.bachelors.language'],
              col['latest.academics.program.bachelors.family_consumer_science'],
              col['latest.academics.program.bachelors.legal'],
              col['latest.academics.program.bachelors.english'],
              col['latest.academics.program.bachelors.humanities'],
              col['latest.academics.program.bachelors.library'],
              col['latest.academics.program.bachelors.biological'],
              col['latest.academics.program.bachelors.mathematics'],
              col['latest.academics.program.bachelors.military'],
              col['latest.academics.program.bachelors.multidiscipline'],
              col[
                'latest.academics.program.bachelors.parks_recreation_fitness'
              ],
              col['latest.academics.program.bachelors.philosophy_religious'],
              col[
                'latest.academics.program.bachelors.theology_religious_vocation'
              ],
              col['latest.academics.program.bachelors.physical_science'],
              col['latest.academics.program.bachelors.science_technology'],
              col['latest.academics.program.bachelors.psychology'],
              col[
                'latest.academics.program.bachelors.security_law_enforcement'
              ],
              col[
                'latest.academics.program.bachelors.public_administration_social_service'
              ],
              col['latest.academics.program.bachelors.social_science'],
              col['latest.academics.program.bachelors.construction'],
              col[
                'latest.academics.program.bachelors.mechanic_repair_technology'
              ],
              col['latest.academics.program.bachelors.precision_production'],
              col['latest.academics.program.bachelors.transportation'],
              col['latest.academics.program.bachelors.visual_performing'],
              col['latest.academics.program.bachelors.health'],
              col['latest.academics.program.bachelors.business_marketing'],
              col['latest.academics.program.bachelors.history']
            )
          );
        });
        return this.colleges;
      })
    );
  }
}

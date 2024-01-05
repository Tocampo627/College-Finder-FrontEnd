import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { College } from '../entities/college';
import { EduApiService } from '../services/edu-api.service';

@Component({
  selector: 'app-majors',
  templateUrl: './majors.component.html',
  styleUrls: ['./majors.component.css'],
})
export class MajorsComponent implements OnInit {
  panelOpenState = false;
  agricultureColleges: any = [];
  architectureColleges: any = [];
  biologicalColleges: any = [];
  busMarketingColleges: any = [];
  communicationsColleges: any = [];
  communicationsAndTechColleges: any = [];
  computerScienceColleges: any = [];

  ///
  culinary: any = [];
  education: any = [];
  engineering: any = [];
  engineeringAndTechnology: any = [];
  english: any = [];
  ethicsCultureGender: any = [];
  famConsumerScience: any = [];
  health: any = [];
  history: any = [];
  humanResources: any = [];
  humanities: any = [];
  languageStudies: any = [];
  law: any = [];

  math: any = [];

  military: any = [];
  multidisciplinary: any = [];
  parks: any = [];

  philosophyandReligion: any = [];
  physicalSciences: any = [];
  psychology: any = [];
  publicAdminSocialEvents: any = [];

  securityandLawEnforcement: any = [];
  socialSciences: any = [];
  theologyReligionStudies: any = [];
  transportaitonManagement: any = [];
  visualPerformingArts: any = [];

  constructor(private schoolInfo: EduApiService) {}

  loadByMajor() {
    this.schoolInfo.getData().subscribe((data) =>
      data?.forEach((col) => {
        if (col.agriculture == 1) {
          this.agricultureColleges.push(col.name);
        }
        if (col.architecture == 1) {
          this.architectureColleges.push(col.name);
        }
        if (col.biological == 1) {
          this.biologicalColleges.push(col.name);
        }
        if (col.business_marketing == 1) {
          this.busMarketingColleges.push(col.name);
        }
        if (col.communication == 1) {
          this.communicationsColleges.push(col.name);
        }
        if (col.communicationsTechnology == 1) {
          this.communicationsAndTechColleges.push(col.name);
        }
        if (col.computer == 1) {
          this.computerScienceColleges.push(col.name);
        }

        if (col.culinary == 1) {
          this.culinary.push(col.name);
        }
        if (col.education == 1) {
          this.education.push(col.name);
        }
        if (col.engineering == 1) {
          this.engineering.push(col.name);
        }
        if (col.engineering_technology == 1) {
          this.engineeringAndTechnology.push(col.name);
        }
        if (col.english == 1) {
          this.english.push(col.name);
        }
        if (col.ethnicCulturalGender == 1) {
          this.ethicsCultureGender.push(col.name);
        }
        if (col.family_consumer_science == 1) {
          this.famConsumerScience.push(col.name);
        }
        if (col.health == 1) {
          this.health.push(col.name);
        }
        if (col.history == 1) {
          this.history.push(col.name);
        }
        if (col.resources == 1) {
          this.humanResources.push(col.name);
        }
        if (col.humanities == 1) {
          this.humanities.push(col.name);
        }
        if (col.language == 1) {
          this.languageStudies.push(col.name);
        }
        if (col.legal == 1) {
          this.law.push(col.name);
        }

        if (col.mathematics == 1) {
          this.math.push(col.name);
        }

        if (col.military == 1) {
          this.military.push(col.name);
        }
        if (col.multidiscipline == 1) {
          this.multidisciplinary.push(col.name);
        }
        if (col.parks_recreation_fitness == 1) {
          this.parks.push(col.name);
        }

        if (col.philosophy_religious == 1) {
          this.philosophyandReligion.push(col.name);
        }
        if (col.physical_science == 1) {
          this.physicalSciences.push(col.name);
        }
        if (col.psychology == 1) {
          this.psychology.push(col.name);
        }
        if (col.public_administration_social_service == 1) {
          this.publicAdminSocialEvents.push(col.name);
        }

        if (col.security_law_enforcement == 1) {
          this.securityandLawEnforcement.push(col.name);
        }
        if (col.social_science == 1) {
          this.socialSciences.push(col.name);
        }
        if (col.theology_religious_vocation == 1) {
          this.theologyReligionStudies.push(col.name);
        }
        if (col.transportation == 1) {
          this.transportaitonManagement.push(col.name);
        }
        if (col.visual_performing == 1) {
          this.visualPerformingArts.push(col.name);
        }
      })
    );
  }

  ngOnInit(): void {
    this.loadByMajor();
  }
}

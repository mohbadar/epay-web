import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import {AddEducationComponent} from './detail-employee/components/education/add-education-profile/add-education.component';
import {EditEducationComponent} from './detail-employee/components/education/edit-education-profile/edit-education.component';
import { ChecklistDetailsComponent } from './detail-employee/components/checklist-details/checklist-details.component';
import {AddAcademicDegreeComponent} from './detail-employee/components/academic-degree/add-academic-degree-profile/add-academic-degree.component';
import {EditAcademicDegreeComponent} from './detail-employee/components/academic-degree/edit-academic-degree-profile/edit-academic-degree.component';
import {AddPublicationComponent} from './detail-employee/components/publication/add-publication-profile/add-publication.component';
import {EditPublicationComponent} from './detail-employee/components/publication/edit-publication-profile/edit-publication.component';
import {AddHonoraryComponent} from './detail-employee/components/honorary/add-honorary-profile/add-honorary.component';
import {EditHonoraryComponent} from './detail-employee/components/honorary/edit-honorary-profile/edit-honorary.component';
import {DocumentProfileComponent} from './detail-employee/components/document-details-profile/document-profile.component';
import {AddMedalComponent} from './detail-employee/components/medal/add-medal-profile/add-medal.component';
import {EditMedalComponent} from './detail-employee/components/medal/edit-medal-profile/edit-medal.component';
import {AddRewardComponent} from './detail-employee/components/reward/add-reward-profile/add-reward.component';
import {EditRewardComponent} from './detail-employee/components/reward/edit-reward-profile/edit-reward.component';
import {AddPaneltyComponent} from './detail-employee/components/panelty/add-panelty-profile/add-panelty.component';
import {EditPaneltyComponent} from './detail-employee/components/panelty/edit-panelty-profile/edit-panelty.component';
import {AddTravelComponent} from './detail-employee/components/travel/add-travel-profile/add-travel.component';
import {AddFamilyComponent} from './detail-employee/components/family/add-family-profile/add-family.component';
import {EditFamilyComponent} from './detail-employee/components/family/edit-family-profile/edit-family.component';
import {AddMedicalComponent} from './detail-employee/components/medical/add-medical-profile/add-medical.component';
import {EditMedicalComponent} from './detail-employee/components/medical/edit-medical-profile/edit-medical.component';
import {AddMilitaryComponent} from './detail-employee/components/military/add-military-profile/add-military.component';
import {EditMilitaryComponent} from './detail-employee/components/military/edit-military-profile/edit-military.component';
import {EditTravelComponent} from './detail-employee/components/travel/edit-travel-profile/edit-travel.component';
import {AddCrimeComponent} from './detail-employee/components/crime/add-crime-profile/add-crime.component';
import {EditCrimeComponent} from './detail-employee/components/crime/edit-crime-profile/edit-crime.component';
import {AddSalaryComponent} from './detail-employee/components/salary/add-salary-profile/add-salary.component';
import {EditSalaryComponent} from './detail-employee/components/salary/edit-salary-profile/edit-salary.component';
import {AddTransferComponent} from './detail-employee/components/transfer/add-transfer-profile/add-transfer.component';
import {AddPromotionProfileComponent} from './detail-employee/components/promotion/add-promotion-profile/add-promotion-profile.component';
import {AddFiredComponent} from './detail-employee/components/fired/add-fired-profile/add-fired.component';
import {SettingDetailsComponent} from './detail-employee/components/setting-details-profile/setting-details.component';
import {AddTrainingComponent} from './detail-employee/components/training/add-training-profile/add-training.component';
import {EditTrainingComponent} from './detail-employee/components/training/edit-training-profile/edit-training.component';
import {AddAccountablityComponent} from './detail-employee/components/accountability/add-accountability-profile/add-accountability.component';
import {EditAccountablityComponent} from './detail-employee/components/accountability/edit-accountability-profile/edit-accountability.component';
import {EditFiredComponent} from './detail-employee/components/fired/edit-fired-profile/edit-fired.component';
import {EditPromotionProfileComponent} from './detail-employee/components/promotion/edit-promotion-profile/edit-promotion-profile.component';
import {EditTransferComponent} from './detail-employee/components/transfer/edit-transfer-profile/edit-transfer.component';
import {AddPartyComponent} from './detail-employee/components/political-party/add-political-party-profile/add-party.component';
import {EditPartyComponent} from './detail-employee/components/political-party/edit-political-party-profile/edit-party.component';
import {ApproveProfileComponent} from './detail-employee/components/approve-profile/approve-profile.component';
import {AddJobBreakComponent} from './detail-employee/components/job-break/add-job-break-profile/add-job-break.component';
import {EditJobBreakComponent} from './detail-employee/components/job-break/edit-job-break-profile/edit-job-break.component';
import {AddRetirementComponent} from './detail-employee/components/retirement/add-retirement-profile/add-retirement.component';
import {EditRetirementComponent} from './detail-employee/components/retirement/edit-retirement-profile/edit-retirement.component';
import {HistoryEducationComponent} from './detail-employee/components/education/history-education-profile/history-history.component';
import {HistoryProfileJobComponent} from './detail-employee/components/history-profileJob-profile/history-profilejob.component';
import {HistoryTrainingComponent} from './detail-employee/components/training/history-training-profile/history-training.component';
import {HistoryRewardComponent} from './detail-employee/components/reward/history-reward-profile/history-reward.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { SharedModule } from 'app/template/shared/shared.module';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ArchwizardModule } from 'angular-archwizard';

export const routes: Routes = [
	{
		path: '',
		component: EmployeeComponent,
		pathMatch:  'full'
	},
	{
		path: 'add',
		component: CreateEmployeeComponent,
	},
	{
		path: ':id',
		component: DetailEmployeeComponent,
	},
];

@NgModule({
  declarations: [EmployeeComponent, DetailEmployeeComponent, CreateEmployeeComponent,
    AddEducationComponent, EditEducationComponent,ChecklistDetailsComponent, AddAccountablityComponent,EditAccountablityComponent,AddPartyComponent, AddJobBreakComponent,
    AddAcademicDegreeComponent, EditAcademicDegreeComponent, AddPublicationComponent, EditPublicationComponent,AddHonoraryComponent,EditHonoraryComponent,AddRewardComponent,AddFiredComponent, EditTransferComponent,EditPartyComponent,EditJobBreakComponent,HistoryProfileJobComponent,HistoryTrainingComponent,
    EditRewardComponent, DocumentProfileComponent, AddPaneltyComponent, EditPaneltyComponent, AddMedalComponent, EditMedalComponent, AddFamilyComponent,AddCrimeComponent, AddSalaryComponent,AddTransferComponent, ApproveProfileComponent,HistoryEducationComponent,HistoryRewardComponent,
    EditFamilyComponent, AddMedicalComponent, EditMedicalComponent, AddMilitaryComponent, EditMilitaryComponent, AddTravelComponent, EditTravelComponent, EditCrimeComponent, EditSalaryComponent, AddPromotionProfileComponent,
    SettingDetailsComponent, AddTrainingComponent,EditTrainingComponent, EditFiredComponent,EditPromotionProfileComponent,AddRetirementComponent,EditRetirementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		NgbModule,
		NgxDatatableModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		NgSelectModule,
		NgxSpinnerModule,
    PipeModule,
    SharedModule,
    UiSwitchModule,
    ImageCropperModule,
		ReactiveFormsModule,
    ArchwizardModule,
    CustomFormsModule,
		NgSelectModule,
		NgxChartsModule,
  ]
})
export class EmployeeModule { }

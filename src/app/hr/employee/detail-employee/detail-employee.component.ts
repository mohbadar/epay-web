import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EditPublicationComponent } from 'app/library/publication/edit-publication/edit-publication.component';
import { AcademicDegreeService } from 'app/services/academic-degree.service';
import { AccountabilityService } from 'app/services/accountability.service';
import { CrimeService } from 'app/services/crime.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { FamilyService } from 'app/services/family.service';
import { HonoraryService } from 'app/services/honorary.service';
import { MedalService } from 'app/services/medal.service';
import { MedicalService } from 'app/services/medical.service';
import { PaneltyService } from 'app/services/panelty.service';
import { PoliticalPartyService } from 'app/services/political-party.service';
import { ProfileFiredService } from 'app/services/profile-fired.service';
import { PublicationService } from 'app/services/publication.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service';
import { AddAcademicDegreeComponent } from './components/academic-degree/add-academic-degree-profile/add-academic-degree.component';
import { EditAcademicDegreeComponent } from './components/academic-degree/edit-academic-degree-profile/edit-academic-degree.component';
import { AddAccountablityComponent } from './components/accountability/add-accountability-profile/add-accountability.component';
import { EditAccountablityComponent } from './components/accountability/edit-accountability-profile/edit-accountability.component';
import { ApproveProfileComponent } from './components/approve-profile/approve-profile.component';
import { ChecklistDetailsComponent } from './components/checklist-details/checklist-details.component';
import { AddCrimeComponent } from './components/crime/add-crime-profile/add-crime.component';
import { EditCrimeComponent } from './components/crime/edit-crime-profile/edit-crime.component';
import { DocumentProfileComponent } from './components/document-details-profile/document-profile.component';
import { AddFamilyComponent } from './components/family/add-family-profile/add-family.component';
import { EditFamilyComponent } from './components/family/edit-family-profile/edit-family.component';
import { AddFiredComponent } from './components/fired/add-fired-profile/add-fired.component';
import { EditFiredComponent } from './components/fired/edit-fired-profile/edit-fired.component';
import { HistoryProfileJobComponent } from './components/history-profileJob-profile/history-profilejob.component';
import { AddHonoraryComponent } from './components/honorary/add-honorary-profile/add-honorary.component';
import { EditHonoraryComponent } from './components/honorary/edit-honorary-profile/edit-honorary.component';
import { AddJobBreakComponent } from './components/job-break/add-job-break-profile/add-job-break.component';
import { EditJobBreakComponent } from './components/job-break/edit-job-break-profile/edit-job-break.component';
import { AddMedalComponent } from './components/medal/add-medal-profile/add-medal.component';
import { EditMedalComponent } from './components/medal/edit-medal-profile/edit-medal.component';
import { AddMedicalComponent } from './components/medical/add-medical-profile/add-medical.component';
import { EditMedicalComponent } from './components/medical/edit-medical-profile/edit-medical.component';
import { AddMilitaryComponent } from './components/military/add-military-profile/add-military.component';
import { EditMilitaryComponent } from './components/military/edit-military-profile/edit-military.component';
import { MilitaryService } from './components/military/military.service';
import { AddPaneltyComponent } from './components/panelty/add-panelty-profile/add-panelty.component';
import { EditPaneltyComponent } from './components/panelty/edit-panelty-profile/edit-panelty.component';
import { AddPartyComponent } from './components/political-party/add-political-party-profile/add-party.component';
import { EditPartyComponent } from './components/political-party/edit-political-party-profile/edit-party.component';
import { AddPromotionProfileComponent } from './components/promotion/add-promotion-profile/add-promotion-profile.component';
import { EditPromotionProfileComponent } from './components/promotion/edit-promotion-profile/edit-promotion-profile.component';
import { AddRetirementComponent } from './components/retirement/add-retirement-profile/add-retirement.component';
import { EditRetirementComponent } from './components/retirement/edit-retirement-profile/edit-retirement.component';
import { RetirmentService } from './components/retirement/retirement.service';
import { AddRewardComponent } from './components/reward/add-reward-profile/add-reward.component';
import { EditRewardComponent } from './components/reward/edit-reward-profile/edit-reward.component';
import { HistoryRewardComponent } from './components/reward/history-reward-profile/history-reward.component';
import { RewardService } from './components/reward/reward.service';
import { AddSalaryComponent } from './components/salary/add-salary-profile/add-salary.component';
import { EditSalaryComponent } from './components/salary/edit-salary-profile/edit-salary.component';
import { SalaryService } from './components/salary/salary.service';
import { SettingDetailsComponent } from './components/setting-details-profile/setting-details.component';
import { AddTrainingComponent } from './components/training/add-training-profile/add-training.component';
import { EditTrainingComponent } from './components/training/edit-training-profile/edit-training.component';
import { HistoryTrainingComponent } from './components/training/history-training-profile/history-training.component';
import { TrainingService } from './components/training/training.service';
import { AddTransferComponent } from './components/transfer/add-transfer-profile/add-transfer.component';
import { EditTransferComponent } from './components/transfer/edit-transfer-profile/edit-transfer.component';
import { TransferService } from './components/transfer/transfer.service';
import { AddTravelComponent } from './components/travel/add-travel-profile/add-travel.component';
import { EditTravelComponent } from './components/travel/edit-travel-profile/edit-travel.component';
import { TravelService } from './components/travel/travel.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit {
	@ViewChild('inmateImage') inmateImage: ElementRef;
  attachmentFile: any;
  attachmentAdded: boolean;
  isCollapsed = true;
  totalSalary = new Array();
  profileId;
  allAcademicDegree;
  allDocuments;
  allPublicatoin;
  allHonoraryServies;
  allPanelties;
  allFamily;
  allSalaries;
  allMedals;
  allMedical:any;
  showFamilyCount:boolean = false;
  allRewards;
  allData$;
  allTravels;
  allCrimes;
  allTransfers;
  allPromotions;
  alltrainings;
  allMilitaryService;
  allWorkExperience;
  allfired;
  allAccountabilities;
  allRetirements;
  recordDocument;
  totalProgress = 0;
  data;
  checklist;
  loading = false;
  Tab = {
    primaryInfo: false,
    education: false,
    reward: false,
    panelty: false,
    Hononary_service: false,
    medal: false,
    family_members: false,
    medical: false,
    military: false,
    travel: false,
    transfer: false,
    promotion: false,
    salary: false,
    accountability: false,
    off_duty_crime: false,
    fired_from_duty: false,
    photo: false,
    document: false,
    publication: false,
    academic_degree: false,
    training: false, 
    political_party: false,
    resignation:false,
    id:false

  };
  dobGregorianA;
  progressBarCounter = 0;
  showViewData: boolean = false;
  activeTab = "general";
  generalFormSubmitted = false;
  changePasswordFormSubmitted = false;
  infoFormSubmitted = false;
  alertVisible = true;
  medicalReportShow : boolean = false;
  allEducation;
  allPoliticalParties;
  profilejobid;
  workYears;
  workMonths;
  workDays;

  toBeDeletedRecordId: any;
  deleteType:any;
  addForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    public translate: TranslateService,
    private cdref: ChangeDetectorRef,
    private honoraryService: HonoraryService,
    private paneltyService: PaneltyService,
    // private documentemployeeService: DocumentemployeeService,
    public toastr: ToastrService,
    // public profileJobService: WorkExperienceService,
    private transferService: TransferService,
    private familyService: FamilyService,
    public academicDegreeService: AcademicDegreeService,
    private travelService: TravelService,
    private medalService: MedalService,
    public publicationService: PublicationService,
    private router: Router,
    public globals: Globals,
    private politicalPartyService: PoliticalPartyService,
    private accountabilityService: AccountabilityService,
    private trainingService:TrainingService,
    private firedService: ProfileFiredService,
    // private promotionService: PromotionemployeeService,
    private salaryService: SalaryService,
    private crimeService: CrimeService,
    private militaryService: MilitaryService,
    private medicalSerice: MedicalService,
    private http: HttpClient,
    private retirementService: RetirmentService,
    private dConvert: DateConvertService,
    private formBuilder: FormBuilder,
    private rewardService: RewardService,
    public spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private authService: AuthService,
  ) {
    this.profileId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    console.log("profile ID: ", this.profileId);
    this.loadMainData();
    this.loadCheckList();
    

    this.addForm = this.formBuilder.group({
      gregorian:[null],
      jalali:[null],
    });



    if (localStorage.getItem('tab')) {
      this.activeTab = localStorage.getItem('tab');
      this.loadTabInfo(this.activeTab);
    }

    this.calcuateWorkExperience();


  }

  confirmDeletedModelDetail(deleteContent,content, id) {
    console.log("iddd", id);
    this.deleteType = content;
    this.toBeDeletedRecordId = id;
    this.modalService.open(deleteContent, { ariaLabelledBy: "modal-basic-title" });
  }

  generateDeleteRecord(){
    console.log("delted id: ", this.toBeDeletedRecordId);
    console.log("delete type: ", this.deleteType);
    switch (this.deleteType) {
      case 'education':
        this.deleteEducation();
        break;
      case 'work':
        this.deleteWorkBreak();
        break;
      case 'training':
        this.deleteTraining();
        break;
      case 'reward':
        this.deleteReward();
        break;
      case 'panelty':
        this.deletePanelty();
        break;
      case 'publication':
        this.deletePublication();
        break;
      case 'hononary':
        this.deleteHononary();
        break;
      case 'medal':
        this.deleteMedal();
        break;
      case 'family':
        this.deleteFamily();
        break;
      case 'medical':
        this.deleteMedical();
        break;
      case 'military':
        this.deleteMilitary();
        break;
      case 'party':
        this.deleteParty();
        break;
      case 'travel':
        this.deleteTravel();
        break;
      case 'transfer':
        this.deleteTransfer();
        break;
      case 'promotion':
        this.deletePromotion();
        break;
      case 'academic':
        this.deleteAcademic();
        break;
      case 'salary':
        this.deleteSalary();
        break;
      case 'accountability':
        this.deleteAccountability();
        break;
      case 'crime':
        this.deleteCrime();
        break;
      case 'fired':
        this.deletedFired();
        break;
      case 'retirement':
        this.deleteRetirement();
        break;
      
    }
  }

  

  deleteRetirement(){
    console.log("retirement type: ", this.deleteType);
    console.log("retirement id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.retirementService.deleteRetirement(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadRetirements();
        this.ShowSuccessToast("RETIREMENT","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
        this.reloadPage();
      }, err=>{
          this.ShowErrorToast("RETIREMENT","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deletedFired(){
    console.log("fired type: ", this.deleteType);
    console.log("fired id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.firedService.deleteFired(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadFired();
        this.ShowSuccessToast("FIRED_FROM_DUTY","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("FIRED_FROM_DUTY","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteCrime(){
    console.log("crime type: ", this.deleteType);
    console.log("crime id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.crimeService.deleteCrime(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadCrimes();
        this.ShowSuccessToast("OFF_DUTY_CRIMES","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("OFF_DUTY_CRIMES","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteAccountability()
  {
    console.log("accountability type: ", this.deleteType);
    console.log("accountability id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.accountabilityService.deleteAccountability(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadAccountability();
        this.ShowSuccessToast("ACCOUNTABILITY","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("ACCOUNTABILITY","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }

  }

  deleteSalary(){
    console.log("salary type: ", this.deleteType);
    console.log("salary id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.salaryService.deleteSalary(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadSalary();
        this.ShowSuccessToast("SALARY","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("SALARY","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }

  }

  deleteAcademic(){
    console.log("academic type: ", this.deleteType);
    console.log("academic id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.academicDegreeService.deleteAcademicDegree(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadAcademicDegree();
        this.ShowSuccessToast("ACADEMIC-DEGREE","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("ACADEMIC-DEGREE","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deletePromotion(){
    console.log("promotion type: ", this.deleteType);
    console.log("promotion id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
    //   this.promotionService.deletePromotion(this.toBeDeletedRecordId).subscribe(res=>{
    //     console.log("record deleted successfully");
    //     this.loadPromotion();
    //     this.ShowSuccessToast("PROMOTION","DELETED_SUCCESSFULLY");
    //     this.toBeDeletedRecordId = null;
    //     this.deleteType = null;
    //     this.reloadPage();
    //   }, err=>{
    //       this.ShowErrorToast("PROMOTION","FAILED_DELETE");
    //       this.toBeDeletedRecordId = null;
    //       this.deleteType = null;
    //   });
    }
  }

  deleteTransfer(){
    console.log("transfer type: ", this.deleteType);
    console.log("transfer id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.transferService.deleteTransfer(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadTransfer();
        this.ShowSuccessToast("TRANSFER","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
        this.reloadPage();
      }, err=>{
          this.ShowErrorToast("TRANSFER","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteTravel(){
    console.log("travel type: ", this.deleteType);
    console.log("travel id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.travelService.deleteTravel(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadTravel();
        this.ShowSuccessToast("TRAVEL_INFORMATION","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("TRAVEL_INFORMATION","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteParty(){
    console.log("party type: ", this.deleteType);
    console.log("party id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.politicalPartyService.deleteParty(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadPoliticalParty();
        this.ShowSuccessToast("POLITICAL_PARTY","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("POLITICAL_PARTY","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteMilitary(){
    console.log("Military type: ", this.deleteType);
    console.log("Military id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.militaryService.deleteMilitary(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadMilitaryService();
        this.ShowSuccessToast("MILITARY_SERVICE","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("MILITARY_SERVICE","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteMedical(){
    console.log("medical type: ", this.deleteType);
    console.log("medical id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.medicalSerice.deleteMedical(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadMedicalReport();
        this.ShowSuccessToast("MEDICAL_REPORT","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
        this.reloadPage();
      }, err=>{
          this.ShowErrorToast("MEDICAL_REPORT","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteFamily(){
    console.log("Family type: ", this.deleteType);
    console.log("Family id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.familyService.deleteFamilyMember(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadFamilyMember();
        this.ShowSuccessToast("FAMILY_MEMBERS","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
        this.reloadPage();
      }, err=>{
          this.ShowErrorToast("FAMILY_MEMBERS","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteMedal(){
    console.log("medal type: ", this.deleteType);
    console.log("medal id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.medalService.deleteMedal(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadMedal();
        this.ShowSuccessToast("MEDAL_MARK","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("MEDAL_MARK","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteHononary(){
    console.log("hononary type: ", this.deleteType);
    console.log("hononary id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.honoraryService.deleteHonorary(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadHonorary();
        this.ShowSuccessToast("HONORARY_SERVICE","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("HONORARY_SERVICE","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deletePublication(){
    console.log("publication type: ", this.deleteType);
    console.log("publication id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.publicationService.deletePublication(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.LoadPublication();
        this.ShowSuccessToast("PUBLICATION","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("PUBLICATION","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }

  }

  deletePanelty(){
    console.log("panelty type: ", this.deleteType);
    console.log("panelty id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.paneltyService.deletePanelty(this.toBeDeletedRecordId).subscribe(res=>{ 
        console.log("record deleted successfully");
        this.loadPanelty();
        this.ShowSuccessToast("PENALTY","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
        this.reloadPage();
      }, err=>{
          this.ShowErrorToast("PENALTY","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteReward(){
    console.log("reward type: ", this.deleteType);
    console.log("reward id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.rewardService.deleteReward(this.toBeDeletedRecordId).subscribe(res=>{
        console.log("record deleted successfully");
        this.loadReward();
        this.ShowSuccessToast("REWARD","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("REWARD","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteEducation(){
    // this.educationService.deleteEducation(this.toBeDeletedRecordId).subscribe(res=>{
    //   console.log("record deleted successfully");
    //   this.LoadEducation();
    //   this.ShowSuccessToast("EDUCATION","DELETED_SUCCESSFULLY");
    //   this.toBeDeletedRecordId = null;
    //   this.deleteType = null;
    // }, err=>{
    //     this.ShowErrorToast("EDUCATION","FAILED_DELETE");
    //     this.toBeDeletedRecordId = null;
    //     this.deleteType = null;
    // });
  }

  deleteWorkBreak(){
    if(this.toBeDeletedRecordId != null){
      this.employeeService.deleteBreakProfileJob(this.toBeDeletedRecordId).subscribe(res=>{
        this.loadWorkExperience();
        this.ShowSuccessToast("WORK_EXPERIENCE","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("WORK_EXPERIENCE","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  deleteTraining(){
    console.log("triaiing type: ", this.deleteType);
    console.log("traing id:", this.toBeDeletedRecordId);
    if(this.toBeDeletedRecordId != null){
      this.trainingService.deleteTraining(this.toBeDeletedRecordId).subscribe(res=>{
        this.loadTraining();
        this.ShowSuccessToast("SEMINAR","DELETED_SUCCESSFULLY");
        this.toBeDeletedRecordId = null;
        this.deleteType = null;
      }, err=>{
          this.ShowErrorToast("SEMINAR","FAILED_DELETE");
          this.toBeDeletedRecordId = null;
          this.deleteType = null;
      });
    }
  }

  historyEduction(id){
    // console.log("history id: ", id);
    // this.open(id, HistoryEducationComponent, 'view', 'xl');
  }
  
  historyWorkExperience(id){
    
    this.open(id, HistoryProfileJobComponent, 'view', 'xl');
  }

  historyTraining(id){
    this.open(id, HistoryTrainingComponent, 'view', 'xl');
  }

  historyReward(id){
    this.open(id, HistoryRewardComponent, 'view', 'xl');
    
  }


  calcuateWorkExperience(){
    this.employeeService.getWordExperienceByProfile(this.profileId).subscribe(res=>{
      console.log("Data of Work Experience: ", res);
      this.workYears = res["years"];
      this.workMonths = res["months"];
      this.workDays = res["days"];
    }, err=>{
      console.log("error in work experince loading", err);
    });
  }


  loadMainData() {
    this.spinner.show();
    this.loading = true;
    this.employeeService.getRecordById(this.profileId).subscribe(res => {
      const allData = res;
      this.data = allData['employee'];
      this.dobGregorianA = new Date(this.data.dobGregorian).toLocaleDateString("en-US");
      console.log("All Data: ", this.data);
      this.showViewData = true;
      this.cdref.detectChanges();
      this.spinner.hide();
      this.loading = false;
    }, err => {
      console.log("Error In Retreiving Data");
      this.spinner.hide();
      this.loading = false;
      this.authService.checkUserLogin();
    });
  }

  dateChanger(){
    console.log("working fine");
    let gregorian = this.addForm.get("gregorian").value;
    let jalali = this.addForm.get("jalali").value;
    if(gregorian){
      console.log("gregorian selected: ", gregorian);
      let newJalali = this.dConvert.convertToDariDate(gregorian);
      this.addForm.get("jalali").setValue(newJalali);

    }
    else if (jalali){
      console.log("jalali selected: ", jalali);
      let newGregorian = this.dConvert.convertToGregorianDate(jalali);
      this.addForm.get("gregorian").setValue(newGregorian);
    }
  }


  loadCheckList() {
    this.employeeService.getProfileChecklist(this.profileId).subscribe(res => {
      this.checklist = res;
      console.log("profileChecklist: ", res);
      this.findChecklist();
    }, err => {
      console.log("checklist Error: ", err);
      this.checklist = err;
    });
  }

  loadWorkExperience(){
    this.spinner.show();
    this.loading = true;
    // this.profileJobService.getJobByProfile(this.profileId).subscribe(res => {
    //   this.allWorkExperience = res;
    //   console.log("work experience: ", res);
    //   this.cdref.detectChanges();
    //   this.spinner.hide();
    //   this.loading = false;
    // }, err => {
    //   console.log("work experience: ", err);
    //   this.spinner.hide();
    //   this.loading = false;
    // });
  }

  loadTraining(){
    this.trainingService.getTrainingByProfile(this.profileId).subscribe(res => {
      console.log("Training from Server: ", res);
      this.alltrainings = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Training Error: ", err);
      this.alltrainings = err;
    });
  }

  editTraining(id){
    console.log(id);
    this.trainingService.getTraining(id).subscribe(res => {
      let data = res['objection'];
      console.log("Training: ", data);
      this.open(data, EditTrainingComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding training: ",);
    });

  }

  
  editRetirement(id){
    console.log("id", id);

    this.retirementService.getRetirement(id).subscribe(res => {
      let data = res['objection'];
      console.log("Retirement Data: ", data);
      this.open(data, EditRetirementComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding training: ",);
    });
  }

  loadSalary(){
    this.salaryService.getSalaryByProfile(this.profileId).subscribe(res => {
      console.log("Salary from Server: ", res);
      this.allSalaries = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Salary Error: ", err);
      this.allSalaries = err;
    });
  }

  calculateSalary(data){
    if(data.length != 0)
    {
        var p: number = + data.original + data.originalSalary + data.patentSalary + data.extraSalary + data.macul + data.cadreSalary;
        
         return p;
    }
  }

  open(surveyData, component, cType = 'other', size = 'lg') {
    const modalRef = this.modalService.open(component, {
      centered: true,
      size: <any>size,
      backdrop: cType == 'view' ? true : 'static',
      keyboard: cType == 'view' ? true : false
    });
    if (surveyData) {
      modalRef.componentInstance.data = surveyData;
    }

    modalRef.result.then(data => {
      switch (data.type) {
        case 'edit':
          this.ShowSuccessToast(data.title, 'Successfully edited');
          this.reloadPage();
          break;
        case 'create':
          this.ShowSuccessToast(data.title, 'Successfully created');
          this.reloadPage();
          break;
        case 'photo':
          this.ShowSuccessToast(data.title, 'Successfully Uploaded');
          this.reloadPage();
          break;
        case 'document':
          this.ShowSuccessToast(data.title, 'Successfully Uploaded');
          break;
        case 'approve':
          this.ShowSuccessToast(data.title, 'Successfully_done');
          this.reloadPage();
          break;
      }
    }).catch(err => {
      console.log('Modal dismissed');
    });
  }



  ShowSuccessToast(title, message) {
    const header = this.translate.instant(title);
    const msg = this.translate.instant(message);
    this.toastr.success(msg, header, {
      positionClass: 'toast-top-left',
    });
  }

  ShowErrorToast(title, message) {
    const header = this.translate.instant(title);
    const msg = this.translate.instant(message);
    this.toastr.error(msg, header, {
      positionClass: 'toast-top-left',
    });
  }

  addRetirement(){
    this.open(this.profileId, AddRetirementComponent, 'create', 'md');
  }

  addJobBreak(){   
    this.open(this.profileId, AddJobBreakComponent, 'create', 'md'); 
  }

  addPanelty(){
    this.open(this.profileId, AddPaneltyComponent, 'create', 'md'); 
  }

  addAccountability(){
    this.open(this.profileId, AddAccountablityComponent, 'create', 'md'); 
  }

  viewProfile(){
    // this.open(this.profileId, ViewProfileComponent, 'create', 'xl'); 
  }

  approveProfile()
  {
    this.open(this.profileId, ApproveProfileComponent, 'approve', 'md'); 
  }

  loadAccountability(){
    this.accountabilityService.getAccountabilityByProfile(this.profileId).subscribe(res => {
      console.log("Accountability from Server: ", res);
      this.allAccountabilities = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Accountability Error: ", err);
    });
  }

  loadRetirements(){
    this.retirementService.getRetirementByProfile(this.profileId).subscribe(res => {
      console.log("Retirement from Server: ", res);
      this.allRetirements = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Retirement Error: ", err);
    });
  }

  addEducation() {
    // this.open(this.profileId, AddEducationComponent, 'create', 'md');
  }

  addPublication() {
    // this.open(this.profileId, AddPublicationComponent, 'create', 'md');
  }

  openChecklist() {
    this.open(this.Tab, ChecklistDetailsComponent, 'create', 'md');
  }

  editPublication(id) {
    console.log("publication Id: ", id);
    this.publicationService.getPublication(id).subscribe(res => {
      let data = res['objection'];
      console.log("Publication: ", data);
      this.open(data, EditPublicationComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding publication: ",);
    });

  }

  editBreakJob(id){
    console.log("profile Job", id);
    
    this.employeeService.getProfileJobById(id).subscribe(res=>{
      let data = res['objection'];
      this.open(data, EditJobBreakComponent, 'edit', 'md');
    }, err=>{
      console.log("error in profile job");
    });
  }

  addHonorary() {
    this.open(this.profileId, AddHonoraryComponent, 'create', 'md');

  }

  addMedal(){
    this.open(this.profileId, AddMedalComponent, 'create', 'md');
  }

  editMedal(id){
    this.medalService.getMedal(id).subscribe(res => {
      let data = res['objection'];
      console.log("Medal: ", data);
      this.open(data, EditMedalComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding Honorary: ",);
    });

  }

  addFamilyMember(){
    this.open(this.profileId, AddFamilyComponent, 'create', 'md');
  }

  loadFamilyMember(){
    this.familyService.getFamilyMemberByProfile(this.profileId).subscribe(res => {
      console.log("Honorary from Server: ", res);
      this.allFamily = res;
      if(this.allFamily.length != 0)
         {this.showFamilyCount = true;}
      this.cdref.detectChanges();
    }, err => {
      console.log("Honorary Error: ", err);
      this.allFamily = err;
    });
  }

  loadMedal(){
    this.medalService.getMedalByProfile(this.profileId).subscribe(res => {
      console.log("Honorary from Server: ", res);
      this.allMedals = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Honorary Error: ", err);
      this.allMedals = err;
    });
  }

  loadHonorary() {
    this.honoraryService.getHonoraryByProfile(this.profileId).subscribe(res => {
      console.log("Honorary from Server: ", res);
      this.allHonoraryServies = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Honorary Error: ", err);
      this.allHonoraryServies = err;
    });
  }

  editHonorary(id) {
    console.log("Honorary Id: ", id);
    this.honoraryService.getHonorary(id).subscribe(res => {
      let data = res['objection'];
      console.log("Honorary: ", data);
      this.open(data, EditHonoraryComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding Honorary: ",);
    });

  }

  loadPanelty(){
    this.paneltyService.getPaneltyByProfile(this.profileId).subscribe(res => {
      console.log("Panelty from Server: ", res);
      this.allPanelties = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Panelty Error: ", err);
      this.allPanelties = err;
    });
  }



  findChecklist() {
    this.Tab.primaryInfo = (this.checklist.find(i => i.title === 'Info')).status;
    if (this.Tab.primaryInfo) { this.progressBarCounter += 2; }

    this.Tab.education = (this.checklist.find(i => i.title === 'education')).status;
    if (this.Tab.education) { this.progressBarCounter += 1; }

    this.Tab.publication = (this.checklist.find(i => i.title === 'publication')).status;
    if (this.Tab.publication) { this.progressBarCounter += 1; }

    this.Tab.reward = (this.checklist.find(i => i.title === 'reward')).status;
    if (this.Tab.reward) { this.progressBarCounter += 1; }

    this.Tab.panelty = (this.checklist.find(i => i.title === 'panelty')).status;
    if (this.Tab.panelty) { this.progressBarCounter += 1; }

    this.Tab.Hononary_service = (this.checklist.find(i => i.title === 'hononary')).status;
    if (this.Tab.Hononary_service) { this.progressBarCounter += 1; }

    this.Tab.medal = (this.checklist.find(i => i.title === 'medal')).status;
    if (this.Tab.medal) { this.progressBarCounter += 1; }

    this.Tab.family_members = (this.checklist.find(i => i.title === 'family')).status;
    if (this.Tab.family_members) { this.progressBarCounter += 1; }

    this.Tab.medical = (this.checklist.find(i => i.title === 'medical')).status;
    if (this.Tab.medical) { this.progressBarCounter += 1; }

    this.Tab.military = (this.checklist.find(i => i.title === 'military')).status;
    if (this.Tab.military) { this.progressBarCounter += 1; }

    this.Tab.travel = (this.checklist.find(i => i.title === 'travel')).status;
    if (this.Tab.travel) { this.progressBarCounter += 1; }

    this.Tab.transfer = (this.checklist.find(i => i.title === 'transfer')).status;
    if (this.Tab.transfer) { this.progressBarCounter += 1; }

    this.Tab.promotion = (this.checklist.find(i => i.title === 'promotion')).status;
    if (this.Tab.promotion) { this.progressBarCounter += 1; }

    this.Tab.salary = (this.checklist.find(i => i.title === 'salary')).status;
    if (this.Tab.salary) { this.progressBarCounter += 1; }

    this.Tab.accountability = (this.checklist.find(i => i.title === 'accountability')).status;
    if (this.Tab.accountability) { this.progressBarCounter += 1; }

    this.Tab.off_duty_crime = (this.checklist.find(i => i.title === 'crime')).status;
    if (this.Tab.off_duty_crime) { this.progressBarCounter += 1; }

    this.Tab.fired_from_duty = (this.checklist.find(i => i.title === 'fired')).status;
    if (this.Tab.fired_from_duty) { this.progressBarCounter += 1; }

    this.Tab.photo = (this.checklist.find(i => i.title === 'photo')).status;
    if (this.Tab.photo) { this.progressBarCounter += 1; }

    this.Tab.document = (this.checklist.find(i => i.title === 'document')).status;
    if (this.Tab.document) { this.progressBarCounter += 1; }

    this.Tab.academic_degree = (this.checklist.find(i => i.title === 'academic')).status;
    this.Tab.training = (this.checklist.find(i => i.title === 'training')).status;
    this.Tab.political_party = (this.checklist.find(i => i.title === 'party')).status;
    this.Tab.resignation = (this.checklist.find(i=>i.title === 'resignation')).status;
    

    this.totalProgress = this.progressBarCounter * 5;
    this.cdref.detectChanges();
  }

  editEduction(id) {
    // console.log("Education Id: ", id);
    // this.educationService.getEducation(id).subscribe(res => {
    //   let data = res['objection'];
    //   console.log("educationData: ", data);
    //   this.open(data, EditEducationComponent, 'edit', 'md');

    // }, err => {
    //   console.log("error in finding education: ",);
    // });
  }

  scrollWindow() {
    window.scrollTo({
      top: 110,
      left: 0,
      behavior: 'smooth'
    });
  }


  setActiveTab(tab) {
    this.activeTab = tab;
    localStorage.setItem('tab', tab);
  }



  imageError(el) {
    el.onerror = '';
    el.src = '../../../../assets/img/portrait/small/face-0.jpg';
    return true;
  }

  profileList() {
    this.router.navigate(['profiles']);
  }

  reloadPage() {
    // save current route first
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }

  LoadEducation() {
    // this.spinner.show();
    // this.loading = true;
    // this.educationService.getEducationByProfile(this.profileId).subscribe(res => {
    //   console.log("Education from Server: ", res);
    //   this.allEducation = res;
    //   this.cdref.detectChanges();
    //   this.spinner.hide();
    //   this.loading = false;
    // }, err => {
    //   console.log("Education Error: ", err);
    //   this.allEducation = err;
    //   this.spinner.hide();
    //   this.loading = false;
    // });

  }

  editFamilyMember(id){
    this.familyService.getFamilyMember(id).subscribe(res => {
      let data = res['objection'];
      console.log("family member: ", data);
      this.open(data, EditFamilyComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding family member: ",);
    });

  }

  loadDocument(){
    // this.documentemployeeService.getDocumentByProfile(this.profileId).subscribe(res => {
    //   console.log("Honorary from Server: ", res);
    //   this.allDocuments = res;
    //   this.cdref.detectChanges();
    // }, err => {
    //   console.log("Honorary Error: ", err);
    //   this.allDocuments = err;
    // });

  }

  deleteDocument(){
    console.log("delete document", this.recordDocument);
    // this.documentemployeeService.deleteDocument(this.recordDocument).subscribe(res=>{
    //     this.ShowSuccessToast("DOCUMENT","DELETED_SUCCESSFULLY");
    //     this.reloadPage();
    // }, err=>{
    //     this.ShowErrorToast("DOCUMENT","FAILED_DELETE");
    // });
  }

  confirmDeleteModal(content, id) {
		this.recordDocument = id;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  


  LoadPublication() {
    this.publicationService.getPublicationByProfile(this.profileId).subscribe(res => {
      console.log("Publication from Server: ", res);
      this.allPublicatoin = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Publicatoin Error: ", err);
      this.allPublicatoin = err;
    });
  }

  addParty(){
    this.open(this.profileId, AddPartyComponent, 'create', 'md');
  }

  addTraining(){
    this.open(this.profileId, AddTrainingComponent, 'create', 'md');
  }

  addMidicalService(){
    this.open(this.profileId, AddMilitaryComponent, 'create', 'md');
  }

  addAcademicDegree() {
    this.open(this.profileId, AddAcademicDegreeComponent, 'create', 'md');
  }

  addMedicalReport(){
    this.open(this.profileId, AddMedicalComponent, 'create', 'md');
  }

  loadPoliticalParty(){
    this.politicalPartyService.getPartyByProfile(this.profileId).subscribe(res => {
      console.log("Political Party from Server: ", res);
      this.allPoliticalParties = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Political Party Error: ", err);
    });
  }

  editParty(id){
    this.politicalPartyService.getParty(id).subscribe(res => {
      let data = res['objection'];
      console.log("Party: ", data);
      this.open(data, EditPartyComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding Party: ",);
    });
  }

  loadMedicalReport(){
    this.medicalSerice.getMedicalByProfile(this.profileId).subscribe(res => {
      console.log("Medical from Server: ", res);
      this.allMedical = res;
      if(this.allMedical.length != 0)
         {this.medicalReportShow = true;}
      this.cdref.detectChanges();
    }, err => {
      console.log("Medical Error: ", err);
      this.allMedical = err;
    });
  }

  editMedicalReport(id){
    this.medicalSerice.getMedical(id).subscribe(res => {
      let data = res['objection'];
      console.log("Medical: ", data);
      this.open(data, EditMedicalComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding medical: ",);
    });

  }

  loadTabInfo(type) {
    switch (type) {
      case 'general':
        break;
      case 'info':
        this.LoadEducation();
        break;
      case 'academic-degree':
        this.loadAcademicDegree();
        break;
      case 'publications':
        this.LoadPublication();
        break;
      case 'honorary-service':
        this.loadHonorary();
        break;
      case 'rewards':
        this.loadReward();
        break;
      case 'panalties':
        this.loadPanelty();
        break;
      case 'medal-mark':
        this.loadMedal();
        break;
      case 'family-members':
        this.loadFamilyMember();
        break;
      case 'medical-reports':
        this.loadMedicalReport();
        break;
      case 'military-service':
        this.loadMilitaryService();
        break;
      case 'travel-information':
        this.loadTravel();
        break;
      case 'personal-crimes':
        this.loadCrimes();
        break;
      case 'salary':
        this.loadSalary();
        break;
      case 'transfer':
        this.loadTransfer();
        break;
      case 'promotion':
        this.loadPromotion();
        break;
      case 'fired-duty':
        this.loadFired();
        break;
      case 'training':
        this.loadTraining();
        break;
      case 'work-experience':
        this.loadWorkExperience();
        this.loadMilitaryService();
        break;
      case 'accountability':
        this.loadAccountability();
        break;
      case 'political-party': 
        this.loadPoliticalParty();
        break;
      case 'retirement':
        this.loadRetirements();
        break;

    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.attachmentFile = event.target.files[0];
      console.log('FileName: ', event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e) => { // called once readAsDataURL is completed
        this.attachmentAdded = true;
        // this.imageUrl = e.target.result;
        this.inmateImage.nativeElement.src = e.target.result;
      }
    }
  }

  addFired(){
    this.open(this.profileId, AddFiredComponent, 'create', 'md');
  }

  printProfile(){
    // this.open(this.profileId, PrintProfileComponent, 'create', 'md');
  }

  editAcademicDegree(id) {
    console.log("Academic Degree Id: ", id);
    this.academicDegreeService.getAcademicDegree(id).subscribe(res => {
      let data = res['objection'];
      console.log("AcademicDegree: ", data);
      this.open(data, EditAcademicDegreeComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding education: ",);
    });
  }

  loadFired(){
    this.firedService.getFiredByProfile(this.profileId).subscribe(res => {
      console.log("Fired by profile: ", res);
      this.allfired = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Fired From Error: ", err);
      this.allfired = err;
    });
  }

  editTravel(id){
    console.log(id);
    this.travelService.getTravel(id).subscribe(res => {
      let data = res['objection'];
      console.log("Travel: ", data);
      this.open(data, EditTravelComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding education: ",);
    });
  }

  addPromotion(){
    
    this.open(this.profileId, AddPromotionProfileComponent, 'create', 'md');

  }

  profileSetting(){
    console.log("click");
    this.Tab.id = this.profileId;
    this.open(this.Tab, SettingDetailsComponent, 'create', 'md');

  }


downloadAttachment(id) {
  console.log(id);
    // this.documentemployeeService.downloadAttachment(id);
}

  loadPromotion(){
    // this.promotionService.getPromotionByProfile(this.profileId).subscribe(res => {
    //   console.log("Promotion by profile: ", res);
    //   this.allPromotions = res;
    //   this.cdref.detectChanges();
    // }, err => {
    //   console.log("Promotion From Error: ", err);
    //   this.allPromotions = err;
    // });
  }

  editSalary(id){
    this.salaryService.getSalary(id).subscribe(res => {
      let data = res['objection'];
      console.log("Salary: ", data);
      this.open(data, EditSalaryComponent, 'edit', 'md');

    }, err => {
      console.log("Salary in finding education: ",);
    });
  }

  editCrime(id){
    console.log(id);
    this.crimeService.getCrime(id).subscribe(res => {
      let data = res['objection'];
      console.log("Crime: ", data);
      this.open(data, EditCrimeComponent, 'edit', 'md');

    }, err => {
      console.log("Crime in finding education: ",);
    });
  }

  editPanelty(id){
    console.log("Reward Id: ", id);
    this.paneltyService.getPanelty(id).subscribe(res => {
      let data = res['objection'];
      console.log("reward: ", data);
      this.open(data, EditPaneltyComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding education: ",);
    });
  }

  addReward(){
    this.open(this.profileId, AddRewardComponent, 'create', 'md');
  }

  addCrime(){
    this.open(this.profileId, AddCrimeComponent, 'create', 'md');
  }

  addSalary(){
    this.open(this.profileId, AddSalaryComponent, 'create', 'md');
  }

  loadCrimes(){
    this.crimeService.getCrimeByProfile(this.profileId).subscribe(res => {
      console.log("Crime by profile: ", res);
      this.allCrimes = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Crime From Error: ", err);
      this.allCrimes = err;
    });
  }

  loadMilitaryService(){
    this.militaryService.getMilitaryByProfile(this.profileId).subscribe(res => {
      console.log("Military by profile: ", res);
      this.allMilitaryService = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Military From Error: ", err);
      this.allMilitaryService = err;
    });
  }

  editMilitaryService(id){
    console.log("Military Id: ", id);
    this.militaryService.getMilitaryServie(id).subscribe(res => {
      let data = res['objection'];
      console.log("military: ", data);
      this.open(data, EditMilitaryComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding military: ",);
    });
  }

  loadReward(){
    this.rewardService.getRewardByProfile(this.profileId).subscribe(res => {
      console.log("Reward from Server: ", res);
      this.allRewards = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Reward From Error: ", err);
      this.allRewards = err;
    });
  }

  editAccountability(id){
    this.accountabilityService.getAccountability(id).subscribe(res => {
      let data = res['objection'];
      console.log("Accountability: ", data);
      this.open(data, EditAccountablityComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding education: ",);
    });
  }

  editFired(id){
    this.firedService.getFired(id).subscribe(res => {
      let data = res['objection'];
      console.log("profileFired: ", data);
      this.open(data, EditFiredComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding profileFired: ",);
    });
  }

  editTransfer(id){
    console.log("id: ", id);
    this.transferService.getTransfer(id).subscribe(res => {
      let data = res['objection'];
      console.log("Transfer: ", data);
      this.open(data, EditTransferComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding Transfer: ",);
    });
  }

  editPromotion(id){
    // this.promotionService.getPromotion(id).subscribe(res => {
    //   let data = res['objection'];
    //   console.log("Promotion: ", data);
    //   this.open(data, EditPromotionProfileComponent, 'edit', 'md');

    // }, err => {
    //   console.log("error in finding Promotion: ",);
    // });
  }

  editReward(id){
    console.log("Reward Id: ", id);
    this.rewardService.getReward(id).subscribe(res => {
      let data = res['objection'];
      console.log("reward: ", data);
      this.open(data, EditRewardComponent, 'edit', 'md');

    }, err => {
      console.log("error in finding education: ",);
    });
  }

  loadTransfer(){
    this.transferService.getTransferByProfile(this.profileId).subscribe(res => {
      console.log("Transfer from Server: ", res);
      this.allTransfers = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Transfer From Error: ", err);
      this.allTransfers = err;
    });
  }

  loadTravel(){
    this.travelService.getTravelByProfile(this.profileId).subscribe(res => {
      console.log("Travel from Server: ", res);
      this.allTravels = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Travel Error: ", err);
      this.allTravels = err;
    });
  }

  loadAcademicDegree() {
    this.academicDegreeService.getAcademicDegreeByProfile(this.profileId).subscribe(res => {
      console.log("Academic Degree from Server: ", res);
      this.allAcademicDegree = res;
      this.cdref.detectChanges();
    }, err => {
      console.log("Academic Degree Error: ", err);
      this.allAcademicDegree = err;
    });

  }

  editInfo() {
    console.log("Edit info clicked: ");
    // this.employeeService.getRecordByIdEdit(this.profileId).subscribe(res => {
    //   this.open(res['objection'], EditProfileComponent, 'edit', 'xl');
    // }, err => {
    //   this.ShowErrorToast('ERROR', 'FINDING RECORD IN SERVER');
    // });

  }

  changePhoto() {
    console.log("changed photo called");
    // this.open(this.profileId, PhotoProfileComponent, 'create');
  }

  addTransfer(){
    this.open(this.profileId, AddTransferComponent, 'create', 'md');
  }

  addFile(){
    this.open(this.profileId, DocumentProfileComponent, 'create');
  }

  addTravel(){
    this.open(this.profileId, AddTravelComponent, 'create', 'md');
  }
}

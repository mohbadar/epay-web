import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import { GroupService } from "../../group.service";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { Group } from "../../group";
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { TranslatedToastrService } from "app/services/translated-toastr.service";

declare var $: any;

@Component({
  selector: "group-create-dialog",
  templateUrl: "./group-create-dialog.component.html",
  styleUrls: ["./group-create-dialog.component.scss"],
})
export class GroupCreateDialogComponent implements OnInit {
  @Output() groupCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  groupCreateForm: FormGroup;
  isLoading = false;
  newRecord: Group;

  constructor(
    public groupService: GroupService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
  ) {

  }

  ngOnInit() {
    this.groupCreateForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      roles: [""],
      active: [""]
    });
  }

  onFormSubmit() {
		if (this.groupCreateForm.valid) {
      this.spinner.show();
      const { name, description, active, roles } = this.groupCreateForm.value;
      // Extract selected roles
      const selectedRoles = this.data.filter(item => roles.includes(item.id));
      this.groupService.createGroup({name, description, active, roles: selectedRoles}).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.groupCreateEventEmitter.emit(response);
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(error);
      })
		}
	  
		if (this.groupCreateForm.invalid) {
		// To display errors below forms
		Object.keys(this.groupCreateForm.controls).forEach(field => {
			const control = this.groupCreateForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
  }

  closeModal() {
    this.activeModal.close();
  }
}

import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EditFollowUpDocumentComponent } from '../edit-follow-up-document/edit-follow-up-document.component';
import { FollowUpDocumentService } from '../follow-up-document.service';

@Component({
	selector: 'app-doc-followup-activity',
	templateUrl: './doc-followup-activity.component.html',
	styleUrls: ['./doc-followup-activity.component.scss']
})
export class DocFollowupActivityComponent implements OnInit {

	@Output() deleteEvent = new EventEmitter<Object>();
	@Input('data') data;
	toBeDeletedRecordId;
	spinnerName;
	userId;
	departmentId;
	constructor(
		private followUpDocumentService: FollowUpDocumentService,
		private modalService: NgbModal,
        public globals: Globals,
		private toastr: ToastrService,
		private translate: TranslateService,
		private spinner: NgxSpinnerService,
		private cdref: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.spinnerName = 'spinner' + this.data.id;
		this.userId = this.globals.principal.id;
		this.departmentId = this.globals.principal.departmentId;
	}

	editFollowUp(id) {
		this.spinner.show(this.spinnerName);
		this.followUpDocumentService.getDocFollowUpActivityDetails(id).subscribe((res: any) => {

			this.spinner.hide(this.spinnerName);
			const modalRef = this.modalService.open(EditFollowUpDocumentComponent, {
				centered: true,
				size: 'lg',
				backdrop: 'static',
				keyboard: false
			});
			modalRef.componentInstance.data = res;
			modalRef.componentInstance.docFollowUpId = res.docFollowUpId;

			modalRef.result.then(result => {
				console.log('Data: ', result);
				this.data = result;
				this.cdref.detectChanges();
			}).catch(err => {
				console.log(err);
			});

		}, err => {
			this.spinner.hide(this.spinnerName);
			console.log("error in data: ", err);
			// this.showErrorToast("ERROR", "ERROR");
		});
	}


	confirmDeleteModal(content, id) {
		console.log("record to be deleted: ", id);
		this.toBeDeletedRecordId = id;
		this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
	}

	deleteRecord() {
		this.spinner.show(this.spinnerName);
		console.log("record to be deleted called: ", this.toBeDeletedRecordId);
		this.followUpDocumentService.deleteDocFollowUpActivity(this.toBeDeletedRecordId).subscribe(res => {
			this.spinner.hide(this.spinnerName);
			this.showSuccessToast("FOLLOWUP", "DELETED_SUCCESSFULLY");
			this.deleteEvent.emit(this.toBeDeletedRecordId);
		}, err => {
			this.spinner.hide(this.spinnerName);
			this.showErrorToast("FOLLOWUP", "ERROR");
		});
	}


	showSuccessToast(title, message) {
		const header = this.translate.instant(title);
		const msg = this.translate.instant(message);
		this.toastr.success(msg, header, {
			positionClass: 'toast-top-left',
		});
	}

	showErrorToast(title, message) {
		const header = this.translate.instant(title);
		const msg = this.translate.instant(message);
		this.toastr.error(msg, header, {
			positionClass: 'toast-top-left',
		});
	}

	downloadDocActivityAttachment(id) {
		this.followUpDocumentService.downloadDocActivityAttachment(id);
	}

	finalizeActivity(id) {
		this.spinner.show(this.spinnerName);
		this.followUpDocumentService.finalizeDocFollowUpActivity(id).subscribe(res => {
			this.spinner.hide(this.spinnerName);
			if (res) {
				this.data = res;
				this.cdref.detectChanges();
			}
		}, err => {
			this.spinner.hide(this.spinnerName);
		})
	}

}

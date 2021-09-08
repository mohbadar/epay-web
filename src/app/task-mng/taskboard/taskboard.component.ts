import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateTaskboardComponent } from './create-taskboard/create-taskboard.component';
import { TaskboardService } from './taskboard.service';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskboardComponent implements OnInit {
	taskboards = [];
	shared = [];
	public = [];
	mergedBoards = []

	constructor(private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef,
		private spinner: NgxSpinnerService, private taskboardService: TaskboardService,
		private translatedToastr: TranslatedToastrService, private authService: AuthService,
		private modalService: NgbModal) { }

	ngOnInit(): void {
		this.fetchEssentialData();
	}

	fetchEssentialData() {
		this.spinner.show();
        this.taskboardService.getMyTaskboards().subscribe((res:any) => {
			console.log(res);
			this.taskboards = res.taskboards;
			this.shared = res.shared;
			this.public = res.public;
			let mergedBoards = [...this.taskboards, ...this.shared, ...this.public];

			const result = [];
			const map = new Map();
			for (const item of mergedBoards) {
				if(!map.has(item.id)){
					map.set(item.id, true);
					result.push(item);
				}
			}
			this.mergedBoards = result;

			this.cdr.detectChanges();
            this.spinner.hide();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	createTaskboard() {
		const modalRef = this.modalService.open(CreateTaskboardComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
	}

}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-view-content',
    templateUrl: './view-content.component.html',
    styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent implements OnInit {

    @Input() content;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
    }

}

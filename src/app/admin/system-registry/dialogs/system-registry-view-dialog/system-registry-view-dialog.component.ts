import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SystemRegistryService } from '../../system-registry.service';

@Component({
    selector: 'system-registry-view-dialog',
    templateUrl: './system-registry-view-dialog.component.html',
    styleUrls: ['./system-registry-view-dialog.component.scss']
})
export class SystemRegistryViewDialogComponent implements OnInit {
    @Output()
    toggleModal = new EventEmitter<Object>();
    @Input() data;

    constructor(public systemRegistryService: SystemRegistryService) {}

    ngOnInit() {
        console.log(
            'TCL: SystemRegistryViewDialogComponent -> data',
            this.data
        );
    }

    onNoClick(): void {}
}

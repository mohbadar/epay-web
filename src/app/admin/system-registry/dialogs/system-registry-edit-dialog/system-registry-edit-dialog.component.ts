import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {
    FormControl,
    Validators,
    FormBuilder,
    FormGroup
} from '@angular/forms';
import { SystemRegistry } from '../../system-registry';
import { SystemRegistryService } from '../../system-registry.service';

declare var $: any;

@Component({
    selector: 'system-registry-edit-dialog',
    templateUrl: './system-registry-edit-dialog.component.html',
    styleUrls: ['./system-registry-edit-dialog.component.scss']
})
export class SystemRegistryEditDialogComponent implements OnInit {
    @Output()
    toggleModal = new EventEmitter<Object>();
    @Input() data;
    isLoading = false;
    newRecord: SystemRegistry;
    editSystemRegistry: FormGroup;

    formControl = new FormControl('', [Validators.required]);

    constructor(
        public systemRegistryService: SystemRegistryService,
        private formBuilder: FormBuilder
    ) {}

    compareFn(c1, c2): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    ngOnInit() {
        console.log('Dialog: ', this.data);
        this.editSystemRegistry = this.formBuilder.group({
            name: [this.data.name, [Validators.required]],
            description: [this.data.description, [Validators.required]],
            slug: [this.data.registrySlug, [Validators.required]],
            registryType: ['Map layer', [Validators.required]],
            active: [this.data.active, [Validators.required]],
            content: [this.data.content, [Validators.required]]
        });
    }

    ngAfterViewInit() {
        console.log('Method called');
        const vals = [];
        if ($('.selectpicker').length !== 0) {
            $('.selectpicker').selectpicker({
                iconBase: 'fa',
                tickIcon: 'fa-check'
            });
        }
    }

    submit() {
        console.log(this.data.value);
        const vals = Array.from($('.selectpicker').find(':selected')).map(
            item => {
                return Number($(item).val());
            }
        );

        // Create new object
        this.newRecord = new SystemRegistry();
        this.newRecord.name = this.editSystemRegistry.get('name').value;
        this.newRecord.description = this.editSystemRegistry.get(
            'description'
        ).value;
        this.newRecord.registryType = this.editSystemRegistry.get(
            'registryType'
        ).value;
        this.newRecord.active = this.editSystemRegistry.get('active').value;
        this.newRecord.content = this.editSystemRegistry.get('content').value;
        this.newRecord.registrySlug = this.editSystemRegistry.get('slug').value;

        // this.newRecord.groups = groups;
        console.log(
            'here is the updated record',
            JSON.stringify(this.newRecord)
        );
        this.updateRecord();
    }

    updateRecord() {
        this.systemRegistryService
            .updateSysReg(this.data.id, this.newRecord)
            .subscribe(
                resp => {
                    const msg = 'Record successfully updated';
                    console.log('response', resp);
                    this.toggleModal.emit({
                        modalType: 'edit',
                        button: 'update',
                        show: false,
                        newRecord: resp
                    });
                    this.showNotification(
                        'top',
                        'center',
                        msg,
                        'success',
                        'pe-7s-check'
                    );
                },
                err => {
                    const msg = 'There was an error updating the record';
                    this.showNotification(
                        'top',
                        'center',
                        msg,
                        'danger',
                        'pe-7s-attention'
                    );
                }
            );
    }

    cancelUpdate() {
        if (this.editSystemRegistry.dirty) {
            const conf = confirm('Are you sure you want to cancel?');
            if (conf) {
                this.editSystemRegistry.reset({});
                $('.selectpicker').val('default');
                $('.selectpicker').selectpicker('refresh');
                this.toggleModal.emit({ modalType: 'edit', show: false });
            }
        } else {
            $('.selectpicker').val('default');
            $('.selectpicker').selectpicker('refresh');
            this.toggleModal.emit({ modalType: 'edit', show: false });
        }
    }

    showNotification(from, align, msg, type, icon) {
        $.notify(
            {
                icon: icon,
                message: msg
            },
            {
                type: type,
                timer: 4000,
                placement: {
                    from: from,
                    align: align
                }
            }
        );
    }
}

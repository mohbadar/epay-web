import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SystemRegistry } from '../../system-registry';
import { SystemRegistryService } from '../../system-registry.service';

declare var $: any;
@Component({
    selector: 'system-registry-create-dialog',
    templateUrl: './system-registry-create-dialog.component.html',
    styleUrls: ['./system-registry-create-dialog.component.scss']
})
export class SystemRegistryCreateDialogComponent implements OnInit {
    @Output()
    toggleModal = new EventEmitter<Object>();
    @Input() data;
    myForm: FormGroup;
    isLoading = false;
    newRecord: SystemRegistry;

    constructor(
        public systemRegistryService: SystemRegistryService,
        private formBuilder: FormBuilder
    ) {
        this.myForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            slug: ['', [Validators.required]],
            description: ['', [Validators.required]],
            registryType: ['Map layer', [Validators.required]],
            active: ['', [Validators.required]],
            content: ['', [Validators.required]]
        });
    }

    ngOnInit() {}

    ngAfterViewInit() {
        if ($('.selectpicker').length !== 0) {
            $('.selectpicker').selectpicker({
                iconBase: 'fa',
                tickIcon: 'fa-check'
            });
        }
    }

    submit() {
        console.log('SystemRigistry submitted', this.myForm.value);
        const vals = Array.from($('.selectpicker').find(':selected')).map(
            item => {
                return Number($(item).val());
            }
        );

        // Create new object
        this.newRecord = new SystemRegistry();
        this.newRecord.name = this.myForm.get('name').value;
        this.newRecord.registrySlug = this.myForm.get('slug').value;
        this.newRecord.description = this.myForm.get('description').value;
        this.newRecord.registryType = this.myForm.get('registryType').value;
        this.newRecord.active = this.myForm.get('active').value;
        this.newRecord.content = this.myForm.get('content').value;

        // this.newRecord.groups = groups;

        console.log('here is the new record', this.newRecord);

        this.createNewRegistry();
    }

    createNewRegistry() {
        this.isLoading = true;
        console.log(
            'TCL: SystemRegistryCreateDialogComponent -> createNewUser -> this.newRecord',
            this.newRecord
        );
        this.systemRegistryService.createSysReg(this.newRecord).subscribe(
            response => {
                console.log('server response: ', response);
                const msg = 'Record successfully created';
                this.isLoading = false;
                this.myForm.reset({});
                this.toggleModal.emit({
                    modalType: 'create',
                    show: false,
                    newRecord: this.newRecord
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
                const msg = 'There was an error creating record';
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

    cancelRegistration() {
        if (this.myForm.dirty) {
            const conf = confirm('Are you sure you want to cancel?');
            if (conf) {
                this.myForm.reset({});
                $('.selectpicker').val('default');
                $('.selectpicker').selectpicker('refresh');
                this.toggleModal.emit({ modalType: 'create', show: false });
            }
        } else {
            $('.selectpicker').val('default');
            $('.selectpicker').selectpicker('refresh');
            this.toggleModal.emit({ modalType: 'create', show: false });
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

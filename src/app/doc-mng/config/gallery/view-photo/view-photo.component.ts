import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { GalleryService } from '../gallery.service';

@Component({
    selector: 'view-photo',
    templateUrl: './view-photo.component.html',
    styleUrls: ['./view-photo.component.scss']
})
export class ViewPhotoComponent implements OnInit {
    @Input() data;
    imageToShow;

    constructor(
        public activeModal: NgbActiveModal,
        private galleryService: GalleryService,
        private spinner: NgxSpinnerService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        
    }
    
    ngOnInit(): void {
        console.log(this.data);
        this.createImageLink();
    }

    createImageLink() {
        this.galleryService.getImage(this.data).subscribe((data) => {
            this.createImageFromBlob(data);
        }, (error) => {
            console.log(error);
        });
    }

    closeModal() {
        this.activeModal.close();
    }

    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.imageToShow = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }
}
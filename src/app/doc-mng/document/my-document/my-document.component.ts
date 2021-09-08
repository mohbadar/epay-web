import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-my-document',
    templateUrl: './my-document.component.html',
    styleUrls: ['./my-document.component.scss']
})
export class MyDocumentComponent implements OnInit {
    active = 1;

    constructor(private router: Router, private route: ActivatedRoute,
        private cdref: ChangeDetectorRef) { }

    ngOnInit(): void {

    }



}

import { Component } from '@angular/core';
import { HighlightService } from 'app/template/shared/services/highlight.service';

@Component({
    selector: 'app-grids',
    templateUrl: './grids.component.html',
    styleUrls: ['./grids.component.scss']
})

export class GridsComponent {

    highlighted: boolean = false;

    constructor(private highlightService: HighlightService) { }
  
  
    ngAfterViewChecked() {
      this.highlightService.highlightAll();
    }
}
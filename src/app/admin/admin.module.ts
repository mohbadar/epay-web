import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminRoutes } from "./admin.routing";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(AdminRoutes),
        // PerfectScrollbarModule,
        FormsModule,
        // PipesModule,
        NgxDatatableModule,
        NgSelectModule
    ],
    declarations: [

    ]
})
export class AdminModule {}

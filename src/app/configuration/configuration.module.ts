import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfigurationRoutes } from "./configuration.routing";
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
        RouterModule.forChild(ConfigurationRoutes),
        // PerfectScrollbarModule,
        FormsModule,
        NgxDatatableModule,
        NgSelectModule
    ],
    declarations: [

    ]
})
export class ConfigurationModule {}

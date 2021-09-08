import {
    Component,
    ViewChild,
    OnInit,
    ElementRef,
    ChangeDetectorRef,
    OnDestroy
} from "@angular/core";
import { SystemRegistry } from "./system-registry";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SystemRegistryService } from "./system-registry.service";
import { AuthService } from "app/template/shared/auth/auth.service";
import { GroupService } from "../group/group.service";
import { DatatablesService } from "app/_services/datatables.service";
import { Globals } from "app/_helpers/globals";
// import { THROW_IF_NOT_FOUND } from "@angular/core/src/di/injector";

declare var $: any;

@Component({
    selector: "system-registry-management",
    templateUrl: "./system-registry.component.html",
    styleUrls: ["./system-registry.component.scss"]
})
export class SystemRegistryComponent implements OnInit, OnDestroy {
    systemRegistrys: Observable<SystemRegistry[]>;
    result: SystemRegistry[];
    recordData;
    showEditModal;
    showViewModal;
    showCreateModal;
    dataTablesObservable;
    dTableFlag = false;
    dTable;
    // datatables options
    dtOptions = {};
    loading;
    viewLoading;
    editLoading;

    headerRow = [
        "id",
        "name",
        "description",
        "active",
        "content",
        "created_at",
        "updated_at",
        "actions"
    ];
    isLoading = true;

    constructor(
        public httpClient: HttpClient,
        private systemRegistryService: SystemRegistryService,
        public authService: AuthService,
        public globals: Globals,
        public groupService: GroupService,
        private cdref: ChangeDetectorRef,
        private datatables: DatatablesService
    ) { }

    ngOnInit() {
        this.reloadData();
        this.dtOptions = {
            pagingType: "full_numbers",
            lengthMenu: [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            scrollX: true,
            language: this.datatables.selectedJsonFile
        };
        this.changeLanguage();
    }

    toggleModal(data) {
        $("#createModal").modal("hide");
        if (data.modalType === "create") {
            $("#createModal").modal("hide");
            $("#createModal").on("hidden.bs.modal", e => {
                $("#createModal").off("hidden.bs.modal");
                this.showCreateModal = false;
                if (data.newRecord) {
                    this.result.push(data.newRecord);
                    this.reloadData();
                }
            });
        }

        if (data.modalType === "edit") {
            console.log("editttt")
            $("#editModal").modal("hide");
            $("#editModal").on("hidden.bs.modal", e => {
                this.showEditModal = false;
                $("#editModal").off("hidden.bs.modal");
                if (data.button === "update") {
                    this.reloadData();
                }
            });
        }
    }

    refresh() {
        this.reloadData();
        this.dtOptions = {
            pagingType: "full_numbers",
            lengthMenu: [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            responsive: true,
            language: this.datatables.selectedJsonFile
        };
    }

    cancel(){
        $("#editModal").modal("hide");
        this.showEditModal = false;
    }

    changeLanguage() {
        this.dataTablesObservable = this.datatables.callToServiceMethodSource.subscribe(
            data => {
                this.dtOptions["oLanguage"] = data.default;
                if (this.dTableFlag) {
                    // Initialize datatable if not initialized before
                    if (!$.fn.DataTable.isDataTable("#datatables")) {
                        this.dTable = $("#datatables").DataTable(
                            this.dtOptions
                        );
                    } else {
                        console.log("dtOptions: ", this.dtOptions);
                        this.dTable.destroy();
                        this.dTable = null;
                        this.dTable = $("#datatables").DataTable(
                            this.dtOptions
                        );
                    }
                }
            }
        );
    }

    reloadData() {
        this.loading = true;
        // this.result = [];
        this.dTableFlag = false;
        this.systemRegistryService.getSysRegsList().subscribe(
            data => {
                this.result = data;
                console.log(
                    "TCL: SystemRegistryComponent -> reloadData -> this.result",
                    this.result
                );
                this.dTableFlag = true;
                this.cdref.detectChanges();
                this.loading = false;

                this.initTable();
                this.isLoading = false;
                console.log("roles data ", this.result);
            },
            err => {
                console.log("data error: ", err);
                this.loading = false;
            }
        );
    }

    initTable() {
        // Initialize datatable if not initialized before
        if (!$.fn.DataTable.isDataTable("#datatables")) {
            console.log("Initialized in reloadData");
            this.dTable = $("#datatables").DataTable(this.dtOptions);
        } else {
            console.log("Reinitialized in reloadDatd");
            this.dTable.destroy();
            this.dTable = null;
            this.dTable = $("#datatables").DataTable(this.dtOptions);
        }
    }

    addNew(systemRegistry?: SystemRegistry) {
        if (!this.globals.principal.hasAuthority(["FORM_CREATE"])) {
            return false;
        }

        $("#createModal").modal();
        this.showCreateModal = true;
    }

    viewRecord(recordId) {
        if (!this.globals.principal.hasAuthority(["FORM_VIEW"])) {
            return false;
        }

        this.isLoading = true;
        this.systemRegistryService.getSysReg(recordId).subscribe(data => {
            console.log("you data has", data);
            this.isLoading = false;
            this.recordData = data;
            $("#showModal").modal();
            this.showViewModal = true;
        });
    }

    editRecord(recordId) {
        if (!this.viewLoading) {
            this.viewLoading = true;
            if (!this.globals.principal.hasAuthority(["FORM_EDIT"])) {
                return false;
            }

            this.isLoading = true;
            this.systemRegistryService.getSysReg(recordId).subscribe(data => {
                console.log("the systemRegistry returned consists of", data);
                this.viewLoading = false;
                this.recordData = data;
                $("#editModal").modal();
                this.showEditModal = true;
            });
        }
    }

    ngOnDestroy() {
        if (this.dataTablesObservable) {
            this.dataTablesObservable.unsubscribe();
        }
    }
}

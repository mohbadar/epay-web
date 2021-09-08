import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as fileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class FileDownloadService {

    constructor(
        private httpClient: HttpClient,
        private spinner: NgxSpinnerService,
        public toastr: ToastrService,
        private translate: TranslateService,
    ) { }


    /**
    * Downloads the file from the given URL
    * @param filURL id of the file to be downloaded
    *
    */


    doDownload(fileURL, params?: any): Observable<HttpResponse<Blob>> {
        let headers = new HttpHeaders();
        // headers = headers.append('Accept', 'blob; charset=utf-8');

        return this.httpClient.get(fileURL,
            {
                headers: headers,
                observe: 'response',
                responseType: 'blob',
                params: params
            }
        )
    }


    doDownloadForPost(fileURL, body): Observable<HttpResponse<Blob>> {
        let headers = new HttpHeaders();
        // headers = headers.append('Accept', 'blob; charset=utf-8');
        return this.httpClient.post(fileURL, body,
            {
                headers: headers,
                observe: 'response',
                responseType: 'blob',
            }
        )
    }

    saveFile(data: any, fileName?: string) {
        const blob = new Blob([data], { type: 'any' });
        const file = new File([blob], fileName != null ? fileName : 'download',
            { type: 'blob' })
        fileSaver.saveAs(file, fileName);
    }

    downloadFile(fileURL, params?: any) {
        console.log("download URL-------------------------",fileURL);
        this.doDownload(fileURL, params).subscribe(data => {

            let filename = "";
            let disposition = data.headers.get('content-disposition');
            if (disposition && disposition.indexOf('filename') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                    console.log('file name after processing', filename);
                }
            }
            const blob = new Blob([data.body], { type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);

        })
    }

    download(fileURL, method = 'GET', params?: any) {
        console.log("download URL-------------------------", fileURL);
        if (method == 'POST') {
            this.spinner.show();
            this.doDownloadForPost(fileURL, params).subscribe(data => {
                this.saveFile(data.body, this.setFileName(data));
                this.spinner.hide();
            },
                (err) => {
                    this.spinner.hide();
                    this.showErrorToast("CREATE_DECREE", "ERR_MSG");
                    console.log(
                        'error occured while fetching tax payer details',
                        err
                    );
                }
            )
        } else {
            this.spinner.show();
            this.doDownload(fileURL, params).subscribe(data => {
                // const fileName = data.headers.get('filename');
                this.saveFile(data.body, this.setFileName(data));
                this.spinner.hide();
            }
                ,
                (err) => {
                    this.spinner.hide();
                    this.showErrorToast("CREATE_DECREE", "ERR_MSG");
                    console.log(
                        'error occured while fetching tax payer details',
                        err
                    );
                }
            )
        }

    }

    showErrorToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toastr.error(msg, header, {
            positionClass: 'toast-top-left',
        });
    }

    setFileName(data) {
        let filename = "";
        let disposition = data.headers.get('content-disposition');
        if (disposition && disposition.indexOf('filename') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
                console.log('file name after processing', filename);
            }
        }
        return filename;
    }
}

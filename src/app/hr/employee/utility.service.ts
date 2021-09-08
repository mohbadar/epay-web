import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
	providedIn: 'root'
})
export class UtilityService {

    getBloodTypes(){
        let types = [
            {id:1, type:'A+'},
            {id:2, type:'A-'},
            {id:3, type:'B+'},
            {id:4, type:'B-'},
            {id:5, type:'AB+'},
            {id:6, type:'AB-'},
            {id:7, type:'O+'},
            {id:8, type:'O-'}
        ];

        return types;
    }

    getUniversityType(){
        let positions = [
            {id:1, name:'دولتی'},
            {id:2, name:'خصوصی'}
        ];

        return positions;
    }

    getTravelType(){
        let positions = [
            {id:1, name:'داخلی'},
            {id:2, name:'خارجی'}
        ];

        return positions;
    }

    getTrainingType(){
        let positions = [
            {id:1, name:'رسمی'},
            {id:2, name:'شخصی'}
        ];

        return positions;
    }

    getSalaryType(){
        let positions = [
            {id:1, type:0},
            {id:2, type:20},
            {id:3, type:40},
            {id:4, type:60}
        ];

        return positions;
    }

    getAppointType(){
        let positions = [
            {id:1, name:'حکم'},
            {id:2, name:'فرمان'}
        ];

        return positions;
    }

    getEducationLevel(){
        let positions = [
            {id:1, name:'بکلوریا'},
            {id:2, name:'فوق بکلوریا'},
            {id:3, name:'لیسانس'},
            {id:4, name:'ماستری'},
            {id:5, name:'دوکتورا'}
        ];

        return positions;
    }

    getPartyType(){
        let positions = [
            {id:1, name:'سیاسی'},
            {id:2, name:'اجتماعی'}
        ];

        return positions;
    }

    getMilitaryType(){
        let positions = [
            {id:1, name:'دوره مکلفیت'},
            {id:2, name:'دوره احتیاط'},
            {id:1, name:'دوره جهاد'},
            {id:2, name:'دوره مقاوت'}
        ];

        return positions;
    }

    getFamilyType(){
        let positions = [
            {id:1, name:0},
            {id:2, name:1},
            {id:3, name:2},
            {id:4, name:3},
            {id:5, name:4},
            {id:6, name:5},
            {id:7, name:6},
            {id:8, name:7},
            {id:9, name:8},
            {id:10, name:9},
            {id:11, name:10},
            {id:12, name:11},
            {id:13, name:12},
            {id:14, name:13},
            {id:15, name:14},
            {id:16, name:15},
            {id:17, name:16},
            {id:18, name:17},
            {id:19, name:18},
            {id:20, name:19},
            {id:21, name:20},
            {id:22, name:21},
            {id:23, name:22},
            {id:24, name:23},
            {id:25, name:24},
            {id:26, name:25},
            {id:27, name:26},
            {id:28, name:27},
            {id:29, name:28},
            {id:30, name:29},
            {id:31, name:30},
            {id:32, name:31},
            {id:33, name:32},
            {id:34, name:33},
            {id:35, name:34},
            {id:36, name:35},
            {id:37, name:36},
            {id:38, name:37},
            {id:39, name:38},
            {id:40, name:39},
            {id:41, name:40},
            {id:42, name:41},
            {id:43, name:42},
            {id:44, name:43},
            {id:45, name:44},
            {id:46, name:45},
            {id:47, name:46},
            {id:48, name:47},
            {id:49, name:48},
            {id:50, name:49},
            {id:51, name:50}
        ];

        return positions;
    }

}
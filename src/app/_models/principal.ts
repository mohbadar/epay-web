export class Principal {
    public id: number;
    public authenticated: boolean;
    public authorities: Authority[] = [];
    public credentials: any;
    public environments: any = [];
    public selectedEnv: string;
    public selectedLang: string;
    public entity: string;
    public entityId;
    public department: string;
    public departmentId;
    public accessableDepartments: any = [];
    public name: string;
    public username: string;
    public reviewerRequired: boolean;

    constructor(authenticated: boolean, authorities: any[], credentials: any, environments: any[], selectedEnv: string, selectedLang: string, name: string, username: string, entity: string, entityId, department: string, departmentId, id, reviewerRequired, accessableDepartments) {
        this.authenticated = authenticated;
        authorities.map(
            authority => this.authorities.push(new Authority(authority)))
        this.credentials = credentials;
        this.environments = environments;
        this.selectedEnv = selectedEnv;
        this.selectedLang = selectedLang;
        this.name = name;
        this.username = username;
        this.entity = entity;
        this.entityId = entityId;
        this.department = department;
        this.departmentId = departmentId;
        this.id = id;
        this.reviewerRequired = reviewerRequired;
        this.accessableDepartments = accessableDepartments;
    }

    isAdmin() {
        return this.authorities.some(
            (auth: Authority) => auth.authority.indexOf('ADMIN') > -1)
    }

    hasAuthority(requestAuthArray: Array<string>) {
        // requestAuthArray.every(reqAuth =>{
        //     if(!this.authorities.includes(new Authority(reqAuth))){
        //         return false;
        //     }
        // })
        // return true;
        return requestAuthArray.every((a) => {
            return this.authorities.some((auth: Authority) => auth.authority.indexOf(a) > -1)
        });
    }
}

export class Authority {
    public authority: String;

    constructor(authority: String) {
        this.authority = authority;
    }
}


// https://www.baeldung.com/spring-cloud-angular
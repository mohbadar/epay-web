import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  drivers = null;
  vehicles=null;
  constructor(private http: HttpClient) { }

	public getDrivers():Observable<any>
    {
		if(!this.drivers){
			return this.http.get("/api/transport/drivers/list").pipe(
				map((data:any) => { return this.drivers=data; })
			);
		}
       	else{
           return of(this.drivers);
        }
    }

    public getVehicles():Observable<any>
    {
      if(!this.vehicles){
        return this.http.get("/api/transport/vehicles/list").pipe(
              map((data:any)=>{return this.vehicles=data;})
        );
      }
      else{
        return of(this.vehicles);
      }
    }


    getDashboardCount(): Observable<any> {
      return this.http.get(`/api/transport/dashboard/count`);
      }

    getRequestCountByDepartment(): Observable<any> {
        return this.http.get(`/api/transport/dashboard/department`);
    }

  getRequestCountByStatus(): Observable<any> {
        return this.http.get(`/api/transport/dashboard/status`);
        }

}

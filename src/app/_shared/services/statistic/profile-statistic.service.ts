import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStatistic } from '../../models/statistic/statistic.interface';

const URL$  = 'api/v1/',
      USER_URL = `${URL$}statistics/user/`,
      COMPANY_URL = `${URL$}statistics/company/`;

@Injectable({
  providedIn: 'root'
})
export class ProfileStatisticService {

  constructor(
    private http:HttpClient
  ) { }


  public sentUserStatistic(data:IStatistic , type?:string) : Observable<any> {
    return this.http.post(USER_URL + type , JSON.stringify(data))
  }

  public sentCompanyStatistic(data:IStatistic , type?:string) : Observable<any> {
    return this.http.post(COMPANY_URL + type , JSON.stringify(data));
  }


}

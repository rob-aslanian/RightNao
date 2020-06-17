import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

import { map } from 'rxjs/operators';


@Injectable()
export class GetMetaData {
  constructor(private http: HttpClient) { }


  getData(link): Observable<string> {
    const headers =  new HttpHeaders({
        // "Sec-Fetch-Mode": "cors",
        "Access-Control-Allow-Origin":"*"
      }) ;


    try {
      this.http.get(link,    { headers,  }).subscribe((res) => {
        console.log(res);
        
      }, (error) => {

      })
    } catch (err) {
      return null
    }

  }
}

@Pipe({
  name: 'linkMetaData'
})
export class LinkMetaDataPipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private getMetaData: GetMetaData
  ) { }

  transform(value: any, args?: any): any {
    let link = value;


    console.log(args);
    
    if (args === "title") {
        const title = link.split('/')[2]
        return title.replace(/\.\w+/gi , '')
    }

    return link
    

    // try {
    //   return this.getMetaData.getData(link).pipe(map(data => {
    //     let doc = new DOMParser().parseFromString(data, 'text/html');
    //     console.log(doc);
        
    //     let metas = doc.getElementsByTagName('meta');
    //     for (let i = 0; i < metas.length; i++) {
    //       if (metas[i].getAttribute('property') == args) {
    //         return metas[i].getAttribute('content')
    //       }
    //     }
    //   }))
    // } catch (err) {
    //   return args !== 'og:image' ? '[Not able to get link data]' : './assets/img/defaultAvatar.svg'
    // }

  }

}

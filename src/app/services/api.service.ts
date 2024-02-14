import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { of } from "rxjs";
import { catchError } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class ApiService {
  errorMsg: string = '';
  constructor(private http: HttpClient) {}
  private BASE_URL = 'https://sheetdb.io/api/v1/s1hnbdmrji4n6';

 
  

  public addObject(
    item: any,
    endpoint: string,
    handleError: boolean = true
  ): Observable<any> {
    /*TODO implement all methods with optional handle error */
    if (handleError) {
      return this.http
        .post<any>(this.BASE_URL + endpoint, item, httpOptions)
        .pipe(
          catchError((error) => {
            if (error.status == 500) {
              alert(
                "Ocurrio un error inesperado, por favor reporte este error utilizando el escarabajo en la esquina superior derecha de AppDoctors con los pasos previos y pantalla en la que ocurrio el problema."
              );
            } else {
              this.errorMsg = `Error: ${error.error.value}`;
              console.log(this.errorMsg);
              alert(this.errorMsg);
            }
            return of([]);
          })
        );
    } else {
      return this.http.post<any>(this.BASE_URL + endpoint, item, httpOptions);
    }
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.log(result);

      // TODO: better job of transforming error for user consumption
      // window.alert(`Falló la operación de ${operation} ${error.message}`);

      // alert(error["error"].value);
      console.log(this.errorMsg);
      // Let the app keep running by returning an empty result.

      return of(error.status as T);
    };
  }
}


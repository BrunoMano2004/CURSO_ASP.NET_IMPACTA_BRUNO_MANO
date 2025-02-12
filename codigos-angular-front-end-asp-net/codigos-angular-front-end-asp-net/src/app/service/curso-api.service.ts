import { Injectable } from '@angular/core';

import { Curso } from '../model/curso';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()

export class CursoApiService{

  apiUrlBase: string = 'http://localhost:5205/api/Curso'

  constructor(private httpReq: HttpClient){}

  cruzamentoDominio = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  recTodosOsRegistros(): Observable<Curso>{

    return this.httpReq.get<Curso>(this.apiUrlBase+'/GetAll')
    .pipe(
      retry(1),
      catchError(this.observarBug)
    )
  }

  recUmRegistro(id: any): Observable<Curso>{
    return this.httpReq.get<Curso>(this.apiUrlBase+'/GetOne/'+id)
    .pipe(
      retry(1),
      catchError(this.observarBug)
    )
  }

  inserirRegistro(dadosRecebidos: any): Observable<Curso>{  
    return this.httpReq.post<Curso>(this.apiUrlBase+'/AdicRegistro', JSON.stringify(dadosRecebidos), this.cruzamentoDominio)
    .pipe(
      retry(1),
      catchError(this.observarBug)
    )
  }

  atualizarRegistro(id: any, dadosAlterados:any): Observable<Curso>{
    return this.httpReq.put<Curso>(this.apiUrlBase+'/UpRegister/'+id, JSON.stringify(dadosAlterados), this.cruzamentoDominio)
    .pipe(
      retry(1),
      catchError(this.observarBug)
    )
  }

  exclusaoRegistro(id: any){
   return this.httpReq.delete<Curso>(this.apiUrlBase+'/delRegister/'+id, this.cruzamentoDominio)
   .pipe(
    retry(1),
    catchError(this.observarBug)
    )
  }

  observarBug(bug: any){

    let infosBug: any = '' 

    if(bug.error instanceof ErrorEvent){

        infosBug = bug.error.message
    }else{

      infosBug = `Codigo do erro: ${bug.status}\nMensagem do erro: ${bug.message}`
    }

    alert(infosBug)

    return throwError(() => infosBug)
  }
}

import { Injectable, Component } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export interface LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date; // variable? -> variáveis opcionais
  dataVencimentoFim?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }




  pesquisar(filtro: LancamentoFiltro): Promise<any> {
      const headers = new HttpHeaders()
      .append('Authorization' , 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      let params = new HttpParams();

      if (filtro.descricao) {
        params = params.set('descricao', filtro.descricao);
      }
      if (filtro.dataVencimentoInicio) {
        params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!); // ! non-null-assertion -
        //o programador diz ao compilador que a operação é segura e não-nula.
      }
      if (filtro.dataVencimentoFim) {
        params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim , 'yyyy-MM-dd')!);
      }
      return this.http.get(`${this.lancamentosUrl}?resumo`, {headers:headers , params:params})
      .toPromise()
      .then((response : any) =>

        response['content']);
      }

  }



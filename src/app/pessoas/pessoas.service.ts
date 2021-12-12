
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome?: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {



  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor( private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const headers = new HttpHeaders()
    .append('Authorization' , 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.nome){
    params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, {headers:headers, params:params})
    .toPromise()
    .then((response:any) => {
      const pessoas = response['content'];
      const resultado = {
        pessoas: pessoas,
        total: response['totalElements']
      };
      return resultado;
    })

  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then((response:any) => response['content']);
  }

  excluir(codigo: number): Promise<null> {

    const headers = new HttpHeaders()
    .append('Authorization' , 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers: headers })
    .toPromise()
    .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<null> {

    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers: headers })
    .toPromise()
    .then(() => null);

  }
}

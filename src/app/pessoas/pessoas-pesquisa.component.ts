
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PessoasService, PessoaFiltro } from './pessoas.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(private pessoasService: PessoasService) { }

  ngOnInit() {
  //  this.pesquisar();
  }



  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    });

  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first! / event.rows!;
    this.pesquisar(pagina);

  }

}

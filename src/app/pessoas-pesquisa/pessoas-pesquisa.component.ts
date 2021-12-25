
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from '../core/error-handler.service';
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
  @ViewChild('tabela') grid?:Table;

  constructor(
    private pessoasService: PessoasService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService) { }

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

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir esta pessoa? cod. da pessoa: ${pessoa.codigo}`,
      accept: () => {
        this.excluir(pessoa.codigo);
      }
    });
  }

  excluir(codigo: number) {
    this.pessoasService.excluir(codigo)
    .then(() => {
      this.grid?.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'exclusão',
        detail: 'Pessoa excluída com sucesso.',
    });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;

    this.pessoasService.mudarStatus(pessoa.codigo , novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';
      pessoa.ativo = novoStatus;
      this.messageService.add({
        severity: 'success',
        summary: 'atualização',
        detail: `Pessoa ${acao} com sucesso`,
    });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}

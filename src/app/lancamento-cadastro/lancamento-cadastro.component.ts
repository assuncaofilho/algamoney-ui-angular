import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

import { PessoasService } from './../pessoas-pesquisa/pessoas.service';
import { CategoriaService } from './../categorias/categoria.service';
import { ErrorHandlerService } from '../core/error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';

import { Lancamento } from '../core/model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  pessoas = [];
  categorias = [];
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  lancamento = new Lancamento();

  constructor(
    private categoriaService : CategoriaService,
    private pessoasService: PessoasService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.messageService.add({
        severity: 'success',
        detail: 'Lançamento adicionado com sucesso!',
        summary: 'Cadastro' });

        form.reset();
        this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map((c:any) => {
        return { label: c.nome, value: c.codigo } // setando as propriedades do p-dropdown de categorias;
      })
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoasService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map((p:any) => {
        return { label: p.nome, value: p.codigo }
      })
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}

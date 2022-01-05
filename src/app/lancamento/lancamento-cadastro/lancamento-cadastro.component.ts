import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { PessoasService } from 'src/app/pessoa/pessoas.service';

import { Lancamento } from 'src/app/core/model';

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
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
    //console.log(this.route.snapshot.params['codigo']);
    this.title.setTitle('Novo lançamento');
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if(codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
  }

  get editando() {
    return Boolean(this.lancamento.codigo); // se existe código vinculado então é edição;
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if(this.editando){
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  novo(form: NgForm) {
    form.reset(new Lancamento());
    this.router.navigate(['/lancamentos/novo']);
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
      this.messageService.add({
        severity: 'success',
        detail: 'Lançamento adicionado com sucesso!',
        summary: 'Cadastro' });

        //form.reset();
        //this.lancamento = new Lancamento();

        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo])
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.messageService.add({
        severity: 'success',
        detail: 'Lançamento altualizado com sucesso!',
        summary: 'Edição' });

        this.atualizarTituloEdicao();

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

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }



}

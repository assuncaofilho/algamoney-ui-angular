import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoasService } from '../pessoas.service';
import { Pessoa } from '../../core/model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  constructor(
    private pessoasService: PessoasService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router) { }


  pessoa = new Pessoa();

  ngOnInit(): void {

    this.title.setTitle('Nova pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if(codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo); // se existe código vinculado então é edição;
  }

  novo(form: NgForm) {
    form.reset(new Pessoa());
    this.router.navigate(['/pessoas/nova']);
  }

  salvar(form: NgForm) {
    if(this.editando){
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm) {
    this.pessoasService.adicionar(this.pessoa)
    .then(pessoaAdicionada => {
      this.messageService.add({
        severity: 'success',
        detail: 'Pessoa adicionada com sucesso!',
        summary: 'Cadastro' });

        //form.reset();
        //this.pessoa = new Pessoa();

        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  atualizarPessoa(form: NgForm) {
    this.pessoasService.atualizar(this.pessoa)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.messageService.add({
        severity: 'success',
        detail: 'Pessoa altualizada com sucesso!',
        summary: 'Edição' });

        this.atualizarTituloEdicao();

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoasService.buscarPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}

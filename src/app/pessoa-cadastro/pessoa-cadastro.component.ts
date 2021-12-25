import { ErrorHandlerService } from './../core/error-handler.service';
import { PessoasService } from './../pessoas-pesquisa/pessoas.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Pessoa } from '../core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  constructor(
    private pessoasService: PessoasService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService) { }


  pessoa = new Pessoa();

  ngOnInit(): void {
  }

  salvar(form: NgForm) {
    this.pessoasService.adicionar(this.pessoa)
    .then(() => {
      this.messageService.add({
        severity: 'success',
        detail: 'Pessoa adicionada com sucesso!',
        summary: 'Cadastro' });

        form.reset();
        this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}

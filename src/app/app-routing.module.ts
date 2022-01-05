import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";
import { LancamentoCadastroComponent } from "./lancamento/lancamento-cadastro/lancamento-cadastro.component";
import { LancamentosPesquisaComponent } from "./lancamento/lancamento-pesquisa/lancamentos-pesquisa.component";
import { PessoaCadastroComponent } from "./pessoa/pessoa-cadastro/pessoa-cadastro.component";
import { PessoasPesquisaComponent } from "./pessoa/pessoas-pesquisa/pessoas-pesquisa.component";

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos' , pathMatch: 'full'},

  { path: 'pessoas/nova', component: PessoaCadastroComponent },
  { path: 'pessoas/:codigo', component: PessoaCadastroComponent },
  { path: 'pessoas', component: PessoasPesquisaComponent },

  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },

  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]

})
export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LightboxModule } from 'angular2-lightbox';
import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { GerenciarComponent, BtnDetalhesAtdComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';
import { AssociarComponent } from './components/associar/';
import { AtendimentosDisponiveisComponent } from './components/associar/atendimentos-disponiveis/';
import { InformacoesAtendimentoComponent } from './components/shared-components/informacoes-atendimento/';
import { routing } from './atendimentos.routing';
import { DadosInteracaoAppComponent } from './components/dados-interacao-app/dados-interacao-app.component';
import { AcaoComponent } from './components/shared-components/acao/acao.component';
import { AberturaChamadosComponent } from './components/abertura-chamados/abertura-chamados.component';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxErrorsModule,
    Ng2SmartTableModule,
    TextMaskModule,
    LightboxModule,
    routing
  ],
  entryComponents: [
    AtendimentosDisponiveisComponent,
    BtnDetalhesAtdComponent
  ],
  declarations: [
    AtendimentosComponent,
    BtnDetalhesAtdComponent,
    NovoAtendimentoComponent,
    GerenciarComponent,
    DetalhesAtendimentoComponent,
    InformacoesAtendimentoComponent,
    AssociarComponent,
    AtendimentosDisponiveisComponent,
    DadosInteracaoAppComponent,
    AcaoComponent,
    AberturaChamadosComponent
  ],
  providers: [
    SharedModule,
    DatePipe,
    FormCanDeactivateGuard
  ]
})
export class AtendimentosModule { }

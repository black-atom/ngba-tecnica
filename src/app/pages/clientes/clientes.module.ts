import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgaModule } from '../../theme/nga.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModuloCompartilhado } from './../../shared/shared.module';

import { ClientesComponent } from './clientes.component';
import { NovoClienteComponent } from './components/novo-cliente';
import { GerenciarComponent, BtnDetalhesCliComponent } from './components/gerenciar';
import { DetalhesClienteComponent } from './components/detalhes-cliente/';
import { routing } from './clientes.routing';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NgaModule,
    routing,
    ReactiveFormsModule,
    ModuloCompartilhado,
    FormsModule
  ],
  providers: [
    ModuloCompartilhado,
    FormCanDeactivateGuard
  ],
  entryComponents: [
    BtnDetalhesCliComponent
  ],
  declarations: [
    ClientesComponent,
    NovoClienteComponent,
    GerenciarComponent,
    DetalhesClienteComponent,
    BtnDetalhesCliComponent
  ]
})
export class ClientesModule { }

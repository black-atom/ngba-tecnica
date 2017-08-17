import { Component, OnInit, Input } from '@angular/core';

import { ClienteService } from './../../../../shared/services/cliente-service/cliente.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';


@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  settings = {
    actions: false,
    columns: {
      cnpj_cpf: { 
        title: 'CNPJ/CPF',     
        type: 'number'  
      },
      nome_fantasia: { 
        title: 'Nome', 
        type: 'string' },
      email: { 
        title: 'E-mail',      
        type: 'string' 
      },
      contatos: { 
        title: 'Telefone',     
        valuePrepareFunction: (contatos) => {
          return contatos[0].telefone;
        }
      },
      id: {
        type: 'custom',
        filter: false,
        renderComponent: BotaoDetalhesComponent
      }
    }
  };

  source: LocalDataSource;

  constructor(private clienteService: ClienteService) { 
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.clienteService.retornarTodos().subscribe(clientes => {
        this.source.load(clientes);
    });
  }


}

@Component({
  selector: 'button-view',
  template: `
  <button type="button" class="btn btn-info btn-block" 
  routerLink="/pages/clientes/detalhes/{{ idCliente }}"><i class="ion-ios-redo"></i> Detalhes</button>
  `,
  styleUrls: ['./gerenciar.component.scss']
})
export class BotaoDetalhesComponent implements ViewCell, OnInit {

  idCliente: string;
  
  @Input() value: string | number;

  constructor() {}

  ngOnInit() {
    this.idCliente = this.value.toString().toUpperCase();
  }

}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { Subscription } from 'rxjs/Rx';

import { ClienteService } from './../../../../shared/services';

@Component({
  selector: 'button-view',
  template: `
<button type="button" class="btn btn-info btn-block"
routerLink="/pages/clientes/detalhes/{{ idCliente }}"><i class="ion-information-circled"></i></button>
`,
  styleUrls: ['./../../../../shared/styles/smart-table.component.scss']

})
export class BtnDetalhesCliComponent implements ViewCell, OnInit {

  public idCliente: string;

  @Input()
  rowData: any;

  @Input() value: string | number;

  constructor() {}

  ngOnInit() {
    this.idCliente = this.value.toString().toUpperCase();
  }
}

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./../../../../shared/styles/smart-table.component.scss']
})
export class GerenciarComponent implements OnInit, OnDestroy {

  public settings = {
    actions: false,
    noDataMessage: 'Nenhum dado encontrado',
    pager: {
      perPage: 15
    },
    columns: {
      nome_razao_social: {
        title: 'Razão Social/Nome',
        type: 'string'
      },
      cnpj_cpf: {
        title: 'CNPJ/CPF',
        type: 'number'
      },
      contatos: {
        title: 'Telefone',
        valuePrepareFunction: contatos => {
          return contatos[0].telefone;
        }
      },
      _id: {
        type: 'custom',
        filter: false,
        renderComponent: BtnDetalhesCliComponent
      }
    }
  };

  private sub: Subscription;
  public source: LocalDataSource;

  constructor(private clienteService: ClienteService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.sub = this.clienteService.retornarTodos().subscribe(clientes => {
      this.source.load(clientes);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit, Input } from '@angular/core';

import { TecnicoService } from './../../../../shared/services/tecnico-service';
import { TECNICOSMOCK } from './../../../../utils/mocks/tecnicos.mock';
import { Tecnico } from './../../../../models';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  tecnicos: Tecnico[];
  tecnicoSelecionado;

  settings = {
    actions: false,
    columns: {
      nome: {
        title: 'Nome',
        type: 'number'
      },
      cpf: {
        title: 'CPF',
        type: 'string'
      },
      rg: {
        title: 'RG',
        type: 'string'
      },
      telefone: {
        title: 'Celular',
        type: 'string'
      },
      celular: {
        title: 'Celular',
        type: 'string'
      },
      id: {
        type: 'custom',
        filter: false,
        renderComponent: BtnDetalhesTecComponent
      }
    }
  };

  source: LocalDataSource;

  constructor(private _tecnicoService: TecnicoService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this._tecnicoService.retornarTodos().subscribe(tecnicos => {
        this.source.load(tecnicos);
    });
  }

}

@Component({
  selector: 'button-view',
  template: `
  <button type="button" class="btn btn-info btn-block"
  routerLink="/pages/tecnicos/detalhes/{{ idTecnico }}"><i class="ion-ios-redo"></i> Detalhes</button>
  `,
  styleUrls: ['./gerenciar.component.scss']
})
export class BtnDetalhesTecComponent implements ViewCell, OnInit {

  idTecnico: string;

  @Input() value: string | number;

  constructor() {}

  ngOnInit() {
    this.idTecnico = this.value.toString().toUpperCase();
  }

}

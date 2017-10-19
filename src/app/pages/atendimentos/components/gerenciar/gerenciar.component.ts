import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { AtendimentoService } from './../../../../shared/services';
import { Atendimento } from './../../../../models/atendimento.interface';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html'
  // styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {
    
    atendimentos: Atendimento[] = [];
  
    constructor(private _atendimentoService: AtendimentoService) {}
  
    ngOnInit() {
      
      this._atendimentoService.retornarTodos().subscribe(atendimentos => {
       this.atendimentos = atendimentos
      })  
    }

    mudarEstiloDasLinhas(rowData: Atendimento) {
        return rowData.tipo === 'Aberto por técnica' ? 'aberto-por-tecnica' : '' || 
               rowData.situacao.status === 'cancelar' ? 'cancelado' : '' ||
               rowData.situacao.status === 'reagendar' ? 'reagendamento' : '';
    }

    irParaEdicao(atendimento: Atendimento) {
      console.log(atendimento);
    }
  }
  
  
  

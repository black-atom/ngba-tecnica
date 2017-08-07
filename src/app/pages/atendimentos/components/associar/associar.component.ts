import { AtendimentoModel } from './../../../../models/atendimento/atendimento.interface';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { TecnicoModel } from '../../../../models/tecnico/tecnico.interface';
import { TECNICOSMOCK } from './../../../../utils/mocks/tecnicos.mock';
import { AtendimentosDisponiveisComponent } from './atendimentos-disponiveis/atendimentos-disponiveis.component';

@Component({
  selector: 'app-associar',
  templateUrl: './associar.component.html',
  styleUrls: ['./associar.component.scss'],
})
export class AssociarComponent implements OnInit {
  tecnicos: TecnicoModel[] = TECNICOSMOCK;
  atendimentos: AtendimentoModel[] = [];
  tecnico;

  options: NgbModalOptions = {
    size: 'lg',
  };

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  openModal(tecnico) {
    this.tecnico = tecnico;
    const modalRef = this.modalService.open(AtendimentosDisponiveisComponent, this.options);
    modalRef.componentInstance.tecnicoSelecionado = tecnico;

    modalRef.result.then(result => {
        const achou = this.tecnicos.find(elemento => elemento.nome === tecnico);

        for (let i = 0; i < result.length; i++) {
          achou.atendimentos.push(result[i]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

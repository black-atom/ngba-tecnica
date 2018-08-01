import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelper } from 'angular2-jwt';
import { contains } from 'ramda';

import { propNameQuery } from 'app/shared/utils/StringUtils';
import { Contrato } from 'app/models';
import { ContratoService } from 'app/shared/services/contrato-service/contrato.service';
import { ModalContratoComponent } from './../modal-contrato/modal-contrato.component';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-gerenciar-contrato',
  templateUrl: './gerenciar-contrato.component.html',
  styleUrls: ['./gerenciar-contrato.component.scss']
})
export class GerenciarContratoComponent implements OnInit {

  public contratos$: Observable<any[]>;
  public contratosSubject$: Subject<any>;
  public carregando: boolean = true;
  public contratoSelecionado: Contrato;
  public totalRecords;
  private jwtHelper: JwtHelper = new JwtHelper();
  public average$: Observable<any>;
  public isShow = false;
  public isUserAllowed = false;
  private opcoesModal: NgbModalOptions = {
    size: 'lg'
  };
  private skip = 0;
  private defaultSearchQuery: any = { };

  dateFrom = null;
  constructor(
    private contratoService: ContratoService,
    private _servicoModal: NgbModal,
    private _notificacaoService: NotificationsService,
  ) { }

  getAverange() {
    if (this.isUserAllowed) {
      this.average$ = this.contratoService.summaryContract();
      return this.isShow = true;
    }
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const { login: { tipo } } = this.jwtHelper.decodeToken(token)._doc;
    const permission = tipo.some(t => t === 'administrador' || t === 'contrato');
    this.isUserAllowed = permission;

    this.contratosSubject$ = new Subject();
    this.contratos$ = this.contratosSubject$
      .flatMap((lazyLoadParams) => {
        const { skip = this.skip, limit = 25 } = lazyLoadParams || {};
        return this.contratoService.contratosLazyLoad(skip, limit, this.defaultSearchQuery);
      })
      .map(({ contratos, count }) => {
        this.totalRecords = count;
        this.carregando = false;
        return contratos;
      });

    setTimeout(() => this.contratosSubject$.next({}), 100);

    this.getAverange();
  }

  abrirModalDeDetalhes(contratoID) {
    this.contratoService.getContrato(contratoID)
    .subscribe(res => {
      const referenciaModal = this._servicoModal.open(
        ModalContratoComponent,
        this.opcoesModal
      );
      referenciaModal.componentInstance.contratoSelecionado = res;
    });
  }

  deleteContrato(contratoID) {
    if (!this.isUserAllowed) { return; }

    this.contratoService.deleteContrato(contratoID)
      .toPromise()
      .then(() => this._notificacaoService.info('Successo', `Atendimento ${contratoID} excluido com sucesso`))
      .then(() => this.contratosSubject$.next())
      .then(() => this.getAverange())
      .catch((error) => {
        console.log(error)
        this._notificacaoService.error('Erro', `Nao foi possivel excluir o atendimento ${contratoID}`);
      });
  }

  filterEvents({ filters, first, rows }) {
    const queryFormatter = propNameQuery(filters);
    const newQuery: any = {
      ...queryFormatter('numeroContrato'),
      ...queryFormatter('cliente.nome_razao_social'),
      ...queryFormatter('cliente.cnpj_cpf'),
      ...queryFormatter('tipo')
    };
    return newQuery;
  }

  loadContratosLazy(event) {
    const query = this.filterEvents(event);
    if (query['cliente.cnpj_cpf']) {
      query['cliente.cnpj_cpf'] = query['cliente.cnpj_cpf'].replace(/\D+/g, '');
    }
    const skip = event.first;
    const limit = event.rows;

    this.skip = skip;
    this.defaultSearchQuery = query;
    this.contratosSubject$.next({ skip, limit });
  }

  changeColorText(contrato) {
    if (!contrato.ativo) { return 'text-danger'; }
  }
}

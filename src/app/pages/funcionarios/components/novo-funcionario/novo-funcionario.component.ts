import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificacaoService } from './../../../../shared/services';
import { DadosEndereco } from './../../../../models';
import { CepService } from './../../../../shared/services';
import { FuncionarioService } from './../../../../shared/services';
import { Funcionario } from './../../../../models';


@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.scss']
})
export class NovoFuncionarioComponent implements OnInit {

  public formFuncionario: FormGroup;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

   constructor(private _fb: FormBuilder,
               private _funcionarioService: FuncionarioService,
               private _notificacaoService: NotificacaoService) {}

   ngOnInit() {
    this.formFuncionario = this._fb.group({
      nome: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      data_nasc: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      email: ['', [Validators.pattern(this.emailPattern)]],
      telefone: ['', [Validators.required]],
      celular: [''],
      observacao: [''],
      cnh: [''],
      validade_carteira: [''],
      cep: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      complemento: [''],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      ponto_referencia: [''],
      createdAt: [''],
      updatedAt: ['']
    });
   }

   cadastrarTecnico(funcionario: Funcionario) {
    this._funcionarioService.novoFuncionario(funcionario)
    .subscribe(
      dados => {
    },
      erro => {
      this.falhaNoCadastro();
    },
      () => {
      this.sucessoNoCadastro();
    }
  );
}

sucessoNoCadastro() {
  this._notificacaoService.notificarSucesso(
    'Cadastro efetuado com sucesso!',
    ''
  );
    this.formFuncionario.reset();
}

falhaNoCadastro() {
  this._notificacaoService.notificarErro(
    'Não foi possível efetuar o cadastro',
    ''
    );
  }
}

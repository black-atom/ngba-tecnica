import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from './../../../models/';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {

  @Input() formContato: FormGroup;
  @Input() desabilitaSelecionarContato: Boolean;
  @Input() desabilitaNome: Boolean;
  @Input() clienteRecebido: Cliente;

  constructor(
    private _fb: FormBuilder) { }

  ngOnInit() {
    }
  }

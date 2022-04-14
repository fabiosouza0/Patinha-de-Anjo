import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../class/cliente';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formCliente: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createForm(new Cliente());
  }

  createForm(cliente:Cliente) {
    this.formCliente = new FormGroup({
      nome: new FormControl(cliente.nome),
      cpf: new FormControl(cliente.cpf),
      telefone: new FormControl(cliente.telefone),
      cep: new FormControl(cliente.cep),
      estado: new FormControl(cliente.estado),
      cidade: new FormControl(cliente.cidade),
      bairro: new FormControl(cliente.bairro),
      logradouro: new FormControl(cliente.logradouro),
      numero: new FormControl(cliente.numero),
      complemento: new FormControl(cliente.complemento),
      petNome: new FormControl(cliente.petNome),
      petGenero: new FormControl(cliente.petGenero),
      petEspecie: new FormControl(cliente.petEspecie),
      petRaca: new FormControl(cliente.petRaca),
      petPeso: new FormControl(cliente.petPeso),
      observacao: new FormControl(cliente.observacao)
    })
  }

  onSubmit() {
    console.log(this.formCliente.value);
  }

}

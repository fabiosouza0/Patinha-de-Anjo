import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  data:Array<any> = [
    { id: 0, nome: 'Cliente 1', cpf: 98765432100, telefone: 987654321, cep: 87654321, estado: 'SP', cidade: 'Campinas', logradouro: 'Rua Teste', bairro: 'Bairro Teste', numero: '9123', complemento: '123', petNome: 'Exemplo', petSexo: 'F', petEspecie: 'Cachorro', petRaca: 'Qualquer', petPeso: '9.0', observacao: 'Isto é apenas um exemplo.' },
  
    {
      id: 0,
      nome: 'Teste',
      cpf: 98765432100,
      telefone: 987654321,
      cep: 87654321,
      estado: 'SP',
      cidade: 'Campinas',
      logradouro: 'Rua Teste',
      bairro: 'Bairro Teste',
      numero: '9123',
      complemento: '123',
      petNome: 'Exemplo',
      petSexo: 'F',
      petEspecie: 'Cachorro',
      petRaca: 'Qualquer',
      petPeso: '9.0',
      observacao: 'Isto é apenas um exemplo.'
    }
  ];

  data_keys:Array<string> = Object.keys(this.data[0]);

  data_selected:Array<any> = [];

  constructor() {}

  ngOnInit(): void {}

  select(item:Array<any>) {

    console.log(this.data_selected)
    console.log(item)
  }
}

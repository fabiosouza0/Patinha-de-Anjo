import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  data:Array<any> = [];

  data_keys:Array<any> = [
    {key: 'id', display: 'ID', align: 'right'},
    {key: 'nome', display: 'Nome'},
    {key: 'cpf', display: 'CPF', mask: '000.000.000-00', align: 'right'},
    {key: 'telefone', display: 'Telefone', mask: '+99 (99) 0*', align: 'right'},
    {key: 'cep', display: 'CEP', mask: '00000-000', align: 'right'},
    {key: 'id_estado', display: 'ID Estado', align: 'right'},
    {key: 'cidade', display: 'Cidade'},
    {key: 'logradouro', display: 'Logradouro'},
    {key: 'bairro', display: 'Bairro'},
    {key: 'numero', display: 'Número'},
    {key: 'complemento', display: "Complemento"},
    {key: 'petNome', display: 'Nome Pet'},
    {key: 'petSexo', display: 'Sexo Pet'},
    {key: 'id_especie', display: 'ID Especie'},
    {key: 'petRaca', display: 'Raça Pet'},
    {key: 'petPeso', display: 'Peso Pet'},
    {key: 'observacao', display: 'Observação'},
    {key: 'created_at', display: 'Data Criação', mask:'0000-00-00 00:00:00', align: 'right'}
  ];

  data_selected:any = {};

  data_filter:any = {};

  constructor(private http:HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.get_clientes();
  }

  open_filter(key:String) {
    const filter = document.getElementById("filter_" + key);
    const input = document.getElementById("input_" + key);
    if (filter && input) {
      filter.hidden = !filter.hidden;
      if (!filter.hidden) {
        input.focus();
      }
    }
  }

  filter(key:string) {
    const filter = document.getElementById("filter_" + key);
    const input = <HTMLInputElement>document.getElementById("input_" + key);
    if (filter && input) {
      input.blur();
      if (input.value !== "") {
        Object(this.data_filter)[key] = input.value;
      } else if (this.data_filter[key]) {
        delete this.data_filter[key];
      }
    }
    this.get_clientes();
  }

  select_row(row:any) {
    if (this.data_selected.id === row.id) {
      this.data_selected = {};
    } else {
      this.data_selected = row;
    }
  }

  get_clientes() {

    var url = 'http://127.0.0.1:8000/api/clientes';
    if (Object.keys(this.data_filter).length !== 0) {
      url += '?';
      Object.keys(this.data_filter).forEach((key:any) => {
        if (key !== Object.keys(this.data_filter)[0]) {
          url += '&';
        }
        url += key + '=' + this.data_filter[key];
      });
    }

    this.http
      .get(url)
      .subscribe({
        next: (result) => {
          console.log(Object(result).message);
          this.data = Object(result).data;
          if (Object.keys(this.data_filter).length !== 0) {
            this.toastr.success('Filtro aplicado.');
          }
        },
        error: (e) => {
          this.toastr.error('Não foi possível trazer os clientes.');
          console.log(e);
        }
      })
  }

  delete(id:number) {
    this.http
      .delete(`http://127.0.0.1:8000/api/clientes/${id}`)
      .subscribe({
        next: (result) => {
          console.log(Object(result).message);
          this.data.splice(this.data.findIndex(i => i.id === id), 1);
          this.data_selected = {};
          this.toastr.success('Cliente excluído com sucesso.');
        },
        error: (e) => {
          this.toastr.error('Não foi possível excluir o cliente.');
          console.log(e);
        }
      })
  }
}

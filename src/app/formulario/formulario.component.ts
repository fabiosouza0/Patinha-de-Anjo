import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../class/cliente';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  form_cliente:FormGroup;

  new_form:boolean = true;

  estados:Array<any> = [];
  especies:Array<any> = [];

  ultimo_cep:string = '';

  constructor (private http:HttpClient, private route:ActivatedRoute, private router:Router, private toastr: ToastrService) { }

  ngOnInit():void {

    this.create_form(new Cliente());

    this.get_estados();
    this.get_especies();

    if (Object(this.route.params)._value.id) {
      this.new_form = false;
      this.get_cliente(Object(this.route.params)._value.id);
    }
    
  }

  create_form(cliente:Cliente):void {

    this.form_cliente = new FormGroup({
      id: new FormControl({value: cliente.id, disabled: true}),
      nome: new FormControl(cliente.nome, [Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z \u00C0-\u00FF]*$")]),
      cpf: new FormControl(cliente.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]),
      telefone: new FormControl(cliente.telefone, [Validators.required, Validators.minLength(12), Validators.maxLength(13), Validators.pattern("^[0-9]*$")]),
      cep: new FormControl(cliente.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]),
      id_estado: new FormControl(cliente.id_estado, [Validators.required]),
      cidade: new FormControl(cliente.cidade, [Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z \u00C0-\u00FF]*$")]),
      logradouro: new FormControl(cliente.logradouro, [Validators.required, Validators.maxLength(255)]),
      bairro: new FormControl(cliente.bairro, [Validators.required, Validators.maxLength(255)]),
      numero: new FormControl(cliente.numero, [Validators.required, Validators.maxLength(8)]),
      complemento: new FormControl(cliente.complemento, [Validators.maxLength(255)]),
      petNome: new FormControl(cliente.petNome, [Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z \u00C0-\u00FF]*$")]),
      petSexo: new FormControl(cliente.petSexo, [Validators.required]),
      id_especie: new FormControl(cliente.id_especie, [Validators.required]),
      petRaca: new FormControl(cliente.petRaca, [Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z \u00C0-\u00FF]*$")]),
      petPeso: new FormControl(cliente.petPeso, [Validators.min(0.0), Validators.max(999.9)]),
      observacao: new FormControl(cliente.observacao, [Validators.maxLength(255)])
    });

  }

  get_estados():void {
    this.http
      .get('http://127.0.0.1:8000/api/estados')
      .subscribe({
        next: (result) => {
          this.estados = Object(result).data;
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

  get_especies():void {
    this.http
      .get('http://127.0.0.1:8000/api/especies')
      .subscribe({
        next: (result) => {
          this.especies = Object(result).data;
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

  get_cep(cep:string):void {
    
    // Verifica se o campo cep possui valor informado.
    if (cep !== '' && cep !== null) {

      // 'cep' somente com dígitos.
      cep = cep.replace(/\D/g, '');

      // Expressão regular para validar o CEP.
      const valida_cep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (valida_cep.test(cep) && this.ultimo_cep !== cep) {
        this.ultimo_cep = cep;
        this.http
          .get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe({
            next: (result) => {
              if (!result.hasOwnProperty('erro')) {
                this.form_cliente.controls['id_estado'].setValue(this.estados.find(x => x.uf === Object(result)['uf']).id);
                this.form_cliente.controls['cidade'].setValue(Object(result)['localidade']);
                this.form_cliente.controls['logradouro'].setValue(Object(result)['logradouro']);
                this.form_cliente.controls['bairro'].setValue(Object(result)['bairro']);
              } else {
                this.form_cliente.controls['cep'].setErrors({'invalid': true});
                this.toastr.error('CEP não encontrado no Banco de Dados.');
                console.log(result);
              }
            },
            error: (e) => {
              this.form_cliente.controls['cep'].setErrors({'invalid': true});
              this.toastr.error('Não foi possível acessar o Banco de Dados de CEP.');
              console.log(e);
            }
          })

      }
    }
  }

  get_cliente(id:number):void {
    this.http
      .get(`http://127.0.0.1:8000/api/clientes/${id}`)
      .subscribe({
        next: (result) => {
          console.log(Object(result).message);
          this.form_cliente.patchValue(Object(result).data)
        },
        error: (e) => {
          this.toastr.error('Não foi possível acessar as informações do cliente.');
          console.log(e);
          this.new_form = true;
        }
      });
  }

  create_cliente(data:Array<any>):void {
    this.http
      .post('http://127.0.0.1:8000/api/clientes', data)
      .subscribe({
        next: (result) => {
          this.toastr.success('Cliente cadastrado com sucesso.');
          console.log(Object(result).message);
          if (!result.hasOwnProperty('error')) {
            this.router.navigate(['clientes'])
          }
        },
        error: (e) => {
          this.toastr.error('Não foi possível cadastrar um novo cliente.');
          console.log(e);
        }
      });
  }

  update_cliente( data:Array<any>, id:number):void {
    this.http
      .patch(`http://127.0.0.1:8000/api/clientes/${id}`, data)
      .subscribe({
        next: (result) => {
          this.toastr.success('Cliente editado com sucesso.');
          console.log(Object(result).message);
          if (!result.hasOwnProperty('error')) {
            this.router.navigate(['clientes']);
          }
        },
        error: (e) => {
          this.toastr.error('Não foi possível editar o cliente.');
          console.log(e);
        }
      });
  }

  onSubmit():void {
    console.log(this.form_cliente.value);
    if (this.new_form) {
      this.create_cliente(this.form_cliente.value);
    } else {
      this.update_cliente(this.form_cliente.value, Object(this.route.params)._value.id);
    }
  }

}

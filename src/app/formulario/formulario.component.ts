import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../class/cliente';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  sub: any;
  
  formCliente: FormGroup;
  
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm(new Cliente());

    this.sub = this.route
      .data
      .subscribe(v => console.log(v));
  }

  createForm(cliente:Cliente) {
    this.formCliente = new FormGroup({
      nome: new FormControl(cliente.nome, [Validators.required, Validators.pattern("^[a-zA-Z \u00C0-\u00FF]*$"), Validators.maxLength(255)]),
      cpf: new FormControl(cliente.cpf, [Validators.required]),
      telefone: new FormControl(cliente.telefone, [Validators.required]),
      cep: new FormControl(cliente.cep, [Validators.required]),
      estado: new FormControl(cliente.estado, [Validators.required]),
      cidade: new FormControl(cliente.cidade, [Validators.required, Validators.pattern("^[a-zA-Z \u00C0-\u00FF]*$"), Validators.maxLength(255)]),
      logradouro: new FormControl(cliente.logradouro, [Validators.required, Validators.maxLength(255)]),
      bairro: new FormControl(cliente.bairro, [Validators.required, Validators.maxLength(255)]),
      numero: new FormControl(cliente.numero, [Validators.required]),
      complemento: new FormControl(cliente.complemento, [Validators.maxLength(255)]),
      petNome: new FormControl(cliente.petNome, [Validators.required, Validators.maxLength(255)]),
      petGenero: new FormControl(cliente.petGenero, [Validators.required]),
      petEspecie: new FormControl(cliente.petEspecie, [Validators.required]),
      petRaca: new FormControl(cliente.petRaca, [Validators.required, Validators.pattern("^[a-zA-Z \u00C0-\u00FF]*$"), Validators.maxLength(255)]),
      petPeso: new FormControl(cliente.petPeso),
      observacao: new FormControl(cliente.observacao, [Validators.maxLength(255)])

    }, {updateOn: 'blur'})
  }

  consultaCep(cep:string) {

    // Verifica se campo cep possui valor informado.
    if (cep !== '' && cep !== null) {

      // 'cep' somente com dígitos.
      cep = cep.replace(/\D/g, '');

      // Expressão regular para validar o CEP.
      const validaCep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validaCep.test(cep)) {

        this.http
          .get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe({

            next: (data) => {

              if (!data.hasOwnProperty('erro')) {
                this.formCliente.controls['estado'].setValue(Object(data)['uf']);
                this.formCliente.controls['cidade'].setValue(Object(data)['localidade']);
                this.formCliente.controls['logradouro'].setValue(Object(data)['logradouro']);
                this.formCliente.controls['bairro'].setValue(Object(data)['bairro']);
              } else {
                console.log("CEP inválido.");
              }
            },

            error: (e) => {
              console.log('Não foi possível acessar a API.');
            }
            
          })

      }
    }

  }

  onSubmit() {
    console.log(this.formCliente.value);
  }

}

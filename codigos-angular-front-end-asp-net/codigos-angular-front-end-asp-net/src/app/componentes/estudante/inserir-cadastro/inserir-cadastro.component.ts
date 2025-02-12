import { Component, Input } from '@angular/core';
// importar o service
import { EstudanteApiService } from 'src/app/service/estudante-api.service';
// importar o Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-cadastro',
  templateUrl: './inserir-cadastro.component.html',
  styleUrls: ['./inserir-cadastro.component.css']
})
export class InserirCadastroComponent {
  // 1º passo: definir o titulo do comp´
  tituloComp: string = 'Inserir Cadastro'

  // 2º passo: definir um objeto literal para receber os dados que virão da view
  @Input() cadastroInserido = {
    estudanteNome: '',
    estudanteSobrenome: '',
    estudanteRA: 0,
    estudanteEmail: '',
    estudanteIdade: 0,
    estudanteFone: '',
    estudanteGenero: ''
  }

  // 3º passo: definir as referencias de instancia das classes EstudanteApiService e Router
  constructor(
    private estudApi: EstudanteApiService,
    private roteador: Router
  ){}

  // 4º passo: criar um método/função para acessar o service e executar a requisição assincrona de inserção de cadastro]
  inserirUmCadastro(): any{
    // chamar a injeção de dependencia e acessar a requisição
    this.estudApi.inserirRegistro(this.cadastroInserido).subscribe(() =>{
      this.roteador.navigate(['/listar'])
    })
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [

  {
    path: 'cliente',
    component: ClienteComponent
  },

  {
    path: 'cliente/novo',
    component: FormularioComponent
  },

  {
    path: 'cliente/:id',
    component: FormularioComponent
  },

  // Este abaixo irá redirecionar qualquer caminho não listado acima para o 'cliente'.
  {
    path: '**',
    redirectTo: 'cliente',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarClienteComponent } from './components/cliente/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/cliente/actualizar-cliente/actualizar-cliente.component';
import { MostrarVentaComponent } from './components/venta/mostrar-venta/mostrar-venta.component';
import { CrearVentaComponent } from './components/venta/crear-venta/crear-venta.component';
import { ActualizarVentaComponent } from './components/venta/actualizar-venta/actualizar-venta.component';
import { MostrarCocheComponent } from './components/coche/mostrar-coche/mostrar-coche.component';
import { CrearCocheComponent } from './components/coche/crear-coche/crear-coche.component';
import { ActualizarCocheComponent } from './components/coche/actualizar-coche/actualizar-coche.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    component: MostrarClienteComponent
  },
  {
    path: 'addCliente',
    component: CrearClienteComponent
  },
  {
    path: 'clientes/edit/:id',
    component: ActualizarClienteComponent
  },
  {
    path: 'ventas',
    component: MostrarVentaComponent
  },
  {
    path: 'addVenta',
    component: CrearVentaComponent
  },
  {
    path: 'ventas/edit/:id',
    component: ActualizarVentaComponent
  },
  {
    path: 'coches',
    component: MostrarCocheComponent
  },
  {
    path: 'addCoche',
    component: CrearCocheComponent
  },
  {
    path: 'coches/edit/:id',
    component: ActualizarCocheComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

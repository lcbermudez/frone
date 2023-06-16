import { Component, OnInit } from '@angular/core';
import { ClienteI } from 'src/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-mostrar-cliente',
  templateUrl: './mostrar-cliente.component.html',
  styleUrls: ['./mostrar-cliente.component.css']
})
export class MostrarClienteComponent implements OnInit{
  clientes: ClienteI[]=[];
  constructor(private clienteService: ClienteService,
    private router: Router, private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.mostrarClientes();
  }

  mostrarClientes(){
    this.clienteService.getAllCliente().subscribe({next: (data)=>{
      this.clientes = data.cliente
      console.log(this.clientes)
    }})
  }

  eliminar(id:number){
    this.router.navigateByUrl('/clientes');
    this.clienteService.deleteCliente(id).subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
      this.mostrarClientes();
    },
    err => {
      console.log(err);
      console.log('No se ha eliminado correctamente');
    }
    );
  }

  imprimir(id:number){}
}

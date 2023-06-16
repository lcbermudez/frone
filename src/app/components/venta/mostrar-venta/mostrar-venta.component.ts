import { Component, OnInit } from '@angular/core';
import { VentaI } from 'src/models/venta';
import { VentaService } from 'src/app/services/venta.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-mostrar-venta',
  templateUrl: './mostrar-venta.component.html',
  styleUrls: ['./mostrar-venta.component.css']
})
export class MostrarVentaComponent implements OnInit{
  ventas: VentaI[]=[];
  constructor(
    private ventaService: VentaService,
    private router: Router,
    private messageService: MessageService
  ) {

  }
  ngOnInit(): void {
    this.mostrarVenta();
  }

  mostrarVenta(){
    this.ventaService.getAllVenta().subscribe({next: (data)=>{
      this.ventas=data.venta
      console.log(this.ventas)
    }})
  }

  eliminar(id:number){
    this.router.navigateByUrl('/ventas');
    this.ventaService.deleteVenta(id).subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
      this.mostrarVenta();
    },
    err => {
      console.log(err);
      console.log('No se ha eliminado correctamente');
    }
    );
  }
}

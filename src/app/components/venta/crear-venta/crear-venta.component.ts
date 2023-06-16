import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { CocheService } from 'src/app/services/coche.service';
import { VentaService } from 'src/app/services/venta.service';
import { VentaI } from 'src/models/venta';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})

export class CrearVentaComponent implements OnInit {

  public clientes: any[] = [];
  public coches: any[] = [];
  public form: FormGroup = this.formBuilder.group({
    id: [''],
    fechaVenta: ['', [Validators.required]],
    subtotalVenta: ['', [Validators.required]],
    impuestosVenta: ['', [Validators.required]],
    descuentosVenta: ['', [Validators.required]],
    totalVenta: ['', [Validators.required]],
    clienteId: ['', [Validators.required]],
    cocheId: ['', [Validators.required]],
  }); constructor(private formBuilder: FormBuilder, private ventaservice: VentaService, private messageService: MessageService, private router: Router, private cochesService: CocheService) {

  }
  ngOnInit(): void {
    this.traerClientes();
    this.traerCoches();

  }
  onSubmit(): void {
    const formValue: VentaI = this.form.value;

    const {
      fechaVenta,
      subtotalVenta,
      impuestosVenta,
      descuentosVenta,
      totalVenta,
      clienteId,
      cocheId
    } = this.form.value;

    let body = {
      fechaVenta,
      subtotalVenta,
      impuestosVenta,
      descuentosVenta,
      totalVenta,
      clienteId: clienteId.id,
      cocheId: cocheId.id,
    }
    this.ventaservice.createVenta(body).subscribe(() => {
      // console.log('Se ha creado correctamente');
      setTimeout(() => {
        this.messageService.add({ severity: 'success', summary: 'Notificacion', detail: 'Creado exitosamente', life: 5000 });
      }, 0);
      this.router.navigateByUrl('ventas');
    },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  traerClientes() {
    try {
      this.ventaservice.get('/clientes').subscribe(res => {
        this.clientes = res.cliente;
      })
    } catch (error) {
      console.log(error)
    }
  }


  cancel() {
    this.router.navigateByUrl('/ventas');
  }

  traerCoches() {
    try {
      this.cochesService.get('/coches').subscribe( res => {
        console.log(res)
        this.coches = res.coche
      })
    } catch (error) {
      console.log(error)
    }
   
  }

  get fechaVenta() { return this.form.get('fechaVenta'); }
  get subtotalVenta() { return this.form.get('subtotalVenta'); }
  get impuestosVenta() { return this.form.get('impuestosVenta'); }
  get descuentosVenta() { return this.form.get('descuentosVenta'); }
  get totalVenta() { return this.form.get('totalVenta'); }
}



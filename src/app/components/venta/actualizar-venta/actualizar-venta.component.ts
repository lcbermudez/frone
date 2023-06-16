import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { VentaI } from 'src/models/venta';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-actualizar-venta',
  templateUrl: './actualizar-venta.component.html',
  styleUrls: ['./actualizar-venta.component.css']
})
export class ActualizarVentaComponent implements OnInit{
  public clientes:any [] = [];
  public coches:any [] = [];
  public id: number=0;
  public form:FormGroup = this.formBuilder.group({
    fechaVenta:  ['', [Validators.required]],
    subtotalVenta: ['', [Validators.required]],
    impuestosVenta: ['', [Validators.required]], 
    descuentosVenta: ['', [Validators.required]], 
    totalVenta: ['', [Validators.required]],
    clienteId: ['', [Validators.required]],
    cocheId: ['', [Validators.required]],


  });constructor(private formBuilder: FormBuilder,
    private ventaService: VentaService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getVenta(this.id);
    this.traerClientes();
    this.traerCoches();
  }

  getVenta(id: number){

    try {
      this.ventaService.get(`/venta/${id}`).subscribe(res => {
        const { descuentosVenta, fechaVenta, impuestosVenta, subtotalVenta, totalVenta} = res.venta
        let body = {
          descuentosVenta,
          fechaVenta,
          impuestosVenta,
          subtotalVenta,
          totalVenta,
        }
        this.form.patchValue(body)

      })
    } catch (error) {
      console.log(error)
    }
  }

  onSubmit(){
    const formValue: VentaI = this.form.value;
    const id: number = this.id;
    const { descuentosVenta, fechaVenta, impuestosVenta, subtotalVenta, totalVenta, clienteId, cocheId} = this.form.value;


    let body = {
      descuentosVenta,
      fechaVenta,
      impuestosVenta,
      subtotalVenta,
      totalVenta,
      clienteId: clienteId.id,
      cocheId: cocheId.id,
    }

    this.ventaService.updateVenta(id, body).subscribe(()=>{
      this.form.reset();
      setTimeout(()=>{
        this.messageService.add({severity: 'success', summary: 'Notificacion',detail: 'Venta Actualizada', life:5000});
      }, 0);
      this.router.navigateByUrl('ventas');
    })
  }

  traerClientes() {
    try {
      this.ventaService.get('/clientes').subscribe(res => {
        // console.log(res.cliente)
        this.clientes = res.cliente;
      })
    } catch (error) {
      console.log(error)
    }
  }

  
  traerCoches() {
    this.ventaService.get('/coches').subscribe( res => {
      this.coches = res.coche
    })
  }




  cancel() {
    this.router.navigateByUrl('/ventas');
  }

  get fechaVenta() { return this.form.get('fechaVenta'); }
  get subtotalVenta() { return this.form.get('subtotalVenta'); }
  get impuestosVenta() { return this.form.get('impuestosVenta'); }
  get descuentosVenta() { return this.form.get('descuentosVenta'); }
  get totalVenta() { return this.form.get('totalVenta'); }
  // get clienteId() { return this.form.get('clienteId'); }
}

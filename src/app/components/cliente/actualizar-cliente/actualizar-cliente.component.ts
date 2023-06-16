import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteI } from 'src/models/cliente';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit{
  public id: number=0;
  public form:FormGroup = this.formBuilder.group({
    id: [''],
    cedula: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    codigoCliente: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getCliente(this.id);
  }

  getCliente(id: number){
    this.clienteService.getOneCliente(id).subscribe({next: (data)=>{
      this.form.setValue(data.cliente)
    }})
  }

  onSubmit(){
    const formValue: ClienteI = this.form.value;
    const id: number = this.form.value.id;
    this.clienteService.updateCliente(id, formValue).subscribe(()=>{
      setTimeout(()=>{
        this.messageService.add({severity: 'success', summary: 'Notificacion',detail: 'Cliente Actualizado', life:5000});
      }, 0);
      this.router.navigateByUrl('clientes');
    })
  }


  cancel() {
    this.router.navigateByUrl('/clientes');
  }

  get cedula() { return this.form.get('cedula'); }
  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get direccion() { return this.form.get('direccion'); }
  get ciudad() { return this.form.get('ciudad'); }
  get codigoCliente() { return this.form.get('codigoCliente'); }
}

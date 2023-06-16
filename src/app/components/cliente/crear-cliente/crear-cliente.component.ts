import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteI } from 'src/models/cliente';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit{
  public form:FormGroup = this.formBuilder.group({
    cedula: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    codigoCliente: ['', [Validators.required]],
  });
  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private messageService: MessageService, private router:Router) {

  }
  ngOnInit(): void {

  }

  onSubmit(): void{
    const formValue: ClienteI = this.form.value;
    console.log(formValue);
    this.clienteService.createCliente(formValue).subscribe(() =>{
      // console.log('Se ha creado correctamente');
      setTimeout(()=>{
        this.messageService.add({severity:'success', summary:'Notificacion',detail:'Creado correctamente', life: 5000});
      }, 0);
      this.router.navigateByUrl('clientes');
    },
    err => {
      console.log(err);
      console.log('No se ha creado correctamente');
    }
    );
  }


  cancel(){
    this.router.navigateByUrl('/clientes');
  }

  get cedula() { return this.form.get('cedula'); }
  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get direccion() { return this.form.get('direccion'); }
  get ciudad() { return this.form.get('ciudad'); }
  get codigoCliente() { return this.form.get('codigoCliente'); }
}

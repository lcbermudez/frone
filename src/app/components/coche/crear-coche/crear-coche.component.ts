import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';
import { CocheService } from 'src/app/services/coche.service';
import { CocheI } from 'src/models/coche';

@Component({
  selector: 'app-crear-coche',
  templateUrl: './crear-coche.component.html',
  styleUrls: ['./crear-coche.component.css']
})
export class CrearCocheComponent {

  public form:FormGroup = this.formBuilder.group({
    codigo: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    color: ['', [Validators.required]],
    pvc: ['', [Validators.required]],
  });
  constructor(private formBuilder: FormBuilder, private cocheService: CocheService, private messageService: MessageService, private router:Router) {  }
  ngOnInit(): void {

  }

  onSubmit(): void{
    const formValue: CocheI = this.form.value;
    console.log(formValue);
    this.cocheService.createCoche(formValue).subscribe(() =>{
      this.form.reset();
      setTimeout(()=>{
        this.messageService.add({severity:'success', summary:'Notificacion',detail:'Creado correctamente', life: 5000});
      }, 0);
      this.router.navigateByUrl('coches');
    },
    err => {
      console.log(err);
      console.log('No se ha creado correctamente');
    }
    );
  }


  cancel(){
    this.router.navigateByUrl('/coches');
  }

  get codigo_M() { return this.form.get('codigo_M'); }
  get modelo() { return this.form.get('modelo'); }
  get color() { return this.form.get('color'); }
  get pvc() { return this.form.get('pvc'); }
}

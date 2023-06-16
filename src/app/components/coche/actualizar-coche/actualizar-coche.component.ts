import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';
import { CocheService } from 'src/app/services/coche.service';
import { CocheI } from 'src/models/coche';

@Component({
  selector: 'app-actualizar-coche',
  templateUrl: './actualizar-coche.component.html',
  styleUrls: ['./actualizar-coche.component.css']
})
export class ActualizarCocheComponent {
  public id: number=0;
  public form:FormGroup = this.formBuilder.group({
    id: [''],
    codigo: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    color: ['', [Validators.required]],
    pvc: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private cocheService: CocheService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getCliente(this.id);
  }

  getCliente(id: number){
    console.log(id)
    this.cocheService.getOneCoche(id).subscribe({next: (data)=>{
      this.form.patchValue(data.coche)
      // this.form.setValue(data.coche)
    }})
  }

  onSubmit(){
    const formValue: CocheI = this.form.value;
    const id: number = this.form.value.id;
    this.cocheService.updateCoche(id, formValue).subscribe(()=>{
      setTimeout(()=>{
        this.messageService.add({severity: 'success', summary: 'Notificacion',detail: 'Cliente Actualizado', life:5000});
      }, 0);
      this.router.navigateByUrl('coches');
    })
  }


  cancel() {
    this.router.navigateByUrl('/coches');
  }

  get codigo() { return this.form.get('codigo'); }
  get modelo() { return this.form.get('nombre'); }
  get color() { return this.form.get('color'); }
  get pvc() { return this.form.get('pvc'); }
}

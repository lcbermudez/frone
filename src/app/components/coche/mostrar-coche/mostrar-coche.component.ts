import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CocheService } from 'src/app/services/coche.service';

@Component({
  selector: 'app-mostrar-coche',
  templateUrl: './mostrar-coche.component.html',
  styleUrls: ['./mostrar-coche.component.css']
})
export class MostrarCocheComponent implements OnInit {
  public coches: any[] = [];

  constructor(private cocheService: CocheService, private messageService: MessageService, private router: Router) { }
  ngOnInit(): void {
    this.traerCoches();
  }


  eliminar(id: number) {
    this.router.navigateByUrl('/coches');
    this.cocheService.deleteCoche(id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Cliente Eliminado', life: 5000 });
      this.traerCoches();
    },
      err => {
        console.log(err);
        console.log('No se ha eliminado correctamente');
      }
    );
  }

  traerCoches() {
    this.cocheService.get('/coches').subscribe( res => {
      console.log(res)
      this.coches = res.coche
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  items: MenuItem[]=[];
  ngOnInit(): void {
    this.items=[
      {
        label:'Clientes',
        icon: 'pi pi-user',
        routerLink: '/clientes'
      },
      {
        label: 'Ventas',
        icon: 'pi pi-shopping-cart',
        routerLink: '/ventas'
      },
      {
        label: 'Coches',
        icon: 'pi pi-car',
        routerLink: '/coches'
      },
    ]
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCocheComponent } from './mostrar-coche.component';

describe('MostrarCocheComponent', () => {
  let component: MostrarCocheComponent;
  let fixture: ComponentFixture<MostrarCocheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarCocheComponent]
    });
    fixture = TestBed.createComponent(MostrarCocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOrderComponent } from './detalle-order.component';

describe('DetalleOrderComponent', () => {
  let component: DetalleOrderComponent;
  let fixture: ComponentFixture<DetalleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

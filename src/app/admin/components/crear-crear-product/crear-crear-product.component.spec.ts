import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCrearProductComponent } from './crear-crear-product.component';

describe('CrearCrearProductComponent', () => {
  let component: CrearCrearProductComponent;
  let fixture: ComponentFixture<CrearCrearProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCrearProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCrearProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

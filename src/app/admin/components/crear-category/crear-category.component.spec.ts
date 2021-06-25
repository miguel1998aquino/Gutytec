import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCategoryComponent } from './crear-category.component';

describe('CrearCategoryComponent', () => {
  let component: CrearCategoryComponent;
  let fixture: ComponentFixture<CrearCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHomeComponent } from './editar-home.component';

describe('EditarHomeComponent', () => {
  let component: EditarHomeComponent;
  let fixture: ComponentFixture<EditarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

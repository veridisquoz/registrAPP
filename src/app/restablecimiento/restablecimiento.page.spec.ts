import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecimientoPage } from './restablecimiento.page';

describe('RestablecimientoPage', () => {
  let component: RestablecimientoPage;
  let fixture: ComponentFixture<RestablecimientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

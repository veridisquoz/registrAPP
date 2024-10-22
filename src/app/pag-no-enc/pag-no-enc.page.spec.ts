import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagNoEncPage } from './pag-no-enc.page';

describe('PagNoEncPage', () => {
  let component: PagNoEncPage;
  let fixture: ComponentFixture<PagNoEncPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagNoEncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

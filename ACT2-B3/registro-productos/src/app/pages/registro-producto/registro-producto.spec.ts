import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroProducto } from './registro-producto';

describe('RegistroProducto', () => {
  let component: RegistroProducto;
  let fixture: ComponentFixture<RegistroProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroProducto],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PerfilMascota } from "./perfil-mascota";

describe("PerfilMascota", () => {
  let component: PerfilMascota;
  let fixture: ComponentFixture<PerfilMascota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilMascota],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilMascota);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

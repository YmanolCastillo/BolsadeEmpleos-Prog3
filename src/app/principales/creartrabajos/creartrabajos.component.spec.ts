import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreartrabajosComponent } from './creartrabajos.component';

describe('CreartrabajosComponent', () => {
  let component: CreartrabajosComponent;
  let fixture: ComponentFixture<CreartrabajosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreartrabajosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreartrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

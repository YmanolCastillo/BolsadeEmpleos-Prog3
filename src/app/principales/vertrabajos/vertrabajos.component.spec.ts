import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VertrabajosComponent } from './vertrabajos.component';

describe('VertrabajosComponent', () => {
  let component: VertrabajosComponent;
  let fixture: ComponentFixture<VertrabajosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VertrabajosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VertrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

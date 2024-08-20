import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProstheticsComponent } from './prosthetics.component';

describe('ProstheticsComponent', () => {
  let component: ProstheticsComponent;
  let fixture: ComponentFixture<ProstheticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProstheticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProstheticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

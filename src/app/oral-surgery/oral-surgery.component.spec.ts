import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OralSurgeryComponent } from './oral-surgery.component';

describe('OralSurgeryComponent', () => {
  let component: OralSurgeryComponent;
  let fixture: ComponentFixture<OralSurgeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OralSurgeryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OralSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

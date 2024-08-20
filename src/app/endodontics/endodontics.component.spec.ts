import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndodonticsComponent } from './endodontics.component';

describe('EndodonticsComponent', () => {
  let component: EndodonticsComponent;
  let fixture: ComponentFixture<EndodonticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndodonticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndodonticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

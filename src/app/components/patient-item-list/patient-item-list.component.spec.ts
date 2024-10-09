import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientItemListComponent } from './patient-item-list.component';

describe('PatientItemListComponent', () => {
  let component: PatientItemListComponent;
  let fixture: ComponentFixture<PatientItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

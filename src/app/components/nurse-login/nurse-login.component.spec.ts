import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseLoginComponent } from './nurse-login.component';

describe('NurseLoginComponent', () => {
  let component: NurseLoginComponent;
  let fixture: ComponentFixture<NurseLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

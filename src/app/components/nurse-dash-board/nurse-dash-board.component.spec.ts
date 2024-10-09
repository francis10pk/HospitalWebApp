import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseDashBoardComponent } from './nurse-dash-board.component';

describe('NurseDashBoardComponent', () => {
  let component: NurseDashBoardComponent;
  let fixture: ComponentFixture<NurseDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

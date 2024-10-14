import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NurseDashboardComponent } from './nurse-dash-board.component';

describe('NurseDashBoardComponent', () => {
  let component: NurseDashboardComponent;
  let fixture: ComponentFixture<NurseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSubmitPageComponent } from './review-submit-page.component';

describe('ReviewSubmitPageComponent', () => {
  let component: ReviewSubmitPageComponent;
  let fixture: ComponentFixture<ReviewSubmitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSubmitPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewSubmitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

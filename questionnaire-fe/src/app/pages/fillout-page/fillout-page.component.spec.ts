import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilloutPageComponent } from './fillout-page.component';

describe('FilloutPageComponent', () => {
  let component: FilloutPageComponent;
  let fixture: ComponentFixture<FilloutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilloutPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilloutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigupPageComponent } from './SigupPageComponent';

describe('SigupPageComponent', () => {
  let component: SigupPageComponent;
  let fixture: ComponentFixture<SigupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigupPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

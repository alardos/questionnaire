import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormsPageComponent } from './my-forms-page.component';

describe('MyFormsPageComponent', () => {
  let component: MyFormsPageComponent;
  let fixture: ComponentFixture<MyFormsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFormsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFormsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

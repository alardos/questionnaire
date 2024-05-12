import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubmitsPageComponent } from './my-fillouts-page.component';

describe('MyFilloutsPageComponent', () => {
  let component: MySubmitsPageComponent;
  let fixture: ComponentFixture<MySubmitsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySubmitsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySubmitsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

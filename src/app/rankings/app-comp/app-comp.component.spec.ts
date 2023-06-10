import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCompComponent } from './app-comp.component';

describe('AppCompComponent', () => {
  let component: AppCompComponent;
  let fixture: ComponentFixture<AppCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

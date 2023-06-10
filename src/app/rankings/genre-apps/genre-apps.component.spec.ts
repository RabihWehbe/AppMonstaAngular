import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAppsComponent } from './genre-apps.component';

describe('GenreAppsComponent', () => {
  let component: GenreAppsComponent;
  let fixture: ComponentFixture<GenreAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

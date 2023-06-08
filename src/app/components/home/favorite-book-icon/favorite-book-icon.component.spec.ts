import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBookIconComponent } from './favorite-book-icon.component';

describe('FavoriteBookIconComponent', () => {
  let component: FavoriteBookIconComponent;
  let fixture: ComponentFixture<FavoriteBookIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteBookIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteBookIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

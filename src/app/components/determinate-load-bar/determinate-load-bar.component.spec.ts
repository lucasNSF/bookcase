import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeterminateLoadBarComponent } from './determinate-load-bar.component';

describe('DeterminateLoadBarComponent', () => {
  let component: DeterminateLoadBarComponent;
  let fixture: ComponentFixture<DeterminateLoadBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeterminateLoadBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeterminateLoadBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

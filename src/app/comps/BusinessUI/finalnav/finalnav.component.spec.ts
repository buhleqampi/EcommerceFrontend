import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalnavComponent } from './finalnav.component';

describe('FinalnavComponent', () => {
  let component: FinalnavComponent;
  let fixture: ComponentFixture<FinalnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalnavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

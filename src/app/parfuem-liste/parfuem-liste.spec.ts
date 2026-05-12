import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParfuemListe } from './parfuem-liste';

describe('ParfuemListe', () => {
  let component: ParfuemListe;
  let fixture: ComponentFixture<ParfuemListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParfuemListe],
    }).compileComponents();

    fixture = TestBed.createComponent(ParfuemListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

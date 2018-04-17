import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentExpenseDetailsComponent } from './agent-expense-details.component';

describe('AgentExpenseDetailsComponent', () => {
  let component: AgentExpenseDetailsComponent;
  let fixture: ComponentFixture<AgentExpenseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentExpenseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentExpenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

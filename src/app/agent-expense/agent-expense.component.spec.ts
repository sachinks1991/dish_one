import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentExpenseComponent } from './agent-expense.component';

describe('AgentExpenseComponent', () => {
  let component: AgentExpenseComponent;
  let fixture: ComponentFixture<AgentExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

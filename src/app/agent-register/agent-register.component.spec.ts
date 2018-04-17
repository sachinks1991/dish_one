import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRegisterComponent } from './agent-register.component';

describe('AgentRegisterComponent', () => {
  let component: AgentRegisterComponent;
  let fixture: ComponentFixture<AgentRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

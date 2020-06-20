import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsEditComponent } from './order-details-edit.component';

describe('OrderDetailsEditComponent', () => {
  let component: OrderDetailsEditComponent;
  let fixture: ComponentFixture<OrderDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

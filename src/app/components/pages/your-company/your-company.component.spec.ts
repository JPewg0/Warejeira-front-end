import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCompanyComponent } from './your-company.component';

describe('YourCompanyComponent', () => {
  let component: YourCompanyComponent;
  let fixture: ComponentFixture<YourCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

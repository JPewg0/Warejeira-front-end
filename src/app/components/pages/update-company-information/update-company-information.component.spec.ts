import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyInformationComponent } from './update-company-information.component';

describe('UpdateCompanyInformationComponent', () => {
  let component: UpdateCompanyInformationComponent;
  let fixture: ComponentFixture<UpdateCompanyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCompanyInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCompanyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

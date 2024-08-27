import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDropListElementComponent } from './cdk-drop-list-element.component';

describe('CdkDropListElementComponent', () => {
  let component: CdkDropListElementComponent;
  let fixture: ComponentFixture<CdkDropListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdkDropListElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdkDropListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

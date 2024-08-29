import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavItemComponent } from './nav-item.component';
import { ActivatedRoute } from '@angular/router';

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NavItemComponent ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {linkPath: '', title: 'Home'}}
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, inject } from '@angular/core';
import { DailyMealsComponent } from '../daily-meals/daily-meals.component';
import { Plan } from '../../plan';
import { PlanService } from '../../plan.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DailyMealsComponent],
  template: `
    <section class="dashboard-content">
      <app-daily-meals [plan]="planList[0]" />
      <app-daily-meals [plan]="planList[1]" />
      <app-daily-meals [plan]="planList[2]" />
      <app-daily-meals [plan]="planList[3]" />
      <app-daily-meals [plan]="planList[4]" />
      <app-daily-meals [plan]="planList[5]" />
      <app-daily-meals [plan]="planList[6]" />
    </section>
  `,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  planList: Plan[] = [];
  planService: PlanService = inject(PlanService);

  constructor() {
    this.getMyPlan();
  }

  getMyPlan() {
    this.planService.getAllPlans().then((plans: Plan[]) => {
      this.planList = plans;
    });
  }
}

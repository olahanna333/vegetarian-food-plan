import { Injectable } from '@angular/core';
import { Plan } from './plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  urlPlans = 'http://localhost:3000/plans';

  constructor() { }

  async getAllPlans(): Promise<Plan[]> {
    const data = await fetch(this.urlPlans);
    return await data.json();
  }

  async getPlanByDay(id: number): Promise<Plan | undefined> {
    const data = await fetch(`${this.urlPlans}/${id}`);
    return await data.json();
  }

  async changePlan(id: number, meal: object): Promise<Plan> {
    const data = await fetch(`${this.urlPlans}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(
        meal
      ),
    });
    return await data.json();
  }
}

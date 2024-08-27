import { Component, Input, input} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-cdk-drop-list-element',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag],
  template: `
    <div class="example-container">
      <h3>{{title}}</h3>
      <div
        cdkDropList
        [cdkDropListData]="recipes"
        class={{className}}
        (cdkDropListDropped)="drop($event)">
        @for (item of recipes; track item) {
          <div id="{{item.id}}" class="example-box" cdkDrag>
            {{item.name}}
            <img class="photo" [src]="item.photo" alt="Photo of {{item.name}}">
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './cdk-drop-list-element.component.css'
})
export class CdkDropListElementComponent {
  @Input() recipes!: Recipe[] | [];
  @Input() title!: string;
  @Input() className!: string;

  drop(event: CdkDragDrop<Recipe[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if(event.container.data.length != 1 ) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } 
  }
}

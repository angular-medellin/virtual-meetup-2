import { AngularFireDatabase } from 'angularfire2/database';
import { Columns, Item, Items } from './item.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  columnIds = Columns;
  items: Item[][] = [];

  constructor(private db: AngularFireDatabase) {
    this.db
      .list<Item>('items')
      .valueChanges()
      .subscribe(this.spreadItems);
  }

  spreadItems = (items: Item[]) => {
    this.items = items.reduce(
      (matrix, item) => {
        if (!matrix[item.column]) {
          matrix[item.column] = [];
        }
        matrix[item.column].push(item);
        return matrix;
      },
      [] as Item[][],
    );
  }

  pushItem({ target }: KeyboardEvent, column: Columns) {
    const input = target as HTMLInputElement;
    const { value: text } = input;
    if (text) {
      input.value = '';
      this.db.list<Item>('items').push({
        text,
        column,
      });
    }
  }
}

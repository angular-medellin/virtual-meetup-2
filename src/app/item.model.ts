export interface Items {
  [key: string]: Item;
}

export interface Item {
  text: string;
  column: Columns;
}

export enum Columns {
  wentWell,
  toImprove,
  actionItems,
}

import { Component, OnInit, Input, OnChanges, SimpleChanges, HostBinding, ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'vm-table-spreadsheet',
  templateUrl: './table-spreadsheet.component.html',
  styleUrls: ['./table-spreadsheet.component.scss']
})
export class TableSpreadsheetComponent implements OnInit, OnChanges {

  @Input('items') items: any[];
  @Input('keys') keys: string[];

  columnWidths: number [] = [];
  rowHeights: number [] = [];

  @HostBinding('class.mousedowm') mouseDown = false;
  @HostBinding('attr.tabindex') _tabindex = 0;

  focused = false;

  selectionStartRow = 0;
  selectionStartCol = 0;
  selectionEndRow = 0;
  selectionEndCol = 0;

  clickedInside = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelectorAll('th').forEach((element: Element) => {
      this.columnWidths.push(element.clientWidth + 40);
    });
    this.elementRef.nativeElement.querySelectorAll('tr').forEach((element: Element) => {
      this.rowHeights.push(element.clientHeight);
    });
  }

  ngOnChanges(changes: SimpleChanges) {}


  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent) {
    this.clickedInside = this.elementRef.nativeElement.contains(event.target)
    this.focused = this.clickedInside;
  }


  @HostListener('focus', ['$event'])
  onElementFocus(event: FocusEvent) {
    this.focused = true;
  }

  @HostListener('blur', ['$event'])
  onElementBlur(event: FocusEvent) {
    this.focused = false;
  }

  
  @HostListener('document:keyup', ['$event'])
  onkeyup(event: KeyboardEvent){
    console.log(event)
  }



  onMousedown(row: number, col: number) {
    this.mouseDown = true;
    this.selectionStartRow = row;
    this.selectionStartCol = col;
  }

  onMousemove(row: number, col: number) {
    if( this.mouseDown == false ) return;
    this.selectionEndRow = row;
    this.selectionEndCol = col;
    this.updateSelection();
  }

  onMouseup(row: number, col: number) {
    this.mouseDown = false;
    this.selectionEndRow = row;
    this.selectionEndCol = col;
    this.updateSelection();
  }

  selectionLowCol = 0;
  selectionHighCol = 0;
  selectionLowRow = 0;
  selectionHighRow = 0;


  updateRanges() {
    if( this.selectionStartCol < this.selectionEndCol ) {
      this.selectionLowCol = this.selectionStartCol;
      this.selectionHighCol = this.selectionEndCol;
    } else {
      this.selectionLowCol = this.selectionEndCol;
      this.selectionHighCol = this.selectionStartCol;
    }
    if( this.selectionStartRow < this.selectionEndRow ) {
      this.selectionLowRow = this.selectionStartRow;
      this.selectionHighRow = this.selectionEndRow;
    } else {
      this.selectionLowRow = this.selectionEndRow;
      this.selectionHighRow = this.selectionStartRow;
    }
  }

  selectionOffsetX = 0;
  selectionOffsetY = 0;
  selectionWidth = 0;
  selectionHeight = 0;
  predictiveX = 0;
  predictiveY = 0;


  updateSelection() {
    this.updateRanges()

    this.selectionOffsetX = -1;
    this.selectionOffsetY = -1;
    this.selectionWidth = -2;
    this.selectionHeight = -2;


    for(var i = 0; i < this.selectionLowCol; i++) {
      this.selectionOffsetX += this.columnWidths[i];
    }

    for(var i = 0; i <= this.selectionLowRow; i++) {
      this.selectionOffsetY += this.rowHeights[i];
    }

    for(var i = this.selectionLowCol; i <= this.selectionHighCol; i++) {
      this.selectionWidth += this.columnWidths[i];
    }

    for(var i = this.selectionLowRow; i <= this.selectionHighRow; i++) {
      this.selectionHeight += this.rowHeights[i];
    }

    this.predictiveX = this.selectionOffsetX + this.selectionWidth;
    this.predictiveY = this.selectionOffsetY + this.selectionHeight;

  }

}

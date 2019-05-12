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
    this.elementRef.nativeElement.querySelectorAll('thead th').forEach((element: Element) => {
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

  ///////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  // Special keys

  // @HostListener('document:keydown.shift', ['$event'])
  // onShift


  @HostListener('document:keyup', ['$event'])
  onkeyup(event: KeyboardEvent){}

  @HostListener('document:keyup.arrowup', ['$event'])
  onKeyupArrowUp(event: KeyboardEvent){
    this.selectionStartRow = Math.max(0, this.selectionStartRow - 1)
    this.selectionEndRow = this.selectionStartRow;
    this.selectionEndCol = this.selectionStartCol;
    this.updateSelection();
  }

  @HostListener('document:keyup.arrowdown', ['$event'])
  onKeyupArrowDown(event: KeyboardEvent){
    this.selectionStartRow = Math.min(this.selectionStartRow + 1, this.rowHeights.length-2)
    this.selectionEndRow = this.selectionStartRow;
    this.selectionEndCol = this.selectionStartCol;
    this.updateSelection();
  }

  @HostListener('document:keyup.arrowleft', ['$event'])
  onKeyupArrowLeft(event: KeyboardEvent){
    this.selectionStartCol = Math.max(0, this.selectionStartCol - 1);
    this.selectionEndCol = this.selectionStartCol;
    this.selectionEndRow = this.selectionStartRow;
    this.updateSelection();
  }

  @HostListener('document:keyup.arrowright', ['$event'])
  onKeyupArrowRight(event: KeyboardEvent){
    this.selectionStartCol = Math.min(this.selectionStartCol + 1, this.columnWidths.length-1);
    this.selectionEndCol = this.selectionStartCol;
    this.selectionEndRow = this.selectionStartRow;
    this.updateSelection();
  }


  ///////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////



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
      this.selectionLowCol = this.selectionStartCol + 1;
      this.selectionHighCol = this.selectionEndCol + 1;
    } else {
      this.selectionLowCol = this.selectionEndCol + 1;
      this.selectionHighCol = this.selectionStartCol + 1;
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

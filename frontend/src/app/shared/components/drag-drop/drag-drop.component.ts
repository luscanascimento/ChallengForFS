import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { merge, Subscription } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {

  tasks = "Tarefa"
  status = "Status"
  dragStart$ = this.dragulaService.drag("VAMPIRES").pipe(mapTo(true));
  dragEnd$ = this.dragulaService.dragend("VAMPIRES").pipe(mapTo(false));
  isDragging$ = merge(this.dragStart$, this.dragEnd$).pipe(startWith(false));


  subs = new Subscription();


  constructor(private dragulaService: DragulaService) {
    dragulaService.createGroup("Tarefas", {
      removeOnSpill: true
    });

    this.subs.add(this.dragulaService.drag("Tarefas")
      .subscribe(({ name, el, source }) => {
      })
    );
    this.subs.add(this.dragulaService.drop("Tarefas")
      .subscribe(({ name, el, target, source, sibling }) => {
      })
    );
    this.subs.add(this.dragulaService.dropModel("Tarefas")
      .subscribe(({ sourceModel, targetModel, item }) => {
      })
    );

    this.subs.add(this.dragulaService.drop()
      .subscribe(({ name, el, target, source, sibling }) => {
        // ...
      })
    );

  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}


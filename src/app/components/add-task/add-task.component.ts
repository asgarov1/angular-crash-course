import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UiService} from '../../services/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  text!: string;
  day!: string;
  reminder: boolean = false;
  @Output() onAddTask = new EventEmitter();
  showAddTask = false;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("Submitting")
    if (!this.text) {
      alert('Pease add a task!')
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    };
    this.onAddTask.emit(newTask);
  }
}

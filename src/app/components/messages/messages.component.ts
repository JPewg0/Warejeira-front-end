import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { MessagesService } from '../../services/messages.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  faTimes = faTimes;

  constructor(public messagesService: MessagesService){
  }
}

import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() data:any;

  @Input() navigationLink:any;

  @Input() navigator:any;

  constructor() { }

  ngOnInit(): void {
  }

}

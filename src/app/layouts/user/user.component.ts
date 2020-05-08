import { Component, OnInit } from '@angular/core';
import { AuthServiceLocal } from 'src/app/shared/services/auth.service.local';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: [ './user.component.scss' ]
})
export class UserComponent implements OnInit {
  constructor(public authService: AuthServiceLocal) {}

	ngOnInit() {}
}

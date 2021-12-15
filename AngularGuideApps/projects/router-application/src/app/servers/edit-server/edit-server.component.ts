import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string } | undefined;
  serverName = '';
  serverStatus = '';

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    if (this.server) {
      this.serverName = this.server?.name;
      this.serverStatus = this.server?.status;
    }

    //fetch query parameters and fragment from external
    console.log(this.route?.snapshot.queryParams);
    console.log(this.route?.snapshot.fragment);

    //fetch query parameters and fragment from within component
    this.route.queryParams.subscribe((params) => {});
    this.route.fragment.subscribe((fragment) => {});
  }

  onUpdateServer() {
    if (this.server)
      this.serversService.updateServer(this.server.id, {
        name: this.serverName,
        status: this.serverStatus,
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
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
    this.route.queryParams.subscribe((params: Params) => {
      this.allowEdit = params['allowEdit'] === '1' ? true : false;
    });
    this.route.fragment.subscribe((fragment) => {});
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    if (this.server && this.server.name !== undefined)
      this.serverName = this.server.name;
    if (this.server && this.server.status !== undefined)
      this.serverStatus = this.server?.status;
  }

  onUpdateServer() {
    if (this.server) {
      this.serversService.updateServer(this.server.id, {
        name: this.serverName,
        status: this.serverStatus,
      });
      this.changesSaved = true;
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) return true;

    if (
      (this.serverName !== this.server?.name ||
        this.serverStatus !== this.server?.status) &&
      !this.changesSaved
    ) {
      return confirm('Do you want to discard changes?');
    } else {
      return true;
    }
  }
}

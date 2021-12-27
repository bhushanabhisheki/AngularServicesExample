import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string } | undefined;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // let id = +this.route.snapshot.params['id'];

    this.route.data.subscribe((data) => {
      const server = data['server'];
      console.log(server);
      this.server = data['server'];
    });

    // this.route.params.subscribe((params: Params) => {
    //   id = +params['id'];
    //   this.server = this.serversService.getServer(id);
    // });

    // this.server = this.serversService.getServer(id);
    //console.log('load server with id: ' + id);
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}

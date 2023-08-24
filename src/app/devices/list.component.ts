import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DeviceService } from '../_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  devices = null;

  constructor(private deviceService: DeviceService) {}

  ngOnInit() {
    this.deviceService
      .getAll()
      .pipe(first())
      .subscribe((devices) => (this.devices = devices));
  }

  deleteDevice(id: string) {
    const device = this.devices.find((x) => x.id === id);
    device.isDeleting = true;
    this.deviceService
      .delete(id)
      .pipe(first())
      .subscribe(
        () => (this.devices = this.devices.filter((x) => x.id !== id))
      );
  }
}

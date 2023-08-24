import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { Role, DeviceType, IncidentStatus } from '../_models';
//import { DeviceType } from '../_models';

// array in local storage for registered users
const usersKey = 'network-monitoring-users';
const devicesKey = 'network-monitoring-devices';
const incidentsKey = 'network-monitoring-incidents';

let users = JSON.parse(localStorage.getItem(usersKey)) || [
  {
    id: 1,
    title: 'Mr',
    firstName: 'Arsalan',
    lastName: 'Ali',
    email: 'arsalan.ali@gmail.com',
    role: Role.User,
    password: 'test123',
  },
];

let devices = JSON.parse(localStorage.getItem(devicesKey)) || [
  {
    id: 1,
    name: 'ARSALAN-PC',
    ipAddress: '192.168.1.1',
    isActive: true,
    deviceType: DeviceType.Laptop,
  },
];

let startDate = new Date();
startDate.setMinutes(startDate.getMinutes() + 30);

let incidents = JSON.parse(localStorage.getItem(incidentsKey)) || [
  {
    id: 1,
    deviceId: 3,
    deviceName: 'ARSALAN-PC',
    errorCodeId: 'X00052',
    errorCode: 'device unreachable',
    startTime: new Date().toLocaleString(),
    endTime: startDate.toLocaleString(),
    incidentStatus: IncidentStatus.Resolved,
  },

  {
    id: 2,
    deviceId: 2,
    deviceName: 'Kamran PC',
    errorCodeId: 'X00052',
    errorCode: 'device unreachable',
    startTime: new Date().toLocaleString(),
    endTime: startDate.toLocaleString(),
    incidentStatus: IncidentStatus.Open,
  },

  {
    id: 3,
    deviceId: 2,
    deviceName: 'Kamran PC',
    errorCodeId: 'R00052',
    errorCode: 'device unstable',
    startTime: new Date().toLocaleString(),
    endTime: startDate.toLocaleString(),
    incidentStatus: IncidentStatus.Resolved,
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.endsWith('/users') && method === 'POST':
          return createUser();
        case url.match(/\/users\/\d+$/) && method === 'PUT':
          return updateUser();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();

        case url.endsWith('/devices') && method === 'GET':
          return getDevices();
        case url.match(/\/devices\/\d+$/) && method === 'GET':
          return getDeviceById();
        case url.endsWith('/devices') && method === 'POST':
          return createDevice();
        case url.match(/\/devices\/\d+$/) && method === 'PUT':
          return updateDevice();
        case url.match(/\/devices\/\d+$/) && method === 'DELETE':
          return deleteDevice();

        case url.endsWith('/incidents') && method === 'GET':
          return getIncidents();
        case url.match(/\/incidents\/\d+$/) && method === 'GET':
          return getIncidentById();
        case url.endsWith('/incidents') && method === 'POST':
          return createIncident();
        case url.match(/\/incidents\/\d+$/) && method === 'PUT':
          return updateIncident();
        case url.match(/\/incidents\/\d+$/) && method === 'DELETE':
          return deleteIncident();

        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getUsers() {
      return ok(users.map((x) => basicDetails(x)));
    }

    function getUserById() {
      const user = users.find((x) => x.id === idFromUrl());
      return ok(basicDetails(user));
    }

    function createUser() {
      const user = body;

      if (users.find((x) => x.email === user.email)) {
        return error(`User with the email ${user.email} already exists`);
      }

      // assign user id and a few other properties then save
      user.id = newUserId();
      delete user.confirmPassword;
      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));

      return ok();
    }

    function updateUser() {
      let params = body;
      let user = users.find((x) => x.id === idFromUrl());

      // only update password if entered
      if (!params.password) {
        delete params.password;
      }

      // update and save user
      Object.assign(user, params);
      localStorage.setItem(usersKey, JSON.stringify(users));

      return ok();
    }

    function deleteUser() {
      users = users.filter((x) => x.id !== idFromUrl());
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok();
    }

    /***********    Devices ********************* */

    function getDevices() {
      //console.log('Hello world!');
      return ok(devices.map((x) => basicDeviceDetails(x)));
    }

    function getDeviceById() {
      const device = devices.find((x) => x.id === idFromUrl());
      console.log(device);
      return ok(basicDeviceDetails(device));
    }

    function createDevice() {
      const device = body;

      if (users.find((x) => x.name === device.name)) {
        return error(`Device with the name ${device.name} already exists`);
      }

      // assign device id and a few other properties then save
      device.id = newDeviceId();
      //delete user.confirmPassword;
      devices.push(device);
      localStorage.setItem(devicesKey, JSON.stringify(devices));

      return ok();
    }

    function updateDevice() {
      let params = body;
      let device = devices.find((x) => x.id === idFromUrl());

      // update and save user
      Object.assign(device, params);
      localStorage.setItem(devicesKey, JSON.stringify(devices));

      return ok();
    }

    function deleteDevice() {
      devices = devices.filter((x) => x.id !== idFromUrl());
      localStorage.setItem(devicesKey, JSON.stringify(devices));
      return ok();
    }

    /***********    Incidents ********************* */

    function getIncidents() {
      //console.log('Hello world!');
      return ok(incidents.map((x) => basicIncidentDetails(x)));
    }

    function getIncidentById() {
      const incident = incidents.find((x) => x.id === idFromUrl());
      console.log(incident);
      return ok(basicIncidentDetails(incident));
    }

    function createIncident() {
      const incident = body;

      // assign device id and a few other properties then save
      incident.id = newIncidentId();
      //delete user.confirmPassword;
      incidents.push(incident);
      localStorage.setItem(incidentsKey, JSON.stringify(incidents));

      return ok();
    }

    function updateIncident() {
      let params = body;
      let incident = incidents.find((x) => x.id === idFromUrl());

      // update and save user
      Object.assign(incident, params);
      localStorage.setItem(incidentsKey, JSON.stringify(incidents));

      return ok();
    }

    function deleteIncident() {
      incidents = incidents.filter((x) => x.id !== idFromUrl());
      localStorage.setItem(incidentsKey, JSON.stringify(incidents));
      return ok();
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message) {
      return throwError({ error: { message } }).pipe(
        materialize(),
        delay(500),
        dematerialize()
      ); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function basicDeviceDetails(device) {
      console.log(device);
      const { id, name, ipAddress, isActive, deviceType } = device;
      return { id, name, ipAddress, isActive, deviceType };
    }

    function basicIncidentDetails(incident) {
      console.log(incident);
      const {
        id,
        deviceId,
        deviceName,
        errorCodeId,
        errorCode,
        startTime,
        endTime,
        incidentStatus,
      } = incident;
      return {
        id,
        deviceId,
        deviceName,
        errorCodeId,
        errorCode,
        startTime,
        endTime,
        incidentStatus,
      };
    }

    function basicDetails(user) {
      const { id, title, firstName, lastName, email, role } = user;
      return { id, title, firstName, lastName, email, role };
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function newUserId() {
      return users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
    }

    function newDeviceId() {
      return devices.length ? Math.max(...devices.map((x) => x.id)) + 1 : 1;
    }

    function newIncidentId() {
      return incidents.length ? Math.max(...incidents.map((x) => x.id)) + 1 : 1;
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};

import { IncidentStatus } from './incidentStatus';

export class Incident {
  id: number;
  deviceId: number;
  deviceName: string;
  errorCodeId: number;
  errorCode: string;
  StartDateTime: string;
  endDateTime: string;
  incidentStatus: IncidentStatus;
  incidentStatusText: string;
}

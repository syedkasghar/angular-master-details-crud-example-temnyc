import { DeviceType } from './deviceType';

export class Device {
  id: number;
  name: string;
  ipAddress: string;
  isActive: boolean;
  deviceType: DeviceType;
}

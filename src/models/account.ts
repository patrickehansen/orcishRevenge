import { Moment } from 'moment';

export interface Account {
  Username: string;
  DisplayName: string;
  IsGM: boolean;

  _accountid?: number;
  EmailAddress?: string;
  Hash?: string;
  Created?: Moment;
  LastLogin?: Moment;
}
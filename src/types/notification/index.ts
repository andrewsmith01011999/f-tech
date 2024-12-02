import { Account } from "../account";

export interface Notification {
  notificationId: string;
  title: string;
  message: string;
  createdDate: string;
  account: Account;
  read: boolean;
}
export class User {
  $key: string;
  id: number;
  userName: string;
  email: string;
  name: String;
  password: string;
  location: {
    lat: number;
    lon: number;
  };
  phoneNumber: string;
  createdOn: string;
  admin: boolean;
  avatar: string;
  mobileNumber: number;
  address: string;
}

export class UserDetail {
  $key: string;
  firstName: string;
  lastName: string;
  userName: string;
  emailId: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  zip: number;
}

export interface User {
  accessToken: string;
  personalInformation: {
    name: {
      first: string;
      last: string;
    };
    address: {
      street: string;
    };
    mobileNo: string;
    birthdate: string;
  };
  _id: string;
  username: string;
  email: string;
  role: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface fullName {
  name: string;
}

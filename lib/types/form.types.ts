export interface SignUpProps {
  username: String;
  email: String;
  authentication: {
    password: String;
  };
  personalInformation: {
    name: {
      first: String;
      last: String;
    };
    birthdate: String;
  };
}

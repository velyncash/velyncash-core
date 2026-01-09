export type Username = string;
export type Pin = string;

export type SignUpInput = {
  username: Username;
  password: string;
  pin6: Pin;
};

export type SignInInput = {
  username: Username;
  password: string;
  pin6: Pin;
};

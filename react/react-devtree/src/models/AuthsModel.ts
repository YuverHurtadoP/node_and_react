 

export type User = {
    name: string;
    email: string;
    password: string;
    handle: string;
}      

export type UserFormData = Pick<User, "name" | "email" | "password" | "handle"> & {
  confirmPassword: string; // Agrega el nuevo campo aquí
};

export type UserSinPasswordFormData = Pick<
  User,
  "name" | "email" | "password" | "handle"
> & {
  _id?: string; // Agrega el nuevo campo aquí
};
export type UserFields = {
  name: string;
  type: "string" | "number" | "boolean" | "date" | "string[]";
  input: boolean;
  required?: boolean;
};
export const userFields: UserFields[] = [
  {
    name: "phoneNumber",
    type: "string",
    input: true,
  },
  {
    name: "status",
    type: "string",
    input: true,
  },
  {
    name: "role",
    type: "string",
    input: true,
  },
  {
    name: "macAddress",
    type: "boolean",
    input: true,
  }
];

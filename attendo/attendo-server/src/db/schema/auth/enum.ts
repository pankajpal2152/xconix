
import { pgEnum } from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum("user_status", [
  "ACTIVE",
  "INACTIVE",
  "BANNED",
  "PENDING",
]);

export const userRoleEnum = pgEnum("user_role", [
  "USER",
  "HR",
  "ADMIN",
  "EMPLOYEE",
]);
import {attendence } from "@/db/schema";
import { generateFPSSchemaForTable } from "@/utils/filter-pagination-sorting";
import { insureOneProperty, resourceListSchema } from "@/utils/zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

const baseInsertAttendance = createInsertSchema(attendence).omit({
  id: true,
});

export const insertAttendanceSchema = insureOneProperty(baseInsertAttendance)


export const updateAttendanceSchema = insureOneProperty(
  baseInsertAttendance.partial().omit({ userId: true, date: true, entryTime: true }),
);

export const attendenceSchema = createSelectSchema(attendence).partial();

export const listAttendanceSchema = resourceListSchema(attendence);

export const listAttendanceQuerySearchSchema =
  generateFPSSchemaForTable(attendence);

import { OpenAPIHono } from "@hono/zod-openapi";
import {
  list,
  list_by_employee,
  create,
  update_post,
  update_put,
  remove,
  get,
  list_my_attendance,
} from "./openapi.route";
import { AppBindings } from "@/types/app";
import { advancedQuery } from "@/utils/filter-pagination-sorting";
import { db } from "@/db";
import { attendence } from "@/db/schema";
import { generatePaginationMetadata } from "@/utils/pagination";
import { generateRandomId } from "@/utils/gen-id";
import { and, eq, sql } from "drizzle-orm";

export const attendanceGroup = new OpenAPIHono<AppBindings>()
  .openapi(list, async (c) => {
    const filteringInput = c.req.valid("query");

    // const BASE_CONDITION = eq(user.role,"EMPLOYEE");
    const { data, total_items } = await advancedQuery(
      db,
      attendence,
      filteringInput,
      undefined,
      [{ field: "date", order: "desc" }],
      ["id", "userId"]
    );
    const pagination = generatePaginationMetadata(c, total_items);

    return c.json({ success: true, data, pagination }, 200);
  })
  .openapi(list_by_employee, async (c) => {
    const filteringInput = c.req.valid("query");
    const employeeId = c.req.param("id");

    const BASE_CONDITION = eq(attendence.userId, employeeId);
    const { data, total_items } = await advancedQuery(
      db,
      attendence,
      filteringInput,
      undefined,
      [{ field: "date", order: "desc" }],
      ["id", "userId"],
      BASE_CONDITION
    );
    const pagination = generatePaginationMetadata(c, total_items);

    return c.json({ success: true, data, pagination }, 200);
  })
  .openapi(list_my_attendance, async (c) => {
    const filteringInput = c.req.valid("query");
    const user = c.get("user");

    if(!user){
      return c.json(
        {
          success: false,
          error: {
            name: "Unauthorized",
            message: "Authentication required",
          },
        },
        401
      );
    }
    
    const BASE_CONDITION = eq(attendence.userId, user.id);
    const { data, total_items } = await advancedQuery(
      db,
      attendence,
      filteringInput,
      undefined,
      [{ field: "date", order: "desc" }],
      ["id", "userId"],
      BASE_CONDITION
    );
    const pagination = generatePaginationMetadata(c, total_items);

    return c.json({ success: true, data, pagination }, 200);
  })
  .openapi(create, async (c) => {
    const data = c.req.valid("json");

    // ✅ Check if record already exists for this user + date
    const existingRecord = await db
      .select()
      .from(attendence)
      .where(
        and(
          eq(attendence.userId, data.userId),
          eq(
            sql`DATE(${attendence.date})`,
            sql`DATE(${data.date || new Date()})`
          )
        )
      )
      .limit(1);

    if (existingRecord.length > 0) {
      return c.json(
        {
          success: false,
          error: {
            name: "DuplicateAttendanceError",
            message:
              "Attendance record already exists for this user on this date",
            existingId: existingRecord[0].id,
          },
        },
        409 // Conflict
      );
    }

    const id = generateRandomId();

    const [result] = await db
      .insert(attendence)
      .values({
        id,
        ...data,
      })
      .returning({ id: attendence.id });

    return c.json(result, 201);
  })
  .openapi(get, async (c) => {
    const id = c.req.param("id");

    const attendanceRecord = await db
      .select()
      .from(attendence)
      .where(eq(attendence.id, id))
      .limit(1)
      .then((res) => res[0]);

    if (!attendanceRecord) {
      return c.json(
        {
          success: false,
          error: {
            name: "NotFoundError",
            message: "Attendance record not found.",
          },
        },
        404
      );
    }

    return c.json(attendanceRecord, 200);
  })
  .openapi(update_put, async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");

    const attendanceRecord = await db
      .select()
      .from(attendence)
      .where(eq(attendence.id, id))
      .limit(1)
      .then((res) => res[0]);

    if (!attendanceRecord) {
      return c.json(
        {
          success: false,
          error: {
            name: "NotFoundError",
            message: "Attendance record not found.",
          },
        },
        404
      );
    }

    await db
      .update(attendence)
      .set({
        ...data,
      })
      .where(eq(attendence.id, id));

    const updatedRecord = await db
      .select()
      .from(attendence)
      .where(eq(attendence.id, id))
      .limit(1)
      .then((res) => res[0]);

    return c.json(updatedRecord, 200);
  })
  .openapi(update_post, async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");

    const attendanceRecord = await db
      .select()
      .from(attendence)
      .where(eq(attendence.id, id))
      .limit(1)
      .then((res) => res[0]);

    if (!attendanceRecord) {
      return c.json(
        {
          success: false,
          error: {
            name: "NotFoundError",
            message: "Attendance record not found.",
          },
        },
        404
      );
    }

    await db
      .update(attendence)
      .set({
        ...data,
      })
      .where(eq(attendence.id, id));

    const updatedRecord = await db
      .select()
      .from(attendence)
      .where(eq(attendence.id, id))
      .limit(1)
      .then((res) => res[0]);

    return c.json(updatedRecord, 200);
  })
  .openapi(remove, async (c) => {
    const id = c.req.param("id");

    const attendanceRecord = await db
      .select()
      .from(attendence)
      .where(eq(attendence.id, id))
      .limit(1)
      .then((res) => res[0]);

    if (!attendanceRecord) {
      return c.json(
        {
          success: false,
          error: {
            name: "NotFoundError",
            message: "Attendance record not found.",
          },
        },
        404
      );
    }

    await db.delete(attendence).where(eq(attendence.id, id));

    return c.json(
      { success: true, message: "Attendance record deleted." },
      200
    );
  });

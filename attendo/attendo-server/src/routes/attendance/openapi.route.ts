import { createRoute, z } from "@hono/zod-openapi";
import {
  insertAttendanceSchema,
  updateAttendanceSchema,
  attendenceSchema,
  listAttendanceQuerySearchSchema,
  listAttendanceSchema,
} from "./schema";
import { authMiddleware, roleCheckMiddleware, sessionMiddleware } from "@/middlewares/auth-middleware";
import { idStringParamSchema, ZodBadRequestOpenApi, ZodConflictResponseOpenApi, ZodNotFoundResponseOpenApi, ZodUnauthorizedResponseOpenApi } from "@/utils/zod";

const tags = ["Attendance"];



export const list = createRoute({
  method: "get",
  path: "/",
  middleware: [roleCheckMiddleware({ roles: ["ADMIN", "HR"] })],
  tags,
  summary: "List attendances",
  description:
    "Get a list of attendances with filtering, pagination, and sorting",
  request: {
    query: listAttendanceQuerySearchSchema,
  },
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: listAttendanceSchema,
        },
      },
    },
    400: ZodBadRequestOpenApi,
  },
});

export const list_by_employee = createRoute({
  method: "get",
  path: "/employee/{id}",
    middleware: [authMiddleware],
    tags,
    summary: "List attendances by employee ID",
    description:
      "Get a list of attendances for a specific employee with filtering, pagination, and sorting",
    request: {
      params: idStringParamSchema,
      query: listAttendanceQuerySearchSchema,
    },
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: listAttendanceSchema,
          },
        },
      },
      400: ZodBadRequestOpenApi,
    },
});

export const create = createRoute({
  method: "post",
  path: "/",
  tags,
  summary: "Create new attendance record",
  description: "Create a new attendance record",
  request: {
    body: {
      content: {
        "application/json": {
          schema: insertAttendanceSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Attendance record created successfully",
      content: {
        "application/json": {
          schema: attendenceSchema,
        },
      },
    },
    409: ZodConflictResponseOpenApi,
    400: ZodBadRequestOpenApi,
  },
});

export const get = createRoute({
  method: "get",
  path: "/{id}",
  middleware: [sessionMiddleware],
  tags,
  summary: "Get attendance by ID",
  description: "Retrieve an attendance record by its ID",
  request: {
    params: idStringParamSchema,
  },
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: attendenceSchema,
        },
      },
    },
    404: ZodNotFoundResponseOpenApi,
    400: ZodBadRequestOpenApi,
  },
});


export const update_post = createRoute({
  method: "post",
  path: "/{id}",
  tags,
  summary: "Update attendance record",
  description: "Update an existing attendance record by ID",
  request: {
    params: idStringParamSchema,
    body: {
      content: {
        "application/json": {
          schema: updateAttendanceSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Attendance record updated successfully",
      content: {
        "application/json": {
          schema: attendenceSchema,
        },
      },
    },
    404: ZodNotFoundResponseOpenApi,
    400: ZodBadRequestOpenApi,
  },
});

export const update_put = createRoute({
  method: "put",
  path: "/{id}",
  tags,
  summary: "Update attendance record",
  description: "Update an existing attendance record by ID",
  request: {
    params: idStringParamSchema,
    body: {
      content: {
        "application/json": {
          schema: updateAttendanceSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Attendance record updated successfully",
      content: {
        "application/json": {
          schema: attendenceSchema,
        },
      },
    },
    404: ZodNotFoundResponseOpenApi,
    400: ZodBadRequestOpenApi,
  },
});

export const remove = createRoute({
  method: "delete",
  path: "/{id}",
  middleware: [sessionMiddleware],
  tags,
  summary: "Delete an attendance record",
  description: "Delete an existing attendance record by ID",
  request: {
    params: idStringParamSchema,
  },
  responses: {
    200: {
      description: "Attendance record deleted successfully",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
          }),
        },
      },
    },
    404: ZodNotFoundResponseOpenApi,
    400: ZodBadRequestOpenApi,
  },
});

// By Session Data (My Routes)

export const list_my_attendance = createRoute({
  method: "get",
  path: "/my",
  middleware: [authMiddleware],
  tags,
  summary: "List my attendances",
  description:
    "Get a list of attendances for the authenticated user with filtering, pagination, and sorting",
  request: {
    query: listAttendanceQuerySearchSchema,
  },
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: listAttendanceSchema,
        },
      },
    },
    401: ZodUnauthorizedResponseOpenApi,
    400: ZodBadRequestOpenApi,
  },
});

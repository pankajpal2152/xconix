import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { user } from "../auth";

export const attendence = pgTable("attendence", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .references(() => user.id, { onDelete: "cascade" })
        .notNull(),

    rssi: text("rssi"),
    deviceTime: timestamp("device_time").notNull(),


    date: timestamp("date").notNull().defaultNow(),
    entryTime: timestamp("entry_time").notNull(),
    exitTime: timestamp("exit_time"),
},
    (table) => [index("attendence_userId_idx").on(table.userId)]
);
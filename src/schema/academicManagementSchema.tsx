import { z } from "zod";

export const academicSemesterSchema = z.object({
  semester: z.string({
    required_error: "Semester name is required!",
  }),
  year: z.string({
    required_error: "Semester year is required!",
  }),
  startMonth: z.string({
    required_error: "Semester start month is required!",
  }),
  endMonth: z.string({
    required_error: "Semester end month is required!",
  }),
});

export const academicFacultySchema = z.object({
  name: z.string({
    required_error: "Academic faculty is required!",
  }),
});

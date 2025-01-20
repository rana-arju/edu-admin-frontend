import { IAcademicSemester } from "./academicManagement.type";

export type ISemesterRegistered = {
  _id: string;
  academicSemester: IAcademicSemester;
  startDate: string;
  endDate: string;
  status: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
}

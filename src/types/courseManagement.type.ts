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

export type ICourses =  {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: IPreRequisiteCourse[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IPreRequisiteCourse = {
  course: ICourse;
  isDeleted: boolean;
  _id: string;
}

export type ICourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: IPreRequisiteCourse[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}


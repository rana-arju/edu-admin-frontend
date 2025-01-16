export type IAcademicSemester = {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type IAcademicFaculty = {
  _id: string;
  name:string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type IAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: IAcademicFaculty;
  createdAt: string;
  updatedAt: string;
};

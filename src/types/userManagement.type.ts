import { IAcademicDepartment, IAcademicFaculty, IAcademicSemester } from "./academicManagement.type";


export type IStudent = {
  _id: string;
  id: string;
  user: IUser;
  name: IName;
  profileImg: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  blood: string;
  presentAddress: string;
  parmanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  admissionSemester: IAcademicSemester;
  academicDepartment: IAcademicDepartment;
  academicFaculty: IAcademicFaculty;
  isDeleted: boolean;
  fullName: string;
}

export type IUser = {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  status: string;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type IName = {
  firstName: string;
  lastName: string;
  middleName: string;
  _id: string;
}

export  type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  _id: string;
}

export type ILocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
}
export type IFaculty = {
  _id: string;
  id: string;
  user: IUser;
  designation: string;
  name: IName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  blood: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicDepartment: IAcademicDepartment;
  academicFaculty: IAcademicFaculty;
  isDeleted: boolean;
  fullName: string;
}


export type IAdmin = {
  _id: string;
  id: string;
  user: IUser;
  designation: string;
  name: IName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  blood: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isDeleted: boolean;
  fullName: string;
}
import { IAcademicDepartment, IAcademicFaculty, IAcademicSemester } from "./academicManagement.type";


export interface IStudent {
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

export interface IUser {
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

interface IName {
  firstName: string;
  lastName: string;
  middleName: string;
  _id: string;
}

export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  _id: string;
}

export interface ILocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
}
export interface IFaculty {
  _id: string;
  id: string;
  user: string;
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


export interface IAdmin {
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
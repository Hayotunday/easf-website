export type FileMetadata = {
  name: string;
  type: string;
  size: number;
} | null;

export type ApplicationData = {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female";
  address: string;
  nationality: string;
  program: string;
  studyMode: "full-time" | "part-time";
  courseOfStudy: string;
  institution: string;
  previousSchool: string;
  olevelGrade: string;
  intendedGraduation: string;
  essays: string[];
  passportPhoto: FileMetadata;
  academicResults: FileMetadata;
};

export const defaultApplicationData: ApplicationData = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "male",
  address: "",
  nationality: "Nigeria",
  program: "",
  studyMode: "full-time",
  courseOfStudy: "",
  institution: "",
  previousSchool: "",
  olevelGrade: "",
  intendedGraduation: "",
  essays: Array(6).fill(""),
  passportPhoto: null,
  academicResults: null,
};

export type BiodataFormValues = Pick<
  ApplicationData,
  | "fullName"
  | "email"
  | "phone"
  | "dateOfBirth"
  | "gender"
  | "address"
  | "nationality"
>;

export type AcademicFormValues = Pick<
  ApplicationData,
  | "program"
  | "studyMode"
  | "courseOfStudy"
  | "institution"
  | "previousSchool"
  | "olevelGrade"
  | "intendedGraduation"
>;

export type EssayFormValues = {
  essays: string[];
};

export type DocumentUploadValues = Pick<
  ApplicationData,
  "passportPhoto" | "academicResults"
>;

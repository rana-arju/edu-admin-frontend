export const semesterName = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];
const currentYear = new Date().getFullYear();
export const yearOption = [0, 1, 2, 3, 4, 5].map((num) => ({
  value: String(currentYear + num),
  label: String(currentYear + num),
}));
 export const semesterStatusOptions = [
   {
     value: "UPCOMING",
     label: "UPCOMING",
   },
   {
     value: "ONGOING",
     label: "ONGOING",
   },
   {
     value: "ENDED",
     label: "ENDED",
   },
 ];
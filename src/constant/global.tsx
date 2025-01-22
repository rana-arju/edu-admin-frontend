const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "October",
  "November",
  "December",
];
export const monthOption = monthName.map((item) => ({
value: item,
label: item
}))
const weekdays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
export const weekDaysOptions = weekdays.map((item) => ({
  value: item,
  label: item,
}));
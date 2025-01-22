import { useMyEnrolledCoursesQuery } from "../../redux/features/student/studentCourse.api";

function MySchedule() {
  const { data: myAllEnrolledCourses } = useMyEnrolledCoursesQuery(undefined);
  console.log(myAllEnrolledCourses);

  return <div>
    {myAllEnrolledCourses?.data?.map((item: any) => {
      return (
        <div key={item._id}>
            <h2>{item.course.title}</h2>
            <p>{item.offeredCourse.section}</p>
            <p>{item.offeredCourse.days.map((day:any) => (
                <p>{day}</p>
            ))}</p>
            <p>{item.startTime}</p>
            <p>{item.endTime}</p>
            <p>{item.days}</p>
        </div>
      );
    })}
  </div>;
}

export default MySchedule;

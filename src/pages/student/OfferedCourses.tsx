import { Button, Col, Row } from "antd";
import {
  useEnrolledCourseMutation,
  useGetOfferedCoursesQuery,
} from "../../redux/features/student/studentCourse.api";
import { toast } from "sonner";

function OfferedCourses() {
  const [enrolledCourse] = useEnrolledCourseMutation();
  const { data: offeredCourses, isFetching } =
    useGetOfferedCoursesQuery(undefined);
  if (isFetching) {
    return <div>Loading...</div>;
  }
  console.log(offeredCourses);
  
  const singleObject = offeredCourses?.data?.reduce((acc: any, item: any) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      startTime: item.startTime,
      endTime: item.endTime,
      days: item.days,
    });
    return acc;
  }, {});
  const modifiedData = Object.values(singleObject ? singleObject : {});
  if (!modifiedData.length) {
    return <div>No data found</div>;
  }
  const handleEnrolled = async (id: string) => {
    try {
      const res = await enrolledCourse({ offeredCourse: id });
      
      if (res.data) {
        toast.success(res.data.message);
      }else{
        toast.error((res.error as any)?.data.message);
      }
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <Row>
      {modifiedData.map((item: any) => {
        return (
          <Col span={24} key={item.courseTitle}>
            <h2>{item.courseTitle}</h2>
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "20px",
                marginTop: "20px",
                padding: "20px",
                border: "1px solid #f0f0f0",
              }}
            >
              {item.sections.map((section: any) => (
                <div
                  key={section._id}
                  style={{ border: "1px solid gray", padding: "10px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                    }}
                  >
                    <span>Section: {section.section}</span>
                    <span>Start Time: {section.startTime}</span>
                    <span>End Time: {section.endTime}</span>
                    <span>Days: {section.days}</span>
                  </div>
                  <Button
                    htmlType="submit"
                    onClick={() => handleEnrolled(section._id)}
                  >
                    Enroll
                  </Button>
                </div>
              ))}
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

export default OfferedCourses;

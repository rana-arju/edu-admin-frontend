import { Button, Modal, Select, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { ISingleResponse } from "../../../types";
import {
  useCourseAssignFacultyMutation,
  useGetAllCourseQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { ICourses } from "../../../types/courseManagement.type";
import { toast } from "sonner";

import { useGetAllFacultyQuery } from "../../../redux/features/admin/userManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

type ITableData = Pick<ICourses, "title" | "code">;

function Courses() {
  const { data: semesterData, isFetching } = useGetAllCourseQuery(undefined);

  const columns: TableColumnsType<ITableData> = [
    {
      title: "Title",
      dataIndex: "title",
    },

    {
      title: "Code",
      dataIndex: "code",
      defaultSortOrder: "descend",
      //sorter: (a, b) => a.year - b.year,
    },

    {
      title: "Actions",
      key: "x",
      render: (item) => {
        return <AssignFaculty item={item} />;
      },
    },
  ];
  const tableData = semesterData?.data?.map(({ _id, title, code }) => ({
    key: _id,
    title,
    code,
  }));
  const onChange: TableProps<ITableData>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    _extra
  ) => {};

  return (
    <Table<ITableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}

const AssignFaculty = (data: any) => {
  const { data: faculties } = useGetAllFacultyQuery(undefined);
  const [courseAssignFaculty] = useCourseAssignFacultyMutation();
  const facultiesOptions = faculties?.data?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${item?.name?.middleName} ${item.name.lastName}`,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculty, setFaculty] = useState<string[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    const courseData = {
      id: data.item.key,
      faculties: faculty,
    };
    const toastId = toast.loading("New course creating...");
    try {
      const res = (await courseAssignFaculty(courseData)) as ISingleResponse;
      setIsModalOpen(false);

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value: string) => {
    setFaculty([...value]);
  };
  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title={`Status: `}
        open={isModalOpen}
        //onOk={onSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button
            key="submit"
            type="primary"
            //loading={loading}
            onClick={onSubmit}
          >
            Assign Faculty
          </Button>,
          
        ]}
      >
        <p>Assign a faculty:</p>
        <Select
          mode="multiple"
          onChange={handleChange}
          style={{ width: "100%" }}
          allowClear
          options={facultiesOptions}
          placeholder="Select faculty"
        />
      </Modal>
    </>
  );
};
export default Courses;

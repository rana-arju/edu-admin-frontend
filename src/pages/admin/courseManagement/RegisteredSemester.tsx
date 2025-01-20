import { Button, Dropdown, Table, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { ISingleResponse } from "../../../types";
import {
  useCourseStatusUpdateMutation,
  useGetRegisteredSemesterQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { ISemesterRegistered } from "../../../types/courseManagement.type";
import moment from "moment";
import { toast } from "sonner";

type ITableData = Pick<
  ISemesterRegistered,
  "status" | "startDate" | "endDate" | "academicSemester"
>;

const items = [
  {
    label: "Upcomming",
    key: "UPCOMING",
  },
  {
    label: "On-going",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

function RegisteredSemester() {
  const [courseStatusUpdate] = useCourseStatusUpdateMutation();
  const [semesterId, setSemesterId] = useState("");
  const { data: semesterData, isFetching } =
    useGetRegisteredSemesterQuery(undefined);
  const handleStatusUpdate = async (data: any) => {
    const updateData = {
      id: semesterId,
      data: data.key,
    };

    const toastId = toast.loading("Status updating...");

    try {
      const res = (await courseStatusUpdate(updateData)) as ISingleResponse;
      if (res.error) {
        toast.error(res.error?.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };
  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };
  const columns: TableColumnsType<ITableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item == "UPCOMING") {
          color = "blue";
        } else if (item == "ONGOING") {
          color = "green";
        } else {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      defaultSortOrder: "descend",
      //sorter: (a, b) => a.year - b.year,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Min credits",
      dataIndex: "minCredit",
    },
    {
      title: "Max credits",
      dataIndex: "maxCredit",
    },
    {
      title: "Actions",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];
  const tableData = semesterData?.data?.map(
    ({
      _id,
      academicSemester,
      startDate,
      endDate,
      status,
      minCredit,
      maxCredit,
    }) => ({
      key: _id,
      name: `${academicSemester?.name}- ${academicSemester?.year}`,
      startDate: moment(new Date(startDate)).format("ll"),
      endDate: moment(new Date(endDate)).format("ll"),
      status,
      minCredit,
      maxCredit,
      academicSemester,
    })
  );
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

export default RegisteredSemester;

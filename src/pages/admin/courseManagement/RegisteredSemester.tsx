import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { IQueryParam } from "../../../types";
import { useGetRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import { ISemesterRegistered } from "../../../types/courseManagement.type";
import moment from "moment";

type ITableData = Pick<
  ISemesterRegistered,
  "status" | "startDate" | "endDate" | "academicSemester"
>;
const columns: TableColumnsType<ITableData> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
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
    dataIndex: "X",
    render: () => {
      return (
        <div>
          <Button>Update</Button>
        </div>
      );
    },
  },
];

function RegisteredSemester() {
  const [params, setParams] = useState<IQueryParam[] | undefined>([]);
  const { data: semesterData, isFetching } =
    useGetRegisteredSemesterQuery(params);

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
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: IQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      setParams(queryParams);
    }
  };

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

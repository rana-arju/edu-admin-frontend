import { Button, Table } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TableColumnsType, TableProps } from "antd";
import { IAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { IQueryParam } from "../../../types";

type ITableData = Pick<
  IAcademicSemester,
  "endMonth" | "startMonth" | "name" | "year"
>;
const columns: TableColumnsType<ITableData> = [
  {
    title: "Semester",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Summer",
        value: "Summer",
      },
      {
        text: "Fall",
        value: "Fall",
      },
    ],

    onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },

  {
    title: "Year",
    dataIndex: "year",
    defaultSortOrder: "descend",
    //sorter: (a, b) => a.year - b.year,
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
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

function AcademicSemester() {
  const [params, setParams] = useState<IQueryParam[] | undefined>([]);
  const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);

  const tableData = semesterData?.data?.map(
    ({
      _id,
      name,
      startMonth,
      endMonth,
      year,
      createdAt,
      updatedAt,
      code,
    }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
      createdAt,
      updatedAt,
      code,
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

export default AcademicSemester;

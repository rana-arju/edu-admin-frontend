import { Table } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TableColumnsType, TableProps } from "antd";
import { IAcademicSemester } from "../../../types/academicManagement.type";

type ITableData = Pick<
  IAcademicSemester,
  "_id" | "code" | "endMonth" | "startMonth" | "name" | "year"
>;
const columns: TableColumnsType<ITableData> = [
  {
    title: "Semester",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],

    onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Code",
    dataIndex: "code",
    defaultSortOrder: "descend",
    //sorter: (a, b) => a.code - b.code,
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
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) =>
      record.startMonth.indexOf(value as string) === 0,
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) =>
      record.startMonth.indexOf(value as string) === 0,
  },
];

function AcademicSemester() {
  const { data: semesterData } = useGetAllSemestersQuery(undefined);
  console.log(semesterData);
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
      _id,
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
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Table<ITableData>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}

export default AcademicSemester;

import { Button, Table } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TableColumnsType, TableProps } from "antd";
import { IAcademicFaculty } from "../../../types/academicManagement.type";

type ITableData = Pick<IAcademicFaculty,  "name">;
const columns: TableColumnsType<ITableData> = [
  {
    title: "Faculty Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },

    onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
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

function AcademicFaculty() {
  const { data: faculties, isFetching } =
    useGetAllAcademicFacultyQuery(undefined);

  const tableData = faculties?.data?.map(
    ({ _id, name, createdAt, updatedAt }) => ({
      key: _id,
      name,
      createdAt,
      updatedAt,
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

export default AcademicFaculty;

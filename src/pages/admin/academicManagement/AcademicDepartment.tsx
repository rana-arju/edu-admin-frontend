import { Button, Table } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TableColumnsType, TableProps } from "antd";
import { IAcademicDepartment } from "../../../types/academicManagement.type";

type ITableData = Pick<IAcademicDepartment, "name" | "academicFaculty">;
const columns: TableColumnsType<ITableData> = [
  {
    title: "Department Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },

    onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    sorter: (a, b) => a?.name.length - b?.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Faculty Name",
    dataIndex: "academicFaculty",
    showSorterTooltip: { target: "full-header" },

    onFilter: (value, record) =>
      record.academicFaculty.name.indexOf(value as string) === 0,
    sorter: (a, b) =>
      a?.academicFaculty?.name?.length - b?.academicFaculty?.name?.length,
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

function AcademicDepartment() {
  const { data: departments, isFetching } =
    useGetAllAcademicDepartmentQuery(undefined);

  const tableData = departments?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  ) as ITableData[] | [];
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

export default AcademicDepartment;

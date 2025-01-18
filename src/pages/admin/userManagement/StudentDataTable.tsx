import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { IQueryParam, IStudent } from "../../../types";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";

import { AdminActions } from "../../../components/actions/AdminActions";

type ITableData = Pick<
  IStudent,
  "fullName" | "id" | "email" | "contactNo" | "user"
>;
const columns: TableColumnsType<ITableData> = [
  {
    title: "Student Name",
    dataIndex: "fullName",
    showSorterTooltip: { target: "full-header" },
  },

  {
    title: "Email",
    dataIndex: "email",
    defaultSortOrder: "descend",
    //sorter: (a, b) => a.year - b.year,
  },
  {
    title: "Contact No",
    dataIndex: "contactNo",
    defaultSortOrder: "descend",
    //sorter: (a, b) => a.year - b.year,
  },
  {
    title: "Student ID",
    dataIndex: "id",
  },

  {
    title: "Actions",
    key: "x",
    render: (item) => (
      <AdminActions item={item} url={`/admin/student-details/${item?.key}`} />
    ),
    width: "1%",
  },
];

function StudentDataTable() {
  const [params, setParams] = useState<IQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: studentData, isFetching } = useGetAllStudentQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const studentMeta = studentData?.meta;
  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNo, user }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
      user,
      status: user?.status,
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
    <>
      <Table<ITableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <div style={{ marginTop: "20px" }}>
        <Pagination
          current={page}
          pageSize={studentMeta?.limit}
          total={studentMeta?.total}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
}

export default StudentDataTable;

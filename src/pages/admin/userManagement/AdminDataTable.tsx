import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { IAdmin, IQueryParam } from "../../../types";
import { Link } from "react-router-dom";
import {
  useGetAllAdminQuery,
  useGetAllFacultyQuery,
} from "../../../redux/features/admin/userManagement.api";

type ITableData = Pick<IAdmin, "fullName" | "id" | "email" | "contactNo">;
const columns: TableColumnsType<ITableData> = [
  {
    title: "Admin Name",
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
    title: "Admin ID",
    dataIndex: "id",
  },

  {
    title: "Actions",
    key: "x",
    render: (item) => {
      return (
        <Space>
          <Link to={`/admin/admin-details/${item?.key}`}>
            <Button>Details</Button>
          </Link>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      );
    },
    width: "1%",
  },
];

function AdminDataTable() {
  const [params, setParams] = useState<IQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: adminData, isFetching } = useGetAllAdminQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const adminMeta = adminData?.meta;
  const tableData = adminData?.data?.map(
    ({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
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
          pageSize={adminMeta?.limit}
          total={adminMeta?.total}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
}

export default AdminDataTable;

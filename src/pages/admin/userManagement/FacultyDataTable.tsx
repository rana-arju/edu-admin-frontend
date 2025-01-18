import {Pagination,  Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { IFaculty, IQueryParam } from "../../../types";
import {
  useGetAllFacultyQuery,
} from "../../../redux/features/admin/userManagement.api";

import { AdminActions } from "../../../components/actions/AdminActions";

type ITableData = Pick<
  IFaculty,
  "fullName" | "id" | "email" | "contactNo" | "user"
>;
const columns: TableColumnsType<ITableData> = [
  {
    title: "Faculty Name",
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
    title: "Faculty ID",
    dataIndex: "id",
  },

  {
    title: "Actions",
    key: "x",
    render: (item) =>  <AdminActions item={item} url ={`/admin/faculty-details/${item?.key}`} /> ,
    width: "1%",
  },
];




function FacultyDataTable() {
  const [params, setParams] = useState<IQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: facultyData, isFetching } = useGetAllFacultyQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const facultyMeta = facultyData?.meta;
  const tableData = facultyData?.data?.map(
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
          pageSize={facultyMeta?.limit}
          total={facultyMeta?.total}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
}

export default FacultyDataTable;

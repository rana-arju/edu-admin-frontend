import { Button, Modal, Pagination, Select, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { IFaculty, IQueryParam } from "../../../types";
import { Link } from "react-router-dom";
import {
  useGetAllFacultyQuery,
  useStatusUpdateMutation,
} from "../../../redux/features/admin/userManagement.api";
import {
  EditTwoTone,
  ExportOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

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
    render: (item) => <FacultyActions item={item} />,
    width: "1%",
  },
];

type FacultyActionsProps = {
  item: {
    contactNo: string;
    email: string;
    fullName: string;
    id: string;
    key: string;
    status: string;
  } & IFaculty;
};

const FacultyActions = ({ item }: FacultyActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(item?.user?.status);
  const [statusUpdate] = useStatusUpdateMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    statusUpdate({ data: status, id: item?.user?._id });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value: string) => {
    setStatus(value);
  };

  return (
    <Space>
      <Link to={`/admin/faculty-details/${item?.key}`}>
        <Button>
          <ExportOutlined />
        </Button>
      </Link>
      <Button>
        <EditTwoTone />
      </Button>
      <Button onClick={showModal}>
        <ThunderboltOutlined />
      </Button>
      <Modal
        title={`Status:  ${item.status}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Want to Change Status?</p>
        <Select
          defaultValue={item.status}
          onChange={handleChange}
          style={{ width: 120 }}
          allowClear
          options={[
            { value: "in-progress", label: "In Progress" },
            { value: "blocked", label: "Blocked" },
          ]}
          placeholder="Select status"
        />
      </Modal>
    </Space>
  );
};

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

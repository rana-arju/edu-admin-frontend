import { useState } from "react";
import { useStatusUpdateMutation } from "../../redux/features/admin/userManagement.api";
import { Button, Modal, Select, Space } from "antd";
import { Link } from "react-router-dom";
import {
  EditTwoTone,
  ExportOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { ISingleResponse, IUser } from "../../types";
import { toast } from "sonner";

type AdminActionsProps = {
  item: {
    contactNo: string;
    email: string;
    fullName: string;
    id: string;
    key: string;
    status: string;
    user: IUser;
  };
  url: string;
};

export const AdminActions = ({ item, url }: AdminActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(item?.user?.status);
  const [statusUpdate] = useStatusUpdateMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const toastId = toast.loading("Creating new semester ....");

    try {
      const res = (await statusUpdate({
        data: status,
        id: item?.user?._id,
      })) as ISingleResponse;
      if (res.error) {
        toast.error(res.error?.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value: string) => {
    setStatus(value);
  };

  return (
    <Space>
      <Link to={url}>
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

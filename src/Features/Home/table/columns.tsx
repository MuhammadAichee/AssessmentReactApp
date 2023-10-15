import { useAppDispatch } from "Store/hooks";
import { Popconfirm, Space, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { deleteUser, getAllUsersWithParams } from "../redux/thunk";
import { setLoadingState } from "Components/loader/redux/slice";
import { IGetUserParams } from "../redux/types";
import { setIsModalOpen, setSelectedUser } from "../redux/slice";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";

import "../home.index.css";

const ActionCreater: React.FC = (record: any) => {
  const success = () => {
    message.success("User Deleted Successfully");
  };
  const error = (description: string) => {
    message.error(description);
  };
  const fetchAllUsers = () => {
    let queryPayload: IGetUserParams = {
      search: "",
      country: null,
      city: null,
      state: null,
      page: 1,
      limit: 5,
      sortBy: "username",
      sortOrder: "asc",
    };
    dispatch(getAllUsersWithParams(queryPayload))
      .unwrap()
      .then(() => {
        dispatch(setLoadingState(false));
      })
      .catch((err: any) => {
        dispatch(setLoadingState(false));
      });
  };
  const dispatch = useAppDispatch();
  const deleteSelectedUser = () => {
    if (localStorage.getItem("username") === record.username) {
      error("Logged In user can not be deleted");
      return
    }
    dispatch(setLoadingState(true));
    dispatch(deleteUser(record._id))
      .unwrap()
      .then(() => {
        dispatch(setLoadingState(true));
        success();
        fetchAllUsers();
      })
      .catch((err: any) => {
        dispatch(setLoadingState(false));
        error(err);
      });
  };
  const editUserHandler = () => {
    dispatch(setSelectedUser(record));
    dispatch(setIsModalOpen(true));
  };
  return (
    <>
      <Space size="middle">
        <EditFilled
          color="red"
          onClick={() => {
            editUserHandler();
          }}
        />
        <Popconfirm
          placement="bottomRight"
          title="Delete action can't be reverted. Do you still want to delete?"
          onConfirm={deleteSelectedUser}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined color="red" />
        </Popconfirm>
      </Space>
    </>
  );
};

export const columns: ColumnsType<any> = [
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
    sorter: true,
    render: (text) => <a>{text}</a>,
  },
  {
    sorter: true,
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Country",
    dataIndex: "country",
    render: (country) => <span>{country ? country.name : ""}</span>,
  },
  {
    title: "State",
    dataIndex: "state",
    render: (state) => <span>{state ? state.name : ""}</span>,
  },
  {
    title: "City",
    dataIndex: "city",
    render: (city) => <span>{city ? city.name : ""}</span>,
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: "Action",
    key: "action",
    render: (_, record) => ActionCreater(record),
  },
];

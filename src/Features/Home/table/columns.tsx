import { useAppDispatch } from "Store/hooks";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { deleteUser, getAllUsersWithParams } from "../redux/thunk";
import { setLoadingState } from "Components/loader/redux/slice";
import { IGetUserParams } from "../redux/types";
import { setIsModalOpen, setSelectedUser } from "../redux/slice";

const ActionCreater = (record: any) => {
  const fetchAllUsers = () => {
    let queryPayload: IGetUserParams = {
      search: "",
      country: null,
      city: null,
      state: null,
      page: 1,
      limit: 5,
      sortBy: "username",
      sortOrder: "adx",
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
    dispatch(setLoadingState(true));
    dispatch(deleteUser(record._id))
      .unwrap()
      .then(() => {
        dispatch(setLoadingState(true));
        fetchAllUsers();
      })
      .catch(() => {
        dispatch(setLoadingState(true));
      });
  };
  const editUserHandler = () => {
    console.log(record)
    dispatch(setSelectedUser(record))
    dispatch(setIsModalOpen(true))
  }
  return (
    <Space size="middle">
      <a onClick={() => {
          editUserHandler();
        }}>Edit</a>
      <a
        onClick={() => {
          deleteSelectedUser();
        }}
      >
        Delete
      </a>
    </Space>
  );
};

export const columns: ColumnsType<any> = [
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
    render: (text) => <a>{text}</a>,
  },
  {
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

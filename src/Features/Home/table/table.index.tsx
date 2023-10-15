import { Form, Modal, Table, message } from "antd";
import { columns } from "./columns";
import { useSelector } from "react-redux";
import {
  selectCount,
  selectCurrentUsers,
  selectIsModalOpen,
  selectUsers,
} from "../redux/selector";
import { setIsModalOpen } from "../redux/slice";
import { useAppDispatch, useAppSelector } from "Store/hooks";
import { IEditUserPayload, IGetUserParams, IUser } from "../redux/types";
import { setLoadingState } from "Components/loader/redux/slice";
import ModalContent from "./modalContent/modalContent.index";
import { useEffect } from "react";
import {
  editUser,
  getAllCities,
  getAllStates,
  getAllUsersWithParams,
} from "../redux/thunk";

const HomeTable = ({ page, setPage, setSortOrder, setSortBy }: any) => {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectCurrentUsers);
  const count = useAppSelector(selectCount);
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const [form] = Form.useForm();
  const success = () => {
    message.success("User info updated Successfully");
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
  const onFinish = (values: IUser) => {
    try {
      let { username, email, country, state, city } = values;
      dispatch(setLoadingState(true));
      let editPayload: IEditUserPayload = {
        username: username,
        email: email,
        country: country.name,
        state: state.name,
        city: city.name,
        id: selectedUser._id,
      };
      dispatch(editUser(editPayload))
        .unwrap()
        .then((response: any) => {
          dispatch(setLoadingState(false));
          dispatch(setIsModalOpen(false));
          success()
          fetchAllUsers();
        }).catch((err:any)=>{
          error(err.message)
          dispatch(setLoadingState(false));
        })
    } catch (err: any) {
      dispatch(setLoadingState(false));
    }
  };
  const userData = useSelector(selectUsers);

  useEffect(() => {
    if (selectedUser._id !== "-1") {
      form.setFieldsValue(selectedUser);
      dispatch(getAllCities(selectedUser.state.name));
      dispatch(getAllStates(selectedUser.country.name));
    }
  }, [selectedUser]);
  const onPageChange = (e: any) => {
    setPage(e);
  };
  const paginationOptions = {
    current: page,
    onChange: onPageChange,
    total: count,
    defaultPageSize: 5,
  };
  const onChange = (e: any, filter: any, sort: any) => {
    setSortBy(sort.field);
    setSortOrder(sort.order);
  };
  return (
    <div>
      <Table
        pagination={paginationOptions}
        columns={columns}
        dataSource={userData}
        onChange={onChange}
      />
      <Form
        form={form}
        className=""
        initialValues={selectedUser}
        onFinish={onFinish}
        layout={"vertical"}
      >
        <Modal
          title="Edit User Info"
          open={isModalOpen}
          onOk={() => {
            form.submit();
          }}
          onCancel={() => {
            form.setFieldsValue(selectedUser);
            dispatch(setIsModalOpen(false));
          }}
        >
          <ModalContent formRef={form} />
        </Modal>
      </Form>
    </div>
  );
};

export default HomeTable;

import { Form, Modal, Table } from "antd";
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
  deleteUser,
  editUser,
  getAllCities,
  getAllStates,
  getAllUsersWithParams,
} from "../redux/thunk";

const HomeTable = ({ page, setPage }: any) => {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectCurrentUsers);
  const count = useAppSelector(selectCount);
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const [form] = Form.useForm();
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
          fetchAllUsers();
        });
    } catch (err: any) {
      console.log(err);
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
    console.log(e);
  };
  const paginationOptions = {
    current: page,
    onChange: onPageChange,
    total: count,
    defaultPageSize: 5,
  };
  return (
    <div>
      <Table
        pagination={paginationOptions}
        columns={columns}
        dataSource={userData}
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

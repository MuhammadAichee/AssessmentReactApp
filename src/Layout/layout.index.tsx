import { Layout } from "antd";
import MainHeader from "./Header/header.index";
import style from "./layout.module.css";
import React, { ReactElement } from "react";

const MainLayout = ({ children }: any): ReactElement => {
  return (
    <>
      <Layout className="main-layout">
        <MainHeader />
        <Layout >{children}</Layout>
      </Layout>
    </>
  );
};

export default MainLayout;

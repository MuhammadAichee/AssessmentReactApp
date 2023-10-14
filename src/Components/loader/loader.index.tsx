import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'Store/index';
// import { useAppDispatch } from '../../../Store/hooks';
// import { clearErrorState } from '../ErrorBoundary/redux/slice';
import "./loader.css"

type Props = {
  classNames?: string;
  children? : React.ReactNode
};

function Loader({ classNames,children }: Props): JSX.Element {
  const loading = useSelector((state: RootState) => state.LoaderReducer.loading)

  return (
    <div className={`loader ${classNames || ''}`}>
      <Spin spinning={loading} size="large" wrapperClassName={"loader"} style={{zIndex: 100000}}>{children}</Spin>
    </div>
  )
  
}


export default Loader;

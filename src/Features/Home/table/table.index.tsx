import { Table } from "antd"
import { columns } from "./columns"
import { useSelector } from "react-redux"
import { selectUsers } from "../redux/selector"

const HomeTable = () => {
    const userData = useSelector(selectUsers)
    return (
        <Table columns={columns} dataSource={userData} />
    )
}

export default HomeTable
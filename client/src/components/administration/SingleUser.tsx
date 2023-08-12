interface props {
    user: User | undefined;
    index: number;
}
const SingleUser = ({ user, index }: props) => {
    return (
        <tr>
            <th>{index + 1 > 9 ? index + 1 : `0${index + 1}`}</th>
            <td>
                <div className="font-bold">{user?.username}</div>
                <div className="text-sm opacity-50">{user?.role}</div>
            </td>
            <td>{user?.email}</td>
            <td>{user?.createdAt?.split("T")[0]}</td>
            <th>
                <button className="btn btn-accent btn-xs">Action</button>
            </th>
        </tr>
    );
};
export default SingleUser;

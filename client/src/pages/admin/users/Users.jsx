import { useCallback, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUser, setCurrentPage, setLimit
  // , deleteUser 
} from "../../../slices/userSlice";
import Paginate from "../../../components/Paginate";
import CTable from "../../../components/Table";

const Users = () => {
  const dispatch = useDispatch();
  const { total, currentPage, users, limit } = useSelector(
    (state) => state.users
  );

  const extractHeader = (data) => {
    if (data.length === 0) return [];
    const { createdAt, id, updatedAt, __v, _id, ...rest } = data[0];
    return Object.keys(rest);
  };

  const initFetch = useCallback(() => {
    dispatch(listUser({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const updateLimit = (number) => {
    dispatch(setLimit(number));
  };



  const updateCP = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className="mt-4">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <h3>Users</h3>
            <button className="btn btn-danger btn-sm">+ New</button>
          </div>
        </Card.Header>
        <Card.Body>
          {users && (
            <>
              <CTable
                header={extractHeader(users)}
                data={users}
                edit="/admin/users"
               
              />

              <Paginate
                total={total}
                limit={limit}
                currentPage={currentPage}
                setCurrentPage={updateCP}
                setLimit={updateLimit}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Users;

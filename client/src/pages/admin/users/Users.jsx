import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";


import {
  listUser,
  setCurrentPage,
  setLimit,
} from "../../../slices/userSlice";

import CTable from "../../../components/Table";
import Paginate from "../../../components/Paginate";

const users = () => {
  const dispatch = useDispatch();
  const { total, currentPage, users, limit } = useSelector(
    (state) => state.users
  );

 

  const extractHeader = (data) => {
    if (data.length === 0) return [];
    const {
      slug,
   
      createdAt,
      id,
      products,
      updatedAt,
      __v,
      _id,
      ...rest
    } = data[0];
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
          {users.length > 0 && (
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

export default users;
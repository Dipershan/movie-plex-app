import { Table } from "react-bootstrap";

import { MdDelete } from "react-icons/md";

const Tables = ({ header = [], data = [], edit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {header.map((item) => (
            <th key={item} className="text-center text-capitalize">
              {item}
            </th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              {header.map((key, index) => (
                <td key={index}>
                  {typeof item[key] === 'boolean' ? (item[key] ? 'True' : 'False') : item[key]}
                </td>
              ))}
              <td>
                {edit && (
                  <MdDelete
                    onClick={() => onDelete(item.id)} // Use item.id or the appropriate identifier
                    style={{ cursor: 'pointer', color: 'red' }}
                    title="Delete"
                  />
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={header.length + 1} style={{ textAlign: "center" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default Tables;

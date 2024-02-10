import { useState } from "react";
import DataEdit from "./DataEdit";

const Body = ({ data }) => {
  const [editData, setEditData] = useState();
  const [editWindow, setEditWindow] = useState(false)
  console.log(editData);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await fetch(`http://localhost:5000/api/users/remove/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex absolute flex-wrap ">
        {data.map((items) => {
          return (
            <div
              key={items._id}
              className="bg-orange-600 mx-5 w-48 p-5 text-wrap break-words flex flex-col justify-between rounded-3xl hover:shadow-2xl duration-300 m-5"
            >
              <div className="mb-5">
                <h1>{items.name}</h1>
                <h1>{items.email}</h1>
                <h1>{items.phone}</h1>
              </div>
              <div className="flex justify-around">
                <button onClick={() => handleDelete(items._id)}>Delete</button>
                <button onClick={() => {setEditData(items); setEditWindow(true)}}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>
      {editWindow && <div className="relative flex items-center justify-center">
        <DataEdit data={editData} />
      </div>}
    </>
  );
};

export default Body;

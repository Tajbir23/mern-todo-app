import { useState } from "react";

const DataEdit = ({data}) => {
    const [updateData,setUpdateData] = useState({
        name: data.name,
        email: data.email,
        phone: data.phone
    });

    console.log(updateData)
    const handleSubmit = async(id) =>{
        try {
            const update = await fetch(`http://localhost:5000/api/users/update/${id}`,{
                method: 'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(updateData)
            })

            
        } catch (error) {
            console.log(error)
        }
    }
  return <div>
    <form className="flex flex-col border border-black p-4" onSubmit={() => handleSubmit(data?._id)} >
        <input type="text" defaultValue={data?.name} required onChange={(e)=> setUpdateData({...updateData, name:e.target.value})} className="border border-black m-1 p-2" />
        <input type="email" defaultValue={data?.email} required onChange={(e)=> setUpdateData({...updateData, email:e.target.value})} className="border border-black m-1 p-2" />
        <input type="tel" defaultValue={data?.phone} required onChange={(e)=> setUpdateData({...updateData, phone:e.target.value})} className="border border-black m-1 p-2" />
        <button type="submit" onClick={() => handleSubmit(data?._id)}>Update Data</button>
    </form>
  </div>;
};

export default DataEdit;

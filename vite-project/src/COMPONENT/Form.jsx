import { useEffect, useState } from "react";
import Body from './Body'

function Form() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {

        const dataArray = [];
        data.forEach((items) => {
          dataArray.push(items)
        })
        setData(dataArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(user)
      });
      if (response.ok) {
        setUser({
          name: "",
          email: "",
          phone: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col p-10">
          <input
            type="text"
            name="name"
            placeholder="Enter your name "
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email "
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone"
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Body data={data} />
    </>
  );
}

export default Form;

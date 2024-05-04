import React, {useState, useEffect} from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'

export default function AdminHome() {

  const [users, setUsers] = useState({});

  const fetchUsers = async() => {
    await fetch("http://localhost:8000/api/admin/users", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    }).then(async (response) => {
      let data = await response.json();
      console.log(data)
      await setUsers(data);
    })
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
    <div action="/admin" >
      <div><AdminNavbar /></div>
      <div>
        <div className='m-3'>
          <h2 className='text-center text-success'>USERS INFO</h2>
          <ol>{users.length > 0 ? (
           
          users.map((user) => (
            
            <div key={user._id} className='container mt-3'>
                <li>
                <div className=''>UserID: {user._id ? user._id : "N/A"}</div> 
                <div>Name: {user.name ? user.name : "N/A"}</div>
                <div>Email: {user.email ? user.email : "N/A"}</div>
                <div>Location: {user.location ? user.location : "N/A"}</div>
                <hr />
                </li>
            </div>
            
            
          ))
          ) : (
            <p>No Users Found</p>
          )}</ol>
        </div>
      </div>
      <div>< Footer /></div>
      </div>
    </>
  )
}

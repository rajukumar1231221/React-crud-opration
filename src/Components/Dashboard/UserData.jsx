import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function UserData() {

    const [simple, setSimple] = useState([]);

    const getallData=()=>{
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
              console.log(res.data);
              setSimple(res.data)
        })
    }
    useEffect(() => {
        getallData()
    },[])
 
   const deletebtn=(id)=>{
    Swal.fire({
        title: "Are you sure to delete this id?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            axios.delete("https://jsonplaceholder.typicode.com/users/" + id)
                .then((res) => {
                    // console.log(res)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    // Remove deleted item from the state (UI)
                    setSimple(prevData => prevData.filter(item => item.id !== id));
                }).catch((err) => {
                    // Handle errors here
                    console.error("Error deleting data:", err);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error"
                    });
                });
        }
    });
   }
    return (
        <>
             <div className='container-fluid'>
                <div className="container text-center fs-3">Fetching users</div>
                <div className='col-md-12'>
                </div>
                <div className='row'>
                    {/* <div className='col-md-1'>

                    </div> */}
                    <div className='col-md-12'>
                        <table className='table table-dark table-striped'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>User name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                   
                                    <th>Website</th>
                                    <th>Company</th>
                                    <th>Update users</th>
                                </tr>
                            </thead>
                            <tbody>
                                {simple.map((item,index)=>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address.street+""+item.address.suite+" "+item.address.city}</td>
                                    <td>{item.website}</td>
                                    <td>{item.company.name}</td>
                                    <td>
                                        <Link to={`/edit/${item.id}`} 
                                        className='btn btn-success'>
                                            Edit
                                        </Link>
                                        &nbsp; &nbsp;
                                        <Link to={""} 
                                        className='btn btn-danger' onClick={()=>deletebtn(item.id)}>
                                            Delete
                                        </Link>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className='col-md-1'></div> */}
                </div>

            </div>
        </>
    )
}

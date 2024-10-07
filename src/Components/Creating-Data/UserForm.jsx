import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const UserForm = () => {
    // Form data (with nested objects for address and company)
    const [state, setState] = useState({
        name: '',
        username: '',
        email: '',
        address: {
            street: "",
            suite:"",
            city: ""
        },
        website: '',
        company: {
            name: ""
        }
    });

    // State to hold validation error messages
    const [errors, setErrors] = useState({});

    // Users list (separate state)
    const [users, setUsers] = useState([]);

    // Handle form input
    const mydata = (e) => {
        const { name, value } = e.target;

        // Handle nested object fields
        if (name.includes('.')) {
            const keys = name.split('.');
            setState((prevState) => {
                let nested = { ...prevState };
                nested[keys[0]] = { ...nested[keys[0]], [keys[1]]: value };
                return nested;
            });
        } else {
            // Update top-level fields
            setState((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    //  username field 
    useEffect(() => {
        if (state.name && state.name.length >= 3) {
            setState((prevState) => ({
                ...prevState,
                username: `USER-${state.name}`
            }));
        }
    }, [state.name]);

    // Validation logic 
    const validateFields = () => {
        let formErrors = {};
        // Name validation
        if (!state.name || state.name.length < 3) {
            formErrors.name = 'Name is required and must be at least 3 characters.';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!state.email || !emailRegex.test(state.email)) {
            formErrors.email = 'Valid email is required.';
        }


        // Address validation
        if (!state.address.street) {
            formErrors.street = 'Street is required.';
        }
        if (!state.address.suite) {
            formErrors.suite = 'House no is required.';
        }
        if (!state.address.city) {
            formErrors.city = 'City is required.';
        }

        // Company name validation 
        if (state.company.name && state.company.name.length < 3) {
            formErrors.companyName = 'Company name must be at least 3 characters if provided.';
        }

        // Website validation 
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (state.website && !urlRegex.test(state.website)) {
            formErrors.website = 'Must be a valid URL if provided.';
        }

        // Set the errors
        setErrors(formErrors);

        // Return whether the form is valid
        return Object.keys(formErrors).length === 0;
    };

    // Handle form submission and send data
    const senddata = (event) => {
        event.preventDefault();

        // Run field validation before submitting
        if (!validateFields()) {
            toast.error("Please correct the errors in the form.");
            return;
        }

        axios.post("https://jsonplaceholder.typicode.com/users", state)
            .then((res) => {
                if (res.status === 201 || res.status === 200) {
                    toast.success('Data added successfully');

                    // Add the newly created user to the users state
                    setUsers((prevUsers) => [...prevUsers, res.data]);

                    // Reset the form data after submission
                    setState({
                        name: '',
                        username: '',
                        email: '',
                        suite: '',
                        address: {
                            street: "",
                            city: ""
                        },
                        website: '',
                        company: {
                            name: ""
                        }
                    });

                    // Clear errors
                    setErrors({});
                } else {
                    toast.error("Data wasn't added successfully");
                }
            })
            .catch((error) => {
                console.error("Error posting data:", error);
                toast.error("An error occurred while adding the data.");
            });
    };

    return (
        <div>
            <div className='container'>
                <div className='col-md-12'>
                    <Toaster />
                    <div className='text-center fs-3 active' style={{ marginLeft: "32rem" }}>
                        Create New User
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>
                        <img src='image1.jpeg' style={{ width: "100%" }} alt="form visual" />
                    </div>
                    <div className='col-md-7'>
                        <form method='post' onSubmit={senddata}>
                            <div className="row mt-3">
                                <div className="col">
                                    <input
                                        type="text"
                                        name='name'
                                        value={state.name}
                                        onChange={mydata}
                                        className="form-control"
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        name='username'
                                        value={state.username}
                                        className="form-control"
                                        placeholder="User name"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <input
                                        type="email"
                                        name='email'
                                        value={state.email}
                                        onChange={mydata}
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        name='address.suite'
                                        value={state.address.suite}
                                        onChange={mydata}
                                        className="form-control"
                                        placeholder="House no"
                                    />
                                    {errors.phone && <p className="text-danger">{errors.phone}</p>}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <input
                                        type="text"
                                        name='address.street'
                                        value={state.address.street}
                                        onChange={mydata}
                                        className="form-control"
                                        placeholder="Street"
                                    />
                                    {errors.street && <p className="text-danger">{errors.street}</p>}
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        name='address.city'
                                        value={state.address.city}
                                        onChange={mydata}
                                        className="form-control"
                                        placeholder="City"
                                    />
                                    {errors.city && <p className="text-danger">{errors.city}</p>}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <input
                                        type="text"
                                        name='website'
                                        value={state.website}
                                        onChange={mydata}
                                        className="form-control"
                                        placeholder="Website"
                                    />
                                    {errors.website && <p className="text-danger">{errors.website}</p>}
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        name='company.name'
                                        value={state.company.name}
                                        onChange={mydata}
                                        className="form-control"
                                        placeholder="Company"
                                    />
                                    {errors.companyName && <p className="text-danger">{errors.companyName}</p>}
                                </div>
                            </div>
                            <button className='btn btn-danger d-flex justify-content-center mt-3' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Display the list of users */}
            <div>
                <h3>Users List</h3>
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div key={index}>
                            <h4>{user.name}</h4>
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Address: {user.address.suite},{user.address.street}, {user.address.city}</p>
                            <p>Company: {user.company.name}</p>
                            <p>Website: {user.website}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No users available</p>
                )}
            </div>
        </div>
    );
}

export default UserForm;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const [state, setState] = useState({
        name: '',
        username: '',
        email: '',
        address: {
            street: '',
            suite: '',
            city: ''
        },
        website: '',
        company: {
            name: ''
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const _navigate = useNavigate();
    const { id } = useParams();

    const newdata = (event) => {
        const { name, value } = event.target;

        // Handle nested object fields
        if (name.includes('.')) {
            const keys = name.split('.');
            setState(prevState => ({
                ...prevState,
                [keys[0]]: {
                    ...prevState[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else {
            setState({ ...state, [name]: value });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setState(res.data);
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };


        fetchData();
    }, [id]);
    

    const updatedata = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!state.name || !state.email || !state.address.street || !state.address.city) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, state);
            _navigate("/User-data");
        } catch (err) {
            setError('Error updating data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='container'>
            <div className='col-md-12'>
                <div className='text-center active'>
                    <h3>Contact Form</h3>
                </div>
            </div>
            {loading && <p className='text-center'> Loading...</p>}
            {error && <p className="text-danger text-center">{error}</p>}
            <div className='row'>
                <div className='col-md-5'>
                    <img src='../image1.jpeg' style={{ width: "100%" }} alt="Background" />
                </div>
                <div className='col-md-7'>
                    <form method='post' onSubmit={updatedata}>
                        <div className="row mt-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name='name'
                                    value={state.name}
                                    onChange={newdata}
                                    className="form-control"
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name='username'
                                    value={state.username}
                                    onChange={newdata}
                                    className="form-control"
                                    placeholder="Username"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input
                                    type="email"
                                    value={state.email}
                                    name='email'
                                    onChange={newdata}
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    value={state.address.suite || ''}
                                    name='suite'
                                    onChange={newdata}
                                    className="form-control"
                                    placeholder="House no"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name='address.street'
                                    value={state.address.street}
                                    onChange={newdata}
                                    className="form-control"
                                    placeholder="Street"
                                    required
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name='address.city'
                                    value={state.address.city}
                                    onChange={newdata}
                                    className="form-control"
                                    placeholder="City"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name='address.suite'
                                    value={state.address.suite}
                                    onChange={newdata}
                                    className="form-control"
                                    placeholder="Suite"
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name='company.name'
                                    value={state.company.name}
                                    onChange={newdata}
                                    className="form-control"
                                    placeholder="Company Name "
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name='website'
                                    value={state.website}
                                    onChange={newdata}
                                    className="form-control"
                                    placeholder="Website "
                                />
                            </div>
                        </div>
                        <button className='btn btn-danger' style={{ marginLeft: "45%", marginTop: "2%" }} type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

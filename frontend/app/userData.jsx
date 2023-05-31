'use client';

import axios from "axios";
import {useEffect, useState} from "react";

export default function UserData() {
    axios.defaults.baseURL = 'http://localhost'
    axios.defaults.withCredentials = true
    axios.defaults.headers.common['Accept'] = 'application/json'
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

    const [userData, setUserData] = useState({});

    useEffect(() => {
        axios.get('/sanctum/csrf-cookie')
            .then(() =>
                axios.post('/api/login', {
                    'email': 'admin@example.com',
                    'password': 'secret',
                })
            )
            .then(() => axios.get('/api/user'))
            .then(response => setUserData(response.data))
            .then(() => axios.post('/api/logout'))
    }, []);


    return (
        <div>
            {userData.name}
        </div>
    );
}
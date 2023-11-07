import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_ADDRESS = process.env.REACT_APP_BACKEND_ADDRESS;

const HelloWorld = () => {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const response = await axios.post(`${BACKEND_ADDRESS}/api/hello/`);
                setMessage(response.data.message);
            } catch {
                setMessage("Error");
            }
        };

        makeRequest();
    }, []);

    return (
        <div>
            <h1 className="text-3xl">{message}</h1>
        </div>
    );
};

export default HelloWorld;

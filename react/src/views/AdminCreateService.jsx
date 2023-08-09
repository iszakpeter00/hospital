import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminCreateService() {

    const [name, setName] = useState("");
    const [length, setLength] = useState(30);
    const [price, setPrice] = useState(10000);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();
    const { showToast } = useStateContext();

    const onSubmit = (evt) => {
        evt.preventDefault();

        const payload = {
            name,
            length,
            price
        };

        if (id) {
            payload.id = id;
        }

        let res = null;
        if (id) {
            res = axiosClient.put(`/service/${id}`, payload);
        } else {
            res = axiosClient.post("/service", payload);
        }

        res.then(() => {
            navigate("/admin/services");
            if (id) {
                showToast("Service edited successfully.");
            } else {
                showToast("Service created successfully.");
            }
        }).catch((err) => {
            if (err && err.response) {
                setError(err.response.data.message);
            }
            console.log(err, err.response);
        });
    }

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/service/${id}`)
                .then((res) => {
                    setName(res.data.name);
                    setLength(res.data.length);
                    setPrice(res.data.price);
                    setLoading(false);
                })
                .catch((err) => {
                    if (err && err.response) {
                        setError(err.response.data.message);
                    }
                    console.log(err, err.response);
                });
        }
    }, []);

    return (
        <PageComponent title={id ? "Edit service" : "Add new service"}>
            <form action="#" method="post" onSubmit={onSubmit} className="px-4 py-4">
                {error &&
                    <div className="bg-red-100 border border-red-400 text-red-700 text-lg px-4 py-3 rounded relative" role="alert">
                        {error}
                    </div>
                }
                {!loading ? (
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="px-4 py-4 bg-white space-y-6 sm:p-6">

                            {/*Name*/}
                            <div className="col-span-6 sm:col-span-3 space-y-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-bold text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(evt) => setName(evt.target.value)}
                                    value={name ? name : ""}
                                    placeholder="Name of service"
                                    required
                                />
                            </div>
                            {/*Name*/}

                            {/*Duration*/}
                            <div className="col-span-6 sm:col-span-3 space-y-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-bold text-gray-700"
                                >
                                    Duration (min.)
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    step={5}
                                    name="length"
                                    id="length"
                                    className="mt-3 w-36 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(evt) => setLength(evt.target.value)}
                                    value={length ? length : 30}
                                    required
                                />
                            </div>
                            {/*Duration*/}

                            {/*Price*/}
                            <div className="space-y-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-bold text-gray-700"
                                >
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    step={5}
                                    name="price"
                                    id="price"
                                    className="mt-3 w-36 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(evt) => setPrice(evt.target.value)}
                                    value={price ? price : 100}
                                    required
                                />
                            </div>
                            {/*Ár*/}

                            <div className="flex gap-4 py-3">
                                <TButton color="green">Save</TButton>
                                <TButton color="gray" onClick={() => navigate("/admin/services")}>Cancel</TButton>
                            </div>

                        </div>
                    </div>
                ) : "Loading..."}
            </form>
        </PageComponent>
    )
}

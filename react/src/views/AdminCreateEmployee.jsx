import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminCreateEmployee() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();
    const { showToast } = useStateContext();

    const onSubmit = (evt) => {
        evt.preventDefault();

        const payload = {
            name,
            email,
            role: "user"
        };

        if (id) {
            payload.id = id;
        }

        let res = null;
        if (id) {
            res = axiosClient.put(`/employee/${id}`, payload);
        } else {
            res = axiosClient.post("/employee", payload);
        }

        res.then((res) => {
            console.log(res);
            navigate("/admin/employees");
            if (id) {
                showToast("Employee edited successfully.");
            } else {
                showToast("Employee created successfully.");
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
            axiosClient.get(`/employee/${id}`)
                .then((res) => {
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <PageComponent title={id ? "Edit employee" : "Add employee"}>
            <form action="#" method="post" onSubmit={onSubmit} className="px-4 py-4">
            {error &&
                <div className="bg-red-100 border border-red-400 text-red-700 text-lg px-4 py-3 rounded relative" role="alert">
                    {error}
                </div>
            }
                {!loading ? (

                    <div className="mt-5 shadow sm:overflow-hidden sm:rounded-md">

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
                                    placeholder="Minta János"
                                    required
                                />
                            </div>
                            {/*Name*/}

                            {/*E-mail address*/}
                            <div className="col-span-6 sm:col-span-3 space-y-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-bold text-gray-700"
                                >
                                    E-mail address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(evt) => setEmail(evt.target.value)}
                                    value={email ? email : ""}
                                    placeholder="mintajanos@mail.hu"
                                    required
                                />
                            </div>
                            {/*E-mail address*/}

                            <div className="flex gap-4 py-3">
                                <TButton color="green">Save</TButton>
                                <TButton color="gray" onClick={() => navigate("/admin/employees")}>Cancel</TButton>
                            </div>

                        </div>

                    </div>
                ) : "Loading..."}
            </form>
        </PageComponent>
    )
}

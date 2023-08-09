import { PlusCircleIcon, XCircleIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "../components/DeleteConfirm";

export default function AdminServices() {

    const [services, setServices] = useState([]);
    const [serviceId, setServiceId] = useState(0);
    const { getCurrentUser } = useStateContext();
    const [loading, setLoading] = useState(true);
    const { showToast } = useStateContext();
    const navigate = useNavigate();
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    if (getCurrentUser().role !== "admin") {
        navigate("/dashboard");
    }

    const getServices = () => {
        setLoading(true);
        axiosClient.get("/service")
            .then((res) => {
                const keys = Object.keys(res.data);
                const values = Object.values(res.data);
                const data = keys.map((key, index) => {
                    return {
                        id: key,
                        ...values[index]
                    }
                });
                setServices(data);
                setLoading(false);
            }
            )
    }

    const onDelete = (id) => {
        axiosClient.delete(`/service/${id}`)
            .then(() => {
                setDeleteConfirm(false);
                showToast("Service deleted successfully.");
                getServices();
            })
    }

    useEffect(() => {
        getServices();
    }, []);

    return (
        <div>
            <PageComponent
                title="Services"
                buttons={(
                    <TButton color="green" to="/admin/services/create">
                        <PlusCircleIcon className="h-6 w-6 mr-2" />
                        Add new service
                    </TButton>
                )}>

                { deleteConfirm &&
                    <DeleteConfirm
                        title="Are you sure you want to delete the service?"
                        onDelete={() => onDelete(serviceId)}
                        onCancel={() => setDeleteConfirm(false)}
                    />
                }

                {!loading && services.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-base text-left">
                            <thead className="text-s uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Duration
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) => (
                                    <tr key={service.id} className="bg-white border-b dark:bg-white dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {service.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.length} min.
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.price} $
                                        </td>
                                        <td className="flex flex-row gap-2 px-6 py-4 justify-center">
                                            <TButton
                                                color="edit"
                                                to={`/admin/services/${service.id}`}
                                            >
                                                <PencilSquareIcon className="h-6 w-6 mr-2" />
                                                Edit
                                            </TButton>
                                            <TButton
                                                color="delete"
                                                onClick={() => {
                                                    setServiceId(service.id);
                                                    setDeleteConfirm(true);
                                                }
                                                }
                                            >
                                                <XCircleIcon className="h-6 w-6 mr-2" />
                                                Delete
                                            </TButton>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (loading ? 'Loading...' : 'There is no service in the database.')
                }

            </PageComponent>
        </div>
    )
}

import { PlusCircleIcon, XCircleIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "../components/DeleteConfirm";

export default function AdminAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [appointmentId, setAppointmentId] = useState(0);
    const { getCurrentUser } = useStateContext();
    const [loading, setLoading] = useState(true);
    const { showToast } = useStateContext();
    const navigate = useNavigate();
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    if (getCurrentUser().role !== "admin") {
        navigate("/appointments");
    }

    const getAppointments = () => {
        setLoading(true);
        axiosClient.get("/appointment")
            .then((res) => {
                const keys = Object.keys(res.data);
                const values = Object.values(res.data);
                const data = keys.map((key, index) => {
                    return {
                        id: key,
                        ...values[index]
                    }
                });
                setAppointments(data);
                setLoading(false);
            }
            )
    }

    const onDelete = (id) => {
        axiosClient.delete(`/appointment/${id}`)
            .then(() => {
                setDeleteConfirm(false);
                showToast("Appointment deleted successfully.");
                getAppointments();
            })
    }

    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <div>
            <PageComponent
                title="Appointments"
                buttons={(
                    <TButton color="green" to="/admin/appointments/create">
                        <PlusCircleIcon className="h-6 w-6 mr-2" />
                        Add new appointment
                    </TButton>
                )}>

                {deleteConfirm &&
                    <DeleteConfirm
                        title="Are you sure you want to delete the appointment?"
                        onDelete={() => onDelete(appointmentId)}
                        onCancel={() => setDeleteConfirm(false)}
                    />
                }

                {!loading && appointments.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-base text-left">
                            <thead className="text-s uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Employee
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Service
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Duration
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr key={appointment.id} className="bg-white border-b dark:bg-white dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {appointment.date.replaceAll(" ", ". ").replaceAll("-", ". ").substring(0, 19)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {appointment.employee.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {appointment.service.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {appointment.service.length} min.
                                        </td>
                                        <td className="flex flex-row gap-2 px-6 py-4">
                                            <TButton
                                                color="edit"
                                                to={`/admin/appointments/${appointment.id}`}
                                            >
                                                <PencilSquareIcon className="h-6 w-6 mr-2" />
                                                Edit
                                            </TButton>
                                            <TButton
                                                color="delete"
                                                onClick={() => {
                                                    setAppointmentId(appointment.id)
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
                ) : (loading ? 'Loading...' : 'There is no appointment in the database.')
                }

            </PageComponent>
        </div>
    )
}

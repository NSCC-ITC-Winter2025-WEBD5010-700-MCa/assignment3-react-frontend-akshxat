import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

function TransitsTable({ transits }) {

    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const deleteTransitMutation = useMutation({
        mutationFn: async (transitId) => {
            const response = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}/${transitId}`, {
                method: 'DELETE'
            })
            return response.json()
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["transits"]);
        },
        onError: (error) => {
            alert('Unable to delete')
        }
    })

    const handleDelete = (transitId) => {
        if (window.confirm(`Are you sure you wish to delete record ${transitId}`)) {
            deleteTransitMutation.mutate(transitId)
        }
    }

    return (
        <>
            <p> <Link to="/admin/transit/create"> Add New Transit </Link>  </p>
            <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Genre</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transits.map((transit) => (
                        <tr key={transit.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{transit.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{transit.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{transit.author}</td>
                            <td className="border border-gray-300 px-4 py-2">{transit.published_year}</td>
                            <td className="border border-gray-300 px-4 py-2">{transit.genre}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                                <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
                                <button onClick={() => navigate(`${transit.id}/edit`) } className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
                                <button onClick={() => { handleDelete(transit.id) }} className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TransitsTable;

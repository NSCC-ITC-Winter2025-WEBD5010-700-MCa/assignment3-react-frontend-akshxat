import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

function TransitsTable({ transits }) {

    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const deleteTransitMutation = useMutation({
        mutationFn: async (transitId) => {
            const response = await fetch(`${import.meta.env.VITE_TRANSIT_API_URL}/${transitId}`, {
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
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Fleet Size</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Stations</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">System Length (Km)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Annual Ridership (Millions)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Speed (Kmph)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Manufacturers</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transits.map((transit) => (
                        <tr key={transit._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{transit.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{transit.country}</td>
                            <td className="border border-gray-300 px-4 py-2">{transit.number_of_trains} Vehicles</td>
                            <td className="border border-gray-300 px-4 py-2">{transit.number_of_stations}</td>
                            <td className="border border-gray-300 px-4 py-2">{transit.system_length_km} Km</td>
                            <td className="border border-gray-300 px-4 py-2">{transit.annual_ridership/1000000} M</td>
                            <td className="border border-gray-300 px-4 py-2"><p>Avg: {transit.speed_kmph?.average} Kmph</p><p>Max: {transit.speed_kmph?.maximum} Kmph</p></td>
                            <td className="border border-gray-300 px-4 py-2">{transit.rolling_stock_manufacturer.join(', ')}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                                <button onClick={() => navigate(`${transit._id}/edit`) } className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
                                <button onClick={() => { handleDelete(transit._id) }} className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TransitsTable;

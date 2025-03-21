import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import TransitForm from './TransitForm.jsx'

function TransitEdit () {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['transits', id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}/${id}`)
            return response.json()
        }
    })

    const editTransitMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['transitsData'])
            navigate('/admin/transit')
        }
    })

    const processData = (data) => {
        editTransitMutation.mutate(data)
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Transit - Id: {data?.id}</h2>
            <TransitForm onDataCollected={processData} initialData={data} />
        </div>
    )
}

export default TransitEdit
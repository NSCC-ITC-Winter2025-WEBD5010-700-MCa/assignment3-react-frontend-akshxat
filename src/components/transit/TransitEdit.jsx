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
            const response = await fetch(`${import.meta.env.VITE_TRANSIT_API_URL}/${id}`)
            let text = await response.text()
 
            // Regex to fix IDs
            text = text.replace(/new ObjectId\('(.+?)'\)/g, '"$1"')
            // Regex to quote keys
            text = text.replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1 "$2":')

            // Regex to replace single quotes with double quotes
            text = text.replace(/'/g, '"')

            try {
                return JSON.parse(text)
            } catch (e) {
                throw new Error("Invalid JSON response: " + e.message)
            }
        }
    })

    const editTransitMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_TRANSIT_API_URL}/${id}`, {
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
        data.rolling_stock_manufacturer = data.rolling_stock_manufacturer
          .split(',')
          .map(item => item.replace(/\s/g, ''))
        editTransitMutation.mutate(data)
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Transit - Id: {data?._id}</h2>
            <TransitForm onDataCollected={processData} initialData={data} />
        </div>
    )
}

export default TransitEdit
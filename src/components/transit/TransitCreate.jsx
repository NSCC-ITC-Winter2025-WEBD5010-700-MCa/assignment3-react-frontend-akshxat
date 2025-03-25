import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import TransitForm from './TransitForm.jsx'

export default function TransitCreate() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const createTransitMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_TRANSIT_API_URL}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            })
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['transitsData']),
                navigate('/admin/transit')
        }
    })

    const processData = (data) => {
        createTransitMutation.mutate(data)
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Transit</h2>
            <TransitForm onDataCollected={processData}/>
        </div>
    )
}
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function TransitForm({ onDataCollected, initialData }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    useEffect(() => {
        if(initialData) {
            setValue('name', initialData.name)
            setValue('country', initialData.country)
            setValue('fleet_size', initialData.number_of_trains)
            setValue('stations', initialData.number_of_stations)
            setValue('system_length', initialData.system_length_km)
            setValue('ridership', initialData.annual_ridership)
            setValue('speed_avg', initialData.speed_kmph.average)
            setValue('speed_max', initialData.speed_kmph.maximum)
            setValue('manufacturers', initialData.rolling_stock_manufacturer)
        }
    }, [initialData])

    return (
        <form onSubmit={handleSubmit(onDataCollected)} className="space-y-4">
                <div>
                    <input
                        {...register('name', { required: 'Name is required!' })}
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <input
                        {...register('country', { required: 'Country is required!' })}
                        type="text"
                        placeholder="Country"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                </div>
                <div>
                    <input
                        {...register('fleet_size', { required: 'Fleet Size is required!', min: { value: 1700, message: 'Year must be greater than 1700' }})}
                        type="number"
                        placeholder="Fleet Size"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.fleet_size && <p className="text-red-500 text-sm mt-1">{errors.fleet_size.message}</p>}
                </div>
                <div>
                    <input
                        {...register('stations', { required: 'Stations is required!' })}
                        type="text"
                        placeholder="Stations"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.stations && <p className="text-red-500 text-sm mt-1">{errors.stations.message}</p>}
                </div>
                <div>
                    <input
                        {...register('system_length', { required: 'System Length is required!' })}
                        type="number"
                        placeholder="System Length"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.system_length && <p className="text-red-500 text-sm mt-1">{errors.system_length.message}</p>}
                </div>
                <div>
                    <input
                        {...register('ridership', { required: 'Ridership is required!' })}
                        type="number"
                        placeholder="Ridership"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.ridership && <p className="text-red-500 text-sm mt-1">{errors.ridership.message}</p>}
                </div>
                <div>
                    <input
                        {...register('speed_avg', { required: 'Speed Average is required!' })}
                        type="number"
                        placeholder="Speed Average"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.speed_avg && <p className="text-red-500 text-sm mt-1">{errors.speed_avg.message}</p>}
                </div>
                <div>
                    <input
                        {...register('speed_max', { required: 'Speed Maximum is required!' })}
                        type="number"
                        placeholder="Speed Maximum"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.speed_max && <p className="text-red-500 text-sm mt-1">{errors.speed_max.message}</p>}
                </div>
                <div>
                    <input
                        {...register('manufacturers', { required: 'Manufacturers is required!' })}
                        type="text"
                        placeholder="Manufacturers"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.manufacturers && <p className="text-red-500 text-sm mt-1">{errors.manufacturers.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                >
                    Submit Transit
                </button>
            </form>
    )
}
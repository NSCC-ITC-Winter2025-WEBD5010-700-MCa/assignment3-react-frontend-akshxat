import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function TransitForm({ onDataCollected, initialData }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    useEffect(() => {
        if(initialData) {
            setValue('name', initialData.name)
            setValue('country', initialData.country)
            setValue('number_of_trains', initialData.number_of_trains)
            setValue('number_of_stations', initialData.number_of_stations)
            setValue('system_length_km', initialData.system_length_km)
            setValue('annual_ridership', initialData.annual_ridership)
            setValue('speed_kmph.average', initialData.speed_kmph?.average)
            setValue('speed_kmph.maximum', initialData.speed_kmph?.maximum)
            setValue('rolling_stock_manufacturer', initialData.rolling_stock_manufacturer.join(', '))
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
                        {...register('number_of_trains')}
                        type="number"
                        placeholder="Fleet Size"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.fleet_size && <p className="text-red-500 text-sm mt-1">{errors.fleet_size.message}</p>}
                </div>
                <div>
                    <input
                        {...register('number_of_stations')}
                        type="number"
                        placeholder="Stations"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.stations && <p className="text-red-500 text-sm mt-1">{errors.stations.message}</p>}
                </div>
                <div>
                    <input
                        {...register('system_length_km')}
                        type="number"
                        placeholder="System Length"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.system_length && <p className="text-red-500 text-sm mt-1">{errors.system_length.message}</p>}
                </div>
                <div>
                    <input
                        {...register('annual_ridership')}
                        type="number"
                        placeholder="Ridership"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.ridership && <p className="text-red-500 text-sm mt-1">{errors.ridership.message}</p>}
                </div>
                <div>
                    <input
                        {...register('speed_kmph.average')}
                        type="number"
                        placeholder="Average Speed"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.speed_avg && <p className="text-red-500 text-sm mt-1">{errors.speed_avg.message}</p>}
                </div>
                <div>
                    <input
                        {...register('speed_kmph.maximum')}
                        type="number"
                        placeholder="Maximum Speed"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.speed_max && <p className="text-red-500 text-sm mt-1">{errors.speed_max.message}</p>}
                </div>
                <div>
                    <input
                        {...register('rolling_stock_manufacturer')}
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
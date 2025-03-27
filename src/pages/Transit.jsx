import { useQuery } from "@tanstack/react-query";

import TransitTable from "../components/transit/TransitTable";
import { Outlet, useLocation } from "react-router-dom";

const Transits = () => {

    const location = useLocation()

    // console.log(location.pathname)

    const { isPending, error, data } = useQuery({
        queryKey: ['transitsData'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_TRANSIT_API_URL}`)
            return response.json()
        },
        staleTime: Infinity
    })

    if (isPending) return <div> Loading...</div>
    if (error) return <div> {`An error had occured: + ${error.message}`}</div>

    return (
        <div>
            <h1 className="text-2xl  font-bold"> Transits </h1>

            {
                location.pathname === '/admin/transit' ?
                    isPending ? <div> Loading...</div> : <TransitTable transits={data} />
                    :
                    <Outlet />
            }

        </div>
    );
}

export default Transits;
import { useState, useEffect } from "react";

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";



const CityEventChart = ({allLocations, events}) => {
    
    const [data, setData] = useState([]);
    

    useEffect(() => {
        setData(()=>{
            const data = allLocations.map((location) => {
                const count = events.filter((event) => event.location === location).length;
                const city = location.split(/, |-/)[0];
                return {city, count};
            })
            return data;
        });
    }, [allLocations, events]);
    


    return(
        <ResponsiveContainer height='99%'>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: -20,
                }}
            >
                <CartesianGrid />
                <XAxis 
                    type="category" 
                    dataKey='city' 
                    name='City' 
                    angle={45}
                    interval={0}
                    tick={{dx:20, dy:20, fontSize:12}}
                />
                <YAxis  
                    type="number" 
                    dataKey='count' 
                    name='number of events'
                    allowDecimals={false}
                />
                <Tooltip
                    cursor={{ strokeDasharray: '3 3'}}
                />
                <Scatter
                    name='A school' data={data} fill='#8884d8'
                />
            </ScatterChart>
        </ResponsiveContainer>
    )
}

export default CityEventChart;
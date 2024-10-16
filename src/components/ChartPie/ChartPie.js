import { useState, useEffect, useMemo } from "react";

import { PieChart, ResponsiveContainer, Pie, Cell, Legend } from "recharts";



const ChartPie = ({events}) => {
    
    const [data, setData] = useState([]);
    const genres = useMemo(() => ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'], []);
    
    const COLORS = [{start:'#DD0000', end: '#990000'},
                    {start:'#00DD00', end: '#009900'},
                    {start:'#0000DD', end: '#000099'},
                    {start:'#DDDD00', end: '#999900'},
                    {start:'#DD00DD', end: '#990099'}]

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill={COLORS[index].end}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    useEffect(() => {
        const filterEventsByGenre = (genre) => {
            return events.filter((event) => event.summary.includes(genre));
        }
        
        const data = genres.map(genre => {
            const filteredEvents = filterEventsByGenre(genre);
            return {
                name: genre,
                value: filteredEvents.length,
            }
        }) 
        setData(data);
    }, [events, genres]);
    


    return(
        <>
            <ResponsiveContainer  height='99%' className='responsive-pie-chart'>
                <PieChart 
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 20
                    }}
                >
                    <defs>{
                        data.map((entry, index) => (
                            <linearGradient id={`myGradient${index}`} key={index}>
                                <stop
                                    offset='0%'
                                    stopColor={COLORS[index % COLORS.length].start}
                                />
                                <stop
                                    offset='100%'
                                    stopColor={COLORS[index % COLORS.length].end}
                                />
                            </linearGradient>
                        ))
                    }</defs>

                    <Pie
                    data={data}
                    dataKey='value'
                    fill="#8884d8"
                    labelLine={false}
                    label = {renderCustomizedLabel}
                    outerRadius={'95%'}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
                        ))}
                    </Pie>

                    <Legend verticalAlign="middle" align="right" layout="vertical"/>

                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default ChartPie;
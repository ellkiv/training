import React, {useEffect} from 'react'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const _ = require('lodash');

export default function Recharts( {trainings, fetchData} ) {

    useEffect(() => {
        fetchData();
        console.log('charts')
    }, []);

    const grouped = _(trainings)
        .groupBy('activity')
        .map((activity, id) => ({
            activity: id,
            duration: _.sumBy(activity, 'duration')
        }))
        .value()
    console.log(grouped);

    return (
        <div className="row">
            <div className="col-md-12">
                <h2>Charts with recharts library</h2>
            </div>
            <div className="section col-md-6">
                <h3 className="section-title">Bar Chart</h3>
                <div className="section-content">
                    <ResponsiveContainer width="90%" height={400}>
                        <BarChart data={grouped} margin={{ top: 30, right: 0, bottom: 15, left: 0 }}>
                        <XAxis dataKey="activity" />
                        <YAxis />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Tooltip />
                        <Legend/>
                        <Bar dataKey="duration" fill="#FB8833" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
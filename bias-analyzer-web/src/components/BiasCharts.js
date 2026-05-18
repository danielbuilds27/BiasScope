import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#1565c0', '#c62828'];

function BiasCharts({ masculineScore, feminineScore }) {
    const pieData = [
        { name: 'Masculin', value: masculineScore || 0 },
        { name: 'Feminin', value: feminineScore || 0 },
    ];

    const barData = [
        { name: 'Masculin', scor: masculineScore || 0 },
        { name: 'Feminin', scor: feminineScore || 0 },
    ];

    return (
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1 }}>
                <h3>Distribuție bias</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {pieData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div style={{ flex: 1 }}>
                <h3>Scoruri</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="scor" fill="#1565c0" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BiasCharts;

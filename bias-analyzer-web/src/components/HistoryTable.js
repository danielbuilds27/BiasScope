import { useState } from 'react';

const PAGE_SIZE = 10;

function HistoryTable({ history }) {
    const [page, setPage] = useState(1);

    if (!history || history.length === 0) return null;

    const totalPages = Math.ceil(history.length / PAGE_SIZE);
    const paginated = history.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div>
            <h3>Istoric analize</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Text</th>
                        <th style={{ padding: '0.5rem' }}>Scor Masculin</th>
                        <th style={{ padding: '0.5rem' }}>Scor Feminin</th>
                        <th style={{ padding: '0.5rem' }}>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '0.5rem' }}>{item.content?.substring(0, 50)}...</td>
                            <td style={{ padding: '0.5rem', textAlign: 'center' }}>{item.masculineScore?.toFixed(1)}%</td>
                            <td style={{ padding: '0.5rem', textAlign: 'center' }}>{item.feminineScore?.toFixed(1)}%</td>
                            <td style={{ padding: '0.5rem', textAlign: 'center' }}>{new Date(item.analyzedAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                    ← Anterior
                </button>
                <span style={{ padding: '0.4rem 0.75rem' }}>
                    {page} / {totalPages}
                </span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                    Următor →
                </button>
            </div>
        </div>
    );
}

export default HistoryTable;

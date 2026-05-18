import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function CorpusResults({ data }) {
    if (!data) return null;

    const exportSummary = () => {
        const rows = [
            ['URL', 'Masculine Score (%)', 'Feminine Score (%)', 'Words Found', 'Analyzed At'],
            ...data.results.map(r => [
                r.url,
                r.masculineScore.toFixed(2),
                r.feminineScore.toFixed(2),
                r.words?.length ?? 0,
                new Date(r.analyzedAt).toISOString()
            ])
        ];
        const csv = rows.map(r => r.join(',')).join('\n');
        downloadCSV(csv, 'corpus_summary.csv');
    };

    const exportWords = () => {
        const rows = [
            ['URL', 'Word', 'Bias Type'],
            ...data.results.flatMap(r =>
                (r.words ?? []).map(w => [
                    r.url,
                    w.word,
                    w.biasType === 0 ? 'Masculine' : 'Feminine'
                ])
            )
        ];
        const csv = rows.map(r => r.join(',')).join('\n');
        downloadCSV(csv, 'corpus_words.csv');
    };

    const chartData = data.results.map((r, i) => ({
        name: `Art. ${i + 1}`,
        Masculin: parseFloat(r.masculineScore.toFixed(1)),
        Feminin: parseFloat(r.feminineScore.toFixed(1)),
    }));

    return (
        <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Rezultate Corpus</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={exportSummary} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                        Export Summary CSV
                    </button>
                    <button onClick={exportWords} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                        Export Words CSV
                    </button>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                    <p>Articole analizate</p>
                    <strong style={{ fontSize: '1.5rem' }}>{data.totalAnalyzed}</strong>
                </div>
                <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                    <p>Scor masculin mediu</p>
                    <strong style={{ fontSize: '1.5rem' }}>{data.averageMasculineScore?.toFixed(1)}%</strong>
                </div>
                <div style={{ background: '#fce4ec', padding: '1rem', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                    <p>Scor feminin mediu</p>
                    <strong style={{ fontSize: '1.5rem' }}>{data.averageFeminineScore?.toFixed(1)}%</strong>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Masculin" fill="#1565c0" />
                    <Bar dataKey="Feminin" fill="#c62828" />
                </BarChart>
            </ResponsiveContainer>

            <div style={{ marginTop: '1.5rem' }}>
                <h4>Detalii per articol</h4>
                {data.results.map((r, i) => (
                    <div key={i} style={{ borderBottom: '1px solid #eee', padding: '0.75rem 0' }}>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>{r.url}</p>
                        <p><strong>Masculin:</strong> {r.masculineScore.toFixed(1)}% | <strong>Feminin:</strong> {r.feminineScore.toFixed(1)}%</p>
                        {r.words && r.words.length > 0 ? (
                            <p>
                                <strong>Cuvinte găsite: </strong>
                                {r.words.map((w, j) => (
                                    <span key={j} style={{
                                        marginRight: '6px',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        background: w.biasType === 0 ? '#e3f2fd' : '#fce4ec',
                                        color: w.biasType === 0 ? '#1565c0' : '#c62828',
                                        fontWeight: 'bold'
                                    }}>
                                        {w.word}
                                    </span>
                                ))}
                            </p>
                        ) : (
                            <p style={{ color: '#999', fontSize: '0.85rem' }}>Niciun cuvânt biased găsit</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CorpusResults;

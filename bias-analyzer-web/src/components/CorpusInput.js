import { useState } from 'react';

function CorpusInput({ onAnalyze, loading }) {
    const [urls, setUrls] = useState('');

    const handleSubmit = () => {
        const urlList = urls.split('\n').map(u => u.trim()).filter(u => u.length > 0);
        if (urlList.length > 0) onAnalyze(urlList);
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h3>Analiză Corpus</h3>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>Introdu un URL per linie</p>
            <textarea
                rows={6}
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
                placeholder={"https://example.com/job1\nhttps://example.com/job2\nhttps://example.com/job3"}
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ marginTop: '0.5rem', padding: '0.5rem 2rem', fontSize: '1rem' }}
            >
                {loading ? 'Se analizează...' : 'Analizează Corpus'}
            </button>
        </div>
    );
}

export default CorpusInput;

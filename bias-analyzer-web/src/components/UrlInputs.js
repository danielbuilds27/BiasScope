import { useState } from 'react';

function UrlInput({ onAnalyze, loading }) {
    const [url, setUrl] = useState('');

    const handleSubmit = () => {
        if (url.trim()) onAnalyze(url);
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <input
                type="text"
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
                placeholder="Sau introdu un URL (ex: https://example.com/job-ad)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ marginTop: '0.5rem', padding: '0.5rem 2rem', fontSize: '1rem' }}
            >
                {loading ? 'Se analizează...' : 'Analizează URL'}
            </button>
        </div>
    );
}

export default UrlInput;

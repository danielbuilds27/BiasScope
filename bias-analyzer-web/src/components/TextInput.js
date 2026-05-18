import { useState } from 'react';

function TextInput({ onAnalyze, loading }) {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (text.trim()) onAnalyze(text);
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <textarea
                rows={8}
                style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                placeholder="Introdu textul pentru analiză..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ marginTop: '0.5rem', padding: '0.5rem 2rem', fontSize: '1rem' }}
            >
                {loading ? 'Se analizează...' : 'Analizează'}
            </button>
        </div>
    );
}

export default TextInput;

function TextHighlight({ text, occurences }) {
    if (!text || !occurences || occurences.length === 0)
        return <p>{text}</p>;

    const words = text.split(' ');

    return (
        <div style={{ lineHeight: '2', fontSize: '1rem', marginBottom: '2rem' }}>
        <h3>Analized text</h3>
        <p>
            {words.map((word, index) => {
                const clean = word.toLowerCase().replace(/[^a-z-]/g, '');
                const match = occurences.find(o => o.word === clean);

                if (match) {
                    const color = match.biasType === 0 ? '#1565c0' : '#c62828';
                    const bg = match.biasType === 0 ? '#e3f2fd' : '#fce4ec';
                    return (
                        <span key={index} style={{
                            backgroundColor: bg,
                            color: color,
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            padding: '2px 4px',
                            marginRight: '4px'
                        }}>
                            {word}
                        </span>
                    );
                }
                return <span key={index} style={{ marginRight: '4px' }}>{word}</span>;
            })}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>
                <span style={{ color: '#1565c0', fontWeight: 'bold'}}>Masculine</span>
                {'  '}
                <span style={{ color: '#c62828', fontWeight: 'bold'}}>Feminine</span> 
            </p>    
        </div>
    );
}

export default TextHighlight;
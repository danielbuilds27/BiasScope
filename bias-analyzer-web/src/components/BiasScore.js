function BiasScore({ masculineScore, feminineScore }) {
    return (
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#e3f2fd', borderRadius: '8px', flex: 1 }}>
                <h3>Scor Masculin</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1565c0' }}>
                    {masculineScore?.toFixed(1)}%
                </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#fce4ec', borderRadius: '8px', flex: 1 }}>
                <h3>Scor Feminin</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#c62828' }}>
                    {feminineScore?.toFixed(1)}%
                </p>
            </div>
        </div>
    );
}

export default BiasScore;

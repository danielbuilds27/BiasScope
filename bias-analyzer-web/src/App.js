import { useState, useEffect } from 'react';
import { analyzeText, getHistory, analyzeUrl, analyzeCorpus } from './api/analysisApi';
import TextInput from './components/TextInput';
import UrlInput from './components/UrlInputs';
import CorpusInput from './components/CorpusInput';
import CorpusResults from './components/CorpusResults';
import BiasScore from './components/BiasScore';
import BiasCharts from './components/BiasCharts';
import HistoryTable from './components/HistoryTable';
import TextHighlight from './components/TextHighlight';


function App() {
    const [result, setResult] = useState(null);
    const [corpusResult, setCorpusResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getHistory().then(res => setHistory(res.data)).catch(() => {});
    }, []);

    const handleAnalyzeUrl = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const res = await analyzeUrl(url);
            setResult(res.data);
            setHistory(prev => [res.data, ...prev]);
        } catch (err) {
            setError('Eroare la analiză URL. Verifică că link-ul e valid și API-ul rulează.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyzeCorpus = async (urls) => {
        setLoading(true);
        setError(null);
        try {
            const res = await analyzeCorpus(urls);
            setCorpusResult(res.data);
        } catch (err) {
            setError('Eroare la analiză corpus.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = async (text) => {
        setLoading(true);
        setError(null);
        try {
            const res = await analyzeText(text);
            setResult(res.data);
            setHistory(prev => [res.data, ...prev]);
        } catch (err) {
            setError('Eroare la analiză. Verifică că API-ul rulează.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
            <h1>BiasAnalyzer</h1>
            <p>Analizează textul pentru bias de gen bazat pe cercetarea Gaucher et al. (2011)</p>

            <TextInput onAnalyze={handleAnalyze} loading={loading} />
            <UrlInput onAnalyze={handleAnalyzeUrl} loading={loading} />
            <CorpusInput onAnalyze={handleAnalyzeCorpus} loading={loading} />
            <CorpusResults data={corpusResult} />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {result && (
                <>
                    <BiasScore masculineScore={result.masculineScore} feminineScore={result.feminineScore} />
                    <BiasCharts masculineScore={result.masculineScore} feminineScore={result.feminineScore} />
                    <TextHighlight text={result.content} occurences ={result.wordOccurences} />
                    {result.claudeSummary && (
                        <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
                            <h3>Analiză Claude</h3>
                            <p>{result.claudeSummary}</p>
                        </div>
                    )}
                </>
            )}

            <HistoryTable history={history} />
        </div>
    );
}

export default App;

import { useState } from 'react';
import LandingHero from './components/LandingHero';
import StyleIntakeForm from './components/StyleIntakeForm';
import OutfitResults from './components/OutfitResults';
import LoadingSpinner from './components/LoadingSpinner';
import { getOutfitSuggestions } from './utils/api';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'form' | 'results'
  const [intakeData, setIntakeData] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetStyled = () => {
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (data) => {
    setIntakeData(data);
    setIsLoading(true);
    setError(null);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const suggestions = await getOutfitSuggestions(data);
      setResults(suggestions);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setView('landing');
    setResults(null);
    setIntakeData(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {view === 'landing' && (
        <LandingHero onGetStyled={handleGetStyled} />
      )}
      {view === 'form' && (
        <StyleIntakeForm onSubmit={handleFormSubmit} onBack={() => setView('landing')} />
      )}
      {view === 'results' && (
        isLoading
          ? <LoadingSpinner />
          : <OutfitResults
              results={results}
              intakeData={intakeData}
              error={error}
              onStartOver={handleStartOver}
            />
      )}
    </>
  );
}

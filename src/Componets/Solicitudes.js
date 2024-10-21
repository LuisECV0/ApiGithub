import React, { useState, useEffect } from 'react';

const App = () => {
  const [language, setLanguage] = useState('javascript'); 
  const [repo, setRepo] = useState(null);  
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);  

  const fetchRandomRepo = async (selectedLanguage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=language:${selectedLanguage}&sort=stars&order=desc`);
      const data = await response.json();

      if (data.items.length > 0) {
        
        const randomIndex = Math.floor(Math.random() * data.items.length);
        setRepo(data.items[randomIndex]);
      } else {
        setError('No se encontraron repositorios para este lenguaje');
      }
    } catch (err) {
      setError('Error al obtener los datos');
    }
    setLoading(false);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    fetchRandomRepo(language);
  }, [language]);

  return (
    <div className="App">
      <h1>Buscador de Repositorios Aleatorios de GitHub</h1>

      <select value={language} onChange={handleLanguageChange}>
        <option value="">All</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="ruby">Ruby</option>
        <option value="java">Java</option>
        <option value="go">Go</option>
      </select>

      <button onClick={() => fetchRandomRepo(language)}>Obtener otro repositorio</button>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : repo ? (
    <div>
        <h2>{repo.name}</h2>
        <p>{repo.description}</p>
        <img src={repo.owner.avatar_url} alt={repo.owner.login} style={{ width: '50px', borderRadius: '50%' }} />
        <p>Propietario: {repo.owner.login}</p>
        <p>⭐ {repo.stargazers_count}</p>
        <p>🍴 {repo.forks_count}</p>
        <p>🛠 {repo.open_issues_count} issues abiertos</p>
        
    
        <p>Última actualización: {new Date(repo.updated_at).toLocaleDateString()}</p>
        

        <p>Lenguaje: {repo.language}</p>

        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">Ver repositorio en GitHub</a>
        </div>

            ) : (
                <p>No se encontró ningún repositorio.</p>
            )}
    </div>
  );
};

export default App;

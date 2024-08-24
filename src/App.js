import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload, faSync, faAdjust } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faWhatsapp, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import html2canvas from 'html2canvas';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './App.css';

const quotes = [
  { text: "La vie est ce qui arrive pendant que vous êtes occupé à faire d'autres projets.", author: "John Lennon", category: "Life" },
  { text: "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme.", author: "Winston Churchill", category: "Success" },
  { text: "La seule façon de faire du bon travail est d'aimer ce que vous faites.", author: "Steve Jobs", category: "Work" },
  { text: "Soyez le changement que vous voulez voir dans le monde.", author: "Mahatma Gandhi", category: "Inspiration" },
  { text: "La créativité, c'est l'intelligence qui s'amuse.", author: "Albert Einstein", category: "Creativity" },
  { text: "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il provient de vos propres actions.", author: "Dalai Lama", category: "Happiness" },
  { text: "La plus grande gloire n'est pas de ne jamais tomber, mais de se relever à chaque chute.", author: "Confucius", category: "Perseverance" },
  { text: "La seule limite à notre épanouissement de demain sera nos doutes d'aujourd'hui.", author: "Franklin D. Roosevelt", category: "Motivation" },
  { text: "Celui qui déplace une montagne commence par déplacer de petites pierres.", author: "Confucius", category: "Perseverance" },
  { text: "La vraie générosité envers l'avenir consiste à tout donner au présent.", author: "Albert Camus", category: "Life" },
];

const fonts = [
  'Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Courier',
  'Helvetica', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS',
  'Trebuchet MS', 'Arial Black', 'Impact'
];

const themes = {
  light: { background: '#f0f0f0', text: '#333', boxBg: '#ffffff' },
  dark: { background: '#333', text: '#f0f0f0', boxBg: '#444' },
  nature: { background: '#4CAF50', text: '#FFFFFF', boxBg: '#45a049' },
  ocean: { background: '#0077be', text: '#FFFFFF', boxBg: '#006dad' },
  sunset: { background: '#FF7F50', text: '#FFFFFF', boxBg: '#ff6a3c' },
  lavender: { background: '#E6E6FA', text: '#4B0082', boxBg: '#d8d8f6' },
  mint: { background: '#98FF98', text: '#006400', boxBg: '#7fff7f' },
  cherry: { background: '#FFB7C5', text: '#8B0000', boxBg: '#ff9eb1' },

  // Ajoutez d'autres thèmes ici...
};

// Sous-composant pour la boîte à citations
function QuoteBox({ quote, font, fontSize, color, theme, quoteRef }) {
  return (
    <div className="quote-box" ref={quoteRef} style={{ backgroundColor: themes[theme].boxBg }}>
      <p className="quote-text" style={{ fontFamily: font, fontSize: `${fontSize}px`, color }}>
        "{quote.text}"
      </p>
      <p className="quote-author">- {quote.author}</p>
      <p className="quote-category">Catégorie: {quote.category}</p>
    </div>
  );
}

// Sous-composant pour les contrôles
function Controls({ font, setFont, fontSize, setFontSize, color, setColor, theme, setTheme }) {
  return (
    <div className="controls">
      <select value={font} onChange={(e) => setFont(e.target.value)}>
        {fonts.map(f => <option key={f} value={f}>{f}</option>)}
      </select>
      <input 
        type="range" 
        min="16" 
        max="48" 
        value={fontSize} 
        onChange={(e) => setFontSize(e.target.value)}
      />
      <input 
        type="color" 
        value={color} 
        onChange={(e) => setColor(e.target.value)}
      />
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {Object.keys(themes).map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>
  );
}

function App() {
  const [quote, setQuote] = useState(quotes[0]);
  const [font, setFont] = useState(fonts[0]);
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState('#000000');
  const [theme, setTheme] = useState('light');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const quoteRef = useRef(null);

  useEffect(() => {
    generateQuote();
  }, []);

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    showSnackbar('Citation copiée !', 'success');
  };

  const shareQuote = (platform) => {
    const shareText = encodeURIComponent(`"${quote.text}" - ${quote.author}`);
    let url;
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${shareText}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${shareText}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${shareText}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${shareText}`;
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };

  const downloadQuote = async () => {
    try {
      if (quoteRef.current) {
        const scale = 2;
        const canvas = await html2canvas(quoteRef.current, {
          scale: scale,
          backgroundColor: themes[theme].background,
        });
        const img = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = img;
        link.download = 'citation.png';
        link.click();
        showSnackbar('Citation téléchargée avec succès !', 'success');
      }
    } catch (error) {
      showSnackbar('Erreur lors du téléchargement de la citation.', 'error');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`} style={{ backgroundColor: themes[theme].background, color: themes[theme].text }}>
      <div className="quote-container">
        <h1>QuoteSpark</h1>
        <QuoteBox quote={quote} font={font} fontSize={fontSize} color={color} theme={theme} quoteRef={quoteRef} />
        <Controls font={font} setFont={setFont} fontSize={fontSize} setFontSize={setFontSize} color={color} setColor={setColor} theme={theme} setTheme={setTheme} />
        <button className="new-quote-btn" onClick={generateQuote} aria-label="Générer une nouvelle citation">
          <FontAwesomeIcon icon={faSync} /> Nouvelle Citation
        </button>
        <div className="actions">
          <button onClick={copyQuote} title="Copier la citation" aria-label="Copier la citation">
            <FontAwesomeIcon icon={faCopy} />
          </button>
          <button onClick={() => shareQuote('twitter')} title="Partager sur Twitter" aria-label="Partager sur Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </button>
          <button onClick={() => shareQuote('facebook')} title="Partager sur Facebook" aria-label="Partager sur Facebook">
            <FontAwesomeIcon icon={faFacebookF} />
          </button>
          <button onClick={() => shareQuote('whatsapp')} title="Partager sur WhatsApp" aria-label="Partager sur WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} />
          </button>
          <button onClick={() => shareQuote('linkedin')} title="Partager sur LinkedIn" aria-label="Partager sur LinkedIn">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </button>
          <button onClick={downloadQuote} title="Télécharger l'image" aria-label="Télécharger l'image">
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
        <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Basculer le mode sombre">
          <FontAwesomeIcon icon={faAdjust} /> {isDarkMode ? 'Mode Clair' : 'Mode Sombre'}
        </button>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

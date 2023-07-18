import React, { useEffect, useState } from 'react';
import './styles.css';

const ColorfulText: React.FC = () => {
  const text = 'The online platform that connects passionate readers, facilitating book exchanges and fostering a community of literary sharing.';
  const [coloredText, setColoredText] = useState<string[]>([]);

  useEffect(() => {
    const coloredLetters: string[] = [];

    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        coloredLetters.push(text[i]);
        setColoredText([...coloredLetters]);
      }, i * 100); // O atraso (delay) de cada letra é de 100ms
    }
  }, []);

  return (
    <p className="colorful-text">
      {coloredText.map((letter, index) => (
        <span key={index} className="animated-letter">
          {letter}
        </span>
      ))}
    </p>
  );
};

export default ColorfulText;

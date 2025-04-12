import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const BinaryConverter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [convertCount, setConvertCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const textToBinary = (text) => {
    return text.split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const binaryToText = (binary) => {
    return binary.split(' ')
      .map(bin => String.fromCharCode(parseInt(bin, 2)))
      .join('');
  };

  const handleConvert = () => {
    setLoading(true);
    setTimeout(() => {
      if (mode === 'encode') {
        setOutput(textToBinary(input));
      } else {
        setOutput(binaryToText(input));
      }
      setConvertCount(prev => prev + 1);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-extrabold mb-2 text-center text-purple-800">Binary Converter</h1>

      <p className="text-center mb-2 text-sm text-gray-700">{getCurrentDateTime()}</p>
      <p className="text-center mb-4 text-sm text-green-700 font-medium">Total Conversions: {convertCount}</p>

      <textarea
        className="w-full p-3 border-2 border-purple-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows="5"
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter binary to decode...'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-5 py-2 rounded-full font-semibold transition duration-300 ${mode === 'encode' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-purple-600'}`}
          onClick={() => setMode('encode')}
        >
          Encode
        </button>
        <button
          className={`px-5 py-2 rounded-full font-semibold transition duration-300 ${mode === 'decode' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-purple-600'}`}
          onClick={() => setMode('decode')}
        >
          Decode
        </button>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-3 font-bold text-lg rounded-xl mb-4 flex items-center justify-center gap-2"
        onClick={handleConvert}
        disabled={loading}
      >
        {loading ? <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Loader2 className="animate-spin" /></motion.span> : 'Convert'}
      </motion.button>

      <textarea
        className="w-full p-3 border-2 border-green-300 rounded-xl bg-white focus:outline-none"
        rows="5"
        placeholder="Output will appear here..."
        value={output}
        readOnly
      />
    </div>
  );
};

export default BinaryConverter;
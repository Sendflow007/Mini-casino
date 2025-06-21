// Shooter's Mini Casino MVP
'use client';

import React, { useState } from 'react';
import Confetti from 'react-confetti';

function CoinFlipGame({ balance, setBalance }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wager, setWager] = useState(10);
  const [choice, setChoice] = useState('Heads');
  const [showConfetti, setShowConfetti] = useState(false);

  const play = () => {
    if (loading || wager > balance || wager <= 0) return;
    setLoading(true);
    setResult('flipping');
    const flip = Math.random() < 0.495 ? 'Heads' : 'Tails';
    const win = flip === choice;
    setTimeout(() => {
      setResult(flip);
      setBalance(prev => win ? prev + wager : prev - wager);
      setLoading(false);
      if (win) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    }, 1000);
  };

  return (
    <div className="p-4 border rounded-xl w-full max-w-md bg-white shadow flex flex-col justify-center items-center flex-grow text-black">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={100} />}
      <div className="w-full text-center mb-4">
        <h2 className="text-2xl font-bold">🪙 Coin Flip</h2>
        <p className="text-sm text-gray-600">Pick heads or tails. 50% odds. Payout: 2x.</p>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-sm font-semibold mb-1">Wager (SOL):</label>
        <input
          type="number"
          value={wager}
          min="1"
          max={balance}
          onChange={(e) => setWager(Number(e.target.value))}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block text-sm font-semibold mb-1">Choose:</label>
        <div className="flex space-x-2">
          <button
            className={`flex-1 py-3 text-lg rounded transition duration-300 transform hover:scale-105 ${choice === 'Heads' ? 'bg-yellow-400 text-black' : 'bg-gray-200'}`}
            onClick={() => setChoice('Heads')}
          >
            Heads
            <div className="text-xs text-gray-600">2x</div>
          </button>
          <button
            className={`flex-1 py-3 text-lg rounded transition duration-300 transform hover:scale-105 ${choice === 'Tails' ? 'bg-yellow-400 text-black' : 'bg-gray-200'}`}
            onClick={() => setChoice('Tails')}
          >
            Tails
            <div className="text-xs text-gray-600">2x</div>
          </button>
        </div>
      </div>
      <button
        onClick={play}
        className="w-full text-xl bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
        disabled={loading || wager > balance || wager <= 0}
      >
        {loading ? 'Flipping...' : 'Flip Coin'}
      </button>
      {result && result === 'flipping' ? (
        <div className="mt-4 text-2xl animate-spin">🪙</div>
      ) : (
        <p className="mt-4 text-lg font-semibold">Result: {result}</p>
      )}
    </div>
  );
}

function LuckySevenGame({ balance, setBalance }) {
  const [wager, setWager] = useState(10);
  const [guess, setGuess] = useState('Above');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const play = () => {
    if (loading || wager > balance || wager <= 0) return;
    setLoading(true);
    const roll = Math.floor(Math.random() * 13) + 1;
    let payout = 0;

    if (guess === 'Above' && roll > 7) payout = wager * 2;
    else if (guess === 'Below' && roll < 7) payout = wager * 2;
    else if (guess === 'Exactly' && roll === 7) payout = wager * 6;
    else payout = 0;

    setResult('rolling');
    setTimeout(() => {
      setResult(roll);
      setBalance(prev => payout > 0 ? prev + (payout - wager) : prev - wager);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-4 border rounded-xl w-full max-w-md bg-white shadow flex flex-col justify-center items-center flex-grow text-black">
      <div className="w-full text-center mb-4">
        <h2 className="text-2xl font-bold">🎯 Lucky 7</h2>
        <p className="text-sm text-gray-600">Guess above, below, or exactly 7. 10x payout if exactly right.</p>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-sm font-semibold mb-1">Wager (SOL):</label>
        <input
          type="number"
          value={wager}
          min="1"
          max={balance}
          onChange={(e) => setWager(Number(e.target.value))}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring"
        />
      </div>
      <div className="flex space-x-2 mb-4 w-full">
        {['Below', 'Exactly', 'Above'].map(option => (
          <button
            key={option}
            onClick={() => setGuess(option)}
            className={`flex-1 py-3 text-lg rounded transition duration-300 transform hover:scale-105 ${guess === option ? 'bg-yellow-400 text-black' : 'bg-gray-200'}`}
          >
            {option}
            <div className="text-xs text-gray-600">{option === 'Exactly' ? '6x' : '2x'}</div>
          </button>
        ))}
      </div>
      <button
        onClick={play}
        disabled={loading}
        className="w-full text-xl bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
      >
        {loading ? 'Rolling...' : 'Play'}
      </button>
      {result !== null && result === 'rolling' ? (
        <div className="mt-4 text-2xl animate-spin">🎯</div>
      ) : (
        <p className="mt-4 text-lg font-semibold">Number Drawn: {result}</p>
      )}
    </div>
  );
}

function DiceRollGame({ balance, setBalance }) {
  const [wager, setWager] = useState(10);
  const [result, setResult] = useState(null);
  const [guess, setGuess] = useState(1);
  const [loading, setLoading] = useState(false);

  const roll = () => {
    if (loading || wager > balance || wager <= 0) return;
    setLoading(true);
    const dice = Math.floor(Math.random() * 6) + 1;
    setResult('rolling');
    setTimeout(() => {
      setResult(dice);
      const win = dice === guess;
      setBalance(prev => win ? prev + wager * 5 : prev - wager);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-4 border rounded-xl w-full max-w-md bg-white shadow flex flex-col justify-center items-center flex-grow text-black">
      <div className="w-full text-center mb-4">
        <h2 className="text-2xl font-bold">🎲 Dice Roll</h2>
        <p className="text-sm text-gray-600">Guess a number 1–6. Win 5x if you hit it!</p>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-sm font-semibold mb-1">Pick a Number (1-6):</label>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <button
              key={num}
              onClick={() => setGuess(num)}
              className={`py-3 rounded text-lg transition duration-300 transform hover:scale-105 ${guess === num ? 'bg-yellow-400 text-black' : 'bg-gray-200'}`}
            >
              {num}
              <div className="text-xs text-gray-600">5x</div>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-sm font-semibold mb-1">Wager (SOL):</label>
        <input
          type="number"
          value={wager}
          min="1"
          max={balance}
          onChange={(e) => setWager(Number(e.target.value))}
          className="w-full px-3 py-2 rounded border border-gray-300"
        />
      </div>
      <button
        onClick={roll}
        className="w-full text-xl bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Rolling...' : 'Roll Dice'}
      </button>
      {result !== null && result === 'rolling' ? (
        <div className="mt-4 text-2xl animate-spin">🎲</div>
      ) : (
        <p className="mt-4 text-lg font-semibold">Result: {result}</p>
      )}
    </div>
  );
}

function App() {
  const [balance, setBalance] = useState(100);
  const [selectedTab, setSelectedTab] = useState('coinflip');

  const renderGame = () => {
    switch (selectedTab) {
      case 'coinflip':
        return <CoinFlipGame balance={balance} setBalance={setBalance} />;
      case 'highlow':
        return <LuckySevenGame balance={balance} setBalance={setBalance} />;
      case 'dice':
        return <DiceRollGame balance={balance} setBalance={setBalance} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white flex flex-col pb-24">
      <div className="absolute top-4 right-6 bg-white text-black px-4 py-1.5 rounded-xl shadow text-sm font-semibold z-50">
        Balance: {balance} SOL
      </div>
      <div className="flex flex-col items-center p-4 flex-grow">
        <h1 className="text-4xl font-bold mt-6 mb-1">🎰 Shooter's Mini Casino</h1>
        <p className="text-sm text-gray-300 mb-4">Preview mode (wallet features disabled)</p>
        {renderGame()}
      </div>
      <div className="px-4 pb-4 fixed bottom-0 w-full z-50">
        <div className="flex justify-around items-center bg-black bg-opacity-80 p-2 rounded-xl border-t border-gray-700">
          <button
            className={`flex-1 mx-1 text-center py-2 rounded-md font-semibold transition duration-300 ${selectedTab === 'coinflip' ? 'bg-yellow-400 text-black' : 'text-white hover:bg-gray-700'}`}
            onClick={() => setSelectedTab('coinflip')}
          >
            🪙 Coin Flip
          </button>
          <button
            className={`flex-1 mx-1 text-center py-2 rounded-md font-semibold transition duration-300 ${selectedTab === 'highlow' ? 'bg-yellow-400 text-black' : 'text-white hover:bg-gray-700'}`}
            onClick={() => setSelectedTab('highlow')}
          >
            🎯 High-Low
          </button>
          <button
            className={`flex-1 mx-1 text-center py-2 rounded-md font-semibold transition duration-300 ${selectedTab === 'dice' ? 'bg-yellow-400 text-black' : 'text-white hover:bg-gray-700'}`}
            onClick={() => setSelectedTab('dice')}
          >
            🎲 Dice Roll
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

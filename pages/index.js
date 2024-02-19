import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [results, setResults] = useState({ age: '', gender: '', country: '' });

  async function handleSubmit(e) {
    e.preventDefault();

    // Fetch age
    const ageResponse = await fetch(`https://api.agify.io?name=${name}`);
    const ageData = await ageResponse.json();

    // Fetch gender
    const genderResponse = await fetch(`https://api.genderize.io?name=${name}`);
    const genderData = await genderResponse.json();

    // Fetch country
    const countryResponse = await fetch(`https://api.nationalize.io?name=${name}`);
    const countryData = await countryResponse.json();

    setResults({
      age: ageData.age,
      gender: genderData.gender,
      country: countryData.country.length > 0 ? countryData.country[0].country_id : 'Unknown',
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">Guess Age, Gender, and Country</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Guess
          </button>
        </div>
      </form>
      <div className="mt-6 space-y-2 w-full max-w-md">
        {results.age && <p className="text-lg">Age: {results.age}</p>}
        {results.gender && <p className="text-lg">Gender: {results.gender}</p>}
        {results.country && <p className="text-lg">Country: {results.country}</p>}
      </div>
    </div>
  );
}

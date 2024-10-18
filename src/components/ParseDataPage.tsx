import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';

const ParseDataPage: React.FC = () => {
  const [pdFreezers, setPDFreezers] = useState<Array<{ name: string; description: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPDFreezers = async () => {
      try {
        const query = new Parse.Query('PDFreezer');
        const results = await query.find();
        const data = results.map(result => ({
          name: result.get('freezerName') || '',
          description: result.get('freezerDescription') || ''
        }));
        setPDFreezers(data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching PDFreezer data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPDFreezers();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">PDFreezer Data</h2>
      {pdFreezers.length === 0 ? (
        <p>No PDFreezer data found.</p>
      ) : (
        <ul className="space-y-4">
          {pdFreezers.map((freezer, index) => (
            <li key={index} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-xl font-semibold">{freezer.name}</h3>
              <p className="text-gray-600 mt-2">{freezer.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParseDataPage;
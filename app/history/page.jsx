"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not logged in
    if (status === 'unauthenticated') {
      router.push('/login'); // or wherever your login page is
      return;
    }
    
    if (status === 'authenticated') {
      const fetchHistory = async () => {
        try {
          const res = await fetch('/api/history');
          if (res.ok) {
            const data = await res.json();
            setHistory(data);
          }
        } catch (error) {
          console.error("Failed to fetch history:", error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchHistory();
    }
  }, [status, router]); // Re-run effect when auth status changes

  if (loading || status === 'loading') {
    return <div>Loading your history...</div>;
  }
  
  return (
    <div>
      <h1>Your Fact-Checking History</h1>
      {history.length === 0 ? (
        <p>You have no saved history yet.</p>
      ) : (
        <div>
          {history.map((item) => (
            <div key={item._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <h3>Claim: {item.claim}</h3>
              <p><strong>Verdict: {item.verdict}</strong></p>
              <p>{item.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useFinancialData = (ticker: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setError('Supabase is not configured');
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Assuming the table name is 'financial_ratios_wide' based on previous context
        const { data, error } = await supabase
          .from('financial_ratios_wide')
          .select('*')
          .eq('ticker', ticker);

        if (error) {
          throw error;
        }

        setData(data);
        console.log(`Data fetched for ${ticker}:`, data);
      } catch (err: any) {
        setError(err.message);
        console.error(`Error fetching data for ${ticker}:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (ticker) {
      fetchData();
    }
  }, [ticker]);

  return { data, loading, error };
};

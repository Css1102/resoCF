// hooks/useDebouncedPairwiseMatch.js
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export const useDebouncedPairwiseMatch = (currentUserId, requests, delay = 500) => {
  const [matchLevels, setMatchLevels] = useState({});
  const [loading, setLoading] = useState(true);
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (!currentUserId || !requests || requests.length === 0) return;

    clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      const newMatchLevels = {};

      for (const req of requests) {
        try {
          const res = await axios.post(
            `${BASE_URL}/match-skills`,
            { userIds: [currentUserId, req.requestFrom._id] },
            { withCredentials: true }
          );
          newMatchLevels[req.requestFrom._id] = res.data?.data[0]?.match || 'Unknown';
        } catch (err) {
          console.error('Skill match error:', err.message);
          newMatchLevels[req.requestFrom._id] = 'Unknown';
        }
      }

      setMatchLevels(newMatchLevels);
      setLoading(false);
    }, delay);

    return () => clearTimeout(debounceTimer.current);
  }, [currentUserId, requests]);

  return { matchLevels, loading };
};

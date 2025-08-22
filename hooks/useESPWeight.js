import { useEffect, useRef, useState } from "react";

export function useESPWeight(pollInterval = 2000) {
  const [espWeight, setEspWeight] = useState(null);
  const [tareValue, setTareValue] = useState(0);
  const [error, setError] = useState(null);
  const lastStableWeight = useRef(null);
  const weightHistory = useRef([]);
  const [intake, setIntake] = useState(0);

  const stabilityThreshold = 30; // stability margin
  const historyWindow = 5;       // readings count to consider stable
  const intakeThreshold = 20;    // minimum decrease to add to intake

  // Call this to set tare from current weight reading
  const tare = (currentWeight) => {
    setTareValue(currentWeight);
    lastStableWeight.current = 0; // reset baseline to zero after tare
    weightHistory.current = [];    // clear history on tare
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://192.168.4.1/")
        .then(res => res.text())
        .then(text => {
          const rawWeight = parseFloat(text);
          if (isNaN(rawWeight)) return;

          const netWeight = rawWeight - tareValue;

          // Ignore weight readings under or equal to zero (under tare)
          if (netWeight <= 0) {
            // Update espWeight but don't process intake
            setEspWeight(netWeight);
            return;
          }

          weightHistory.current.push(netWeight);
          if (weightHistory.current.length > historyWindow) {
            weightHistory.current.shift();
          }

          if (!isStable(weightHistory.current, stabilityThreshold)) {
            return; // skip until stable
          }

          const avgWeight = average(weightHistory.current);

          if (lastStableWeight.current === null) {
            lastStableWeight.current = avgWeight;
            setEspWeight(avgWeight);
            return;
          }

          const weightDrop = lastStableWeight.current - avgWeight;

          if (weightDrop > intakeThreshold) {
            setIntake(prev => prev + weightDrop);
            lastStableWeight.current = avgWeight;
          } else if (weightDrop < -intakeThreshold) {
            // Ignore refills or big weight increases for now, just update baseline
            lastStableWeight.current = avgWeight;
          } else {
            lastStableWeight.current = avgWeight;
          }

          setEspWeight(avgWeight);
        })
        .catch(err => setError(err.message));
    }, pollInterval);

    return () => clearInterval(interval);
  }, [pollInterval, tareValue]);

  return { espWeight, intake, error, tare, tareValue };
}

function isStable(history, threshold) {
  if (history.length < 2) return false;
  const max = Math.max(...history);
  const min = Math.min(...history);
  return max - min < threshold;
}

function average(arr) {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

import { useEffect, useState } from 'react';
import type { Plan, Purchase } from '../types';
import { INITIAL_PURCHASES, PLANS } from '../utils';

export function useSubscribeState() {
  const plans = PLANS;
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[4]);
  const [amountInput, setAmountInput] = useState<number>(50000);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string>('');
  const [detailModalItem, setDetailModalItem] = useState<Purchase | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>(INITIAL_PURCHASES);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 6000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  return {
    amountInput,
    copiedId,
    detailModalItem,
    errorMsg,
    plans,
    purchases,
    selectedPlan,
    setAmountInput,
    setCopiedId,
    setDetailModalItem,
    setErrorMsg,
    setPurchases,
    setSelectedPlan,
    setSuccessMsg,
    successMsg
  };
}

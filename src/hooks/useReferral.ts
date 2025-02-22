import { adminAddress } from '@/config';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useReferral = () => {
  const referrer = useSearchParams().get('referrer');

  const [referrerAddress, setReferrerAddress] = useState<string | null>(null);

  useEffect(() => {
    const cookieReferrerAddress = Cookies.get('referrerAddress');
    if (referrer && !cookieReferrerAddress) {
      Cookies.set('referrerAddress', referrer);
      setReferrerAddress(referrer);
    } else {
      if (cookieReferrerAddress) {
        setReferrerAddress(cookieReferrerAddress!);
      } else {
        setReferrerAddress(adminAddress);
      }
    }
  }, [referrer]);

  return { referrerAddress };
};

export default useReferral;

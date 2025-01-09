import { formatTokenI } from '@/utils/mx-utils';
import { forwardRef, useEffect, useState } from 'react';

interface TokenAmountProps extends React.InputHTMLAttributes<HTMLInputElement> {
  tokenId: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TokenAmount = forwardRef<HTMLInputElement, TokenAmountProps>(
  ({ tokenId, value, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
      if (value) {
        try {
          setDisplayValue(value);
        } catch (error) {
          console.error('Error formatting value:', error);
          setDisplayValue(value);
        }
      } else {
        setDisplayValue('');
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/,/g, '');

      if (rawValue === '' || /^\d*\.?\d*$/.test(rawValue)) {
        if (onChange) {
          const syntheticEvent = {
            ...e,
            target: {
              ...e.target,
              value: rawValue
            }
          };
          onChange(syntheticEvent);
        }
      }
    };

    return (
      <div className='flex items-center justify-between bg-gray-700 rounded p-2'>
        <input
          className='bg-transparent w-full focus:outline-none'
          placeholder='0'
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          {...props}
        />
        <div className='flex items-center gap-2'>
          <span className='text-green-400'>{formatTokenI(tokenId)}</span>
        </div>
      </div>
    );
  }
);

TokenAmount.displayName = 'TokenAmount';

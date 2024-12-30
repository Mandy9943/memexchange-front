import {
  ErrorCallback,
  HistoryCallback,
  LibrarySymbolInfo,
  PeriodParams,
  ResolutionString,
  SubscribeBarsCallback
} from '@/../public/static/charting_library';
import { fetchAxios } from '@/services/rest/backendApi';
import { SearchSymbolResultItem } from '../../../../../../public/static/charting_library/charting_library';

const configurationData = {
  supported_resolutions: [
    '1',
    '5',
    '15',
    '30',
    '60',
    '240',
    'D'
  ] as ResolutionString[],
  exchanges: [
    {
      value: 'DEX',
      name: 'DEX',
      desc: 'Simple, fast, secure – and inexpensive order book AMM. Launch a coin in just a few clicks: Get instant branding, real-time charts and chats.'
    }
  ],
  symbols_types: [{ name: 'crypto', value: 'crypto' }]
};

type SymbolInfo = {
  name: string;
  description: string;
  type: string;
  session: string;
  timezone: string;
  exchange: string;
  minmov: number;
  pricescale: number;
  has_intraday: boolean;
  supported_resolutions: string[];
  volume_precision: number;
  data_status: string;
  symbol: string;
  full_name: string;
};

const config = () => {
  return {
    onReady: (callback: (config: typeof configurationData) => void) => {
      setTimeout(() => callback(configurationData));
    },

    searchSymbols: async (
      userInput: string,
      _exchange: string,
      _symbolType: string,
      onResultReadyCallback: (symbols: SearchSymbolResultItem[]) => void
    ) => {
      try {
        const response = await fetchAxios<SymbolInfo[]>(
          `/chart/search?query=${encodeURIComponent(userInput)}`
        );
        console.log(response);

        const symbols = response.map((item) => ({
          ...item,
          full_name: `${item.symbol}`
        }));

        console.log(symbols);
        onResultReadyCallback(symbols);
      } catch (error) {
        console.error('Error searching symbols:', error);
        onResultReadyCallback([]);
      }
    },

    resolveSymbol: async (
      symbolName: string,
      onSymbolResolvedCallback: (symbolInfo: LibrarySymbolInfo) => void,
      onErrorCallback: (error: string) => void
    ) => {
      try {
        console.log(symbolName);

        const response = await fetchAxios<SymbolInfo>(
          `/chart/symbol/${encodeURIComponent(symbolName)}`
        );
        console.log(response);

        const symbolInfo: LibrarySymbolInfo = {
          ...response,
          name: symbolName,
          ticker: response.name,
          session: '24x7',
          timezone: 'Etc/UTC',
          minmov: 1,
          pricescale: 1000000000000,
          has_intraday: true,
          has_weekly_and_monthly: false,
          supported_resolutions: configurationData.supported_resolutions,
          volume_precision: 2,
          data_status: 'streaming',
          listed_exchange: 'DEX',
          format: 'price'
        };

        onSymbolResolvedCallback(symbolInfo);
      } catch (error) {
        console.error('Error resolving symbol:', error);
        onErrorCallback('Symbol not found');
      }
    },

    getBars: async (
      symbolInfo: LibrarySymbolInfo,
      resolution: ResolutionString,
      periodParams: PeriodParams,
      onHistoryCallback: HistoryCallback,
      onErrorCallback: ErrorCallback
    ) => {
      try {
        const response = await fetchAxios<{
          s: string;
          bars: {
            time: number;
            open: number;
            high: number;
            low: number;
            close: number;
          }[];
        }>(
          `/chart/history?symbol=${encodeURIComponent(symbolInfo.name)}` +
            `&from=${periodParams.from}` +
            `&to=${periodParams.to}` +
            `&countBack=${periodParams.countBack}` +
            `&resolution=${resolution}`
        );

        if (response.s === 'no_data') {
          onHistoryCallback([], { noData: true });
          return;
        }

        if (response.s !== 'ok' || !Array.isArray(response.bars)) {
          onErrorCallback('History API error');
          return;
        }

        const validBars = response.bars.map((bar) => ({
          time: Number(bar.time),
          open: Number(bar.open),
          high: Number(bar.high),
          low: Number(bar.low),
          close: Number(bar.close)
        }));

        console.log('Processed bars:', validBars);

        onHistoryCallback(validBars, {
          noData: !validBars.length
        });
      } catch (error) {
        console.error('Error getting bars:', error);
        onErrorCallback('Error getting bars');
      }
    },

    subscribeBars: (
      symbolInfo: LibrarySymbolInfo,
      resolution: ResolutionString,
      onRealtimeCallback: SubscribeBarsCallback,
      subscriberUID: string,
      onResetCacheNeededCallback: () => void
    ) => {
      console.log('subscribeBars called', {
        symbolInfo,
        resolution,
        subscriberUID,
        onResetCacheNeededCallback
      });
    },

    unsubscribeBars: (_subscriberUID: string) => {
      // Implement unsubscribe logic here if needed
      console.log({
        _subscriberUID
      });
      console.log('unsubscribeBars called');
    }
  };
};

export default config;

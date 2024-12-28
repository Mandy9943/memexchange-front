import store from '@/redux/store';
import { cachedEventsApi } from '@/services/rest/events';
import { formatTokenI } from '@/utils/mx-utils';

const configurationData = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: [
    '1',
    '3',
    '5',
    '15',
    '30',
    '60',
    '120',
    '180',
    '240',
    '1D',
    '1W',
    '1M'
  ],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  exchanges: [
    {
      value: 'Jeetdex',
      name: 'Jeetdex',
      desc: 'Simple, fast, secure – and inexpensive order book AMM. Launch a coin in just a few clicks: Get instant branding, real-time charts and chats.'
    }
  ],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  symbols_types: [{ name: 'crypto', value: 'crypto' }]
};
// DatafeedConfiguration implementation
// ...

type SymbolRes = {
  symbol: string;
  ticker: string;
  description: string;
  exchange: 'Jeetdex';
  type: 'crypto';
  logo_urls: string[];
};
// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols(
  mode: 'normie' | 'degen' = 'normie'
): Promise<SymbolRes[]> {
  const coinsInfo = store.getState().dapp.globalData.coins;

  const res: SymbolRes[] = coinsInfo
    .filter((coin) =>
      mode === 'normie'
        ? !Boolean(coin.degenId)
        : Boolean(coin.degenId) && coin.identifier.includes('-')
    )
    .map((coin) => {
      const sym: SymbolRes = {
        symbol: formatTokenI(coin.identifier),
        ticker: coin.identifier,
        description: coin.description as string,
        exchange: 'Jeetdex',
        type: 'crypto',
        logo_urls: [coin?.img || '/assets/img/coin-placeholder.svg']
      };
      return sym;
    });

  return res;
}

const config = (mode: 'normie' | 'degen' = 'normie') => {
  return {
    onReady: (callback) => {
      setTimeout(() => callback(configurationData));
    },
    searchSymbols: async (
      userInput,
      exchange,
      symbolType,
      onResultReadyCallback
    ) => {
      const symbols = await getAllSymbols(mode);
      console.log(symbols);

      const newSymbols = symbols.filter((symbol) => {
        const isExchangeValid = exchange === '' || symbol.exchange === exchange;
        const isFullSymbolContainsInput =
          symbol.ticker.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
        return isExchangeValid && isFullSymbolContainsInput;
      });
      onResultReadyCallback(
        newSymbols.map((s) => ({
          ...s
        }))
      );
    },
    resolveSymbol: async (symbolName, onSymbolResolvedCallback) => {
      const symbols = await getAllSymbols(mode);
      const symbolItem = symbols.find(({ ticker }) => ticker === symbolName);
      if (!symbolItem) {
        return;
      }
      // Symbol information object
      const symbolInfo = {
        ...symbolItem,
        name: symbolItem.symbol,
        session: '24x7',
        timezone: 'Etc/UTC',
        minmov: 0.1,
        pricescale: 100,
        has_intraday: true,
        intraday_multipliers: ['1'],
        visible_plots_set: 'ohlc',
        has_weekly_and_monthly: false,
        supported_resolutions: configurationData.supported_resolutions,
        volume_precision: 2,
        data_status: 'streaming',

        variable_tick_size: '0.000000001'
      };
      onSymbolResolvedCallback(symbolInfo);
    },
    getBars: async (
      symbolInfo,
      resolution,
      periodParams,
      onHistoryCallback,
      onErrorCallback
    ) => {
      console.log('getBars');

      const { to } = periodParams;

      const urlParameters = {
        e: 'JEETDEX',
        fsym: 'JEET-2346a',
        tsym: symbolInfo.ticker,
        // toTs: to,
        limit: 2000
      };
      const query = Object.keys(urlParameters)
        .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
        .join('&');
      console.log({ query });

      try {
        const bars = await cachedEventsApi(`/datafeed/${mode}?${query}`);
        console.log(bars);

        let currentBars = [];

        bars.forEach((bar) => {
          if (bar.time < to) {
            currentBars = [
              ...currentBars,
              {
                time: bar.time * 1000,
                low: bar.low,
                high: bar.high,
                open: bar.open,
                close: bar.close
              }
            ];
          }
        });
        console.log({ currentBars });
        onHistoryCallback(currentBars, { noData: false });
      } catch (error) {
        onErrorCallback(error);
      }
    },
    subscribeBars: (
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID
    ) => {
      console.log(
        '[subscribeBars]: Method call with subscriberUID:',
        subscriberUID
      );
    },
    unsubscribeBars: (subscriberUID) => {
      console.log(
        '[unsubscribeBars]: Method call with subscriberUID:',
        subscriberUID
      );
    }
  };
};

export default config;

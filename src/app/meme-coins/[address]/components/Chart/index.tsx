import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  ResolutionString,
  widget
} from '@/../public/static/charting_library';
import { memo, useEffect, useRef } from 'react';
import config from './datafeed';

const TVChartContainer = ({
  tokenIdentifier,
  mode
}: {
  tokenIdentifier: string;
  mode?: 'normie' | 'degen';
}) => {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const charWidgettRef = useRef<IChartingLibraryWidget>();
  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: tokenIdentifier,
      interval: '10' as ResolutionString,
      debug: process.env.NODE_ENV !== 'production',

      library_path: `${process.env.NEXT_PUBLIC_FRONTED_URL}/static/charting_library/`,
      locale: 'en',
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      fullscreen: false,
      autosize: true,
      datafeed: config(mode),
      container: chartContainerRef.current,
      enabled_features: ['show_symbol_logos'],
      theme: 'dark'
    };

    const tvWidget = new widget(widgetOptions);
    charWidgettRef.current = tvWidget;

    return () => {
      tvWidget.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={chartContainerRef} className={'h-full'} />
    </>
  );
};

export default memo(TVChartContainer);

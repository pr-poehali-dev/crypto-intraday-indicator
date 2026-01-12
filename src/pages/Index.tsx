import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import PriceChart from '@/components/PriceChart';
import OrderBook from '@/components/OrderBook';
import TechnicalIndicators from '@/components/TechnicalIndicators';
import TradingSignals from '@/components/TradingSignals';
import MarketStats from '@/components/MarketStats';

interface TickerData {
  symbol: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
}

const Index = () => {
  const [tickerData, setTickerData] = useState<TickerData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
        const data = await response.json();
        setTickerData(data);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to fetch ticker data:', error);
        setIsConnected(false);
      }
    };

    fetchTicker();
    const interval = setInterval(fetchTicker, 3000);

    return () => clearInterval(interval);
  }, []);

  const priceChange = parseFloat(tickerData?.priceChangePercent || '0');
  const isPositive = priceChange >= 0;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-[1920px] mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="TrendingUp" className="text-primary" size={32} />
            <div>
              <h1 className="text-2xl font-bold">Crypto Trading Terminal</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-accent pulse-green' : 'bg-destructive'}`} />
                <span>{isConnected ? 'Live Data' : 'Disconnected'}</span>
                <span>•</span>
                <span>Binance API</span>
              </div>
            </div>
          </div>

          {tickerData && (
            <div className="text-right">
              <div className="text-3xl font-bold tabular-nums">
                ${parseFloat(tickerData.lastPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`text-lg font-semibold ${isPositive ? 'text-gain' : 'text-loss'}`}>
                {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">BTC/USDT</CardTitle>
                  <Badge variant="outline" className={isPositive ? 'text-gain border-accent/50' : 'text-loss border-destructive/50'}>
                    24h {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <PriceChart />
              </CardContent>
            </Card>

            <Tabs defaultValue="indicators" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="indicators">
                  <Icon name="LineChart" size={16} className="mr-2" />
                  Technical Indicators
                </TabsTrigger>
                <TabsTrigger value="signals">
                  <Icon name="Zap" size={16} className="mr-2" />
                  Trading Signals
                </TabsTrigger>
              </TabsList>
              <TabsContent value="indicators" className="mt-4">
                <TechnicalIndicators />
              </TabsContent>
              <TabsContent value="signals" className="mt-4">
                <TradingSignals />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <MarketStats tickerData={tickerData} />
            <OrderBook />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

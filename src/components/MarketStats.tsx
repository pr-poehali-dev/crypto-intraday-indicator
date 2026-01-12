import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

interface MarketStatsProps {
  tickerData: TickerData | null;
}

const MarketStats = ({ tickerData }: MarketStatsProps) => {
  if (!tickerData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Market Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const stats = [
    {
      label: '24h High',
      value: `$${parseFloat(tickerData.highPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: 'ArrowUp',
      color: 'text-gain'
    },
    {
      label: '24h Low',
      value: `$${parseFloat(tickerData.lowPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: 'ArrowDown',
      color: 'text-loss'
    },
    {
      label: '24h Volume (BTC)',
      value: parseFloat(tickerData.volume).toLocaleString('en-US', { maximumFractionDigits: 2 }),
      icon: 'BarChart3',
      color: 'text-primary'
    },
    {
      label: '24h Volume (USDT)',
      value: `$${(parseFloat(tickerData.quoteVolume) / 1000000).toFixed(2)}M`,
      icon: 'DollarSign',
      color: 'text-primary'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Market Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name={stat.icon} size={16} className={`${stat.color}`} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <span className="text-sm font-semibold tabular-nums">{stat.value}</span>
            </div>
          ))}
          
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">24h Change</span>
              <span className={`text-sm font-bold tabular-nums ${parseFloat(tickerData.priceChangePercent) >= 0 ? 'text-gain' : 'text-loss'}`}>
                {parseFloat(tickerData.priceChangePercent) >= 0 ? '+' : ''}
                {parseFloat(tickerData.priceChangePercent).toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Price Change</span>
              <span className={`text-sm font-bold tabular-nums ${parseFloat(tickerData.priceChange) >= 0 ? 'text-gain' : 'text-loss'}`}>
                ${parseFloat(tickerData.priceChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketStats;

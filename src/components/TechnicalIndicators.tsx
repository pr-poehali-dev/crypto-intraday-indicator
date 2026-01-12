import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const TechnicalIndicators = () => {
  const indicators = [
    {
      name: 'RSI (14)',
      value: 58.42,
      signal: 'Neutral',
      color: 'text-primary',
      description: 'Relative Strength Index'
    },
    {
      name: 'MACD',
      value: 245.32,
      signal: 'Bullish',
      color: 'text-gain',
      description: 'Moving Average Convergence Divergence'
    },
    {
      name: 'MA (50)',
      value: 96234.56,
      signal: 'Above',
      color: 'text-gain',
      description: '50-period Moving Average'
    },
    {
      name: 'MA (200)',
      value: 94821.33,
      signal: 'Above',
      color: 'text-gain',
      description: '200-period Moving Average'
    },
    {
      name: 'Bollinger Bands',
      value: 0.65,
      signal: 'Middle',
      color: 'text-primary',
      description: 'Price position in bands'
    },
    {
      name: 'Volume',
      value: 142.5,
      signal: 'High',
      color: 'text-gain',
      description: 'Trading volume indicator'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {indicators.map((indicator) => (
        <Card key={indicator.name}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">{indicator.name}</CardTitle>
              <Icon name="Activity" size={16} className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tabular-nums">{indicator.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                <span className={`text-sm font-semibold ${indicator.color}`}>{indicator.signal}</span>
              </div>
              <Progress 
                value={indicator.name === 'RSI (14)' ? indicator.value : 
                       indicator.name === 'Bollinger Bands' ? indicator.value * 100 : 
                       65} 
                className="h-1.5"
              />
              <p className="text-xs text-muted-foreground">{indicator.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TechnicalIndicators;

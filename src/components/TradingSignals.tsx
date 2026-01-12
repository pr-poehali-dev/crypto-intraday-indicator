import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Signal {
  id: string;
  type: 'buy' | 'sell' | 'neutral';
  indicator: string;
  strength: 'strong' | 'weak' | 'moderate';
  message: string;
  time: string;
}

const TradingSignals = () => {
  const signals: Signal[] = [
    {
      id: '1',
      type: 'buy',
      indicator: 'MACD',
      strength: 'strong',
      message: 'Bullish crossover detected',
      time: '2 min ago'
    },
    {
      id: '2',
      type: 'buy',
      indicator: 'RSI',
      strength: 'moderate',
      message: 'RSI moving up from oversold',
      time: '5 min ago'
    },
    {
      id: '3',
      type: 'neutral',
      indicator: 'MA Cross',
      strength: 'weak',
      message: 'MA 50 approaching MA 200',
      time: '12 min ago'
    },
    {
      id: '4',
      type: 'buy',
      indicator: 'Volume',
      strength: 'strong',
      message: 'High buying volume detected',
      time: '15 min ago'
    },
    {
      id: '5',
      type: 'sell',
      indicator: 'Resistance',
      strength: 'moderate',
      message: 'Price near resistance level',
      time: '23 min ago'
    }
  ];

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return 'TrendingUp';
      case 'sell':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'buy':
        return 'text-gain bg-gain';
      case 'sell':
        return 'text-loss bg-loss';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const getStrengthBadge = (strength: string) => {
    const variants = {
      strong: 'default',
      moderate: 'secondary',
      weak: 'outline'
    };
    return variants[strength as keyof typeof variants] || 'outline';
  };

  return (
    <div className="space-y-3">
      {signals.map((signal) => (
        <Card key={signal.id} className="hover:bg-muted/50 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${getSignalColor(signal.type)}`}>
                  <Icon name={getSignalIcon(signal.type)} size={18} />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">{signal.indicator}</CardTitle>
                  <p className="text-xs text-muted-foreground">{signal.time}</p>
                </div>
              </div>
              <Badge variant={getStrengthBadge(signal.strength) as any}>
                {signal.strength}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">{signal.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TradingSignals;

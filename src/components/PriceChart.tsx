import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface KlineData {
  time: string;
  price: number;
}

const PriceChart = () => {
  const [chartData, setChartData] = useState<KlineData[]>([]);

  useEffect(() => {
    const fetchKlines = async () => {
      try {
        const response = await fetch(
          'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=24'
        );
        const data = await response.json();
        
        const formattedData = data.map((kline: any) => ({
          time: new Date(kline[0]).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          price: parseFloat(kline[4])
        }));
        
        setChartData(formattedData);
      } catch (error) {
        console.error('Failed to fetch kline data:', error);
      }
    };

    fetchKlines();
    const interval = setInterval(fetchKlines, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            fontSize={12}
            domain={['dataMin - 100', 'dataMax + 100']}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Price']}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;

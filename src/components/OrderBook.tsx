import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OrderBookData {
  bids: [string, string][];
  asks: [string, string][];
}

const OrderBook = () => {
  const [orderBook, setOrderBook] = useState<OrderBookData>({ bids: [], asks: [] });

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=10');
        const data = await response.json();
        setOrderBook(data);
      } catch (error) {
        console.error('Failed to fetch order book:', error);
      }
    };

    fetchOrderBook();
    const interval = setInterval(fetchOrderBook, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: string) => parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatAmount = (amount: string) => parseFloat(amount).toFixed(4);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Order Book</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 gap-2 px-4 pb-2 text-xs text-muted-foreground font-medium">
          <div>Price (USDT)</div>
          <div className="text-right">Amount (BTC)</div>
          <div className="text-right">Total</div>
        </div>
        
        <ScrollArea className="h-[200px]">
          <div className="space-y-0.5 px-4">
            {orderBook.asks.slice().reverse().map((ask, index) => {
              const total = parseFloat(ask[0]) * parseFloat(ask[1]);
              return (
                <div key={`ask-${index}`} className="grid grid-cols-3 gap-2 text-xs py-1">
                  <div className="text-loss font-semibold tabular-nums">${formatPrice(ask[0])}</div>
                  <div className="text-right tabular-nums text-muted-foreground">{formatAmount(ask[1])}</div>
                  <div className="text-right tabular-nums text-muted-foreground">${total.toFixed(0)}</div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="border-t border-b border-border py-3 px-4 my-2">
          <div className="text-xl font-bold tabular-nums">
            ${orderBook.bids[0] ? formatPrice(orderBook.bids[0][0]) : '0.00'}
          </div>
          <div className="text-xs text-muted-foreground">Spread</div>
        </div>

        <ScrollArea className="h-[200px]">
          <div className="space-y-0.5 px-4">
            {orderBook.bids.map((bid, index) => {
              const total = parseFloat(bid[0]) * parseFloat(bid[1]);
              return (
                <div key={`bid-${index}`} className="grid grid-cols-3 gap-2 text-xs py-1">
                  <div className="text-gain font-semibold tabular-nums">${formatPrice(bid[0])}</div>
                  <div className="text-right tabular-nums text-muted-foreground">{formatAmount(bid[1])}</div>
                  <div className="text-right tabular-nums text-muted-foreground">${total.toFixed(0)}</div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default OrderBook;

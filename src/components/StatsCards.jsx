function formatBalance(balance, decimals = 18) {
  const num = parseFloat(balance) / Math.pow(10, decimals)
  return num.toFixed(6)
}

export default function StatsCards({ stats, network }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
      <div className="glass rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">💰</div>
        <div className="text-white/80 text-sm">موجودی</div>
        <div className="text-white font-bold text-lg">
          {formatBalance(stats.balance)} {network.currency}
        </div>
      </div>
      
      <div className="glass rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">📊</div>
        <div className="text-white/80 text-sm">کل تراکنش‌ها</div>
        <div className="text-white font-bold text-lg">{stats.totalTransactions}</div>
      </div>
      
      <div className="glass rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <div className="text-white/80 text-sm">تراکنش‌های موفق</div>
        <div className="text-green-300 font-bold text-lg">{stats.successfulTx}</div>
      </div>
      
      <div className="glass rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">❌</div>
        <div className="text-white/80 text-sm">تراکنش‌های ناموفق</div>
        <div className="text-red-300 font-bold text-lg">{stats.failedTx}</div>
      </div>
    </div>
  )
}

function formatValue(value, decimals = 18) {
  const num = parseFloat(value) / Math.pow(10, decimals)
  return num.toFixed(6)
}

function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleString('fa-IR')
}

function truncateHash(hash) {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`
}

export default function TransactionsTable({ transactions, network }) {
  if (!transactions || transactions.length === 0) {
    return null
  }

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h3 className="text-white font-bold text-xl mb-6">📋 تراکنش‌های اخیر</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-right p-3">هش تراکنش</th>
              <th className="text-right p-3">از</th>
              <th className="text-right p-3">به</th>
              <th className="text-right p-3">مقدار ({network.currency})</th>
              <th className="text-right p-3">وضعیت</th>
              <th className="text-right p-3">تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={tx.hash} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-3">
                  <a
                    href={`${network.explorer}/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    {truncateHash(tx.hash)}
                  </a>
                </td>
                <td className="p-3 font-mono text-sm">{truncateHash(tx.from)}</td>
                <td className="p-3 font-mono text-sm">{truncateHash(tx.to)}</td>
                <td className="p-3">{formatValue(tx.value)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    tx.isError === '0' 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {tx.isError === '0' ? '✅ موفق' : '❌ ناموفق'}
                  </span>
                </td>
                <td className="p-3 text-sm">{formatDate(tx.timeStamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

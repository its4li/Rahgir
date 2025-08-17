'use client'

import { useState } from 'react'
import AddressForm from '../components/AddressForm'
import TransactionsTable from '../components/TransactionsTable'
import NetworkSelector from '../components/NetworkSelector'
import LoadingSpinner from '../components/LoadingSpinner'
import StatsCards from '../components/StatsCards'

const NETWORKS = {
  ethereum: { name: 'اتریوم', chainId: 1, color: 'bg-blue-500', currency: 'ETH', explorer: 'https://etherscan.io' },
  bsc: { name: 'BSC', chainId: 56, color: 'bg-yellow-500', currency: 'BNB', explorer: 'https://bscscan.com' },
  arbitrum: { name: 'آربیتروم', chainId: 42161, color: 'bg-blue-400', currency: 'ETH', explorer: 'https://arbiscan.io' },
  optimism: { name: 'اپتیمیزم', chainId: 10, color: 'bg-red-500', currency: 'ETH', explorer: 'https://optimistic.etherscan.io' }
}

export default function Home() {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum')
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState(null)

  const handleSearch = async (address) => {
    setLoading(true)
    setError('')
    setTransactions([])
    setStats(null)

    try {
      const network = NETWORKS[selectedNetwork]
      const response = await fetch(`/api/transactions?address=${address}&chainId=${network.chainId}`)
      
      if (!response.ok) {
        throw new Error('خطا در دریافت اطلاعات')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setTransactions(data.transactions || [])
      setStats(data.stats || null)
    } catch (err) {
      setError(err.message || 'خطا در دریافت اطلاعات')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="glass rounded-2xl p-6 animate-fade-in">
        <NetworkSelector 
          networks={NETWORKS}
          selectedNetwork={selectedNetwork}
          onNetworkChange={setSelectedNetwork}
        />
        
        <div className="mt-6">
          <AddressForm 
            onSearch={handleSearch}
            loading={loading}
            selectedNetwork={NETWORKS[selectedNetwork]}
          />
        </div>
      </div>

      {loading && (
        <div className="glass rounded-2xl p-8 text-center animate-slide-up">
          <LoadingSpinner />
          <p className="text-white mt-4">در حال دریافت تراکنش‌ها...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 animate-slide-up">
          <p className="text-red-200 text-center">❌ {error}</p>
        </div>
      )}

      {stats && (
        <StatsCards stats={stats} network={NETWORKS[selectedNetwork]} />
      )}

      {transactions.length > 0 && (
        <TransactionsTable 
          transactions={transactions}
          network={NETWORKS[selectedNetwork]}
        />
      )}
    </div>
  )
}

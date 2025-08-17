import { useState } from 'react'

export default function AddressForm({ onSearch, loading, selectedNetwork }) {
  const [address, setAddress] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (address.trim()) {
      onSearch(address.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white font-medium mb-2">
          آدرس کیف پول ({selectedNetwork.name}):
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !address.trim()}
        className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover-scale"
      >
        {loading ? 'در حال جستجو...' : '🔍 جستجوی تراکنش‌ها'}
      </button>
    </form>
  )
}

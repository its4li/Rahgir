export default function NetworkSelector({ networks, selectedNetwork, onNetworkChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-lg">انتخاب شبکه:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(networks).map(([key, network]) => (
          <button
            key={key}
            onClick={() => onNetworkChange(key)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 hover-scale ${
              selectedNetwork === key
                ? 'border-white bg-white/20 text-white'
                : 'border-white/30 bg-white/10 text-white/80 hover:border-white/50'
            }`}
          >
            <div className={`w-4 h-4 rounded-full ${network.color} mx-auto mb-2`}></div>
            <div className="font-medium">{network.name}</div>
            <div className="text-sm opacity-75">{network.currency}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

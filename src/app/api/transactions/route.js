import { NextResponse } from 'next/server'

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const NETWORK_CONFIGS = {
  1: { name: 'ethereum', baseUrl: 'https://api.etherscan.io/api' },
  56: { name: 'bsc', baseUrl: 'https://api.bscscan.com/api' },
  42161: { name: 'arbitrum', baseUrl: 'https://api.arbiscan.io/api' },
  10: { name: 'optimism', baseUrl: 'https://api-optimistic.etherscan.io/api' }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')
  const chainId = parseInt(searchParams.get('chainId'))

  if (!address || !chainId) {
    return NextResponse.json({ error: 'آدرس و شبکه الزامی است' }, { status: 400 })
  }

  if (!ETHERSCAN_API_KEY) {
    return NextResponse.json({ error: 'API key تنظیم نشده است' }, { status: 500 })
  }

  const networkConfig = NETWORK_CONFIGS[chainId]
  if (!networkConfig) {
    return NextResponse.json({ error: 'شبکه پشتیبانی نمی‌شود' }, { status: 400 })
  }

  try {
    // دریافت تراکنش‌ها
    const txResponse = await fetch(
      `${networkConfig.baseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc&apikey=${ETHERSCAN_API_KEY}`
    )
    
    const txData = await txResponse.json()
    
    if (txData.status !== '1') {
      return NextResponse.json({ error: 'خطا در دریافت تراکنش‌ها' }, { status: 400 })
    }

    // دریافت موجودی
    const balanceResponse = await fetch(
      `${networkConfig.baseUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
    )
    
    const balanceData = await balanceResponse.json()
    
    const transactions = txData.result.map(tx => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      gasUsed: tx.gasUsed,
      gasPrice: tx.gasPrice,
      timeStamp: tx.timeStamp,
      isError: tx.isError,
      blockNumber: tx.blockNumber
    }))

    const stats = {
      balance: balanceData.result || '0',
      totalTransactions: transactions.length,
      successfulTx: transactions.filter(tx => tx.isError === '0').length,
      failedTx: transactions.filter(tx => tx.isError === '1').length
    }

    return NextResponse.json({ transactions, stats })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'خطا در ارتباط با سرور' }, { status: 500 })
  }
}

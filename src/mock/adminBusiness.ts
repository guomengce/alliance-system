import type { Transaction } from '../types';

export const INITIAL_PENDING_WITHDRAWAL_DTOS: Transaction[] = [
    {
      id: 'TXN-8812903120',
      type: 'withdraw',
      typeLabel: '提现申请',
      desc: '提现至外部钱包 (TRC-20: TXX938aLskj9238fjKdk)',
      amount: -12000.00,
      currency: 'USDT',
      time: '2026-05-29 07:15:11',
      status: 'pending',
      statusLabel: '待审核出账',
      blockchainProof: {
        txid: 'TWe8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b001',
        network: 'TRON Network (TRC-20)',
        gasFee: 1.5,
        fromAddress: 'TJDyZ8f1jUka8Jska271Kshq19Kshq9Kws',
        toAddress: 'TXX938aLskj9238fjKdk',
        timestamp: '2026-05-29 07:15:11',
        consensusStatus: 'Pending Admin Verification'
      }
    },
    {
      id: 'TXN-8812903125',
      type: 'withdraw',
      typeLabel: '提现申请',
      desc: '提现至外部钱包 (ERC-20: 0x923Fjk0293asdf92398)',
      amount: -45000.00,
      currency: 'USDT',
      time: '2026-05-29 08:34:02',
      status: 'pending',
      statusLabel: '待审核出账',
      blockchainProof: {
        txid: '0x923fe8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6789a',
        network: 'Ethereum Mainnet (ERC-20)',
        gasFee: 15.0,
        fromAddress: '0x999001f3014B298CD2abD2110cE45c9288e2231A',
        toAddress: '0x923Fjk0293asdf92398',
        timestamp: '2026-05-29 08:34:02',
        consensusStatus: 'Pending Admin Verification'
      }
    }
  ];

export const getInitialPendingWithdrawals = (): Transaction[] => (
  INITIAL_PENDING_WITHDRAWAL_DTOS.map((withdrawal) => ({
    ...withdrawal,
    blockchainProof: withdrawal.blockchainProof ? { ...withdrawal.blockchainProof } : undefined
  }))
);

// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { SendTransaction } from "../../components/SendTransaction";

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import pkg from '../../../package.json';
import day90LockImage from './assets/wizard2.webp';
import day180LockImage from './assets/wizard1.webp';
import day360LockImage from './assets/wizard3.webp';
import Image, { StaticImageData } from 'next/image';
// Store
import useC7TokenBalanceStore from '../../stores/useC7TokenBalanceStore'; // This is a hypothetical hook similar to your SOL balance store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
export const RewardPoolCard: FC<{ title: string; description: string; description2: string; description3: string; rewards: string; APR: string; imageSrc: StaticImageData }> = ({ title, description, description2, description3, rewards, APR, imageSrc }) => {
  return (
    // Add transition and transform utilities along with a conditional box-shadow for the hover state
    <div className="bg-slate-800 rounded-lg p-6 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
      <Image src={imageSrc} alt={title} className="mt-2" />
      <h5 className="text-xl text-white" style={{ fontFamily: '"Courier New", Courier, monospace' }}>{title}</h5>
      <p className="text-slate-300" style={{ fontFamily: '"Courier New", Courier, monospace' }}>{description}</p>
      <p className="text-slate-300" style={{ fontFamily: '"Courier New", Courier, monospace' }}>{description2}</p>
      <p className="text-slate-300" style={{ fontFamily: '"Courier New", Courier, monospace' }}>{description3}</p>
      <p className="text-l text-white" style={{ fontFamily: '"Courier New", Courier, monospace' }}>{rewards}</p>
      <p className="text-slate-300" style={{ fontFamily: '"Courier New", Courier, monospace' }}>{APR}</p>
      {/* Use Next.js Image component for optimization */}
    </div>
  );
};

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const { getUserSOLBalance } = useUserSOLBalanceStore()

  // Assuming you create a similar store/hook for your C7 token
  const c7TokenBalance = useC7TokenBalanceStore((s) => s.balance);
  const { getC7TokenBalance } = useC7TokenBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
      getC7TokenBalance(wallet.publicKey, connection); // Fetch C7 token balance
    }
  }, [wallet.publicKey, connection, getUserSOLBalance, getC7TokenBalance]);

  return (
    <div className="md:hero mx-auto ">
      <div className="md:hero-content flex flex-col">

        {/* Reward Pools Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <RewardPoolCard
            title="90 Day Lock"
            description="Fee Allocation: 25%"
            description2="Deposit Ratio 4 - 1"
            description3="Rewards 25,000,000"
            rewards="Rewards: 25,000,000 $DIC"
            APR="APR: 5%"
            imageSrc={day180LockImage}
          />
          <RewardPoolCard
            title="180 Day Lock"
            description="Fee Allocation: 50%"
            description2="Deposit Ratio 2 - 1"
            description3="Rewards 60,000,000"
            rewards="Rewards: 60,000,000 $DIC"
            APR="APR: 10%"
            imageSrc={day90LockImage}
          />
          <RewardPoolCard
            title="360 Day Lock"
            description="Fee Allocation: 100%"
            description2="Deposit Ratio: 1 - 1"
            description3="Rewards 125,000,000"
            rewards="Rewards: 125,000,000 $DIC"
            APR="APR: 20%"
            imageSrc={day360LockImage}
          />
        </div>
        <div className="ml-2 mt-5">{(c7TokenBalance || 0).toLocaleString()} $DIC</div>

        <div className="flex flex-col mt-2">
        <SendTransaction />


        </div>
      </div>
    </div>
  );
};

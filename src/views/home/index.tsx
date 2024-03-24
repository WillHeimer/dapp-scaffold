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
export const RewardPoolCard: FC<{ title: string; description: string; imageSrc: StaticImageData }> = ({ title, description, imageSrc }) => {
  return (
    // Add transition and transform utilities along with a conditional box-shadow for the hover state
    <div className="bg-slate-800 rounded-lg p-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
      <Image src={imageSrc} alt={title} className="mt-2" />
      <h5 className="text-xl text-white" style={{ fontFamily: '"Courier New", Courier, monospace' }}>{title}</h5>
      <p className="text-slate-300" style={{ fontFamily: '"Courier New", Courier, monospace' }}>{description}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
          <RewardPoolCard
            title="90 Day Lock"
            description="This is the first reward pool. Participate to earn rewards."
            imageSrc={day180LockImage}
          />
          <RewardPoolCard
            title="180 Day Lock"
            description="This is the second reward pool. Greater rewards await."
            imageSrc={day90LockImage}
          />
          <RewardPoolCard
            title="360 Day Lock"
            description="The third reward pool offers exclusive benefits."
            imageSrc={day360LockImage}
          />
        </div>

        <div className="flex flex-col mt-2">
        <SendTransaction />

          <h4 className="md:w-full text-2xl text-slate-300 my-2">
          {wallet &&
          <div className="flex flex-row justify-center">
            <div>
              </div>
              <div className='text-slate-600 ml-2'>
              </div>
          </div>
          }
          </h4>
        </div>
      </div>
    </div>
  );
};

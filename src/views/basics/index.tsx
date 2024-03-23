import { FC } from "react";
import { SendTransaction } from "../../components/SendTransaction";

export const BasicsView: FC = ({}) => {
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10 mb-8">
          Lock your Cock
        </h1>
        <p className="text-center text-lg mt-4 mb-8">
          1 billion in rewards delegated to each reward pool
        </p>
        {/* CONTENT GOES HERE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div
            style={{ backgroundColor: "#0000ff" }}
            className="shadow-lg rounded-lg p-5 flex flex-col items-center"
          >
            <h2 className="text-lg font-bold">3 Month Pool</h2>
            <p className="mt-2">Reward: 5%</p>
            <p className="mt-2">Delegated: 50,000,000</p>
          </div>
          <div className="shadow-lg rounded-lg p-5 flex flex-col items-center">
            <h2 className="text-lg font-bold">6 Month Pool</h2>
            <p className="mt-2">Reward: 10%</p>
            <p className="mt-2">Delegated: 100,000,000</p>
          </div>
          <div className="shadow-lg rounded-lg p-5 flex flex-col items-center">
            <h2 className="text-lg font-bold">12 Month Pool</h2>
            <p className="mt-2">Reward: 20%</p>
            <p className="mt-2">Delegated: 200,000,000</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <SendTransaction />
        </div>
      </div>
    </div>
  );
};

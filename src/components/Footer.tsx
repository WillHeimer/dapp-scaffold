import { FC } from 'react';
export const Footer: FC = () => {
    return (
        <div className="flex">
            <footer className="border-t-2 border-[#141414] bg-black hover:text-white w-screen" >
                <div className="ml-12 py-12 mr-12">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-8 md:space-x-12 relative">
                        <div className='flex flex-col col-span-2 mx-4 items-center md:items-start'>
                            <div className='flex flex-row ml-1'>
                            </div>
                            <div className="flex md:ml-2">
                            </div>
                            <div className="mb-6 m-1 sm:text-left place-items-start items-start font-normal tracking-tight text-secondary">
                            </div>
                        </div>

                        <div className="mb-6 items-center mx-auto max-w-screen-lg">

                            <div className="flex flex-col mb-0 gap-2">

                            </div>
                        </div>

                        <div className="mb-6 items-center mx-auto max-w-screen-lg">

                            <div className="flex flex-col mb-0 gap-2">

                            </div>
                        </div>

                        <div className="mb-6 items-center mx-auto max-w-screen-lg">

                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

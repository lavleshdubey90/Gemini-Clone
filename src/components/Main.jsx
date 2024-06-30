import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { Context } from '../context/Context';

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

    const cardData = [
        {
            id: 1,
            para: "Suggest beautiful places to see on an upcoming road trip",
            imgUrl: assets.compass_icon,
            alt: "compass"
        },
        {
            id: 2,
            para: "Briefly summarize this concept: urban planning",
            imgUrl: assets.bulb_icon,
            alt: "bulb"
        },
        {
            id: 3,
            para: "Brainstorm team bonding activities for our work retreat",
            imgUrl: assets.message_icon,
            alt: "message"
        },
        {
            id: 4,
            para: "Tell me about React js and React native",
            imgUrl: assets.code_icon,
            alt: "code"
        },
    ];

    return (
        <div className='flex-1 min-h-screen relative pb-[20vh]'>
            <div className="nav w-full flex items-center justify-between p-5">
                <h2 className='text-[20px]'>Gemini</h2>
                <img src={assets.user_icon} alt="user" height={40} width={40} className='rounded-full' />
            </div>

            <div className='max-w-[900px] mx-auto'>
                {
                    !showResult ?
                        <React.Fragment>
                            <div className="my-12 text-[56px] leading-tight font-medium p-5">
                                <span className='text-transparent bg-clip-text rotate-180 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500'>Hello, John.</span>
                                <h1 className='text-zinc-600'>How can I help you today?</h1>
                            </div>

                            <div className="grid mx-4 gap-4 grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
                                {
                                    cardData.map(({ id, para, imgUrl, alt }) => (
                                        <div key={id} className="h-52 p-4 bg-zinc-900 hover:bg-zinc-800 relative cursor-pointer rounded-lg">
                                            <p className='text-gray-400'>{para}</p>
                                            <div className='absolute w-9 p-1 rounded-full bg-zinc-700 bottom-3 right-3'>
                                                <img src={imgUrl} alt={alt} className='rounded-full filter invert' />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div className='overflow-scroll z-10 max-h-[70vh] py-[5%]'>
                                <div className="title flex mx-10 items-center gap-5">
                                    <img src={assets.user_icon} width={40} height={40} className='rounded-full' alt="user" />
                                    <h3>{recentPrompt}</h3>
                                </div>

                                <div className="flex items-start mx-10 gap-5 mt-10">
                                    <img src={assets.gemini_icon} alt="gemini" width={40} height={40} className='rounded-full hidden sm:block' />
                                    {loading ?
                                        <React.Fragment>
                                            <div className='w-full flex flex-col gap-[10px]'>
                                                <hr className='rounded border-none animate-loading h-5 bg-gradient-to-r from-indigo-900 via-indigo-500 to-indigo-900'/>
                                                <hr className='rounded border-none animate-loading h-5 bg-gradient-to-r from-indigo-900 via-indigo-500 to-indigo-900'/>
                                                <hr className='rounded border-none animate-loading h-5 bg-gradient-to-r from-indigo-900 via-indigo-500 to-indigo-900'/>
                                            </div>
                                        </React.Fragment> :
                                        <p dangerouslySetInnerHTML={{ __html: resultData }} className='text-sm sm:text-lg font-extralight leading-[1.8]'></p>
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                }


                <div className="pt-5 absolute bottom-0 z-10 px-4 w-full max-w-[900px] py-2 mx-auto">
                    <div className="searchbox mx-auto flex items-center justify-between gap-5 bg-zinc-800 px-5 py-2 rounded-full">
                        <input value={input} onChange={(e) => setInput(e.target.value)} className='w-36 sm:w-0 flex-1 bg-transparent outline-none border-none text-sm sm:text-lg p-2' type="text" name="input" id="input" placeholder='Enter a prompt here' />
                        <div className='flex items-center gap-3 sm:gap-5'>
                            <img height={24} width={24} className='cursor-pointer filter invert w-5 sm:w-6' src={assets.gallery_icon} alt="gallery" />
                            <img height={24} width={24} className='cursor-pointer filter invert w-5 sm:w-6' src={assets.mic_icon} alt="mic" />
                            <img onClick={() => (onSent(), setInput(""))} height={24} width={24} className='cursor-pointer filter invert w-5 sm:w-6' src={assets.send_icon} alt="send" />
                        </div>
                    </div>
                    <p className='text-[8px] sm:text-xs text-center mt-5 text-gray-400'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
                </div>
            </div>
        </div>
    )
}

export default Main;
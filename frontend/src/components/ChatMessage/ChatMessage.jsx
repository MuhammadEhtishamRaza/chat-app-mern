import ShowMoreText from 'react-show-more-text';

const ChatMessage = () => {
    const currentsendermsg = false
    const currentsendermsg1 = true
    return (
        <div>
            <div className={`w-full flex ${currentsendermsg ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex w-4/5 ${currentsendermsg ? 'justify-end' : 'justify-start'} mb-2`}>
                    <div className={`p-4 bg-gradient-to-r from-green-100 to-green-50 border-2 ${currentsendermsg ? 'border-yellow-400' : 'border-green-700'} rounded-2xl shadow`}>
                        <ShowMoreText lines={3} more="Show More" less="Show Less" anchorClass="text-green-600 cursor-pointer" className='text-green-700' expanded={false}>
                            Beneath the golden hues of an early autumn sky, a quiet village stirred with gentle purpose. Children laughed as they chased each other through fallen leaves, their boots crunching against the gravel paths. Nearby, a cat dozed on a sunlit windowsill, twitching occasionally in response to dreams only it could see. The baker, always up before dawn, arranged loaves of warm bread in neat rows, the scent drifting through the streets like a silent call to breakfast.
                        </ShowMoreText>
                    </div>
                </div>
            </div>
            <div className={`w-full flex ${currentsendermsg1 ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex w-4/5 ${currentsendermsg1 ? 'justify-end' : 'justify-start'} mb-2`}>
                    <div className={`p-4 bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 ${currentsendermsg1 ? 'border-yellow-400' : 'border-green-700'} rounded-2xl shadow`}>
                        <ShowMoreText lines={3} more="Show More" less="Show Less" anchorClass="text-yellow-600 cursor-pointer" className='text-yellow-700' expanded={false}>
                            Beneath the golden hues of an early autumn sky, a quiet village stirred with gentle purpose. Children laughed as they chased each other through fallen leaves, their boots crunching against the gravel paths. Nearby, a cat dozed on a sunlit windowsill, twitching occasionally in response to dreams only it could see. The baker, always up before dawn, arranged loaves of warm bread in neat rows, the scent drifting through the streets like a silent call to breakfast.
                        </ShowMoreText>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatMessage
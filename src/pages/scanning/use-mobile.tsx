import React from "react";
import Lottie, {Options} from 'react-lottie';
import * as animationData from "../../JSON/mobile-only.json"

export const UseMobile: React.FC = () => {

    const defaultOptions: Options = {
        animationData: animationData,
        loop: false,
        autoplay: true
    }

    return (
        <div className={"bg-trueBlack w-screen h-screen flex flex-col justify-center items-center gap-4"}>
            <Lottie options={defaultOptions}
                    height={200}
                    width={200}
            />

            <div className={"flex flex-col justify-center self-center w-1/2 gap-2"}>
                <h1 className={"font-black text-xl font-ceefax text-ceefaxYellow"}>Unable to Use Ticket Scanning Functionality</h1>
                <p className={"font-ceefax text-lg"}>We're sorry for the inconvenience, but it seems like the ticket scanning functionality is not supported on your current device. To access this feature, please switch to a mobile device.</p>
            </div>

            <div className={"flex flex-col justify-center self-center w-1/2 gap-2"}>
                <h1 className={"font-black font-ceefax text-xl text-ceefaxYellow"}>How to Switch</h1>
                <p className={"font-ceefax text-lg"}>If you're currently using a desktop or unsupported device, simply grab your smartphone or tablet to proceed. Once you've switched to a mobile device, you'll be able to access all the features seamlessly.</p>
            </div>
        </div>
    )
}
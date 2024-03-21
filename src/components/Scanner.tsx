import React, {useEffect, useState} from "react";
import {BrowserMultiFormatReader} from "@zxing/library";
import {isDev} from "../util/env";

interface Props {
    onScan: (ticketId: string) => void;
}

export enum Permission {
    GRANTED = "GRANTED",
    DENIED = "DENIED"
}

const TicketScanner: React.FC<Props> = ({onScan}) => {
    const [permissions, setPermissions] = useState<Permission>(Permission.DENIED);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const reader = new BrowserMultiFormatReader();

    useEffect(() => {
        window.navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: isDev() ? {
                    ideal: "environment"
                } : {
                    exact: "environment"
                }
            }
        }).then((mediaStream) => {
            setStream(mediaStream);
            setPermissions(Permission.GRANTED);
        }).catch(() => {
            setStream(null);
            setPermissions(Permission.DENIED);
        })
    }, []);

    useEffect(() => {
        if (permissions === Permission.GRANTED && stream) {
            decode().then();
        }
    }, [permissions, stream]);

    async function decode() {
        const element = document.getElementsByTagName("video")[0];
        if (element) {
            const scanResult = await reader.decodeOnceFromConstraints({
                video: {
                    facingMode: isDev() ? {
                        ideal: "environment"
                    } : {
                        exact: "environment"
                    }
                }
            }, element);

            const ticketId = scanResult.getText();
            onScan(ticketId);
        }
    }

    return (
        <div className={"relative flex-grow px-4 pb-4 w-full h-full items-center justify-center"}>
            <video className={"w-full h-full object-cover rounded-2xl"} />
            <div className={"absolute flex z-20 w-[calc(100%-32px)] mx-4 h-[calc(100%-16px)] left-0 top-0 bg-transparent justify-center items-center overflow-clip rounded-2xl"}>
                <div className={"corners-border w-9/10 h-32 shadow-scannerOverlay"}>
                    <div className={"-mx-4 bg-imperial h-[2px] w-[calc(100%+32px)] animate-scanner"} />
                </div>
            </div>
        </div>
    )
}

export default TicketScanner;
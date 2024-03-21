import { useRef, useEffect, useState } from 'react';
import MovingBall from '../components/MovingBall';
import { TicketContainer } from '../components/TicketContainer';
import ticketData from '../data/ticketData.json';
import { Ticket } from '../interfaces';

function LiveDraw() {
    const [positions, setPositions] = useState<number[]>([]);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const tickets: Ticket[] = ticketData;

    useEffect(() => {
        const randomIntFromInterval = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const parentWidth = parentRef.current ? parentRef.current.offsetWidth : 0;
        const newPositions = Array.from({ length: 40 }, () => randomIntFromInterval(25, (parentWidth - 100)));
        
        newPositions.forEach((pos, i) => {
            setTimeout(() => {
                setPositions(prevPositions => [...prevPositions, pos]);
            }, i * 100); // Change this value to adjust the interval
        });
    }, []);

    return (
        <div className="App">
            <div className="flex justify-center h-screen space-between pt-6">
                <div ref={parentRef} className="w-1/2 h-64 py-6  pb-10 rounded-full flex flex-wrap justify-center items-center bg-blue-200 relative border-8 border-black">
                    {positions.map((pos, i) => <MovingBall key={i} leftPosition={pos} number={i} />)}
                </div>
                <TicketContainer tickets={tickets} />
            </div>
        </div>
    );
}

export default LiveDraw;
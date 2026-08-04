// "use client"
// import { useEffect, useState } from "react";
// import toast from 'react-hot-toast';
// import { backend_url } from "../URL";

// const Quotes = () => {

//     const [quotes, setQuotes] = useState(null);

//     const getQuotes = async () => {
//         try {
//             let result = await fetch(`${backend_url}/analyze/quote/today`);
//             let data = await result.json();
//            // console.log("quote: ",data?.quote);
//             setQuotes(data?.quote);
//         }
//         catch (err) {
//             // console.log("something went wrong...");
//             toast.error('something went wrong...',{duration:3000,position:"bottom-right"});
//         }
//     }

//     useEffect(() => {
//         getQuotes();
//     }, []);

//     return (
//         <div className="dark rounded-2xl h-full min-h-0 flex flex-col justify-center overflow-hidden p-[clamp(0.9rem,1.4vw,2.6rem)] relative">
//             <div className="absolute -top-[0.2em] right-[0.3em] t-value-xl font-serif text-white/5 select-none leading-none pointer-events-none">”</div>
//             <span className="t-small text-muted-2 font-semibold uppercase tracking-[0.25em] mb-[clamp(0.4rem,0.6vw,1rem)]">
//                 Quote of the Day
//             </span>
//             <div className="flex items-start gap-[clamp(0.4rem,0.6vw,1rem)]">
//                 <span className="t-value-xl leading-[0.7] gradient-emerald font-serif select-none shrink-0">“</span>
//                 <p className="text-lg font-bold gradient-text leading-snug">
//                     {quotes || "Great marketing happens when creativity meets consistency."}
//                 </p>
//             </div>
//         </div>
//     );
// };
// export default Quotes;





"use client"

const Quotes = ({umangQuotesData}) => {

    return (
        <div className="dark rounded-2xl h-full min-h-0 flex flex-col justify-center overflow-hidden p-[clamp(0.9rem,1.4vw,2.6rem)] relative">
            <div className="absolute -top-[0.2em] right-[0.3em] t-value-xl font-serif text-white/5 select-none leading-none pointer-events-none">”</div>
            <span className="t-small text-muted-2 font-semibold uppercase tracking-[0.25em] mb-[clamp(0.4rem,0.6vw,1rem)]">
                Quote of the Day
            </span>
            <div className="flex items-start gap-[clamp(0.4rem,0.6vw,1rem)]">
                <span className="t-value-xl leading-[0.7] gradient-emerald font-serif select-none shrink-0">“</span>
                <p className="text-lg font-bold gradient-text leading-snug">
                {umangQuotesData?.quote || "Great marketing happens when creativity meets consistency."}
                </p>
            </div>
        </div>
    );
};
export default Quotes;


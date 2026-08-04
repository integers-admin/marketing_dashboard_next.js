// "use client";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { useEffect, useState } from "react";
// import toast from 'react-hot-toast';
// import { backend_url } from "../URL";

// const CarouselComponent = () => {

//   const settings = {
//     arrows: false,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     pauseOnHover: true,
//   };

// const [newsData, setNewsData] = useState([]);

// const newsData1=[
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, aperiamelit. Consequatur, aperiam elit Consequatur, aperiam Consequatur, adipisicing.",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, aperiamelit. Consequatur, aperiam elit Consequatur, aperiam Consequatur, adipisicing.",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, aperiamelit. Consequatur, aperiam elit Consequatur, aperiam Consequatur, adipisicing.",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, aperiamelit. Consequatur, aperiam elit Consequatur, aperiam Consequatur, adipisicing.",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, aperiamelit. Consequatur, aperiam elit Consequatur, aperiam Consequatur, adipisicing.",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, aperiamelit. Consequatur, aperiam elit Consequatur, aperiam Consequatur, adipisicing.",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, aperiamelit. Consequatur, aperiam elit Consequatur, aperiam Consequatur, adipisicing.",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, aperiamelit. Consequatur, aperiam elit Consequatur, aperiam Consequatur, adipisicing.",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, aperiamelit. Consequatur, aperiam elit Consequatur, aperiam Consequatur, adipisicing.",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, aperiamelit. Consequatur, aperiam elit Consequatur, aperiam Consequatur, adipisicing."
// ]



//   const getNews = async () => {
//     try {
//       let result = await fetch(`${backend_url}/analyze/trends/global-news/latest`);
//       let data = await result.json();
//       const newsArray = data
//         .split("\n")                 
//         .map(item => item.trim())
//         .filter(Boolean);            // remove empty string
//       setNewsData(newsArray);
//      // console.log(newsArray);
//     }
//     catch (err) {
//      // console.log("something went wrong...");
//       toast.error('something went wrong...',{duration:3000,position:"bottom-right"});
//     }
//   }

//   useEffect(() => {
//     getNews();
//   }, []);

//   return (
//     <div className="h-full overflow-hidden rounded-xl dark-card">
//       <Slider {...settings} className="h-full">
//         {newsData1?.map((txt, i) => {
//           return (
//             <div className="h-full" key={i}>
//               <div className="h-full flex flex-col rounded-xl p-[clamp(0.5rem,0.8vw,1.4rem)]">
//                 <h3 className="t-small font-bold text-cyan-300 uppercase tracking-wide mb-1 shrink-0">News {i + 1}</h3>
//                 <div className="flex-1 overflow-hidden t-body text-strong leading-snug">
//                   {txt}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </Slider>
//     </div>
//   );
// }

// export default CarouselComponent;






"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CarouselComponent = ({newsData}) => {

  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <div className="h-full overflow-hidden rounded-xl dark-card">
      <Slider {...settings} className="h-full">
        {newsData?.map((txt, i) => {
          return (
            <div className="h-full" key={i}>
              <div className="h-full flex flex-col rounded-xl p-[clamp(0.5rem,0.8vw,1.4rem)]">
                <h3 className="t-small font-bold text-cyan-300 uppercase tracking-wide mb-1 shrink-0">News {i + 1}</h3>
                <div className="flex-1 overflow-hidden t-body text-strong leading-snug">
                  {txt?.title}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default CarouselComponent;
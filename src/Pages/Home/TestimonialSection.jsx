import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    quote:
      "This platform completely changed the way I work. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    quote: "Amazing experience! The interface is super intuitive and fast.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Lee",
    quote: "Customer support was great. Everything just works.",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Lisa Ray",
    quote: "I've seen noticeable improvements in productivity. Love it!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "David Kim",
    quote: "Clean, fast, and reliable. What more could I ask for?",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    name: "Emma Watson",
    quote: "Their customer-first approach is truly refreshing.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Alex Turner",
    quote: "Very smooth experience, both on desktop and mobile.",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    name: "Nina Patel",
    quote: "Hands down the best service I’ve used in a while!",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "Carlos Rivera",
    quote: "It has made collaboration in my team seamless.",
    image: "https://randomuser.me/api/portraits/men/91.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={true}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-w-6xl mx-auto"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#D0DDD0] p-6 rounded-xl shadow-lg h-full flex flex-col items-center text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 mb-4 rounded-full object-cover ring ring-[#727D73] ring-offset-2"
                />
                <FaQuoteLeft className=" text-[#727D73] text-2xl mb-2" />
                <p className="text-base italic mb-4">"{t.quote}"</p>
                <h4 className="font-bold text-lg">{t.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;

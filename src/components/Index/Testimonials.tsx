import Image from 'components/Image';

export const Testimonials = () => {
  return (
    <div className="mx-auto w-full bg-cape-cod-50 p-8 py-16">
      <p className="m-auto w-full text-center text-lg text-cape-cod-600 md:w-2/3 md:text-3xl">
        <span className="font-bold text-selective-yellow-600">“</span>
        I’ve been using the courses on the website for a few months now and I’m
        really happy with the results. I’ve been able to get a lot of practice
        with the courses and I’m really enjoying the way they work. I’ve also
        found the courses to be very useful for my own learning.
        <span className="font-bold text-selective-yellow-600">”</span>
      </p>
      <div className="mt-8 flex items-center justify-center">
        <a href="#" className="relative block">
          <div className="mx-auto h-10 w-10">
            <Image
              rounded={true}
              layout="fill"
              alt="profil"
              src="https://www.tailwind-kit.com/images/person/1.jpg"
            />
          </div>
        </a>
        <div className="ml-2 flex items-center justify-center">
          <span className="mr-2 text-lg font-semibold text-selective-yellow-700">
            Jean Miguel
          </span>
          <span className="text-xl font-light text-cape-cod-600">/</span>
          <span className="text-md ml-2 text-cape-cod-700">
            User of Valley-AC
          </span>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

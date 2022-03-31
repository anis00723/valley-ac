export const Testimonials = () => {
  return (
    <div className="mx-auto w-full bg-gray-300 p-8 py-16">
      <p className="m-auto w-full text-center text-lg text-gray-800 md:w-2/3 md:text-3xl">
        <span className="font-bold text-indigo-500">“</span>
        To get social media testimonials like these, keep your customers engaged
        with your social media accounts by posting regularly yourself
        <span className="font-bold text-indigo-500">”</span>
      </p>
      <div className="mt-8 flex items-center justify-center">
        <a href="#" className="relative block">
          <img
            alt="profil"
            src="https://www.tailwind-kit.com/images/person/1.jpg"
            className="mx-auto h-10 w-10 rounded-full object-cover "
          />
        </a>
        <div className="ml-2 flex items-center justify-center">
          <span className="mr-2 text-lg font-semibold text-indigo-600">
            Jean Miguel
          </span>
          <span className="text-xl font-light text-gray-600">/</span>
          <span className="text-md ml-2 text-gray-700">User of Tail-Kit</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

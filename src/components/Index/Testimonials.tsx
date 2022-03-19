export const Testimonials = () => {
  return (
    <div className="w-full p-8 py-16 mx-auto bg-gray-300">
      <p className="w-full m-auto text-lg text-center text-gray-800 md:w-2/3 md:text-3xl">
        <span className="font-bold text-indigo-500">“</span>
        To get social media testimonials like these, keep your customers engaged
        with your social media accounts by posting regularly yourself
        <span className="font-bold text-indigo-500">”</span>
      </p>
      <div className="flex items-center justify-center mt-8">
        <a href="#" className="relative block">
          <img
            alt="profil"
            src="https://www.tailwind-kit.com/images/person/1.jpg"
            className="object-cover w-10 h-10 mx-auto rounded-full "
          />
        </a>
        <div className="flex items-center justify-center ml-2">
          <span className="mr-2 text-lg font-semibold text-indigo-600">
            Jean Miguel
          </span>
          <span className="text-xl font-light text-gray-600">/</span>
          <span className="ml-2 text-gray-700 text-md">User of Tail-Kit</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

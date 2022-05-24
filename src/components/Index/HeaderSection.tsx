import {
  AcademicCapIcon,
  GlobeIcon,
  IdentificationIcon,
} from '@heroicons/react/outline';
import Image from 'components/Image';

const features = [
  {
    name: 'Quality training',
    description:
      'The training center is certified and recognized by 2 international organizations',
    icon: IdentificationIcon,
  },
  {
    name: 'Online',
    description:
      'Training accessible for life from your computer, tablet and mobile',
    icon: GlobeIcon,
  },
  {
    name: '+ 10,000 satisfied students',
    description:
      'We seek 100% satisfaction through training and quality service',
    icon: AcademicCapIcon,
  },
];

const HeaderSection = () => (
  <div className="bg-cape-cod-50">
    {/* Header */}
    <div className="relative bg-gray-800 pb-32">
      <div className="absolute inset-0">
        <div className="h-full w-full object-cover">
          <Image
            layout="fill"
            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
            alt="E-Learning"
          />
        </div>
        <div
          className="absolute inset-0 bg-valley-gray-600 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          Learn From{' '}
          <span className="underline decoration-valley-yellow-500 underline-offset-4">
            The Best
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-gray-300">
          We are a training center that offers a wide range of courses for
          different categories.
        </p>
      </div>
    </div>

    {/* Overlapping cards */}
    <section
      className="relative z-10 mx-auto -mt-32 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <h2 className="sr-only" id="contact-heading">
        Features
      </h2>
      <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
        {features.map((link) => (
          <div
            key={link.name}
            className="flex flex-col rounded-2xl bg-white shadow-xl"
          >
            <div className="relative flex-1 px-6 pt-20 pb-8 md:px-8">
              <div className="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-valley-yellow-600 p-5 shadow-lg">
                <link.icon
                  className="h-6 w-6 text-valley-gray-400"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900">{link.name}</h3>
              <p className="mt-4 text-base text-gray-500">{link.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default HeaderSection;

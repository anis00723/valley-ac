import {
  AcademicCapIcon,
  GlobeIcon,
  IdentificationIcon,
} from '@heroicons/react/outline';

const features = [
  {
    name: 'Formations de qualités',
    description:
      'Le centre de formation est certifié et reconnu par 2 Organismes internationaux',
    icon: IdentificationIcon,
  },
  {
    name: 'En ligne',
    description:
      'Des Formations accessibles à vie depuis votre ordinateur, tablette et mobile',
    icon: GlobeIcon,
  },
  {
    name: '+ de 10.000 étudiant(e)s satifisfait(e)s',
    description:
      'Nous recherchons le 100% de satisfactions grâce à des formations et un service de qualité',
    icon: AcademicCapIcon,
  },
];

const HeaderSection = () => (
  <div className="bg-gray-100">
    {/* Header */}
    <div className="relative pb-32 bg-gray-800">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
          alt=""
        />
        <div
          className="absolute inset-0 bg-gray-800 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative px-4 py-24 mx-auto max-w-7xl sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          Learn From{' '}
          <span className="underline underline-offset-4 decoration-indigo-500">
            The Best
          </span>
        </h1>
        <p className="max-w-3xl mt-6 text-xl text-gray-300">
          Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id
          malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.
          Dui, amet, nec sit pulvinar.
        </p>
      </div>
    </div>

    {/* Overlapping cards */}
    <section
      className="relative z-10 px-4 pb-16 mx-auto -mt-32 max-w-7xl sm:px-6 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <h2 className="sr-only" id="contact-heading">
        Features
      </h2>
      <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
        {features.map((link) => (
          <div
            key={link.name}
            className="flex flex-col bg-white shadow-xl rounded-2xl"
          >
            <div className="relative flex-1 px-6 pt-20 pb-8 md:px-8">
              <div className="absolute top-0 inline-block p-5 transform -translate-y-1/2 bg-indigo-600 shadow-lg rounded-xl">
                <link.icon className="w-6 h-6 text-white" aria-hidden="true" />
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

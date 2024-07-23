import Image from 'next/image';
import { FaPhone } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 max-w-[1100px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/neighborhood_clout_logo.png"  // Replace with your actual logo path
                alt="Neighborhood Clout Logo"
                width={150}  // Adjust based on your logo's dimensions
                height={60}  // calculated based on width
                className="mr-4"
                unoptimized={true}
              />
            </div>
            {/* Add any additional navbar items here if needed */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-[1100px]">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8 flex items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Get more roofing leads on autopilot
            </h1>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-auto rounded-lg overflow-hidden">
              <Image
                src="/overbooked.jpg"
                alt="Overbooked calendar"
                width={550}
                height={550}
                layout="responsive"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Subheading */}
        <div className="mb-16">
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto text-center">
            Neighborhood Clout is the fully done-for-you service that converts your happy customers into Google Maps reviews that skyrocket your inbound leads.
          </p>
        </div>

        {/* CTA Button and Phone Number */}
        <div className="flex flex-col items-center">
          <a
            href="tel:412-213-8695"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-center transition duration-300 ease-in-out text-lg md:text-xl flex items-center space-x-2 mb-4"
          >
            <FaPhone />
            <span>GET MORE INBOUND LEADS</span>
          </a>
          <p className="text-gray-700 text-lg">
            Call us: <a href="tel:412-213-8695" className="text-blue-600 hover:underline">412-213-8695</a>
          </p>
        </div>
        <div className="max-w-2xl mx-auto md:mx-0 mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Growing your business made easy
          </h2>
          <div className="space-y-4 text-xl">
            <p>Today's homeowners are picky with who they hire.</p>
            <p className="font-bold bg-yellow-100 p-2">
              81% of homeowners look at Google Business reviews when making a hiring decision.
            </p>
            <p>54% of homeowners won't hire someone with less than a 4 star rating.</p>
            <p>52% of homeowners expect to see a recent review from within the past month.</p>
            <p>
              They might learn about you from a friend, social media ad, or direct mailer. But <strong>before they call, they'll check your Google Maps reviews</strong>.
            </p>
            <p>When we get you more reviews, you'll see</p>
            <ol className="list-decimal list-inside pl-4 space-y-2">
              <li>More inbound leads as homeowners trust you more</li>
              <li>Better ranking in Google searches, leading to even more inbound leads</li>
            </ol>
            <p>We help your business grow without constant ad spend and marketing.</p>
          </div>
        </div>
        {/* How it works section */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="w-full md:w-1/3">
              <Image
                src="/star_funnel.jpg"
                alt="Star rating funnel illustration"
                width={500}
                height={500}
                layout="responsive"
                className="rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
                How it works:
              </h2>
              <ol className="list-decimal list-inside space-y-6 text-xl">
                <li>
                  <span className="font-bold">Give us a customer list.</span> We're not picky. It can be a spreadsheet, Word doc, anything will do. No lengthy onboarding or new accounts to setup!
                </li>
                <li>
                  <span className="font-bold">We reach out to your customers.</span> We get feedback, ask how they'd rate your work, and get happy customers to leave you 5-star reviews.
                </li>
                <li>
                  <span className="font-bold">Your online reputation grows.</span> You start getting more inbound calls than you thought possible and appear more frequently in online searches.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
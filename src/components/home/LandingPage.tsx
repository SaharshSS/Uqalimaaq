import { BookOpen, Users, Award, Globe } from 'lucide-react';
import { useState } from 'react';
import { AuthModal } from '../auth/AuthModal';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <img src="/logo_new.png" alt="Uqalimaaq Logo" className="w-24 h-24 mx-auto" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="text-white">Learn Pacific Northwest</span>
              <br />
              <span className="bg-gradient-to-r from-[#E07856] via-gray-400 to-[#7BA4B5] bg-clip-text text-transparent">
                Indigenous Languages
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Master Tlingit and other Pacific Northwest and Alaska indigenous languages through
              interactive lessons, pronunciation guides, and cultural immersion.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-8 py-4 bg-[#E07856] text-white rounded-2xl hover:bg-[#D06846] transition font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Learning Free
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <FeatureCard
              icon={<BookOpen className="text-[#E07856]" size={32} />}
              title="Interactive Lessons"
              description="Engaging lessons designed for all skill levels"
            />
            <FeatureCard
              icon={<Users className="text-[#7BA4B5]" size={32} />}
              title="Cultural Context"
              description="Learn language through cultural storytelling"
            />
            <FeatureCard
              icon={<Award className="text-[#D4B896]" size={32} />}
              title="Gamified Learning"
              description="Earn XP, maintain streaks, unlock achievements"
            />
            <FeatureCard
              icon={<Globe className="text-[#7BA4B5]" size={32} />}
              title="Pronunciation"
              description="Master authentic pronunciation with audio guides"
            />
          </div>

          <div className="bg-[#D4B896] rounded-3xl shadow-xl p-8 sm:p-12 mb-16">
            <h2 className="text-3xl font-bold text-[#8B5A3C] mb-4 text-center">
              Why Learn Indigenous Languages?
            </h2>
            <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto">
              Indigenous languages carry thousands of years of knowledge, culture, and wisdom.
              By learning Tlingit and other Pacific Northwest languages, you're not just learning
              words—you're connecting with living cultures and helping preserve them for future generations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard number="10,000+" label="Years of History" />
              <StatCard number="20+" label="Language Families" />
              <StatCard number="Critical" label="Preservation Status" />
            </div>
          </div>

          <div className="bg-[#D4B896] rounded-3xl shadow-xl p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-[#8B5A3C] mb-4 text-center">
              Indigenous Languages Available
            </h2>
            <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto">
              Learn authentic Pacific Northwest and Alaskan Indigenous languages with native speakers and cultural context.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LanguageCard
                name="Tlingit"
                description="Learn the language of Southeast Alaska with pronunciation guides and cultural stories."
                region="Southeast Alaska"
                available={true}
              />
              <LanguageCard
                name="Haida"
                description="Discover the Haida language from Haida Gwaii with traditional oral teachings."
                region="Haida Gwaii, BC"
                available={false}
              />
              <LanguageCard
                name="Tsimshian"
                description="Learn the Tsimshian language from coastal British Columbia and Alaska."
                region="BC & Alaska Coast"
                available={false}
              />
              <LanguageCard
                name="Kwak'wala"
                description="Explore the Kwak'wala language from Vancouver Island and the BC coast."
                region="Vancouver Island"
                available={false}
              />
              <LanguageCard
                name="Chinook Jargon"
                description="Learn the historical trade language of the Pacific Northwest region."
                region="Pacific Northwest"
                available={false}
              />
              <LanguageCard
                name="Inuktitut"
                description="Discover the Inuktitut language from Alaska and Canada's northern regions."
                region="Alaska & N. Canada"
                available={false}
              />
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#3D3D3D] rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-[#8B5A3C] mb-1">
        {number}
      </div>
      <div className="text-gray-700 text-sm">{label}</div>
    </div>
  );
}

function LanguageCard({
  name,
  description,
  region,
  available
}: {
  name: string;
  description: string;
  region: string;
  available: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition relative">
      {!available && (
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-[#E07856] text-white text-xs font-bold rounded-full">
            COMING SOON
          </span>
        </div>
      )}
      <h3 className="font-bold text-[#8B5A3C] text-xl mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <p className="text-[#7BA4B5] text-xs font-semibold">{region}</p>
    </div>
  );
}

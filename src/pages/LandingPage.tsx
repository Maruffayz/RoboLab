import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Zap, Users } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <span className="text-8xl animate-bounce">🤖</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Robototexnikani o'rgan.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Kod yoz. Robotni boshqar.
            </span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Interaktiv darslar va simulatorni foydalanib, robototexnikani o'rganing. 
            Professional dasturchilar kabi kod yozib, robotlarni boshqarishni o'rganing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/learn"
              className="btn-primary flex items-center justify-center gap-2 text-lg"
            >
              Boshlash
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/simulator"
              className="btn-secondary flex items-center justify-center gap-2 text-lg"
            >
              Simulatorni sinash
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="card">
            <div className="flex justify-center mb-4">
              <Code2 size={48} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Interaktiv Darslar
            </h3>
            <p className="text-gray-700 dark:text-gray-400">
              Muvaffaqiyatli o'rganish uchun struktura bilan tuzilgan, qadama-qadam darslar.
            </p>
          </div>

          <div className="card">
            <div className="flex justify-center mb-4">
              <Zap size={48} className="text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Virtual Simulator
            </h3>
            <p className="text-gray-700 dark:text-gray-400">
              Haqiqiy robotlardan avval virtual muhitda kodini sinab ko'ring va o'rganing.
            </p>
          </div>

          <div className="card">
            <div className="flex justify-center mb-4">
              <Users size={48} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Jamoa Loyihasi
            </h3>
            <p className="text-gray-700 dark:text-gray-400">
              Boshqa o'quvchilar bilan hamkorlik qilip, jamoa layihalarida ishtiroki.
            </p>
          </div>
        </section>

        {/* Signup CTA Section */}
        <section className="mt-24 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hoziroq boshlaymiz!
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Robotexnika olamiga kirish uchun ro'yxatdan o'tib, yangi imkoniyatlarni kashf eting.
          </p>
          <Link to="/register" className="btn-primary text-lg inline-block">
            Ro'yxatdan o'tish
          </Link>
        </section>
      </section>
    </div>
  );
};

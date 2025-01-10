import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-400 via-white to-cyan-300">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-8 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-8">
          Welcome to the <span className="text-indigo-900">School Management System</span>
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 max-w-4xl mt-6">
          <Link href="/AddSchool">
            <div className="p-6 text-left border border-gray-300 rounded-xl shadow-lg w-80 bg-white hover:bg-indigo-400 hover:text-white transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-indigo-700 hover:text-white">
                Add School &rarr;
              </h3>
              <p className="mt-4 text-lg text-gray-700 hover:text-gray-100">
                Easily register a new school and its details in the system.
              </p>
            </div>
          </Link>
          <Link href="/ShowSchool">
            <div className="p-6 text-left border border-gray-300 rounded-xl shadow-lg w-80 bg-white hover:bg-indigo-400 hover:text-white transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-indigo-700 hover:text-white">
                Show Schools &rarr;
              </h3>
              <p className="mt-4 text-lg text-gray-700 hover:text-gray-100">
                Browse and manage all registered schools seamlessly.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

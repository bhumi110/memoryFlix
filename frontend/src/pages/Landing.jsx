import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-black" />
        <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/6e8c9d40.jpg')] bg-cover bg-center opacity-30" />

        {/* Navbar */}
        <div className="relative z-10 flex justify-between items-center px-12 py-6">
          <h1 className="text-2xl font-bold text-red-600">MEMORYFLIX</h1>
          <button
            onClick={() => navigate("/login")}
            className="text-sm hover:underline"
          >
            Sign In
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 mt-24 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Your life, stored <br />
            like a <span className="text-red-600">series</span>.
          </h2>

          <p className="text-gray-300 mt-6 text-lg">
            A private, cinematic vault for your most precious memories.  
            Watch your life unfold like a Netflix original.
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/register")}
              className="bg-red-600 px-6 py-3 rounded font-semibold hover:bg-red-700"
            >
              ▶ Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border border-gray-500 px-6 py-3 rounded hover:bg-white hover:text-black"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-12 py-24 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Private by Design",
            desc: "Your videos are yours alone. No sharing, no social features. Just you and your memories.",
          },
          {
            title: "Organize into Series",
            desc: "Group related memories into seasons and episodes. Turn your life into binge-worthy content.",
            highlight: true,
          },
          {
            title: "Watch Like Netflix",
            desc: "Horizontal rows, beautiful thumbnails, smooth playback. The streaming experience, but personal.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`border rounded-xl p-6 bg-black/40 ${
              item.highlight
                ? "border-red-600"
                : "border-gray-800"
            }`}
          >
            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-24 bg-gradient-to-t from-black via-black/90 to-black">
        <h2 className="text-4xl font-bold">
          Ready to start your{" "}
          <span className="text-red-600">story</span>?
        </h2>

        <p className="text-gray-400 mt-4">
          Begin capturing and organizing your memories today.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 bg-red-600 px-8 py-4 rounded font-semibold hover:bg-red-700"
        >
          ▶ Get Started Free
        </button>
      </section>

      {/* FOOTER */}
      <footer className="flex justify-between px-12 py-6 text-sm text-gray-500 border-t border-gray-800">
        <span className="text-red-600 font-semibold">MEMORYFLIX</span>
        <span>© 2026 MemoryFlix. Your memories, your story.</span>
      </footer>
    </div>
  );
};

export default Landing;

import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./Auth_cont";
import IdeaCard from "./components/IdeaCard";
import SubmitModal from "./components/SubmitModal";
import img from './image.png'
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [ideas, setIdeas] = useState([]);
  const [news, setNews] = useState([]);
  const { user } = useAuth() || {};
  const [votedIdeas, setVotedIdeas] = useState(user?.votedFor || []);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      try {
        const [ideaRes, newsRes] = await Promise.all([
          axios.get("https://csi-ideathon.onrender.com/ideas"),
          axios.get("https://csi-ideathon.onrender.com/news"),
        ]);
        if (mounted) {
          const uniqueIdeas = Array.from(
            new Map(ideaRes.data.map((i) => [i._id, i])).values()
          );
          setIdeas(uniqueIdeas);
          setNews(newsRes.data);
          if (user) {
            const submitted = uniqueIdeas.some(
              (i) =>
                i.authorId === user._id ||
                i.submitterId === user._id ||
                i.author === user.name ||
                i.email === user.email
            );
            setHasSubmitted(submitted);
          }
        }
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };
    fetchAll();
    return () => {
      mounted = false;
    };
  }, []);

  const maxVotes = 3;
  const remainingVotes = maxVotes - votedIdeas.length;

  const vote = async (ideaId) => {
    if (remainingVotes <= 0) {
      return alert("You’ve used all your 3 votes!");
    }
    const userToken = sessionStorage.getItem("token");
    try {
      const res = await axios.post("https://csi-ideathon.onrender.com/vote", {
        ideaId,
        userId: userToken,
      });
      setVotedIdeas((prev) => [...prev, ideaId]);
      alert(`Vote added! You have ${remainingVotes - 1} votes left.`);
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  const submitIdea = async () => {
    if (hasSubmitted)
      return alert("You’ve already submitted an idea.");
    if (!form.title || !form.description)
      return alert("Please fill both title and description");

    try {
      const res = await axios.post("https://csi-ideathon.onrender.com/idea", {
        idea: form,
        userId: user._id,
      });
      setIdeas((prev) => [res.data, ...prev]);
      setForm({ title: "", description: "" });
      setHasSubmitted(true);
      setOpen(false);
    } catch (err) {
      console.error("Error submitting idea:", err);
    }
  };

  const subscribe = () => {
    if (!email.trim()) return alert("Enter your email");
    alert(`Subscribed successfully with ${email}`);
    setSubscribeOpen(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f9ff] via-[#edf2fb] to-[#e3f2fd] p-6 text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
        <div className=" flex gap-2">
        <img src={img} className=" rounded-full w-10"/>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a8a] tracking-tight">
             CSI IdeaThon💡
          </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setSubscribeOpen(true)}
              className="w-full sm:w-auto bg-[#E16254] hover:bg-[#d95647] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:scale-105 transition"
            >
              Subscribe
            </button>
            <button
              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition shadow-md ${
                hasSubmitted
                  ? "bg-gray-300 cursor-not-allowed text-white"
                  : "bg-[#1e3a8a] hover:bg-[#273ea5] text-white hover:scale-105"
              }`}
              disabled={hasSubmitted}
              onClick={() => !hasSubmitted && setOpen(true)}
            >
              + Submit Idea
            </button>
          </div>
        </motion.header>

        {/* Voting Status */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            {remainingVotes > 0
              ? `You have ${remainingVotes} vote${remainingVotes > 1 ? "s" : ""} remaining`
              : "You’ve used all your votes 🎉"}
          </p>
          <div className="w-1/3 bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#1e3a8a] h-2 rounded-full transition-all"
              style={{ width: `${(votedIdeas.length / maxVotes) * 100}%` }}
            ></div>
          </div>
        </div>

  {/* Responsive Layout */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Ideas */}
          <motion.div
            className="col-span-1 md:col-span-2 h-screen bg-white rounded-3xl shadow-lg p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">
              Explore Ideas
            </h2>
<div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 overflow-y-auto max-h-[75vh] pr-2">
              {ideas.length === 0 ? (
                <p className="text-gray-500 italic">No ideas yet</p>
              ) : (
                ideas.map((idea) => (
                  <IdeaCard
                    key={idea._id}
                    idea={idea}
                    disabled={
                      votedIdeas.includes(idea._id) || remainingVotes <= 0
                    }
                    onVote={vote}
                  />
                ))
              )}
            </div>
          </motion.div>

          {/* Right: News */}
          <motion.div
            className="col-span-1 bg-[#1e3a8a] text-white rounded-3xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Latest Updates 📰</h2>
            {news.length === 0 ? (
              <p className="text-blue-100 italic">No news available</p>
            ) : (
              news.slice(0, 8).map((n) => (
                <motion.div
                  key={n._id || n.id}
                  className="bg-white/10 flex gap-3 items-start p-4 w-full rounded-xl mb-3 hover:bg-white/20 transition"
                  whileHover={{ scale: 1.03 }}
                >
                  {n.img && <img src={n.img} className="rounded-2xl w-24 h-16 object-cover flex-shrink-0" alt="news" />}
                  <div>
                    <h3 className="font-semibold text-white">{n.title}</h3>
                    <p className="text-sm text-blue-100 mt-1">{n.desc}</p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>

      {/* Idea Modal */}
      <AnimatePresence>
        {open && (
          <SubmitModal
            form={form}
            setForm={setForm}
            onSubmit={submitIdea}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Subscribe Modal */}
      {subscribeOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-2xl font-semibold mb-2 text-[#1e3a8a]">
              Subscribe for Updates
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Get notified when new ideas or news drop!
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-[#1e3a8a] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-center gap-3">
              <button
                onClick={subscribe}
                className="bg-[#1e3a8a] text-white px-5 py-2 rounded-lg hover:bg-[#273ea5]"
              >
                Subscribe
              </button>
              <button
                onClick={() => setSubscribeOpen(false)}
                className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Home;
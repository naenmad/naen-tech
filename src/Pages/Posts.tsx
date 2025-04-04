import React, { useEffect, memo, useState, useMemo } from "react";
import { BookOpen, Calendar, Clock, Search, Tag, Sparkles, ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// Tipe untuk Post
interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: number;
}

// Komponen Header
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        My Posts
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Sharing thoughts, insights, and learning journeys
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

// Komponen PostCard
const PostCard: React.FC<{ post: Post; index: number }> = memo(({ post, index }) => {
  const animationDelay = index * 100;

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={animationDelay}
      className="relative group bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 h-full flex flex-col"
    >
      {/* Gradient overlay */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#6366f1]/5 to-[#a855f7]/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Featured image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10"></div>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Category tag */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-200 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-300">
          {post.title}
        </h3>

        <div className="flex items-center text-gray-400 text-sm mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

        <a
          href={`/post/${post.id}`}
          className="inline-flex items-center text-sm font-medium text-[#a855f7] hover:text-[#6366f1] transition-colors duration-300 mt-auto"
        >
          Read more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
});

// Komponen PostsPage
const PostsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch posts from Firebase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsQuery = query(collection(db, "posts"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(postsQuery);

        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        })) as Post[];

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Extract unique categories from fetched posts
  const categories = useMemo<string[]>(
    () => ["all", ...new Set(posts.map((post) => post.category))],
    [posts]
  );

  // Filter posts based on search query and active category
  const filteredPosts = useMemo<Post[]>(
    () =>
      posts.filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "all" || post.category === activeCategory;
        return matchesSearch && matchesCategory;
      }),
    [posts, searchQuery, activeCategory]
  );

  // AOS initialization
  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="Posts"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        {/* Search and Filter */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center" data-aos="fade-up" data-aos-duration="800">
          <div className="relative w-full sm:w-auto flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#a855f7]/50 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto justify-start sm:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12" data-aos="fade-up" data-aos-duration="800">
            <BookOpen className="w-16 h-16 mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-300 mb-2">No posts found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PostsPage);
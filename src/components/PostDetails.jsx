import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, Calendar, Clock, User, Tag, Share2, 
  Bookmark, ThumbsUp, MessageSquare, ChevronRight, 
  ExternalLink, BookOpen, Hash, FileText, Star, Layers
} from "lucide-react";
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { motion } from "framer-motion";

const TagBadge = ({ tag }) => {
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Hash className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tag}
        </span>
      </div>
    </div>
  );
};

const RelatedPostItem = ({ post, navigate }) => {
  return (
    <li 
      onClick={() => navigate(`/post/${post.id}`)}
      className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 cursor-pointer"
    >
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors font-medium">
          {post.title}
        </h4>
        <div className="flex items-center mt-1 space-x-2 text-xs text-gray-400">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>
    </li>
  );
};

const PostStats = ({ post }) => {
  const readTime = post?.readTime || 0;
  const tagsCount = post?.tags?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Clock className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">{readTime}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Min Read</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
        <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Tag className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-200">{tagsCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Tags</div>
        </div>
      </div>
    </div>
  );
};

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postDoc = await getDoc(doc(db, 'posts', id));
        
        if (postDoc.exists()) {
          const postData = {
            id: postDoc.id,
            ...postDoc.data(),
            date: postDoc.data().date?.toDate().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) || 'No date'
          };
          
          setPost(postData);
          
          // Fetch related posts
          if (postData.category) {
            try {
              const relatedQuery = query(
                collection(db, 'posts'),
                where('category', '==', postData.category),
                limit(4)
              );
              
              const relatedSnapshot = await getDocs(relatedQuery);
              const relatedData = relatedSnapshot.docs
                .filter(doc => doc.id !== id)
                .slice(0, 3)
                .map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                  date: doc.data().date?.toDate().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) || 'No date'
                }));
              
              setRelatedPosts(relatedData);
            } catch (relatedErr) {
              console.error("Error fetching related posts:", relatedErr);
              // Continue even if related posts fail
            }
          }
        } else {
          console.log(`Document with ID ${id} not found`);
          setError("Post not found - No such document");
        }
      } catch (err) {
        console.error("Error fetching post:", err.message);
        setError(`Failed to load post: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Post...</h2>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#030014] flex flex-col justify-center items-center pt-20 pb-20 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{error || "Post not found"}</h2>
          <p className="text-gray-400 mb-6">The post you're looking for might have been removed or is temporarily unavailable.</p>
          <Link 
            to="/#Posts" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      {/* Background animations */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>Posts</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-white/90 truncate">{post.title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  {post.title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="flex flex-wrap items-center text-gray-400 text-sm gap-y-2 gap-x-4">
                <div className="flex items-center bg-white/5 px-3 py-1.5 rounded-full">
                  <Calendar className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center bg-white/5 px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-purple-400 mr-1.5" />
                  <span>{post.readTime} min read</span>
                </div>
                {post.author && (
                  <div className="flex items-center bg-white/5 px-3 py-1.5 rounded-full">
                    <User className="w-3.5 h-3.5 text-pink-400 mr-1.5" />
                    <span>{post.author}</span>
                  </div>
                )}
                <div className="flex items-center bg-white/5 px-3 py-1.5 rounded-full">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400 mr-1.5" />
                  <span>{post.category}</span>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <PostStats post={post} />

              {post.tags && post.tags.length > 0 && (
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white/90 flex items-center gap-2 md:gap-3">
                    <Tag className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {post.tags.map((tag, index) => (
                      <TagBadge key={index} tag={tag} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Main content for article */}
              <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Article Content
                </h3>
                <div className="prose prose-invert prose-lg max-w-none">
                  {post.content ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  ) : (
                    <p className="text-gray-300">{post.excerpt}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>

              {/* Social sharing and actions - DISABLED */}
              <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-300 relative">
                {/* Disabled overlay */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                  <div className="px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm font-medium border border-white/10">
                    Coming Soon
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3 mb-4">
                  <Share2 className="w-5 h-5 text-purple-400" />
                  Share & Actions
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button disabled className="group flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 opacity-50 cursor-not-allowed">
                    <ThumbsUp className="w-6 h-6 text-blue-400/70" />
                    <span className="text-xs text-gray-400/70 mt-2">Like</span>
                  </button>
                  <button disabled className="group flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 opacity-50 cursor-not-allowed">
                    <Bookmark className="w-6 h-6 text-purple-400/70" />
                    <span className="text-xs text-gray-400/70 mt-2">Save</span>
                  </button>
                  <button disabled className="group flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 opacity-50 cursor-not-allowed">
                    <Share2 className="w-6 h-6 text-pink-400/70" />
                    <span className="text-xs text-gray-400/70 mt-2">Share</span>
                  </button>
                </div>
              </div>

              {/* Author section */}
              {post.author && (
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-300">
                  <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-indigo-400" />
                    Author
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{post.author}</h4>
                      <p className="text-sm text-gray-400">Content Creator</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                  <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                    Related Posts
                  </h3>
                  <ul className="list-none space-y-2">
                    {relatedPosts.map((relatedPost) => (
                      <RelatedPostItem 
                        key={relatedPost.id} 
                        post={relatedPost}
                        navigate={navigate}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PostDetails;
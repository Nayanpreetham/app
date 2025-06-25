import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Mock Netflix-style data
const FEATURED_CONTENT = {
  id: 1,
  title: "Stranger Things",
  description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
  backdrop: "https://images.pexels.com/photos/7206581/pexels-photo-7206581.jpeg",
  logo: null,
  year: 2025,
  rating: "TV-14",
  duration: "4 Seasons"
};

const TMDB_API_KEYS = [
  'c8dea14dc917687ac631a52620e4f7ad',
  '3cb41ecea3bf606c56552db3d17adefd'
];

let currentKeyIndex = 0;

const MOCK_CONTENT = [
  {
    id: 1,
    title: "Dark Shadows",
    image: "https://images.pexels.com/photos/7206581/pexels-photo-7206581.jpeg",
    year: 2024,
    rating: "TV-MA",
    genre: "Thriller"
  },
  {
    id: 2,
    title: "Crimson Peak",
    image: "https://images.pexels.com/photos/7206410/pexels-photo-7206410.jpeg",
    year: 2023,
    rating: "R",
    genre: "Horror"
  },
  {
    id: 3,
    title: "Red Alert",
    image: "https://images.pexels.com/photos/6136091/pexels-photo-6136091.jpeg",
    year: 2024,
    rating: "PG-13",
    genre: "Action"
  },
  {
    id: 4,
    title: "The Panic Room",
    image: "https://images.pexels.com/photos/4737904/pexels-photo-4737904.jpeg",
    year: 2025,
    rating: "R",
    genre: "Thriller"
  },
  {
    id: 5,
    title: "Cinema Nights",
    image: "https://images.unsplash.com/photo-1577490621716-b1aa5f091524",
    year: 2024,
    rating: "PG",
    genre: "Drama"
  },
  {
    id: 6,
    title: "Love Actually",
    image: "https://images.unsplash.com/photo-1551558493-23ad82b16536",
    year: 2023,
    rating: "PG-13",
    genre: "Romance"
  },
  {
    id: 7,
    title: "Stage Lights",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35",
    year: 2024,
    rating: "PG",
    genre: "Musical"
  },
  {
    id: 8,
    title: "Film Noir",
    image: "https://images.unsplash.com/photo-1584034140774-4aacb37bc12b",
    year: 2025,
    rating: "R",
    genre: "Drama"
  },
  {
    id: 9,
    title: "Behind the Camera",
    image: "https://images.unsplash.com/photo-1700774606224-947aa19b5597",
    year: 2024,
    rating: "PG-13",
    genre: "Documentary"
  },
  {
    id: 10,
    title: "Sunset Boulevard",
    image: "https://images.unsplash.com/photo-1594710528487-956fefb714ce",
    year: 2023,
    rating: "PG-13",
    genre: "Drama"
  },
  {
    id: 11,
    title: "The Reel Story",
    image: "https://images.unsplash.com/photo-1568379683367-170a4aad7f1b",
    year: 2024,
    rating: "PG",
    genre: "Documentary"
  },
  {
    id: 12,
    title: "Red Wall",
    image: "https://images.unsplash.com/photo-1611501768223-65061dd288c3",
    year: 2025,
    rating: "R",
    genre: "Thriller"
  }
];

const CONTENT_CATEGORIES = {
  "Trending Now": MOCK_CONTENT.slice(0, 6),
  "Popular on Netflix": MOCK_CONTENT.slice(2, 8),
  "Thrillers": MOCK_CONTENT.filter(item => item.genre === "Thriller"),
  "Horror Movies": MOCK_CONTENT.filter(item => item.genre === "Horror"),
  "Documentaries": MOCK_CONTENT.filter(item => item.genre === "Documentary"),
  "Dramas": MOCK_CONTENT.filter(item => item.genre === "Drama"),
  "New Releases": MOCK_CONTENT.slice(4, 10)
};

// Navbar Component
export const Navbar = ({ user, onLogout, currentPage = 'home' }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent transition-all duration-300">
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-red-600 text-2xl font-bold">
            NETFLIX
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className={`text-white hover:text-gray-300 transition-colors ${currentPage === 'home' ? 'font-semibold' : ''}`}>
              Home
            </Link>
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              TV Shows
            </Link>
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              Movies
            </Link>
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              New & Popular
            </Link>
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              My List
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Link to="/search" className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          
          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 text-white hover:text-gray-300"
            >
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-600 rounded-md shadow-lg">
                <Link to="/profile" className="block px-4 py-2 text-white hover:bg-gray-800">
                  Account
                </Link>
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                >
                  Sign out of Netflix
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Component
export const HeroSection = ({ content = FEATURED_CONTENT }) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${content.backdrop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 flex items-center h-full px-4 md:px-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {content.title}
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
            {content.description}
          </p>
          <div className="flex items-center space-x-4 mb-8">
            <span className="text-green-500 font-semibold">{content.rating}</span>
            <span className="text-white">{content.year}</span>
            <span className="text-white">{content.duration}</span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate(`/watch/${content.id}`)}
              className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Play</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-600 bg-opacity-50 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-75 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Content Row Component
export const ContentRow = ({ title, items, rowIndex = 0 }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-16">
        {title}
      </h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-75"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 md:px-16 py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex-none w-40 md:w-64 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredItem(`${rowIndex}-${index}`)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => navigate(`/watch/${item.id}`)}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-24 md:h-36 object-cover rounded"
                />
                {hoveredItem === `${rowIndex}-${index}` && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded">
                    <div className="text-center text-white p-2">
                      <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-300">{item.year} • {item.rating}</p>
                      <div className="flex items-center justify-center mt-2">
                        <button className="bg-white text-black rounded-full p-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-75"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Home Page Component
export const HomePage = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar user={user} onLogout={onLogout} currentPage="home" />
      <HeroSection />
      <div className="pb-16">
        {Object.entries(CONTENT_CATEGORIES).map(([category, items], index) => (
          <ContentRow key={category} title={category} items={items} rowIndex={index} />
        ))}
      </div>
    </div>
  );
};

// Login Page Component
export const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Mock login
    const userData = {
      id: 1,
      name: email.split('@')[0],
      email: email
    };
    
    onLogin(userData);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/15357883/pexels-photo-15357883.jpeg)`
        }}
      />
      <div className="relative z-10">
        <div className="px-8 py-6">
          <Link to="/" className="text-red-600 text-3xl font-bold">
            NETFLIX
          </Link>
        </div>
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-black bg-opacity-75 p-16 rounded max-w-md w-full">
            <h1 className="text-white text-3xl font-semibold mb-8">Sign In</h1>
            
            {error && (
              <div className="bg-red-600 text-white p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded font-semibold hover:bg-red-700 transition-colors"
              >
                Sign In
              </button>
              
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <span>Remember me</span>
                </div>
                <a href="#" className="hover:underline">Need help?</a>
              </div>
            </form>
            
            <div className="mt-16 text-gray-400">
              <p>
                New to Netflix?{' '}
                <Link to="/signup" className="text-white hover:underline">
                  Sign up now
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sign Up Page Component
export const SignUpPage = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError('Please fill in all fields');
      return;
    }
    
    // Mock signup
    const userData = {
      id: 1,
      name: name,
      email: email
    };
    
    onSignUp(userData);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/12261166/pexels-photo-12261166.jpeg)`
        }}
      />
      <div className="relative z-10">
        <div className="px-8 py-6">
          <Link to="/" className="text-red-600 text-3xl font-bold">
            NETFLIX
          </Link>
        </div>
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-black bg-opacity-75 p-16 rounded max-w-md w-full">
            <h1 className="text-white text-3xl font-semibold mb-8">Sign Up</h1>
            
            {error && (
              <div className="bg-red-600 text-white p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:bg-gray-600"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded font-semibold hover:bg-red-700 transition-colors"
              >
                Sign Up
              </button>
            </form>
            
            <div className="mt-16 text-gray-400">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-white hover:underline">
                  Sign in
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Page Component
export const ProfilePage = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar user={user} onLogout={onLogout} />
      <div className="pt-20 px-4 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-4xl font-semibold mb-8">Account</h1>
          
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="border-b border-gray-700 pb-6 mb-6">
              <h2 className="text-white text-2xl mb-4">Profile & Parental Controls</h2>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold">{user?.name}</h3>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">Plan Details</h3>
                <p className="text-gray-400">Standard Plan - HD Available</p>
              </div>
              
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">Settings</h3>
                <div className="space-y-2">
                  <button className="text-blue-500 hover:underline block">Change password</button>
                  <button className="text-blue-500 hover:underline block">Playback settings</button>
                  <button className="text-blue-500 hover:underline block">Download settings</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Search Page Component
export const SearchPage = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = MOCK_CONTENT.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar user={user} onLogout={onLogout} />
      <div className="pt-20 px-4 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search for movies, TV shows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 bg-gray-800 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              autoFocus
            />
          </div>
          
          {searchTerm && (
            <div>
              <h2 className="text-white text-xl mb-4">
                Search results for "{searchTerm}"
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    onClick={() => navigate(`/watch/${item.id}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded"
                    />
                    <h3 className="text-white text-sm mt-2 truncate">{item.title}</h3>
                    <p className="text-gray-400 text-xs">{item.year} • {item.rating}</p>
                  </div>
                ))}
              </div>
              
              {searchResults.length === 0 && (
                <div className="text-center text-gray-400 mt-8">
                  <p>No results found for "{searchTerm}"</p>
                </div>
              )}
            </div>
          )}
          
          {!searchTerm && (
            <div className="text-center text-gray-400 mt-16">
              <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-xl">Search for movies and TV shows</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Video Player Component
export const VideoPlayer = ({ user, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);

  const content = MOCK_CONTENT.find(item => item.id === parseInt(id)) || MOCK_CONTENT[0];

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setCurrentTime(pos * duration);
  };

  // Mock video with YouTube embed (Netflix-style)
  const youtubeVideoId = "dQw4w9WgXcQ"; // Sample video

  return (
    <div className="relative h-screen bg-black overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Video Player */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
          title={content.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-cover"
        ></iframe>
      </div>

      {/* Controls Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-black transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-white">
            <h1 className="text-2xl font-semibold">{content.title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlayPause}
            className="bg-black bg-opacity-50 rounded-full p-4 text-white hover:bg-opacity-75 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Progress Bar */}
          <div className="mb-4">
            <div
              className="w-full h-1 bg-gray-600 rounded cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-red-600 rounded"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="text-white hover:text-gray-300"
              >
                {isPlaying ? (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <div className="text-white text-sm">
                {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} / {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
              
              <button className="text-white hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
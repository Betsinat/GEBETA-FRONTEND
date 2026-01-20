import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Reviews.css';

const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState('on-campus');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  // MOCK DATA - Organized by category
  const mockDataByCategory = {
    'on-campus': [
      {
        id: 'b1',
        name: 'STUDENT CENTER CAFETERIA',
        mainImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
        peekImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
        rating: 4.5,
        reviews: 234,
        location: '5K DORMITORY',
        groupFriendly: true,
        hours: '6pm',
        category: 'On-Campus',
        description: 'The main cafeteria serving students with a variety of meals throughout the day.',
        menuItems: ['Pizza', 'Pasta', 'Salads', 'Burgers', 'Daily Specials'],
        priceRange: '$',
        phone: '(123) 456-7890',
        website: 'https://university.edu/cafeteria'
      },
      {
        id: 'b2',
        name: '4K DORM CAFETERIA',
        mainImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
        peekImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
        rating: 4.2,
        reviews: 189,
        location: '4K DORMITORY',
        groupFriendly: true,
        hours: '7pm',
        category: 'On-Campus',
        description: 'Cafeteria serving students in 4K dormitory.',
        menuItems: ['Traditional Food', 'Breakfast', 'Juices'],
        priceRange: '$',
        phone: '(123) 456-7893',
        website: 'https://university.edu/4kcafeteria'
      }
    ],
    'delivery': [
      {
        id: 'd1',
        name: 'ARRIVE DELIVERY',
        mainImage: 'https://images.unsplash.com/photo-1587476351660-e9fa4bb8b26c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fHw%3D',
        peekImage: 'https://images.unsplash.com/photo-1548695607-9c73430ba065?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDV8fHxlbnwwfHx8fHw%3D',
        rating: 3.5,
        reviews: 280,
        location: '5K, 4K, 6K DORMITORY',
        groupFriendly: false,
        hours: '8pm',
        category: 'Delivery',
        description: 'Fast food delivery service covering all dormitories on campus.',
        menuItems: ['Burgers', 'Fries', 'Wings', 'Pizza', 'Soft Drinks'],
        priceRange: '$$',
        phone: '(123) 456-7891',
        website: 'https://arrivedelivery.com'
      }
    ],
    'off-campus': [
      {
        id: 'o1',
        name: 'OASIS CAFE',
        mainImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fHw%3D',
        peekImage: 'https://images.unsplash.com/photo-1692911634014-a1446191fb7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDR8fHxlbnwwfHx8fHw%3D',
        rating: 4.5,
        reviews: 234,
        location: 'Infront of 5K DORMITORY Main GATE',
        groupFriendly: true,
        hours: '6pm',
        category: 'Off-Campus',
        description: 'Cozy cafe near campus with great coffee and snacks.',
        menuItems: ['Coffee', 'Tea', 'Pastries', 'Sandwiches', 'Desserts'],
        priceRange: '$$',
        phone: '(123) 456-7892',
        website: 'https://oasiscafe.com'
      }
    ]
  };

  // Get businesses for current filter
  const getBusinessesForFilter = () => {
    return mockDataByCategory[activeFilter] || [];
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fa-solid fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fa-solid fa-star-half-stroke"></i>);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
    }

    return stars;
  };

  const renderBusinessCard = (business) => {
    return (
      <div className="main-card">
        <div 
          className="main-card-image"
          style={{ backgroundImage: `url('${business.mainImage}')` }}
        ></div>
        <div className="main-card-content">
          <h3>{business.name}</h3>
          <div className="rating-stars">
            {renderStars(business.rating)}
            <span>{business.rating.toFixed(1)} ({business.reviews} REVIEWS)</span>
          </div>
          <div className="card-details">
            <div><i className="fa-solid fa-location-dot"></i> {business.location}</div>
            <div>
              {business.groupFriendly && (
                <><i className="fa-solid fa-users"></i> Large Group Friendly &nbsp; &nbsp; &nbsp;</>
              )}
              <i className="fa-solid fa-calendar"></i> Open Until {business.hours}
            </div>
          </div>
          <Link to="/customer-review" state={{ business: business }}>
            <button className="btn btn-primary" style={{ fontSize: '1rem', padding: '10px 25px' }}>
              Read Reviews
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const renderPeekCard = (business) => (
    <div className="peek-card">
      <Link to="/customer-review" state={{ business: business }}>
        <div 
          className="peek-image"
          style={{ backgroundImage: `url('${business.peekImage}')` }}
        ></div>
        <div className="peek-arrow"><i className="fa-solid fa-angle-right"></i></div>
      </Link>
    </div>
  );

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setShowSearch(false);
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setIsSearching(true);
      
      // Try API first
      const response = await fetch(`/api/businesses?search=${encodeURIComponent(searchQuery)}&limit=10`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Format API data to match our structure
          const formattedResults = data.data.map(business => ({
            id: business.id,
            name: business.name,
            mainImage: business.image?.[0]?.url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
            peekImage: business.image?.[1]?.url || business.image?.[0]?.url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
            rating: business.rating?.average || business.rating || 4.0,
            reviews: business.rating?.count || 100,
            location: business.location?.address || 'AAU Campus',
            groupFriendly: business.features?.isGroupFriendly || false,
            hours: business.hours?.closeTime || '6pm',
            category: business.category,
            description: business.description,
            priceRange: business.features?.priceRange || '$$'
          }));
          
          setSearchResults(formattedResults);
        } else {
          // API failed, use mock search
          performMockSearch();
        }
      } else {
        // API failed, use mock search
        performMockSearch();
      }
    } catch (error) {
      console.error('Error searching businesses:', error);
      // Use mock search as fallback
      performMockSearch();
    } finally {
      setLoading(false);
    }
  };

  // All mock businesses for search
  const allMockBusinesses = [
    ...mockDataByCategory['on-campus'],
    ...mockDataByCategory['delivery'],
    ...mockDataByCategory['off-campus']
  ];

  const performMockSearch = () => {
    const results = allMockBusinesses.filter(business => 
      business.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  // Handle search when Enter is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };

  // Render section for current filter
  const renderFilterSection = () => {
    const businesses = getBusinessesForFilter();
    const filterTitles = {
      'on-campus': 'ON-CAMPUS',
      'delivery': 'DELIVERY',
      'off-campus': 'OFF-CAMPUS'
    };

    return (
      <div className="hero-grid-container">
        <h1 className="section-title">Trending</h1>
        <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
          {filterTitles[activeFilter]}
        </h2>
        <hr className="divider" />
        
        {businesses.length > 0 ? (
          businesses.map((business, index) => (
            <div key={business.id || index} className="hero-grid">
              {renderBusinessCard(business)}
              {renderPeekCard(business)}
            </div>
          ))
        ) : (
          <div className="no-businesses">
            <p>No businesses found in this category</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <main>
      {/* Filter Bar */}
      <div className="container">
        <div className="filter-bar">
          <div 
            className={`filter-btn ${activeFilter === 'on-campus' ? 'active' : ''}`}
            onClick={() => handleFilterClick('on-campus')}
          >
            On-Campus
          </div>
          <div 
            className={`filter-btn ${activeFilter === 'delivery' ? 'active' : ''}`}
            onClick={() => handleFilterClick('delivery')}
          >
            Delivery
          </div>
          <div 
            className={`filter-btn ${activeFilter === 'off-campus' ? 'active' : ''}`}
            onClick={() => handleFilterClick('off-campus')}
          >
            Off-Campus
          </div>
          
          {/* Search Icon Button */}
          <div className="search-icon-btn" onClick={handleSearchClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>

      {/* Search Input (appears when search icon is clicked) */}
      {showSearch && (
        <div className="container">
          <div className="search-box-container">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Search business name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={handleClearSearch}>
                  <i className="fa-solid fa-times"></i>
                </button>
              )}
              <button className="search-action-btn" onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            {loading && (
              <div className="search-loading">
                <div className="small-spinner"></div>
                <span>Searching...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search Results */}
      {isSearching && (
        <div className="container">
          <div className="search-results">
            <h3 className="search-results-title">
              Search Results for "{searchQuery}"
              {searchResults.length > 0 && (
                <span className="results-count"> ({searchResults.length} found)</span>
              )}
            </h3>
            
            {searchResults.length === 0 ? (
              <div className="no-results">
                <p>No businesses found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="results-grid">
                {searchResults.map((business, index) => (
                  <div key={business.id || index} className="hero-grid">
                    {renderBusinessCard(business)}
                    {renderPeekCard(business)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Show filter section when not searching */}
      {!isSearching && renderFilterSection()}
    </main>
  );
};

export default Reviews;
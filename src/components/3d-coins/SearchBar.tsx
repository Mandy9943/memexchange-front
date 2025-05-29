'use client';
import { ChevronDown, Coins, Hash, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  clearSearch,
  performSearch,
  selectSearchResult,
  setSearchType
} from './actions';
import useStore from './store';

const SearchBar = () => {
  const searchQuery = useStore.use.searchQuery();
  const searchType = useStore.use.searchType();
  const searchResults = useStore.use.searchResults();
  const isSearchActive = useStore.use.isSearchActive();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  const searchTypes = [
    { value: 'all' as const, label: 'All', icon: Search },
    { value: 'name' as const, label: 'Token Name', icon: Coins },
    { value: 'address' as const, label: 'Address', icon: Hash }
  ];

  const currentSearchType =
    searchTypes.find((type) => type.value === searchType) || searchTypes[0];

  // Handle debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery, searchType);
        setShowResults(true);
      } else {
        clearSearch();
        setShowResults(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, searchType]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setShowResults(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Focus search input with Ctrl/Cmd + K
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }

      // Clear search with Escape
      if (event.key === 'Escape') {
        if (searchQuery) {
          handleClearSearch();
        } else {
          inputRef.current?.blur();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    performSearch(value, searchType);
    setShowResults(true);
  };

  const handleClearSearch = () => {
    clearSearch();
    setShowResults(false);
    inputRef.current?.focus();
  };

  const handleSearchTypeChange = (newType: 'all' | 'name' | 'address') => {
    setSearchType(newType);
    setIsDropdownOpen(false);
    if (searchQuery.trim()) {
      performSearch(searchQuery, newType);
    }
  };

  const handleResultClick = (imageId: string) => {
    selectSearchResult(imageId);
    setShowResults(false);
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  return (
    <div ref={searchRef} className='relative w-full max-w-2xl mx-auto'>
      {/* Main Search Container */}
      <div className='relative group'>
        {/* Search Input Container */}
        <div className='relative flex items-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 focus-within:border-blue-400/50 focus-within:bg-black/30'>
          {/* Search Type Dropdown */}
          <div className='relative'>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='flex items-center gap-2 px-4 py-3 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 border-r border-white/10'
            >
              <currentSearchType.icon size={16} />
              <span className='hidden sm:block'>{currentSearchType.label}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className='absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-[16484601000] overflow-hidden'>
                {searchTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleSearchTypeChange(type.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 ${
                      searchType === type.value
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <type.icon size={16} />
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className='flex-1 relative'>
            <input
              ref={inputRef}
              type='text'
              placeholder='Search tokens by name or address... (Ctrl+K)'
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleClearSearch();
                } else if (
                  e.key === 'Enter' &&
                  searchResults &&
                  searchResults.length > 0
                ) {
                  handleResultClick(searchResults[0].id);
                }
              }}
              className='w-full px-4 py-3 bg-transparent text-white placeholder-white/50 focus:outline-none text-sm'
            />
          </div>

          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className='p-3 text-white/60 hover:text-white transition-colors duration-200'
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && isSearchActive && searchResults && (
          <div className='absolute top-full left-0 right-0 mt-2 max-h-96 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-[16484601000]'>
            {searchResults.length > 0 ? (
              <div className='overflow-y-auto max-h-96'>
                {/* Results Header */}
                <div className='px-4 py-3 border-b border-white/10 bg-white/5'>
                  <p className='text-sm text-white/80'>
                    Found {searchResults.length} token
                    {searchResults.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Results List */}
                {searchResults.map(
                  (
                    result: {
                      id: string;
                      url?: string;
                      name?: string;
                      description?: string;
                      bondingAddress?: string;
                      bondingState?: string;
                      coinData?: {
                        coin?: {
                          name?: string;
                          description?: string;
                        };
                        address?: string;
                        state?: string;
                      };
                    },
                    index: number
                  ) => (
                    <button
                      key={result.id || index}
                      onClick={() => handleResultClick(result.id)}
                      className='w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors duration-200 border-b border-white/5 last:border-b-0'
                    >
                      {/* Token Image */}
                      {result.url && (
                        <div className='w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0'>
                          <img
                            src={result.url}
                            alt={result.name || 'Unnamed Token'}
                            className='w-full h-full object-cover'
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Token Info */}
                      <div className='flex-1 text-left min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h3 className='font-medium text-white truncate'>
                            {result.name ||
                              result.coinData?.coin?.name ||
                              'Unnamed Token'}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              result.bondingState === 'Active'
                                ? 'bg-green-500/20 text-green-400'
                                : result.bondingState === 'Finished'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {result.bondingState || result.coinData?.state}
                          </span>
                        </div>
                        <p className='text-sm text-white/60 truncate'>
                          {formatAddress(
                            result.bondingAddress ||
                              result.coinData?.address ||
                              ''
                          )}
                        </p>
                        {(result.description ||
                          result.coinData?.coin?.description) && (
                          <p className='text-xs text-white/50 truncate mt-1'>
                            {result.description ||
                              result.coinData?.coin?.description}
                          </p>
                        )}
                      </div>

                      {/* Arrow Indicator */}
                      <div className='text-white/40'>
                        <ChevronDown size={16} className='rotate-[-90deg]' />
                      </div>
                    </button>
                  )
                )}
              </div>
            ) : (
              <div className='px-4 py-8 text-center'>
                <Search size={24} className='mx-auto text-white/40 mb-2' />
                <p className='text-white/60'>
                  No tokens found matching your search
                </p>
                <p className='text-sm text-white/40 mt-1'>
                  Try a different search term
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Stats (when active) */}
      {isSearchActive && searchResults && (
        <div className='mt-2 flex items-center justify-center'>
          <div className='px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30'>
            {searchResults.length} token{searchResults.length !== 1 ? 's' : ''}{' '}
            highlighted in 3D view
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

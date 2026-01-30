import React from 'react'
import { useSelector } from 'react-redux'
import { IMG_CDN_URL } from './utils/Images'

function SearchSuggestion() {
  const searchMovies = useSelector((state) => state.movies.nowSearchMovies)

  return (
    <div className="
      mt-3 bg-gradient-to-b from-gray-900 to-black
      rounded-xl shadow-2xl
      max-h-[28rem] sm:max-h-[32rem]
      overflow-y-auto
      border border-gray-800 backdrop-blur-sm
    ">
      {searchMovies && searchMovies.length > 0 ? (
        <div className='divide-y divide-gray-800'>
          {searchMovies.map((movie) => (
            <div 
              key={movie.id} 
              className='group p-3 sm:p-4 hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-pink-900/20 transition-all duration-300 cursor-pointer'
            >
              <div className='flex items-start gap-3 sm:gap-4'>
                {/* Movie Poster */}
                {movie.poster_path && (
                  <img 
                    src={IMG_CDN_URL + movie.poster_path}
                    alt={movie.title || movie.name}
                    className='w-12 h-20 sm:w-16 sm:h-24 object-cover rounded-lg shadow-lg group-hover:shadow-purple-500/50 transition-shadow duration-300'
                  />
                )}
                
                {/* Movie Info */}
                <div className='flex-1 min-w-0'>
                  <h3 className='text-sm sm:text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-1'>
                    {movie.title || movie.name}
                  </h3>
                  
                  <div className='flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2'>
                    <p className='text-xs sm:text-sm text-gray-400'>
                      {movie.release_date || movie.first_air_date ? 
                        new Date(movie.release_date || movie.first_air_date).getFullYear() 
                        : 'N/A'
                      }
                    </p>
                    
                    {movie.vote_average > 0 && (
                      <div className='flex items-center gap-1'>
                        <svg className='w-3 h-3 sm:w-4 sm:h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                        <span className='text-xs sm:text-sm text-gray-300 font-semibold'>
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {movie.overview && (
                    <p className='text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 line-clamp-2 group-hover:text-gray-400 transition-colors duration-300'>
                      {movie.overview}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-10 sm:py-12 px-4'>
          <svg className='w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mb-3 sm:mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
          <p className='text-gray-400 text-sm sm:text-lg font-medium'>No suggestions found</p>
          <p className='text-gray-600 text-xs sm:text-sm mt-1'>Try searching for a different movie</p>
        </div>
      )}
    </div>
  )
}

export default SearchSuggestion

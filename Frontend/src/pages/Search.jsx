import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import FoodCard from '../components/FoodCard';
import axios from 'axios';
void motion

function Search() {
  const [searchParams] = useSearchParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [category, setCategory] = useState('all');

  const searchQuery = searchParams.get('q') || '';
  const categories = ['all', 'appetizers', 'mains', 'desserts', 'beverages', 'sides'];

  useEffect(() => {
    fetchFoods();
  }, [searchQuery, sortBy, category]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchQuery,
        sort: sortBy,
        ...(category !== 'all' && { category })
      };
      const response = await axios.get('/api/foods', { params });
      setFoods(response.data.foods || response.data);
    } catch (error) {
      console.error('Failed to fetch foods:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
            Search Results
          </h1>
          {searchQuery && (
            <p className="text-base text-gray-600 mb-8">
              Results for "<strong>{searchQuery}</strong>"
            </p>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field"
                >
                  <option value="newest">Newest</option>
                  <option value="rating">Rating (High to Low)</option>
                  <option value="price_asc">Price (Low to High)</option>
                  <option value="price_desc">Price (High to Low)</option>
                  <option value="name_asc">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : foods.length === 0 ? (
            <div className="card card-border p-12 text-center bg-white">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No items found</h2>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find what you&apos;re looking for.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Found <strong>{foods.length}</strong> result{foods.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {foods.map((food, index) => (
                  <motion.div
                    key={food._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <FoodCard food={food} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </section>
    </div>
  );
}
export default Search

import SearchBar from './SearchBar';
import EnvironmentalFilters from './EnvironmentalFilters';

interface EnvironmentalFilter {
  type: string;
  value: 'low' | 'high';
}

interface SearchHeaderProps {
  searchQuery: string;
  environmentalFilters: EnvironmentalFilter[];
  onSearch: (query: string) => void;
  onClearFilters: () => void;
}

const SearchHeader = ({
  searchQuery,
  environmentalFilters,
  onSearch,
  onClearFilters
}: SearchHeaderProps) => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-playfair mb-6">
          {searchQuery ? `Search Results for "${searchQuery}"` : "All Properties"}
        </h1>
        <SearchBar onSearch={onSearch} />
        <div className="mt-4">
          <EnvironmentalFilters 
            filters={environmentalFilters} 
            onClearFilters={onClearFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;

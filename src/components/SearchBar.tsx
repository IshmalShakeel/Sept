import React, { useState } from "react";

interface SearchBarProps { // Define the props for SearchBar 
  onSearch: (query: string) => void;// Function to handle search input changes
}

export default function SearchBar({ onSearch }: SearchBarProps) { //search for chats that match the query of the user
  const [searchTerm, setSearchTerm] = useState("");// State to hold the search term and set it to empty string by default

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Function to handle input changes event for search
    const value = e.target.value; // Get the value from the input field target the event
    setSearchTerm(value); // Update the searchTerm state with the new value
    onSearch(value); // Call the onSearch function passed from props with the new search term
  };

  const handleButtonClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-white">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by date, type or others..."
        value={searchTerm}
        onChange={handleInputChange}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filter Button */}
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Filters
      </button>
    </div>
  );
}

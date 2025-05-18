
# Product Autocomplete Component

A React TypeScript application that implements a product search autocomplete component, using the DummyJSON API.

## Features

- 🔍 Real-time product search with DummyJSON API
- ⏱️ Debounced API requests for performance optimization
- 🧩 Pagination support for browsing through search results
- 📱 Responsive design that works on all device sizes
- 🎨 Clean UI with visual feedback and smooth transitions
- 🛡️ Error handling with user-friendly messages
- ⌨️ Keyboard navigation support (arrow keys, enter, escape)

## Setup Instructions

1. Clone the repository
   ```
   git clone https://github.com/yourusername/product-autocomplete.git
   cd product-autocomplete
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## Implementation Approach

### Component Structure

The application is organized into the following components:

- `Autocomplete`: Main component managing the search state and logic
- `ProductItem`: Individual product display component
- `ProductItemSkeleton`: Loading placeholder for products
- `Pagination`: Navigation control for paging through results

### Technical Decisions

- **Debouncing**: Implemented via a custom hook to prevent excessive API calls as the user types
- **Pagination**: Uses skip/limit parameters to fetch paginated results from the API
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Loading States**: Visual feedback during data fetching operations
- **Error Handling**: Graceful error handling with user feedback via toast notifications

### UI/UX Considerations

- Clean, minimal design with sufficient visual hierarchy
- Responsive layout that works well on mobile and desktop
- Loading indicators for feedback during API requests
- Empty states and error messages for better user guidance
- Subtle animations to enhance the interaction experience

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Lucide React Icons
- React Query for data fetching

## Future Improvements

Given more time, these enhancements could be added:

- Implement caching for previous search results
- Add filters for product categories, price ranges
- Improve accessibility with ARIA attributes and screen reader support
- Add unit and integration tests
- Implement selection history/recent searches

## License

MIT

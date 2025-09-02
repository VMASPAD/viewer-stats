# Repository Viewer Stats

A full-stack application that tracks and visualizes repository view statistics with real-time analytics and beautiful interactive charts.

<img src="https://viewer-stats.vercel.app/file.svg?repository=https://github.com/VMASPAD/viewer-stats&color=7DDA58"/>

## 🌟 Features

- **Real-time View Tracking**: Automatically increments view count when repositories are accessed
- **Interactive Analytics Dashboard**: Beautiful charts with animated bars and trend indicators
- **Smart Data Aggregation**: Groups view events within 15-minute windows to provide meaningful insights
- **Daily Comparison Metrics**: Shows percentage change compared to previous day with visual indicators
- **GitHub Repository Support**: Works with GitHub repository URLs and usernames
- **Responsive Design**: Modern UI built with Next.js, TypeScript, and Tailwind CSS
- **MongoDB Integration**: Persistent data storage with automatic schema management

## 🏗️ Architecture

### Frontend (Next.js App)
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for interactive data visualization
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Motion library for smooth transitions

### Backend (Express API)
- **Runtime**: Node.js with Express server
- **Database**: MongoDB with Mongoose ODM
- **CORS**: Enabled for cross-origin requests
- **Data Model**: Repository schema with metrics tracking

## 📊 How It Works

1. **View Tracking**: Each time a repository page is accessed, the backend increments the view count
2. **Data Aggregation**: Views within 15-minute windows are grouped together as single sessions
3. **Statistical Analysis**: Daily totals are calculated and compared to previous days
4. **Visualization**: Data is presented in an interactive bar chart with trend indicators

### Data Flow

```
User visits repository page → Frontend fetches data → Backend increments counter → 
Database stores metric → Frontend processes data → Charts display analytics
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/viewer-stats.git
   cd viewer-stats
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd server
   npm install
   ```

3. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod --dbpath /path/to/your/db
   
   # Or use MongoDB Atlas cloud service
   ```

4. **Configure Database Connection**
   
   The application connects to MongoDB at `mongodb://localhost:27017/view-stats`. Update the connection string in `server/index.js` if needed.

5. **Start the development servers**

   **Backend (Terminal 1)**
   ```bash
   cd server
   npm run serve
   # Server runs on http://localhost:9512
   ```

   **Frontend (Terminal 2)**
   ```bash
   npm run dev
   # App runs on http://localhost:3000
   ```

## 📁 Project Structure

```
viewer-stats/
├── app/                          # Next.js app directory
│   ├── [user]/[repository]/      # Dynamic route for user/repo stats
│   │   └── page.tsx              # Repository stats page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Home page
├── components/
│   └── ui/
│       └── value-line-bar-chart.tsx  # Interactive chart component
├── lib/
│   └── utils.ts                  # Utility functions
├── server/                       # Backend API
│   ├── index.js                  # Express server
│   ├── models.js                 # MongoDB schemas
│   └── package.json              # Backend dependencies
├── public/                       # Static assets
├── package.json                  # Frontend dependencies
└── README.md                     # This file
```

## 🔧 API Endpoints

### GET `/data`

Retrieves and increments view statistics for a repository.

**Parameters:**
- `repository` (required): Repository name in format `user/repo` or full GitHub URL
- `color` (optional): Hex color code for customization (default: #FF0000)

**Response:**
```json
{
  "repository": "username/repository-name",
  "color": "#000000",
  "metrics": [
    {
      "date": 1756786504600,
      "value": 1,
      "_id": "..."
    },
    {
      "date": 1756786523624,
      "value": 2,
      "_id": "..."
    }
  ]
}
```

## 📈 Data Processing

### View Aggregation Algorithm

1. **Sort metrics** by timestamp in ascending order
2. **Group consecutive views** that occur within 15-minute windows
3. **Count sessions** rather than individual page hits
4. **Calculate daily totals** by summing session counts per day
5. **Compute percentage change** compared to the previous day

### Chart Data Formatting

- **X-axis**: Displays date and time in `MM/DD HH:MM` format
- **Y-axis**: Shows number of view sessions
- **Hover effects**: Interactive bars with detailed information
- **Trend indicators**: Green/red badges with arrows showing daily comparison

## 🎨 UI Components

### ValueLineBarChart
- **Interactive bars** with opacity changes on hover
- **Reference line** showing maximum value
- **Animated counters** with spring physics
- **Trend badges** with directional arrows
- **Responsive design** adapting to different screen sizes

## 🛠️ Development

### Frontend Development
```bash
npm run dev    # Start development server with Turbopack
npm run build  # Build for production
npm run start  # Start production server
```

### Backend Development
```bash
cd server
npm run serve  # Start Express server
```

### Database Schema

**Repository Model:**
```javascript
{
  repository: String,    // Unique repository identifier
  metrics: [            // Array of view metrics
    {
      date: Number,     // Timestamp in milliseconds
      value: Number     // Cumulative view count
    }
  ],
  color: String        // Customization color (default: #FF0000)
}
```

## 🌐 Usage Examples

### Basic Repository Tracking
Visit: `http://localhost:3000/username/repository-name`

### GitHub URL Support
The API automatically extracts repository information from GitHub URLs:
```
https://github.com/facebook/react → facebook/react
```

### Custom Color Themes
Add color parameter to customize appearance:
```
http://localhost:9512/data?repository=user/repo&color=00FF00
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

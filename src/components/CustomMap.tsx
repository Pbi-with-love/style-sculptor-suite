
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { environmentalRankings } from '../data/environmentalData';

interface Location {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

interface CustomMapProps {
  locations?: Location[];
  onMapClick?: (location: { lat: number; lng: number }) => void;
  onEnvironmentalFilterChange?: (type: string, value: 'low' | 'high') => void;
  highlightedLocation?: { lat: number; lng: number } | null;
}

// Sample regions data with environmental metrics
const mapRegions = [
  { id: 'r1', name: 'Downtown', x: 50, y: 150, width: 120, height: 100, metrics: { noiseLevel: 8, crimeRate: 7, pollution: 6, trafficCongestion: 8, greenSpaceAccess: 3, schoolQuality: 7 } },
  { id: 'r2', name: 'Uptown', x: 200, y: 70, width: 100, height: 120, metrics: { noiseLevel: 5, crimeRate: 4, pollution: 3, trafficCongestion: 5, greenSpaceAccess: 6, schoolQuality: 8 } },
  { id: 'r3', name: 'Westside', x: 20, y: 280, width: 100, height: 80, metrics: { noiseLevel: 4, crimeRate: 3, pollution: 3, trafficCongestion: 4, greenSpaceAccess: 8, schoolQuality: 7 } },
  { id: 'r4', name: 'Eastside', x: 240, y: 220, width: 130, height: 90, metrics: { noiseLevel: 6, crimeRate: 5, pollution: 7, trafficCongestion: 6, greenSpaceAccess: 5, schoolQuality: 6 } },
  { id: 'r5', name: 'Suburb North', x: 140, y: 10, width: 110, height: 90, metrics: { noiseLevel: 3, crimeRate: 2, pollution: 2, trafficCongestion: 3, greenSpaceAccess: 9, schoolQuality: 9 } },
  { id: 'r6', name: 'Suburb South', x: 130, y: 290, width: 100, height: 80, metrics: { noiseLevel: 2, crimeRate: 1, pollution: 2, trafficCongestion: 2, greenSpaceAccess: 8, schoolQuality: 8 } },
  // New areas with more varied data
  { id: 'r7', name: 'Tech District', x: 350, y: 100, width: 90, height: 110, metrics: { noiseLevel: 7, crimeRate: 4, pollution: 5, trafficCongestion: 7, greenSpaceAccess: 4, schoolQuality: 9 } },
  { id: 'r8', name: 'Harbor View', x: 350, y: 250, width: 100, height: 100, metrics: { noiseLevel: 5, crimeRate: 3, pollution: 6, trafficCongestion: 4, greenSpaceAccess: 7, schoolQuality: 6 } },
  { id: 'r9', name: 'Cultural Center', x: 30, y: 50, width: 80, height: 70, metrics: { noiseLevel: 6, crimeRate: 5, pollution: 4, trafficCongestion: 6, greenSpaceAccess: 5, schoolQuality: 8 } },
];

// Location markers that will be displayed on the map
const locationMarkers = [
  { id: '1', lat: 100, lng: 180, title: 'Modern Apartment in Downtown' },
  { id: '2', lat: 230, lng: 100, title: 'Spacious Family Home' },
  { id: '3', lat: 270, lng: 250, title: 'Luxury Penthouse' },
  { id: '4', lat: 60, lng: 320, title: 'Urban Smart Loft' },
  { id: '5', lat: 170, lng: 30, title: 'Waterfront Condo' },
  // New property locations
  { id: '6', lat: 380, lng: 120, title: 'Tech Hub Studio' },
  { id: '7', lat: 390, lng: 270, title: 'Harbor View Apartment' },
  { id: '8', lat: 60, lng: 70, title: 'Arts District Loft' },
  { id: '9', lat: 320, lng: 180, title: 'Midtown Townhouse' },
];

const CustomMap = ({ 
  locations = locationMarkers, 
  onMapClick, 
  onEnvironmentalFilterChange,
  highlightedLocation 
}: CustomMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>('noiseLevel');
  const [view, setView] = useState<'properties' | 'environmental'>('properties');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState<boolean>(false);
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  
  // Convert metric value to color
  const getMetricColor = (value: number, isHigherBetter: boolean) => {
    // Define color gradients for metrics
    // Lower values (1-3) are generally better for negative metrics (noise, crime, etc.)
    // Higher values (7-10) are better for positive metrics (green space, schools, etc.)
    
    if (isHigherBetter) {
      // For metrics where higher is better (green space, schools)
      if (value >= 8) return '#4ade80'; // Green (excellent)
      if (value >= 6) return '#a3e635'; // Light green (good)
      if (value >= 4) return '#fde047'; // Yellow (average)
      if (value >= 2) return '#f97316'; // Orange (below average)
      return '#ef4444'; // Red (poor)
    } else {
      // For metrics where lower is better (noise, crime, pollution)
      if (value <= 2) return '#4ade80'; // Green (excellent)
      if (value <= 4) return '#a3e635'; // Light green (good)
      if (value <= 6) return '#fde047'; // Yellow (average)
      if (value <= 8) return '#f97316'; // Orange (below average)
      return '#ef4444'; // Red (poor)
    }
  };

  // Draw the map canvas
  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw roads
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    
    // Horizontal roads
    for (let y = 50; y < canvas.height; y += 100) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Vertical roads
    for (let x = 50; x < canvas.width; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Add some landmarks
    ctx.fillStyle = '#b1e3ff';
    ctx.fillRect(270, 320, 130, 80); // Lake
    ctx.fillStyle = '#d2f1c2';
    ctx.fillRect(10, 150, 50, 50); // Park
    
    // Draw regions with environmental data
    mapRegions.forEach(region => {
      const currentRanking = environmentalRankings.find(r => r.type === selectedMetric);
      const isHigherBetter = currentRanking?.isHigherBetter || false;
      const metricValue = region.metrics[selectedMetric as keyof typeof region.metrics] as number;
      
      // Apply colors based on the view mode and selected metric
      if (view === 'environmental') {
        ctx.fillStyle = getMetricColor(metricValue, isHigherBetter);
      } else {
        ctx.fillStyle = '#e5e7eb';
      }
      
      // Make hovered region stand out
      if (hoveredRegion === region.id) {
        ctx.fillStyle = view === 'environmental' ? 
          getMetricColor(metricValue, isHigherBetter) : 
          '#d1d5db';
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = 1;
      }
      
      // Draw the region
      ctx.fillRect(region.x, region.y, region.width, region.height);
      ctx.strokeRect(region.x, region.y, region.width, region.height);
      
      // Draw region name
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px Arial';
      ctx.fillText(region.name, region.x + 5, region.y + 20);
      
      if (view === 'environmental') {
        // Display metric value in region
        ctx.fillStyle = metricValue >= 7 ? '#ffffff' : '#1f2937';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(metricValue.toString(), region.x + region.width / 2 - 5, region.y + region.height / 2 + 5);
      }
      
      // Draw insights icon if in insights mode
      if (showInsights) {
        ctx.fillStyle = '#8b5cf6';
        ctx.beginPath();
        ctx.arc(region.x + region.width - 10, region.y + 10, 6, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
    
    // Draw location markers
    if (view === 'properties') {
      locations.forEach(location => {
        const isHighlighted = highlightedLocation && 
          Math.abs(location.lat - highlightedLocation.lat) < 10 && 
          Math.abs(location.lng - highlightedLocation.lng) < 10;
        
        // Draw marker
        ctx.beginPath();
        ctx.arc(location.lat, location.lng, isHighlighted ? 8 : 6, 0, 2 * Math.PI);
        ctx.fillStyle = isHighlighted ? '#8b5cf6' : '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Draw label if highlighted
        if (isHighlighted) {
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#1e40af';
          ctx.lineWidth = 1;
          
          // Background for text
          const textWidth = ctx.measureText(location.title).width;
          ctx.fillRect(location.lat - textWidth / 2 - 5, location.lng - 25, textWidth + 10, 20);
          ctx.strokeRect(location.lat - textWidth / 2 - 5, location.lng - 25, textWidth + 10, 20);
          
          // Text
          ctx.fillStyle = '#1e3a8a';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(location.title, location.lat, location.lng - 10);
        }
      });
    }
    
    // Draw region insights if selected
    if (selectedInsight) {
      const region = mapRegions.find(r => r.id === selectedInsight);
      if (region) {
        // Draw insight popup
        const x = region.x + region.width / 2;
        const y = region.y + region.height / 2;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 2;
        
        const insightWidth = 180;
        const insightHeight = 120;
        
        ctx.fillRect(x - insightWidth / 2, y - insightHeight / 2, insightWidth, insightHeight);
        ctx.strokeRect(x - insightWidth / 2, y - insightHeight / 2, insightWidth, insightHeight);
        
        // Title
        ctx.fillStyle = '#1e3a8a';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(region.name + ' Insights', x, y - 40);
        
        // Metrics
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        
        const metrics = [
          `Noise: ${region.metrics.noiseLevel}/10`,
          `Crime: ${region.metrics.crimeRate}/10`,
          `Pollution: ${region.metrics.pollution}/10`,
          `Traffic: ${region.metrics.trafficCongestion}/10`,
          `Green Space: ${region.metrics.greenSpaceAccess}/10`,
          `Schools: ${region.metrics.schoolQuality}/10`
        ];
        
        metrics.forEach((metric, index) => {
          ctx.fillText(metric, x - 80, y - 20 + index * 20);
        });
      }
    }
  };
  
  // Handle canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if clicked on a location marker
    if (view === 'properties') {
      const clickedLocation = locations.find(location => 
        Math.abs(location.lat - x) < 10 && Math.abs(location.lng - y) < 10
      );
      
      if (clickedLocation && onMapClick) {
        onMapClick({ lat: clickedLocation.lat, lng: clickedLocation.lng });
        return;
      }
    }
    
    // Check if clicked on a region
    const clickedRegion = mapRegions.find(region => 
      x >= region.x && x <= region.x + region.width && 
      y >= region.y && y <= region.y + region.height
    );
    
    if (clickedRegion) {
      setHoveredRegion(clickedRegion.id);
      
      // If in insight mode, show region insights
      if (showInsights) {
        setSelectedInsight(prevInsight => 
          prevInsight === clickedRegion.id ? null : clickedRegion.id
        );
      }
      
      // In environmental mode, apply filters
      if (view === 'environmental' && onEnvironmentalFilterChange) {
        const ranking = environmentalRankings.find(r => r.type === selectedMetric);
        const value = clickedRegion.metrics[selectedMetric as keyof typeof clickedRegion.metrics] as number;
        
        if (ranking) {
          onEnvironmentalFilterChange(
            selectedMetric,
            value > 5 ? 'high' : 'low'
          );
        }
      }
    } else {
      // Clear selected insight if clicking outside of regions
      setSelectedInsight(null);
    }
  };
  
  // Handle canvas mouse move for hover effects
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if hovering over a region
    const hoveredRegion = mapRegions.find(region => 
      x >= region.x && x <= region.x + region.width && 
      y >= region.y && y <= region.y + region.height
    );
    
    setHoveredRegion(hoveredRegion ? hoveredRegion.id : null);
  };
  
  // Handle mouse leaving the canvas
  const handleCanvasMouseLeave = () => {
    setHoveredRegion(null);
  };
  
  // Handle selection of environmental metric
  const handleMetricChange = (value: string) => {
    setSelectedMetric(value);
    setView('environmental');
    
    if (onEnvironmentalFilterChange) {
      // Default to showing low values (which is generally better for most metrics)
      const ranking = environmentalRankings.find(r => r.type === value);
      onEnvironmentalFilterChange(value, ranking?.isHigherBetter ? 'high' : 'low');
    }
  };
  
  // Toggle between property view and environmental data view
  const toggleView = () => {
    setView(prev => (prev === 'properties' ? 'environmental' : 'properties'));
    setSelectedInsight(null);
  };

  // Toggle insights mode
  const toggleInsights = () => {
    setShowInsights(prev => !prev);
    if (!showInsights) {
      setView('properties');
    } else {
      setSelectedInsight(null);
    }
  };
  
  // Draw the map when component mounts or when dependencies change
  useEffect(() => {
    drawMap();
  }, [selectedMetric, view, locations, highlightedLocation, hoveredRegion, showInsights, selectedInsight]);
  
  return (
    <Card className="w-full h-full min-h-[400px] relative overflow-hidden">
      {/* Map toolbar */}
      <div className="absolute top-2 left-2 right-2 z-[10] flex justify-between items-center gap-2 p-2 bg-background/90 backdrop-blur-sm rounded-lg">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleView}
          >
            {view === 'properties' ? 'Show Environmental Data' : 'Show Properties'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleInsights}
          >
            {showInsights ? 'Hide Insights' : 'Show Insights'}
          </Button>
        </div>
        
        <Select value={selectedMetric} onValueChange={handleMetricChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            {environmentalRankings.map((ranking) => (
              <SelectItem key={ranking.type} value={ranking.type}>
                {ranking.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Map Legend */}
      {view === 'environmental' && (
        <div className="absolute bottom-4 right-4 z-[10] bg-white p-2 rounded-md shadow-md">
          <p className="text-sm font-medium mb-1">
            {environmentalRankings.find(r => r.type === selectedMetric)?.label || 'Metric'} Legend:
          </p>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#4ade80]"></div>
            <span className="text-xs">Excellent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#a3e635]"></div>
            <span className="text-xs">Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#fde047]"></div>
            <span className="text-xs">Average</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#f97316]"></div>
            <span className="text-xs">Below Average</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#ef4444]"></div>
            <span className="text-xs">Poor</span>
          </div>
        </div>
      )}
      
      {/* Map Canvas */}
      <div className="h-full w-full pt-14">
        <canvas 
          ref={canvasRef}
          width={500}
          height={400}
          className="w-full h-full bg-gray-100 rounded-md"
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={handleCanvasMouseLeave}
        />
      </div>
    </Card>
  );
};

export default CustomMap;

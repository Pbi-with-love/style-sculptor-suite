
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
  activeLayer?: string;
  onLayerChange?: (layerType: string) => void;
}

// Generate more detailed regions with irregular shapes to match the reference image
const generateRegions = () => {
  // Base regions from previous implementation
  const baseRegions = [
    { id: 'r1', name: 'Downtown', x: 50, y: 150, metrics: { noiseLevel: 8, crimeRate: 7, pollution: 6, trafficCongestion: 8, greenSpaceAccess: 3, schoolQuality: 7 } },
    { id: 'r2', name: 'Uptown', x: 200, y: 70, metrics: { noiseLevel: 5, crimeRate: 4, pollution: 3, trafficCongestion: 5, greenSpaceAccess: 6, schoolQuality: 8 } },
    { id: 'r3', name: 'Westside', x: 20, y: 280, metrics: { noiseLevel: 4, crimeRate: 3, pollution: 3, trafficCongestion: 4, greenSpaceAccess: 8, schoolQuality: 7 } },
    { id: 'r4', name: 'Eastside', x: 240, y: 220, metrics: { noiseLevel: 6, crimeRate: 5, pollution: 7, trafficCongestion: 6, greenSpaceAccess: 5, schoolQuality: 6 } },
    { id: 'r5', name: 'Suburb North', x: 140, y: 10, metrics: { noiseLevel: 3, crimeRate: 2, pollution: 2, trafficCongestion: 3, greenSpaceAccess: 9, schoolQuality: 9 } },
    { id: 'r6', name: 'Suburb South', x: 130, y: 290, metrics: { noiseLevel: 2, crimeRate: 1, pollution: 2, trafficCongestion: 2, greenSpaceAccess: 8, schoolQuality: 8 } },
    { id: 'r7', name: 'Tech District', x: 350, y: 100, metrics: { noiseLevel: 7, crimeRate: 4, pollution: 5, trafficCongestion: 7, greenSpaceAccess: 4, schoolQuality: 9 } },
    { id: 'r8', name: 'Harbor View', x: 350, y: 250, metrics: { noiseLevel: 5, crimeRate: 3, pollution: 6, trafficCongestion: 4, greenSpaceAccess: 7, schoolQuality: 6 } },
    { id: 'r9', name: 'Cultural Center', x: 30, y: 50, metrics: { noiseLevel: 6, crimeRate: 5, pollution: 4, trafficCongestion: 6, greenSpaceAccess: 5, schoolQuality: 8 } },
  ];
  
  // Create irregular polygons for each region
  const regions = baseRegions.map(region => {
    const points = generateIrregularPolygon(region.x, region.y, 30, 60, 6 + Math.floor(Math.random() * 6));
    return {
      ...region,
      polygon: points
    };
  });
  
  // Add smaller irregularly shaped areas (more like the reference image)
  const smallRegions = [];
  for (let i = 0; i < 25; i++) {
    const x = 20 + Math.random() * 460;
    const y = 20 + Math.random() * 360;
    const size = 10 + Math.random() * 30;
    const points = generateIrregularPolygon(x, y, size * 0.6, size, 4 + Math.floor(Math.random() * 3));
    
    // Assign metrics based on neighboring larger regions
    const nearestRegion = findNearestRegion(x, y, baseRegions);
    const metrics = { ...nearestRegion.metrics };
    
    // Add some variation to metrics
    Object.keys(metrics).forEach(key => {
      const variation = Math.random() * 2 - 1; // -1 to 1
      const currentValue = metrics[key as keyof typeof metrics] as number;
      metrics[key as keyof typeof metrics] = Math.max(1, Math.min(10, currentValue + variation)) as any;
    });
    
    smallRegions.push({
      id: `small-${i}`,
      name: `Area-${i+1}`,
      x,
      y,
      polygon: points,
      metrics: metrics
    });
  }
  
  return [...regions, ...smallRegions];
};

// Find the nearest large region to a point
const findNearestRegion = (x: number, y: number, regions: any[]) => {
  let minDist = Infinity;
  let nearest = regions[0];
  
  regions.forEach(region => {
    const dx = region.x - x;
    const dy = region.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < minDist) {
      minDist = dist;
      nearest = region;
    }
  });
  
  return nearest;
};

// Generate an irregular polygon with n vertices around a center point
const generateIrregularPolygon = (centerX: number, centerY: number, minRadius: number, maxRadius: number, numVertices: number) => {
  const points = [];
  const angleStep = (2 * Math.PI) / numVertices;
  
  for (let i = 0; i < numVertices; i++) {
    const angle = i * angleStep;
    const radius = minRadius + Math.random() * (maxRadius - minRadius);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x, y });
  }
  
  return points;
};

// Generate all map regions once
const mapRegions = generateRegions();

// Location markers that will be displayed on the map
const locationMarkers = [
  { id: '1', lat: 100, lng: 180, title: 'Modern Apartment in Downtown' },
  { id: '2', lat: 230, lng: 100, title: 'Spacious Family Home' },
  { id: '3', lat: 270, lng: 250, title: 'Luxury Penthouse' },
  { id: '4', lat: 60, lng: 320, title: 'Urban Smart Loft' },
  { id: '5', lat: 170, lng: 30, title: 'Waterfront Condo' },
  { id: '6', lat: 380, lng: 120, title: 'Tech Hub Studio' },
  { id: '7', lat: 390, lng: 270, title: 'Harbor View Apartment' },
  { id: '8', lat: 60, lng: 70, title: 'Arts District Loft' },
  { id: '9', lat: 320, lng: 180, title: 'Midtown Townhouse' },
];

const CustomMap = ({ 
  locations = locationMarkers, 
  onMapClick, 
  onEnvironmentalFilterChange,
  highlightedLocation,
  activeLayer = 'noiseLevel',
  onLayerChange
}: CustomMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>(activeLayer);
  const [view, setView] = useState<'properties' | 'environmental'>('environmental');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState<boolean>(false);
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  
  // Update the local state when the prop changes
  useEffect(() => {
    setSelectedMetric(activeLayer);
  }, [activeLayer]);
  
  // Convert metric value to color
  const getMetricColor = (value: number, isHigherBetter: boolean) => {
    // For metrics where higher is better (green space, schools)
    if (isHigherBetter) {
      if (value >= 8) return 'rgba(255, 255, 0, 0.8)'; // Yellow (excellent)
      if (value >= 6) return 'rgba(255, 255, 0, 0.6)'; // Light yellow (good)
      if (value >= 4) return 'rgba(255, 255, 0, 0.4)'; // Very light yellow (average)
      if (value >= 2) return 'rgba(255, 255, 0, 0.2)'; // Almost transparent (below average)
      return 'rgba(255, 255, 0, 0.1)'; // Barely visible (poor)
    } else {
      // For metrics where lower is better (noise, crime, pollution)
      if (value <= 2) return 'rgba(255, 255, 0, 0.8)'; // Yellow (excellent)
      if (value <= 4) return 'rgba(255, 255, 0, 0.6)'; // Light yellow (good)
      if (value <= 6) return 'rgba(255, 255, 0, 0.4)'; // Very light yellow (average)
      if (value <= 8) return 'rgba(255, 255, 0, 0.2)'; // Almost transparent (below average)
      return 'rgba(255, 255, 0, 0.1)'; // Barely visible (poor)
    }
  };

  // Draw a polygon on the canvas
  const drawPolygon = (ctx: CanvasRenderingContext2D, points: {x: number, y: number}[], fillStyle: string, strokeStyle: string = '#000000') => {
    if (points.length < 3) return;
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // Draw the map canvas
  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background with a topographic look (like the reference image)
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Simulate a base map appearance - light colors for land
    ctx.fillStyle = '#e9eaec';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some water areas (blue)
    ctx.fillStyle = '#d1e5f0';
    ctx.fillRect(0, 0, 200, 100); // Upper left water body
    ctx.fillRect(300, 0, 200, 150); // Upper right water body
    ctx.fillRect(0, 350, 150, 50); // Lower left water body
    
    // Draw major roads - similar to the reference image
    ctx.strokeStyle = '#d9c89e';
    ctx.lineWidth = 3;
    
    // Draw a few main roads
    // Horizontal main roads
    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(500, 150);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.lineTo(500, 250);
    ctx.stroke();
    
    // Vertical main roads
    ctx.beginPath();
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 400);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400);
    ctx.stroke();
    
    // Draw some curved roads
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.quadraticCurveTo(250, 100, 500, 50);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.quadraticCurveTo(100, 200, 50, 400);
    ctx.stroke();
    
    // Draw smaller roads
    ctx.strokeStyle = '#e0d5b3';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 10; i++) {
      const y = i * 40;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(500, y);
      ctx.stroke();
      
      const x = i * 50;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 400);
      ctx.stroke();
    }
    
    // Draw regions with environmental data - use the irregularly shaped regions
    mapRegions.forEach(region => {
      const currentRanking = environmentalRankings.find(r => r.type === selectedMetric);
      const isHigherBetter = currentRanking?.isHigherBetter || false;
      const metricValue = region.metrics[selectedMetric as keyof typeof region.metrics] as number;
      
      // Apply colors based on the view mode and selected metric
      let fillColor = '#e5e7eb50'; // Default semi-transparent gray
      if (view === 'environmental') {
        fillColor = getMetricColor(metricValue, isHigherBetter);
      }
      
      // Make hovered region stand out
      if (hoveredRegion === region.id) {
        fillColor = view === 'environmental' ? 
          getMetricColor(metricValue, isHigherBetter) : 
          '#d1d5db80';
      }
      
      // Draw the region as an irregular polygon
      if (region.polygon) {
        drawPolygon(ctx, region.polygon, fillColor, hoveredRegion === region.id ? '#333' : '#9ca3af50');
      }
      
      // Show region name for larger regions
      if (region.id.indexOf('small') === -1) {
        ctx.fillStyle = '#1f2937';
        ctx.font = '10px Arial';
        ctx.fillText(region.name, region.x - 15, region.y);
      }
      
      // Draw insights icon if in insights mode
      if (showInsights && region.id.indexOf('small') === -1) {
        ctx.fillStyle = '#8b5cf6';
        ctx.beginPath();
        ctx.arc(region.x + 20, region.y - 10, 5, 0, 2 * Math.PI);
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
        const x = region.x;
        const y = region.y;
        
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
    
    // Check if clicked on a region - need to check polygons now
    const clickedRegion = mapRegions.find(region => {
      if (!region.polygon) return false;
      return isPointInPolygon(x, y, region.polygon);
    });
    
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
  
  // Check if a point is inside a polygon
  const isPointInPolygon = (x: number, y: number, polygon: {x: number, y: number}[]) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      
      const intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };
  
  // Handle canvas mouse move for hover effects
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if hovering over a region - need to check polygons
    const hoveredRegion = mapRegions.find(region => {
      if (!region.polygon) return false;
      return isPointInPolygon(x, y, region.polygon);
    });
    
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
    
    if (onLayerChange) {
      onLayerChange(value);
    }
    
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
        <div className="absolute bottom-4 right-4 z-[10] bg-white/90 p-2 rounded-md shadow-md">
          <p className="text-sm font-medium mb-1">
            {environmentalRankings.find(r => r.type === selectedMetric)?.label || 'Metric'} Legend:
          </p>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[rgba(255,255,0,0.8)]"></div>
            <span className="text-xs">Excellent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[rgba(255,255,0,0.6)]"></div>
            <span className="text-xs">Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[rgba(255,255,0,0.4)]"></div>
            <span className="text-xs">Average</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[rgba(255,255,0,0.2)]"></div>
            <span className="text-xs">Below Average</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[rgba(255,255,0,0.1)]"></div>
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

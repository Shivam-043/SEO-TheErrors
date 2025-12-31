
import { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { BarChart, DoughnutChart } from '../../components/charts/Charts';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon not finding images in Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- CONFIGURATION ---
// Configuration moved inside component to be dynamic per client
const DEFAULT_KEYWORDS = [
    { id: 'burgers', label: '"Best Burgers"', rank: 'Avg #3' },
    { id: 'lunch', label: '"Lunch Spot"', rank: 'Avg #5' },
    { id: 'takeout', label: '"Takeout"', rank: 'Avg #1' }
];

const CustomMarker = ({ position, rank, isCenter }) => {
    let colorClass = '#ef4444'; // red-500
    if (rank <= 3) colorClass = '#22c55e'; // green-500
    else if (rank <= 10) colorClass = '#facc15'; // yellow-400

    const iconHtml = `
        <div class="flex items-center justify-center w-full h-full rounded-full border-2 border-white shadow-md text-white font-bold text-xs" 
             style="background-color: ${colorClass}; ${isCenter ? 'border-color: #1f2937; transform: scale(1.2);' : ''}">
            ${rank}
        </div>
    `;

    const customIcon = new L.DivIcon({
        html: iconHtml,
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    return (
        <Marker position={position} icon={customIcon}>
            <Popup>
                <div className="text-center">
                    <div className="font-bold">Rank #{rank}</div>
                    <div className="text-xs text-gray-500">
                        {isCenter ? "Business Location" : "Grid Point"}
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

const LocalSEO = () => {
    const { data, activeClient, loading } = useData();
    const [currentKeyword, setCurrentKeyword] = useState('burgers');

    const displayKeywords = activeClient?.geoKeywords || DEFAULT_KEYWORDS;

    // Default: Gilbert/Chandler, AZ area if not set
    const clientLat = activeClient?.latitude || 33.3000;
    const clientLng = activeClient?.longitude || -111.8000;
    const GRID_RADIUS_MILES = 10.0;
    const GRID_SIZE = 5;

    // Recalculate conversion factors based on current lat
    const milesPerDegLat = 69;
    const milesPerDegLng = 69 * Math.cos(clientLat * (Math.PI / 180));

    const gridPoints = useMemo(() => {
        if (!data || !data.geoData[currentKeyword]) return [];

        const points = [];
        const centerIndex = Math.floor((GRID_SIZE * GRID_SIZE) / 2);
        const ranks = data.geoData[currentKeyword];

        // 2 miles spacing
        const spacingMiles = 2.0;

        const latStep = spacingMiles / milesPerDegLat;
        const lngStep = spacingMiles / milesPerDegLng;

        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const row = Math.floor(i / GRID_SIZE);
            const col = i % GRID_SIZE;

            // Center is at (2, 2)
            const dRow = row - 2;
            const dCol = col - 2;

            const lat = clientLat - (dRow * latStep);
            const lng = clientLng + (dCol * lngStep);

            points.push({
                lat,
                lng,
                rank: ranks[i],
                isCenter: i === centerIndex
            });
        }
        return points;
    }, [data, currentKeyword, clientLat, clientLng, milesPerDegLat, milesPerDegLng]);

    if (loading || !data) return <div>Loading...</div>;

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <section className="animate-fade-in block space-y-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-orange-900 mb-2">Local SEO & Google Business Profile</h2>
                <div className="flex justify-between items-end">
                    <p className="text-gray-700 max-w-2xl">For a local restaurant, this is the most critical area. We track how many customers found you on Maps and the actual actions they took (calling, driving).</p>
                    <div className="text-right hidden md:block">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Map Center</div>
                        <div className="text-sm font-mono text-gray-700 bg-white px-2 py-1 rounded border border-gray-200 inline-block mt-1">
                            {clientLat.toFixed(4)}, {clientLng.toFixed(4)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Map Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border-l-4 border-orange-600">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Controls */}
                    <div className="col-span-1 sticky top-24">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Geo-Grid Rankings</h3>
                        <p className="text-gray-600 text-sm mb-6">Rankings fluctuate based on customer location. This map shows your ranking dominance around the business location.</p>

                        <div className="mb-6 space-y-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">Select Keyword</label>
                            {displayKeywords.map((k) => (
                                <button
                                    key={k.id}
                                    onClick={() => setCurrentKeyword(k.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium shadow-sm transition-all flex justify-between items-center ${currentKeyword === k.id
                                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <span>{k.label}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${currentKeyword === k.id ? 'bg-white text-orange-600' : 'bg-gray-200 text-gray-500'
                                        }`}>{k.rank}</span>
                                </button>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-xs text-gray-500 uppercase mb-3">Ranking Legend</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                                <div className="flex items-center"><span className="legend-dot bg-green-500"></span> 1 - 3 (Dominant)</div>
                                <div className="flex items-center"><span className="legend-dot bg-yellow-400"></span> 4 - 10 (Visible)</div>
                                <div className="flex items-center"><span className="legend-dot bg-red-400"></span> 10+ (Opportunity)</div>
                            </div>
                        </div>
                    </div>

                    {/* Map Visual */}
                    <div className="col-span-1 lg:col-span-2">
                        <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-300 relative z-0">
                            {/* Key forces re-render when center changes */}
                            <MapContainer
                                key={`${clientLat}-${clientLng}`}
                                center={[clientLat, clientLng]}
                                zoom={11}
                                style={{ height: '100%', width: '100%' }}
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {gridPoints.map((point, idx) => (
                                    <CustomMarker
                                        key={idx}
                                        position={[point.lat, point.lng]}
                                        rank={point.rank}
                                        isCenter={point.isCenter}
                                    />
                                ))}
                            </MapContainer>
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-bold text-gray-600 border border-gray-200 shadow-sm z-[1000]">
                                Grid Radius: {GRID_RADIUS_MILES} mi
                            </div>
                        </div>
                        <p className="text-center text-xs text-gray-400 mt-2">Interactive Map: Drag to explore surrounding areas.</p>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Actions Breakdown</h3>
                    <BarChart data={data.chartData.localActions} options={barOptions} />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Discovery vs. Direct Search</h3>
                    <p className="text-sm text-gray-600 mb-4">"Discovery" means they found you looking for generic terms like "Burger near me".</p>
                    <div className="h-64 relative">
                        <DoughnutChart data={data.chartData.discovery} options={doughnutOptions} />
                    </div>
                </div>
            </div>

            <div className="bg-orange-100 border border-orange-200 rounded-xl p-6">
                <h3 className="font-bold text-orange-900 mb-4">Reputation Management Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-3xl font-bold text-orange-600">4.8</div>
                        <div className="text-sm text-orange-800">Average Rating</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-orange-600">+124</div>
                        <div className="text-sm text-orange-800">New Reviews</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-orange-600">100%</div>
                        <div className="text-sm text-orange-800">Response Rate</div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default LocalSEO;

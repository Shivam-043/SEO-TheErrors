
export const navItems = [
    { id: 'view-summary', label: '📊 Overview', path: '/dashboard/overview' },
    { id: 'view-local', label: '📍 Local SEO', path: '/dashboard/local-seo' },
    { id: 'view-conversions', label: '💰 Conversions', path: '/dashboard/conversions' },
    { id: 'view-rankings', label: '🏆 Rankings', path: '/dashboard/rankings' },
    { id: 'view-tech', label: '🛠️ Technical', path: '/dashboard/technical' }
];

export const keywords = [
    { term: 'best burgers washington dc', rank: 3, change: 8, vol: 1200, intent: 'Transactional' },
    { term: 'boss drive in', rank: 1, change: 0, vol: 5400, intent: 'Branded' },
    { term: 'lunch spots near me', rank: 5, change: 12, vol: 800, intent: 'Informational' },
    { term: 'best fries in town', rank: 2, change: 0, vol: 320, intent: 'Transactional' },
    { term: 'family dinner places dc', rank: 8, change: 15, vol: 1600, intent: 'Commercial' },
    { term: 'late night food washington', rank: 4, change: 6, vol: 900, intent: 'Transactional' },
    { term: 'gourmet burger menu', rank: 6, change: 3, vol: 450, intent: 'Commercial' },
    { term: 'vegan burger options', rank: 9, change: 10, vol: 600, intent: 'Informational' },
    { term: 'burger delivery', rank: 12, change: 2, vol: 2100, intent: 'Transactional' },
    { term: 'kids eat free places', rank: 15, change: 5, vol: 1100, intent: 'Commercial' }
];

export const geoData = {
    'burgers': [
        4, 3, 2, 3, 4,
        3, 2, 1, 2, 3,
        2, 1, 1, 1, 2,
        3, 2, 1, 2, 3,
        5, 4, 3, 4, 6
    ],
    'lunch': [
        8, 6, 5, 6, 9,
        6, 4, 3, 4, 7,
        5, 3, 2, 2, 4,
        7, 5, 3, 4, 6,
        9, 7, 5, 8, 11
    ],
    'takeout': [
        2, 2, 1, 2, 2,
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1,
        2, 1, 1, 1, 2,
        3, 2, 1, 2, 4
    ]
};

export const chartData = {
    traffic: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Organic Sessions',
            data: [800, 850, 920, 1100, 1250, 1400, 1600, 1550, 1400, 1300, 1100, 1232],
            borderColor: '#EA580C',
            backgroundColor: 'rgba(234, 88, 12, 0.1)',
            fill: true,
            tension: 0.4
        }]
    },
    localActions: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Direction Requests',
                data: [650, 800, 950, 840],
                backgroundColor: '#F97316'
            },
            {
                label: 'Phone Calls',
                data: [400, 480, 560, 452],
                backgroundColor: '#FDBA74'
            }
        ]
    },
    discovery: {
        labels: ['Discovery (Generic Terms)', 'Direct (Business Name)', 'Branded (Menu items)'],
        datasets: [{
            data: [65, 25, 10],
            backgroundColor: ['#EA580C', '#FB923C', '#FED7AA']
        }]
    },
    ctr: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Average Click-Through Rate (%)',
            data: [1.8, 1.9, 2.1, 2.2, 2.4, 2.6, 2.9, 3.0, 3.1, 3.2, 3.1, 3.2],
            borderColor: '#16A34A', // Green-600
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            borderWidth: 3,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#16A34A',
            fill: true,
            tension: 0.3
        }]
    },
    totalClicks: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Total Clicks (Google)',
            data: [2500, 2650, 2900, 3100, 3400, 3800, 4100, 4000, 3850, 3950, 4050, 4290],
            backgroundColor: '#F97316', // Orange-500
            borderRadius: 4
        }]
    },
    conversionRate: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
            label: 'User Conversion Rate',
            data: [3.2, 3.8, 4.1, 4.8],
            borderColor: '#15803d', // Green-700
            backgroundColor: 'rgba(21, 128, 61, 0.1)',
            fill: true,
            tension: 0.2,
            borderWidth: 3
        }]
    }
};

export const websiteExperience = {
    seoScore: 92,
    mobileLoadTime: '1.8s',
    lcp: '1.2s',
    cls: 0.02,
    websiteUrl: 'https://example.com'
};

export const competitorData = {
    profiles: [
        { id: 1, name: 'Boss Drive In', type: 'YOU', authority: 32, reviews: 450, topKws: 12, color: 'orange' },
        { id: 2, name: 'Big City Burgers', type: 'RIVAL', authority: 28, reviews: 310, topKws: 8, color: 'gray' },
        { id: 3, name: 'Shake Shack', type: 'NATIONAL', authority: 75, reviews: 1200, topKws: 45, color: 'blue' }
    ],
    radar: {
        labels: ['Authority', 'Content Depth', 'Backlinks', 'Tech Health', 'Local Visibility'],
        datasets: [
            { label: 'Boss Drive In', data: [65, 80, 70, 90, 85], backgroundColor: 'rgba(234, 88, 12, 0.2)', borderColor: 'rgba(234, 88, 12, 1)' },
            { label: 'Big City Burgers', data: [50, 60, 55, 70, 65], backgroundColor: 'rgba(156, 163, 175, 0.2)', borderColor: 'rgba(156, 163, 175, 1)' },
            { label: 'Shake Shack', data: [90, 85, 95, 85, 60], backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 1)' }
        ]
    },
    rankings: {
        labels: ['"Best Burger"', '"Drive In Near Me"', '"Milkshakes DC"', '"Late Night Food"'],
        datasets: [
            { label: 'Boss Drive In', data: [3, 1, 2, 4], backgroundColor: 'rgba(234, 88, 12, 0.8)' },
            { label: 'Big City Burgers', data: [8, 5, 12, 9], backgroundColor: 'rgba(156, 163, 175, 0.8)' },
            { label: 'Shake Shack', data: [2, 4, 5, 3], backgroundColor: 'rgba(59, 130, 246, 0.8)' }
        ]
    },
    marketShare: [
        { name: 'Boss Drive In', value: 35, color: 'orange' },
        { name: 'Big City Burgers', value: 25, color: 'gray' },
        { name: 'Shake Shack', value: 20, color: 'blue' },
        { name: 'Others', value: 20, color: 'gray-200' }
    ]
};


import { Check } from 'lucide-react';

const Technical = () => {
    return (
        <section className="animate-fade-in block space-y-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-orange-900 mb-2">Technical Health & Strategy</h2>
                <p className="text-gray-700">A website can't rank if it's broken. Here is the summary of the technical foundation work and content strategy executed this year.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Site Health */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Site Health Score</h3>
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative w-40 h-40">
                            {/* Simple CSS Gauge */}
                            <div className="w-full h-full rounded-full border-8 border-gray-100"></div>
                            <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500 border-t-transparent border-l-transparent transform -rotate-45"></div>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-4xl font-bold text-gray-800">92%</span>
                                <span className="text-xs text-gray-500">Excellent</span>
                            </div>
                        </div>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-center"><Check size={16} className="mr-2 text-green-500" /> Optimized Page Speed (Mobile Load &lt; 2.5s)</li>
                        <li className="flex items-center"><Check size={16} className="mr-2 text-green-500" /> Fixed 14 Broken Links (404s)</li>
                        <li className="flex items-center"><Check size={16} className="mr-2 text-green-500" /> Implemented Schema Markup (Restaurant, Menu)</li>
                    </ul>
                </div>

                {/* Content Wins */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Top Performing Content</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                            <div className="flex justify-between">
                                <span className="font-bold text-orange-900">Blog: "Best Burger Toppings 2024"</span>
                                <span className="text-orange-600 text-sm">1,200 Visits</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">Generated 45 menu clicks.</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                            <div className="flex justify-between">
                                <span className="font-bold text-orange-900">Page: "Our Locally Sourced Beef"</span>
                                <span className="text-orange-600 text-sm">850 Visits</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">High engagement time (3m 20s).</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                            <div className="flex justify-between">
                                <span className="font-bold text-orange-900">Page: "Catering Services"</span>
                                <span className="text-orange-600 text-sm">340 Visits</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">Primary lead generator.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">🚀 Strategic Recommendations for Management</h3>
                <p className="text-blue-800 mb-6">Actionable steps for the Boss Drive In team to accelerate growth and improve SEO signals.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "Personal Review Oversight", icon: "🧐", body: `While our team handles review replies, we strongly recommend the management team personally <strong>reads incoming reviews weekly</strong>. This direct feedback loop is crucial for understanding operational strengths.` },
                        { title: "Host Micro-Events", icon: "🎉", body: `Start hosting small in-restaurant events (e.g., "Friday Fry Tastings"). These events drive immediate foot traffic and generate <strong>local buzz, social check-ins</strong> that signal relevance to Google.` },
                        { title: "Fresh Food Photography", icon: "📸", body: `We recommend a monthly cadence of taking <strong>high-quality, well-lit photos</strong> of your specials and uploading them directly to your Business Profile to keep the feed active.` },
                        { title: "Encourage Social Tagging", icon: "🤳", body: `Create a small sign or table tent encouraging customers to "Tag us @BossDriveIn". User-Generated Content (UGC) acts as powerful social proof.` }
                    ].map((item, i) => (
                        <div key={i} className={`bg-white p-5 rounded-lg shadow-sm border-l-4 ${['border-orange-500', 'border-green-500', 'border-purple-500', 'border-blue-500'][i]}`}>
                            <div className="flex items-start">
                                <span className="text-2xl mr-3">{item.icon}</span>
                                <div>
                                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                                    <p className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: item.body }}></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Technical;

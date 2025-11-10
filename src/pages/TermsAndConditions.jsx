import React, { useState } from 'react';

const KEY_SUMMARY_DATA = [
    { icon: '🤝', title: "Your Agreement", text: "By browsing our site or using our services, you accept and agree to all these terms and conditions.", color: "gray" },
    { icon: '🛑', title: "No Resale or Copying", text: "All our content is our exclusive property. You are strictly forbidden from reselling, copying, or reusing it for any purpose without our written permission.", color: "red" },
    { icon: '⚖️', title: "Legal Action", text: "If you misuse, copy, or resell our content, you will be violating these terms and may face immediate legal action.", color: "gray" },
    { icon: '💼', title: "Your Account", text: "You are responsible for all activities that happen under your account and for keeping your password confidential.", color: "gray" },
    { icon: '🚫', title: "Site Conduct", text: "Do not use our site to do anything illegal, post harmful content, or try to bypass our security measures.", color: "gray" },
    { icon: '🚪', title: "Account Termination", text: "We can suspend or terminate your account at any time, without notice, if you violate these terms.", color: "yellow" },
    { icon: '💸', title: "Forfeiture of Content", text: "If your account is terminated for a violation, you will immediately lose all access to any digital content you have, with no right to a refund.", color: "red" },
    { icon: '⚠️', title: "No Guarantees (Disclaimer)", text: "Our products are provided \"AS IS.\" We take great care, but we are not liable for any errors or damages resulting from their use. Use them at your own discretion.", color: "yellow" },
];

const TABS = [
    { id: 'summary', title: 'Key Summary' },
    { id: 'responsibilities', title: 'Your Responsibilities' },
    { id: 'content_ip', title: 'Our Content (IP)' },
    { id: 'rights_legal', title: 'Our Rights & Legal' },
];

const TermsAndConditions = () => {
    const [activeTab, setActiveTab] = useState('summary');

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    const getSummaryCardClasses = (color) => {
        switch (color) {
            case 'red':
                return "bg-red-50 p-4 rounded-lg border border-red-200 flex items-start space-x-3";
            case 'yellow':
                return "bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex items-start space-x-3";
            case 'gray':
            default:
                return "bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-start space-x-3";
        }
    };

    const getTitleClasses = (color) => {
        switch (color) {
            case 'red':
                return "font-semibold text-red-900";
            case 'yellow':
                return "font-semibold text-yellow-900";
            case 'gray':
            default:
                return "font-semibold text-gray-900";
        }
    };

    const getTextClasses = (color) => {
        switch (color) {
            case 'red':
                return "text-red-700 text-sm";
            case 'yellow':
                return "text-yellow-700 text-sm";
            case 'gray':
            default:
                return "text-gray-600 text-sm";
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'summary':
                return (
                    <section id="summary" className="space-y-6" role="tabpanel">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Summary</h2>
                        <p className="text-gray-700">
                            Welcome to Anmol Educational Books! By using our site or products, you agree to these terms. Below is a plain-English summary of the most important points. The full legal text is available in the other tabs.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {KEY_SUMMARY_DATA.map((item, index) => (
                                <div key={index} className={getSummaryCardClasses(item.color)}>
                                    <span className="text-2xl pt-1">{item.icon}</span>
                                    <div>
                                        <h3 className={getTitleClasses(item.color)}>{item.title}</h3>
                                        <p className={getTextClasses(item.color)}>{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'responsibilities':
                return (
                    <section id="responsibilities" className="space-y-6" role="tabpanel">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Responsibilities</h2>
                        <p className="text-gray-700">
                            This section explains your responsibilities as a user. This includes how you agree to the terms, your role in account security, and the conduct we require when you use our services.
                        </p>
                        <div className="space-y-4 pt-4 prose prose-indigo max-w-none">
                            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">2.1 Acceptance of Terms</h3>
                            <p>Your mere use of the website constitutes your acceptance of these Terms. This includes browsing the site, creating an account, or downloading any materials.</p>

                            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">2.2 Account Responsibility</h3>
                            <p>If you create an account on our site, you are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.</p>

                            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">2.3 Acceptable Conduct</h3>
                            <p>You agree not to use the site for any unlawful or prohibited purpose. Prohibited activities include, but are not limited to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Attempting to interfere with the proper working of the site.</li>
                                <li>Bypassing any security or protection measures.</li>
                                <li>Using automated means (such as bots or screen-scraping) to access or collect data from the site.</li>
                                <li>Posting or transmitting any offensive, illegal, or harmful content.</li>
                            </ul>
                        </div>
                    </section>
                );
            case 'content_ip':
                return (
                    <section id="content_ip" className="space-y-6" role="tabpanel">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Content (Intellectual Property)</h2>
                        <p className="text-gray-700">
                            All content on this site and in our products is the exclusive property of Anmol Educational Books. This section details what that ownership covers and what you are strictly prohibited from doing with our content.
                        </p>
                        <div className="space-y-4 pt-4 prose prose-indigo max-w-none">
                            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">1.1 Ownership of Content</h3>
                            <p>All content, including, but not limited to, textbooks, e-books, digital resources, test paper generators, lesson plans, articles, text, graphics, logos, images, software, and the compilation of all content on this site, is the exclusive property of Anmol Educational Books or its content suppliers and is protected by applicable copyright, trademark, and other intellectual property laws.</p>

                            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">1.2 Prohibited Use (Resale and Reuse)</h3>
                            <p>The materials and content provided by AEB are licensed for personal, institutional, or educational use as specifically defined in your purchase agreement or license. <strong>You are strictly prohibited from:</strong></p>
                            <ol className="list-decimal pl-5 space-y-1">
                                <li><strong>Resale and Distribution:</strong> Reselling, redistributing, leasing, licensing, or commercially exploiting any printed book, e-book, or digital resource purchased or accessed from AEB, whether for profit or not-for-profit purposes.</li>
                                <li><strong>Reproduction and Reuse:</strong> Copying, reproducing, republishing, uploading, posting, transmitting, or distributing any of the content in any way, digitally or physically, without the express prior written permission of an authorized representative of AEB.</li>
                                <li><strong>Derivative Works:</strong> Creating derivative works based on any AEB content, including modifications, translations, or adaptations.</li>
                            </ol>

                            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">1.3 Legal Action</h3>
                            <p>Any unauthorized commercial use, resale, reproduction, or distribution of AEB’s copyrighted material constitutes a violation of these Terms and may result in immediate legal action, including claims for monetary damages, injunctive relief, and all legal costs.</p>
                        </div>
                    </section>
                );
            case 'rights_legal':
                return (
                    <section id="rights_legal" className="space-y-6" role="tabpanel">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Rights & Legal Framework</h2>
                        <p className="text-gray-700">
                            This section covers our rights as the service provider and the legal framework for these terms. This includes our right to change the site, our policies on termination, our disclaimers of liability, and the governing law.
                        </p>
                        <div className="space-y-4 pt-4 prose prose-indigo max-w-none">
                            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">Modifications to the Site and Terms</h3>
                            <p>AEB reserves the right, at its sole discretion, to modify or discontinue, temporarily or permanently, the site or any services available on it, with or without notice.</p>
                            <p>AEB also reserves the right to revise and amend these Terms at any time. When we make changes, the updated version will be posted on this page with a revised “Effective Date.” Your continued use of the site after any changes indicates your acceptance of the new Terms.</p>

                            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">Account Termination and Digital Content Revocation</h3>
                            <p><strong>Right to Terminate:</strong> AEB reserves the right to terminate or suspend your access to all or part of the services, your account, and any associated digital content, without notice and at our sole discretion, if we believe you have violated these Terms, engaged in fraudulent activity, or conducted any other harmful acts against AEB or its users.</p>
                            <p><strong>Forfeiture of Digital Content:</strong> Upon termination of your account due to a breach of these Terms, particularly violations related to intellectual property or acceptable conduct, you acknowledge and agree that <strong>any available digital content, access keys, or associated subscriptions linked to that account will be immediately forfeited, revoked, and become unusable, without any right to refund or compensation.</strong></p>

                            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">Disclaimer of Warranties and Limitation of Liability</h3>
                            <p><strong>Development and Accuracy:</strong> AEB takes great care in the research, authorship, editing, and development of all our educational products and services. However, due to the nature of publishing and the vast scope of educational material, the content may occasionally contain typographical errors, inaccuracies, or incomplete information.</p>
                            <p><strong>Disclaimer:</strong> AEB makes no warranties, express or implied, regarding the accuracy, reliability, or completeness of the products or services provided. <strong>All products and services are provided "AS IS" and "AS AVAILABLE"</strong> without any warranty of any kind.</p>
                            <p><strong>Limitation of Liability:</strong> You understand and agree that AEB will not be liable for any damages—direct, indirect, incidental, consequential, or exemplary—arising from:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>The use or the inability to use our products or services.</li>
                                <li>Any errors, mistakes, or inaccuracies in the content.</li>
                                <li>Any decisions made by the user based on the content of our publications.</li>
                            </ul>
                            <p><strong>The user assumes all responsibility and risk for the use of the site, services, and products of Anmol Educational Books and should exercise discretion and caution.</strong></p>

                            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">Governing Law</h3>
                            <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.</p>
                            <p>Any dispute arising out of or related to these Terms or your use of the site or products shall be subject to the exclusive jurisdiction of the courts located in [Specify City/State, e.g., Lucknow, Uttar Pradesh, India].</p>
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container max-w-4xl mx-auto p-4 py-8 md:p-12">
            
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms and Conditions of Use</h1>
                <p className="text-lg text-gray-600">Anmol Educational Books</p>
                <p className="text-sm text-gray-500 mt-1">Effective Date: November 10, 2025</p>
            </header>

            <nav className="bg-white rounded-lg shadow-sm mb-8 md:sticky md:top-18 z-10 border-b border-gray-200">
                <div id="nav-container" className="flex flex-wrap -mb-px px-4" role="tablist">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`
                                nav-item text-gray-600 py-4 px-3 md:px-5 border-b-2 border-transparent text-sm md:text-base transition-all
                                ${activeTab === tab.id 
                                    ? 'border-blue-600 text-blue-600 font-medium' 
                                    : 'hover:text-blue-500 hover:border-gray-300'
                                }
                            `}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>
            </nav>

            <main id="content-container" className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200 min-h-[500px]">
                {renderContent()}
            </main>
        </div>
    );
};

export default TermsAndConditions;
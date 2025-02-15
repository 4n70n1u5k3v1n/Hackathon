import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';
import './Skills.css';  // Import the CSS file
import ProfileSidebar from '../components/ProfileSidebar';

const Skills = ({userID}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    };

    const programmingLanguages = [
        'Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby', 'Swift', 'Go', 'PHP', 'Kotlin'
    ];

    const initialIncoming = [
        {
            id: 4,
            name: 'User321',
            profilePic: 'https://via.placeholder.com/50',
            skillsWant: 'JavaScript',
            skillsOffered: 'Python',
        },
        {
            id: 5,
            name: 'User654',
            profilePic: 'https://via.placeholder.com/50',
            skillsWant: 'UI/UX Design',
            skillsOffered: 'Graphic Design',
        },
        {
            id: 6,
            name: 'User987',
            profilePic: 'https://via.placeholder.com/50',
            skillsWant: 'Photography',
            skillsOffered: 'Video Editing',
        },
    ];

    // Dummy data for listings
    const initialListings = [
        {
            id: 1,
            name: 'User123',
            profilePic: 'https://via.placeholder.com/50',
            skillsWant: 'Python',
            skillsOffered: 'Java',
        },
        {
            id: 2,
            name: 'User456',
            profilePic: 'https://via.placeholder.com/50',
            skillsWant: 'Photography',
            skillsOffered: 'Cooking',
        },
        {
            id: 3,
            name: 'User789',
            profilePic: 'https://via.placeholder.com/50',
            skillsWant: 'UI/UX Design',
            skillsOffered: 'Graphic Design',
        },
    ];

    // State for managing listings, requested, incoming, and accepted
    const [listings, setListings] = useState(initialListings);
    const [requested, setRequested] = useState([]);
    const [incoming, setIncoming] = useState([initialIncoming]);
    const [accepted, setAccepted] = useState([]);

    // State for active tab
    const [activeTab, setActiveTab] = useState('listings');

    // State for pop-up visibility
    const [showPopup, setShowPopup] = useState(false);

    // State for form inputs
    const [skillsWant, setSkillsWant] = useState('');
    const [skillsOffered, setSkillsOffered] = useState('');

    // Function to handle skill request
    const handleRequest = (user) => {
        setRequested([...requested, user]); // Add to requested
        setListings(listings.filter((listing) => listing.id !== user.id)); // Remove from listings
    };

    // Function to handle cancel request
    const handleCancelRequest = (user) => {
        setListings([...listings, user]); // Add back to listings
        setRequested(requested.filter((req) => req.id !== user.id)); // Remove from requested
    };

    // Function to handle incoming requests (accept or reject)
    const handleIncomingRequest = (user, action) => {
        if (action === 'accept') {
            setAccepted([...accepted, user]); // Add to accepted
        }
        setIncoming(incoming.filter((req) => req.id !== user.id)); // Remove from incoming
    };

    // Function to handle form submission
    const handleSubmit = () => {
        if (!skillsWant || !skillsOffered) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in both fields!',
            });
            return;
        }

        // Add the new listing (dummy data for now)
        const newListing = {
            id: listings.length + 1,
            name: 'Current User',
            profilePic: 'https://via.placeholder.com/50',
            skillsWant,
            skillsOffered,
        };
        setListings([...listings, newListing]);

        // Show success animation
        Swal.fire({
            icon: 'success',
            title: 'Listing Created!',
            text: 'Your skills exchange listing has been added.',
            showConfirmButton: false,
            timer: 1500,
        });

        // Reset form and close pop-up
        setSkillsWant('');
        setSkillsOffered('');
        setShowPopup(false);
    };

    return (
        <div>
            <Header onProfileClick={handleProfileClick} userID={userID}/>
            <div style={{ paddingLeft: "10px" , paddingRight:'10px', backgroundColor:"#fffbf5"}}>
            <div className="skills-container" >
                <h2 className="skills-title" >Skills Exchange</h2>

                {/* Tabs */}
                <div className="skills-tabs">
                    <button
                        className={activeTab === 'listings' ? 'skills-activeTab' : 'skills-tab'}
                        onClick={() => setActiveTab('listings')}
                    >
                        Listings
                    </button>
                    <button
                        className={activeTab === 'requested' ? 'skills-activeTab' : 'skills-tab'}
                        onClick={() => setActiveTab('requested')}
                    >
                        Requested
                    </button>
                    <button
                        className={activeTab === 'incoming' ? 'skills-activeTab' : 'skills-tab'}
                        onClick={() => setActiveTab('incoming')}
                    >
                        Incoming
                    </button>
                    <button
                        className={activeTab === 'accepted' ? 'skills-activeTab' : 'skills-tab'}
                        onClick={() => setActiveTab('accepted')}
                    >
                        Accepted
                    </button>
                </div>

                {/* Listings Tab */}
                {activeTab === 'listings' && (
                    <div className="skills-friendsList">
                        {listings.map((user) => (
                            <div key={user.id} className="skills-friendCard">
                                <img src={user.profilePic} alt={user.name} className="skills-profilePic" />
                                <div className="skills-friendInfo">
                                    <h3 className="skills-username">{user.name}</h3>
                                    <p className="skills">Skills Want: {user.skillsWant}</p>
                                    <p className="skills">Skills Offered: {user.skillsOffered}</p>
                                </div>
                                <button className="skills-requestButton" onClick={() => handleRequest(user)}>
                                    Request
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Requested Tab */}
                {activeTab === 'requested' && (
                    <div className="skills-friendsList">
                        {requested.map((user) => (
                            <div key={user.id} className="skills-friendCard">
                                <img src={user.profilePic} alt={user.name} className="skills-profilePic" />
                                <div className="skills-friendInfo">
                                    <h3 className="skills-username">{user.name}</h3>
                                    <p className="skills">Skills Want: {user.skillsWant}</p>
                                    <p className="skills">Skills Offered: {user.skillsOffered}</p>
                                </div>
                                <button
                                    className="skills-cancelButton"
                                    onClick={() => handleCancelRequest(user)}
                                >
                                    Cancel Request
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Incoming Tab */}
                {activeTab === 'incoming' && (
                    <div className="skills-friendsList">
                        {incoming.map((user) => (
                            <div key={user.id} className="skills-friendCard">
                                <img src={user.profilePic} alt={user.name} className="skills-profilePic" />
                                <div className="skills-friendInfo">
                                    <h3 className="skills-username">{user.name}</h3>
                                    <p className="skills">Skills Want: {user.skillsWant}</p>
                                    <p className="skills">Skills Offered: {user.skillsOffered}</p>
                                </div>
                                <div className="skills-actions">
                                    <button
                                        className="skills-acceptButton"
                                        onClick={() => handleIncomingRequest(user, 'accept')}
                                    >
                                        ✓
                                    </button>
                                    <button
                                        className="skills-rejectButton"
                                        onClick={() => handleIncomingRequest(user, 'reject')}
                                    >
                                        ✗
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Accepted Tab */}
                {activeTab === 'accepted' && (
                    <div className="skills-friendsList" >
                        {accepted.map((user) => (
                            <div key={user.id} className="skills-friendCard">
                                <img src={user.profilePic} alt={user.name} className="skills-profilePic" />
                                <div className="skills-friendInfo">
                                    <h3 className="skills-username">{user.name}</h3>
                                    <p className="skills">Skills Want: {user.skillsWant}</p>
                                    <p className="skills">Skills Offered: {user.skillsOffered}</p>
                                </div>
                                <button
                                    className="skills-chatButton"
                                    onClick={() => window.open('https://telegram.me/username', '_blank')}
                                >
                                    Chat on Telegram
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <button className="skills-floatingButton" onClick={() => setShowPopup(true)}>
                +
            </button>

            {/* Pop-up Container */}
            {showPopup && (
                <div className="skills-popupOverlay">
                    <div className="skills-popupContainer">
                        <h2>Create Skills Exchange Listing</h2>
                        <select value={skillsWant} onChange={(e) => setSkillsWant(e.target.value)} className="skills-input">
                            <option value="">Select a skill you want</option>
                            {programmingLanguages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                        <select value={skillsOffered} onChange={(e) => setSkillsOffered(e.target.value)} className="skills-input">
                            <option value="">Select a skill you offer</option>
                            {programmingLanguages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                        <button className="skills-submitButton" onClick={handleSubmit}>
                            Enter
                        </button>
                        <button className="skills-closeButton" onClick={() => setShowPopup(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
            </div>
            <Navbar />
            {isSidebarOpen && (<ProfileSidebar onClose={() => setIsSidebarOpen(false)} style={{ left: isSidebarOpen ? '0' : '-50%' }} />)}
        </div>
    );
};

export default Skills;

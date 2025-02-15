import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';
import './Skills.css';
import ProfileSidebar from '../components/ProfileSidebar';
import {
    getUserSkillsListings,
    getUserSkillsRequested,
    getUserSkillsOffered,
    getUserSkillsAccepted
} from '../api/skills';
import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

const Skills = ({ userID }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [listings, setListings] = useState([]);
    const [requested, setRequested] = useState([]);
    const [incoming, setIncoming] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const [activeTab, setActiveTab] = useState('listings');
    const [showPopup, setShowPopup] = useState(false);
    const [skillsWant, setSkillsWant] = useState('');
    const [skillsOffered, setSkillsOffered] = useState('');

    const programmingLanguages = [
        'Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby', 'Swift', 'Go', 'PHP', 'Kotlin'
    ];

    const handleProfileClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Fetch data from API
    useEffect(() => {
        if (userID) {
            console.log(userID);
            fetchUserSkills().then(r => console.log("test", r)).catch(e => console.error("Error:", e));
        }
    }, [userID]);

    const fetchUserSkills = async () => {
        try {
            const listingsData = await getUserSkillsListings(userID);
            setListings(listingsData.data);
            console.log('listings', listingsData.data);
        } catch (error) {
            console.error("Error fetching user skills listings:", error);
        }

        try {
            const requestedData = await getUserSkillsRequested(userID);
            setRequested(requestedData.data);
        } catch (error) {
            console.error("Error fetching user skills requested:", error);
        }

        try {
            const incomingData = await getUserSkillsOffered(userID);
            setIncoming(incomingData.data);
        } catch (error) {
            console.error("Error fetching user skills offered:", error);
        }

        try {
            const acceptedData = await getUserSkillsAccepted(userID);
            setAccepted(acceptedData.data);
        } catch (error) {
            console.error("Error fetching user skills accepted:", error);
        }

    };

    // Handle request for a skill
    const handleRequest = async (user) => {
        console.log(userID);
        try {
            await axios.post(`${BASE_URL}/request-skill-match`, {
                acceptorId: userID,
                requestorId: user.requestor_id,
                skillId: user.skills_id,
                skillId2: user.skills_id_2
            });
            setListings(listings.filter((listing) => listing.id !== user.id));
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    const handleCancelRequest = async (user) => {
        try {
            await axios.post(`${BASE_URL}/reject-skill-match-status`, {
                requestorId: user.requestor_id,
                acceptorId: user.acceptor_id
            });
            setRequested(requested.filter((req) => req.id !== user.id));
        } catch (error) {
            console.error("Error canceling request:", error);
        }
    };

    const handleIncomingRequest = async (user, action) => {
        try {
            if (action === "accept") {
                await axios.post(`${BASE_URL}/accept-skill-match-status`, {
                    requestorId: user.requestor_id,
                    acceptorId: user.acceptor_id,
                    status: "accepted"
                });

                setAccepted([...accepted, user]);
            } else if (action === "reject") {
                await axios.post(`${BASE_URL}/reject-skill-match-status`, {
                    requestorId: user.requestor_id,
                    acceptorId: user.acceptor_id
                });
            }

            setIncoming(incoming.filter((req) => req.id !== user.id));
        } catch (error) {
            console.error(`Error ${action}ing request:`, error);
        }
    };


    // Handle form submission for creating a listing
    const handleSubmit = async () => {
        if (!skillsWant || !skillsOffered) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in both fields!',
            });
            return;
        }

        const newListing = {
            id: listings.length + 1,
            name: 'Current User',
            profilePic: 'https://via.placeholder.com/50',
            skillsWant,
            skillsOffered,
        };
        setListings([...listings, newListing]);

        Swal.fire({
            icon: 'success',
            title: 'Listing Created!',
            text: 'Your skills exchange listing has been added.',
            showConfirmButton: false,
            timer: 1500,
        });

        setSkillsWant('');
        setSkillsOffered('');
        setShowPopup(false);
    };

    return (
        <div>
            <Header onProfileClick={handleProfileClick} userID={userID} />
            <div style={{ paddingLeft: "10px", paddingRight: '10px', backgroundColor: "#fffbf5" }}>
                <div className="skills-container">
                    <h2 className="skills-title league-spartan-bold">Skills Exchange</h2>

                    {/* Tabs */}
                    <div className="skills-tabs">
                        {['listings', 'requested', 'incoming', 'accepted'].map(tab => (
                            <button
                                key={tab}
                                className={activeTab === tab ? 'skills-activeTab' : 'skills-tab'}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Listings */}
                    {activeTab === 'listings' && (
                        <div className="skills-friendsList">
                            {listings.map(user => (
                                <div key={user.id} className="skills-friendCard">
                                    <img src={user.profilePic} alt={user.user_fname} className="skills-profilePic" />
                                    <div className="skills-friendInfo">
                                        <h3 className="skills-username">{user.user_fname}</h3>
                                        <p className="skills">Skills Want: {user.skill_1}</p>
                                        <p className="skills">Skills Offered: {user.skill_2}</p>
                                    </div>
                                    <button className="skills-requestButton" onClick={() => handleRequest(user)}>
                                        Request
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Requested */}
                    {activeTab === 'requested' && (
                        <div className="skills-friendsList">
                            {requested.map(user => (
                                <div key={user.id} className="skills-friendCard">
                                    <img src={user.profilePic} alt={user.user_fname} className="skills-profilePic" />
                                    <div className="skills-friendInfo">
                                        <h3 className="skills-username">{user.user_fname}</h3>
                                        <p className="skills">Skills Want: {user.skill_1}</p>
                                        <p className="skills">Skills Offered: {user.skill_2}</p>
                                    </div>
                                    <button className="skills-cancelButton" onClick={() => handleCancelRequest(user)}>
                                        Cancel Request
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Incoming */}
                    {activeTab === 'incoming' && (
                        <div className="skills-friendsList">
                            {incoming.map(user => (
                                <div key={user.id} className="skills-friendCard">
                                    <img src={user.profilePic} alt={user.user_fname} className="skills-profilePic" />
                                    <div className="skills-friendInfo">
                                        <h3 className="skills-username">{user.user_fname}</h3>
                                        <p className="skills">Skills Want: {user.skill_1}</p>
                                        <p className="skills">Skills Offered: {user.skill_2}</p>
                                    </div>
                                    <div className="skills-actions">
                                        <button className="skills-acceptButton" onClick={() => handleIncomingRequest(user, 'accept')}>
                                            ✓
                                        </button>
                                        <button className="skills-rejectButton" onClick={() => handleIncomingRequest(user, 'reject')}>
                                            ✗
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Accepted */}
                    {activeTab === 'accepted' && (
                        <div className="skills-friendsList">
                            {accepted.map(user => (
                                <div key={user.id} className="skills-friendCard">
                                    <img src={user.profilePic} alt={user.user_fname} className="skills-profilePic" />
                                    <div className="skills-friendInfo">
                                        <h3 className="skills-username">{user.user_fname}</h3>
                                        <p className="skills">Skills Want: {user.skill_1}</p>
                                        <p className="skills">Skills Offered: {user.skill_2}</p>
                                    </div>
                                    <button className="skills-chatButton" onClick={() => window.open('https://telegram.me/username', '_blank')}>
                                        Chat on Telegram
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Floating Button */}
                <button className="skills-floatingButton" onClick={() => setShowPopup(true)}>+</button>

                {/* Popup */}
                {showPopup && (
                    <div className="skills-popupOverlay">
                        <div className="skills-popupContainer">
                            <h2>Create Skills Exchange Listing</h2>
                            <select value={skillsWant} onChange={(e) => setSkillsWant(e.target.value)} className="skills-input">
                                <option value="">Select a skill you want</option>
                                {programmingLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                            </select>
                            <select value={skillsOffered} onChange={(e) => setSkillsOffered(e.target.value)} className="skills-input">
                                <option value="">Select a skill you can offer</option>
                                {programmingLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                            </select>
                            <button className="skills-submitButton" onClick={handleSubmit}>Enter</button>
                            <button className="skills-closeButton" onClick={() => setShowPopup(false)}>Close</button>
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

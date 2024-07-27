import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext/useAuth';

function HomePage() {
    const { user } = useAuth();
    console.log(user);

    const styles = {
        pageContainer: {
            backgroundColor: '#333',
            color: '#fff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
        },
        navbar: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#87CEEB',
            padding: '10px 20px',
            boxSizing: 'border-box',
        },
        navbarBrand: {
            fontSize: '1.5em',
            fontWeight: 'bold',
        },
        profileIcon: {
            fontSize: '1.5em',
        },
        mainCard: {
            width: '90%',
            height: '40%',
            padding: '20px',
            backgroundColor: '#444',
            borderRadius: '10px',
            margin: '20px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cardsContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
            height: '40%',
            marginTop: '20px',
        },
        logo: {
            width: '40px',
            height: '40px',
            marginRight: '10px',
        },
        card: {
            width: '22%',
            height: '100%',
            padding: '20px',
            backgroundColor: '#555',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            margin: '0 10px',
            boxSizing: 'border-box',
        },
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.navbar}>
                <div style={styles.navbarBrand}>
                    SAVVY
                </div>
                <div style={styles.profileIcon}>👤</div>
            </div>
            <div style={styles.mainCard}>
                <Link to="/dummy-link" style={{ color: '#fff', textDecoration: 'none' }}>Main Card Link</Link>
            </div>
            <div style={styles.cardsContainer}>
                <div style={styles.card}>
                    <Link to="/PayTogether" style={{ color: '#fff', textDecoration: 'none' }}>Pay Together</Link>
                </div>
                <div style={styles.card}>
                    <Link to="/dummy-link-1" style={{ color: '#fff', textDecoration: 'none' }}>Analysis</Link>
                </div>
                <div style={styles.card}>
                    <Link to="/goalList" style={{ color: '#fff', textDecoration: 'none' }}>Goals</Link>
                </div>
                <div style={styles.card}>
                    <Link to="/dummy-link-3" style={{ color: '#fff', textDecoration: 'none' }}>Buffer</Link>
                </div>
            </div>
        </div>
    );
}

export { HomePage };

import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const ParallaxApp = () => {
    const sections = [
        {
            title: "Ala Archa National Park",
            subtitle: "Majestic peaks and alpine meadows",
            bgImage: "https://images.unsplash.com/photo-1578343708764-fb95e67e5fae?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDE1NTEyOTN8&ixlib=rb-4.0.3&q=85"
        },
        {
            title: "Issyk-Kul Lake",
            subtitle: "The world's second largest mountain lake",
            bgImage: "https://images.unsplash.com/photo-1568648523033-eee84d92a0f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDE1NTExMDR8&ixlib=rb-4.0.3&q=85"
        },
        {
            title: "Jeti-Ögüz Rocks",
            subtitle: "Legendary red sandstone formations",
            bgImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/0a/73/77/30-7.jpg?w=1200&h=700&s=1"
        },
        {
            title: "Tian Shan Mountains",
            subtitle: "Snow-capped peaks of the Celestial Range",
            bgImage: "https://images.unsplash.com/photo-1512219366879-c7aaaa6ed454?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDE1NTEwMjV8&ixlib=rb-4.0.3&q=85"
        }
    ];

    return (
        <div className="parallax-wrapper">
            <header className="parallax-header">
                <h1>Kyrgyzstan Nature</h1>
                <p className="subtitle">Land of Celestial Mountains</p>
            </header>

            {sections.map((section, index) => (
                <ParallaxSection key={index} {...section} />
            ))}
        </div>
    );
};

const ParallaxSection = ({ title, subtitle, bgImage }) => {
    const [isVisible, setIsVisible] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => {
            if (contentRef.current) {
                observer.unobserve(contentRef.current);
            }
        };
    }, []);

    return (
        <section
            className="parallax-section"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundColor: '#f0f0f0'
            }}
        >
            <div
                ref={contentRef}
                className="content"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateZ(0.5px) scale(0.85) translateY(${isVisible ? 0 : 20}px)`,
                    transition: 'all 0.5s ease-out'
                }}
            >
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
        </section>
    );
};

export default ParallaxApp;
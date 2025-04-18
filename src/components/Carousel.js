import React, { useState, useEffect } from 'react';
import slide1 from '../assets/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg';
import slide2 from '../assets/everything-you-need--47.jpg';
import slide3 from '../assets/TG_DSC0155.jpg';
import './Carousel.css';

function Carousel() {
    const slides = [
        { 
            id: 1, 
            image: slide1, 
            alt: 'Porsche 911', 
            title: 'Porsche 911',
            description: 'Timeless design meets unparalleled performance'
        },
        { 
            id: 2, 
            image: slide2, 
            alt: 'McLaren Senna',
            title: 'McLaren Senna',
            description: 'The ultimate track-focused road car'
        },
        { 
            id: 3, 
            image: slide3, 
            alt: 'Koenigsegg Jesko',
            title: 'Koenigsegg Jesko',
            description: 'Setting new standards in hypercar engineering'
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [fadeState, setFadeState] = useState('fade-in');
    
    // Handle slide change with fade effect
    const changeSlide = (newIndex) => {
        setFadeState('fade-out');
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setFadeState('fade-in');
        }, 300);
    };
    
    // Auto slideshow effect
    useEffect(() => {
        let slideshowInterval;
        if (!isPaused) {
            slideshowInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % slides.length;
                changeSlide(nextIndex);
            }, 5000); // Change slide every 5 seconds
        }
        
        // Clean up interval on component unmount
        return () => {
            clearInterval(slideshowInterval);
        };
    }, [currentIndex, isPaused, slides.length]);

    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        changeSlide(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        changeSlide(prevIndex);
    };

    return (
        <div className="carousel" 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}>
            <button className="carousel-button prev" onClick={prevSlide} aria-label="Previous slide">
                <i className="bi bi-chevron-left"></i>
            </button>
            <div className="carousel-slide">
                <img
                    src={slides[currentIndex].image}
                    alt={slides[currentIndex].alt}
                    className={`carousel-image ${fadeState}`}
                />
                <div className="carousel-caption">
                    <h2>{slides[currentIndex].title}</h2>
                    <p>{slides[currentIndex].description}</p>
                </div>
            </div>
            <button className="carousel-button next" onClick={nextSlide} aria-label="Next slide">
                <i className="bi bi-chevron-right"></i>
            </button>
            <div className="carousel-dots">
                {slides.map((slide, index) => (
                    <span 
                        key={slide.id}
                        className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => changeSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    ></span>
                ))}
            </div>
            <div className="carousel-progress">
                <div className="progress-bar" style={{ animationPlayState: isPaused ? 'paused' : 'running' }}></div>
            </div>
        </div>
    );
}

export default Carousel;
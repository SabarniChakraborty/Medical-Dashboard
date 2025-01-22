import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const History = () => {
  useEffect(() => {
    Aos.init({
      duration: 1500,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* About Us Section */}
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '50px',
          flexWrap: 'wrap',
        }}
      >
        <img
          src="https://wallpaperaccess.com/full/137007.jpg"
          alt="About Us"
          data-aos="fade-right"
          style={{
            flex: '1',
            maxWidth: '500px',
            width: '100%',
            borderRadius: '10px',
            marginRight: '20px',
          }}
        />
        <div style={{ flex: '1', textAlign: 'left' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Our History</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            There are many variations of passages of Lorem Ipsum available, but the majority have
            suffered alteration in some form, by injected humour, or randomised words. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Eius eligendi fugiat!
          </p>
        </div>
      </section>

      {/* Professional Team Section */}
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '50px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1', textAlign: 'left', marginRight: '20px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Our Power</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            There are many variations of passages of Lorem Ipsum available, but the majority have
            suffered alteration in some form, by injected humour, or randomised words. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Eius eligendi fugiat!
          </p>
        </div>
        <img
          src="https://wallpapercave.com/wp/wp2968489.jpg"
          alt="Professional Team"
          data-aos="fade-left"
          style={{
            flex: '1',
            maxWidth: '500px',
            width: '100%',
            borderRadius: '10px',
          }}
        />
      </section>
    </div>
  );
};

export default History;

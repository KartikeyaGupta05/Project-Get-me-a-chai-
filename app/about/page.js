// pages/about.js
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-gray-500 py-12">
      <div className="container mx-auto p-8 bg-white shadow-2xl rounded-xl max-w-5xl transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8 border-b-4 border-indigo-500 pb-4">About Get me a Chai</h1>

        <p className="text-xl text-gray-600 mb-8 text-center">
          Welcome to <span className="font-semibold text-indigo-600">Get me a Chai</span>, the platform that connects creators with their supporters in a simple, meaningful way. Inspired by the success of patronage platforms like Patreon, we built <span className="font-semibold text-indigo-600">Get me a Chai</span> to give creators the tools they need to receive financial support, grow their communities, and build sustainable creative careers—all over a metaphorical chai!
        </p>

        <div className="bg-indigo-100 p-6 rounded-lg shadow-inner mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            At <span className="font-semibold text-indigo-600">Get me a Chai</span>, we believe that creative individuals—whether they are artists, writers, podcasters, or hobbyists—deserve a reliable platform to fund their passion. By offering a space for creators to connect directly with their supporters, we empower artists to receive contributions, allowing them to focus more on creating and less on monetization challenges.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">We are committed to:</h3>
          <ul className="list-inside list-disc text-lg text-gray-600 mb-8 space-y-4">
            <li>Supporting creators from all backgrounds and genres.</li>
            <li>Providing easy-to-use tools for setting up memberships and rewards.</li>
            <li>Allowing supporters to show appreciation through direct contributions, like buying a "virtual chai."</li>
          </ul>
        </div>

        <p className="text-xl text-gray-700 text-center">
          We aim to make the process simple and rewarding—for creators and supporters alike. So, sit back, relax, and grab a chai while your favorite creators thrive!
        </p>
      </div>
    </div>
  );
};

export default About;

export const metadata = {
    title: "About - Get me a Chai",
    description: "Patreon Clone",
  };
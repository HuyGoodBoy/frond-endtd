import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Initial check for elements in viewport
  handleScrollAnimations();
  
  // Add scroll event listener
  window.addEventListener('scroll', () => {
    handleScrollAnimations();
  });
});

// Function to handle scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate-fade-in');
    }
  });
}

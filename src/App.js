import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled from "styled-components";
import axios from "axios";
import { apiResponse } from "./data/constants.js";
import LoaderComponent from "./components/HeroBgAnimation/Loader.js";
import Loader from "./components/HeroBgAnimation/Loader.js";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%),
    linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [apiSuccess, setApiSuccess] = useState(false);


  useEffect( () => {
    const fetchDataAndStore = async () => {
      try {
        const response = await axios.get('http://demo9023094.mockable.io/kisan-jadhav');
        const responseData = response.data;
        localStorage.setItem('hasPortfolioData', "true");
        localStorage.setItem('theme', responseData.theme);
        localStorage.setItem('bio', JSON.stringify(responseData.bio));
        localStorage.setItem('experiences', JSON.stringify(responseData.experiences));
        localStorage.setItem('education', JSON.stringify(responseData.education));
        localStorage.setItem('timeLineData', JSON.stringify(responseData.timeLineData));
        localStorage.setItem('skills', JSON.stringify(responseData.skills));
        localStorage.setItem('projects', JSON.stringify(responseData.projects));
        return responseData;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const hasPortfolioData = localStorage.getItem('hasPortfolioData');
    if (!hasPortfolioData) {
      setApiSuccess(false);
       fetchDataAndStore().then((response)=> {
        if(response.theme === 'light'){
          setDarkMode(false)
        }
        setApiSuccess(true);
       });
    }else{
      if(localStorage.getItem('theme') === 'light'){
        setDarkMode(false)
      }
      setApiSuccess(true);
    }
  }, []);

  if (!apiSuccess) {
    return  <Loader />
  }

 

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Navbar />
        <Body>
          <HeroSection />
          <Wrapper>
            <Skills />
            <Experience />
          </Wrapper>
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
    
          <Wrapper>
            <Education />
            <Contact />
          </Wrapper>
          <Footer />
          {openModal.state && <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />}
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;

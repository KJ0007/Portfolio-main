import React from 'react';
import styles from './Loader.module.css';
import Typewriter from 'typewriter-effect';
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, SocialMediaIcons, SocialMediaIcon, ResumeButton} from '../HeroSection/HeroStyle';


const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <TextLoop>
                <Span>
                    <Typewriter
                        options={{
                            strings: 'Kisan Jadhav',
                            autoStart: true,
                            loop: false,
                        }}
                    />
                </Span>
            </TextLoop>

        </div>
    );
};

export default Loader;



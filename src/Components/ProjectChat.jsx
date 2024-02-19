import React, { useEffect, useState } from 'react';
import s from './Projects.module.scss';
import mainImg from '../imgs/843shots_so.png';
import smallImg from '../imgs/699shots_so.png';
import mediumImg from '../imgs/739shots_so.png';
import Tooltip from '@mui/material/Tooltip';
import Typewriter from './Typewriter';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const ProjectChat = () => {
    const [ref, inView] = useInView();
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        if (inView) {
            setIsAnimated(true);
        }
    }, [inView]);

    const projectNameAnimation = useSpring({
        from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
        to: { opacity: isAnimated ? 1 : 0, transform: isAnimated ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)' },
        delay: 500,
    });

    const projectNameAnimation2 = useSpring({
        from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
        to: { opacity: isAnimated ? 1 : 0, transform: isAnimated ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)' },
        delay: 700,
    });

    const overviewAnimation = useSpring({
        from: { opacity: 0 },
        to: { opacity: isAnimated ? 1 : 0},
        delay: 1000,
    });

    return (
        <div id="projectsContainer" className={s.projectsContainer} ref={ref}>
            <div>
                <div className={s.divider}>
                    <div className={s.dividerContent}>
                        <div className={s.topContainer}>
                            <p className={s.count}>01<span>/05</span></p>
                            <Tooltip placement='left' title='Navigate to demo'>
                                <a href='https://milkevich.github.io/pract-chat/chat' className={s.demoBtn}>DEMO</a>
                            </Tooltip>
                        </div>
                        <animated.p style={projectNameAnimation} className={s.projectName}>
                            REALTIME CHAT -  ALLOWS USERS TO SHARE
                        </animated.p>
                        <animated.p style={projectNameAnimation2} className={s.projectName}>
                            TEXT AND MEDIA IN REAL TIME.
                        </animated.p>
                        <animated.p style={overviewAnimation} className={s.projectOverview}>
                            THE CHAT APPLICATION, BUILT WITH REACT.JS AND FIREBASE CLOUD STORAGE, FACILITATES INSTANT MESSAGING AND MEDIA SHARING. REACT.JS POWERS THE DYNAMIC UI, VITE EXPEDITES DEVELOPMENT, AND FIREBASE ENSURES SECURE STORAGE. WITH USER AUTHENTICATION INCLUDED, THE PROJECT OFFERS A MODERN CHAT EXPERIENCE WITH REAL-TIME COMMUNICATION AND MEDIA SHARING.
                        </animated.p>
                        <div className={s.projectInfo}>
                            <div>
                                <p className={s.topItem}>DATE</p>
                                <p className={s.bottomItem} >J<Typewriter text="ANUARY 2024" delay={100} /></p>
                            </div>
                            <div>
                                <p className={s.topItem}>ROLE</p>
                                <p className={s.bottomItem}>D<Typewriter text="EVELOPER" delay={150} /></p>
                            </div>
                            <div>
                                <p className={s.topItem}>DEMO</p>
                                <Tooltip placement='right' title='Navigate to demo'>
                                    <a className={s.bottomItemA} href='https://milkevich.github.io/pract-chat/chat'>M<Typewriter text="ILKEVICH.GITHUB.IO/PRACT-CHAT" delay={50} /></a>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.imgsContainer}>
                    <div className={s.imgsContainerContent}>
                        <div className={s.mainImgContainer}>
                            <img src={mainImg} className={s.mainImg} alt="Main" />
                        </div>
                        <div className={s.smallMediumImgsContainer}>
                            <img src={smallImg} className={s.smallImg} alt="Small" />
                            <img src={mediumImg} className={s.mediumImg} alt="Medium" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectChat;

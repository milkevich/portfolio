import React from 'react';
import s from './Header.module.scss';
import heroImg from '../imgs/heroImg.jpg';
import Typewriter from './Typewriter';
import Tooltip from '@mui/material/Tooltip';

const Header = () => {
  return (
    <div className={s.headerContainer}>
      <div className={s.headerContent}>
        <p className={s.headerContentDownload}>
          <Tooltip placement='right' title="Resume in .pdf">
            <span>D<Typewriter text="OWNLOAD" delay={100} /></span>
          </Tooltip>
        </p>
        <p className={s.headerContentGetInTouch}><Typewriter text="GET IN TOUCH" delay={100} /></p>
      </div>
      <div className={s.mainContent}>
        <div className={s.mainContentText}>
          <p className={s.mainContentP}>
            <div className={s.mainContentPContainer}><span className={s.mainContentPContainerText}> &lt;h1&gt; HI I'M GLEB MILKEVICH,&lt;/h1&gt; </span></div>
            &lt;p&gt;<Typewriter text="FRONT-END WEB DEVELOPER WITH 3+ YEARS OF XP. CURRENTLY MY MAIN FOCUS IS REACT.JS. I'M LOOKING FORWARD TO WORK WITH YOU! " delay={20} />&lt;/p&gt;</p>
          <div className={s.mainContentBtnsContainer}>
            <div className={s.mainContentProjectsBtn}>
              <p className={s.linkHover}><Typewriter text="PROJECTS" delay={200} /><span className={s.mainContentProjectsBtnArrow}>-&gt;</span></p>
            </div>
            <div className={s.mainContentLinks}>
              <p className={s.linkHover}>G<Typewriter text="ITHUB" delay={200} /></p>
              <p className={s.linkHover}>L<Typewriter text="INKEDIN" delay={150} /></p>
              <p className={s.linkHover}>I<Typewriter text="NSTAGRAM" delay={100} /></p>
            </div>
          </div>
        </div>
        <div className={s.mainContentImgContainer}>
          <img src={heroImg} className={s.mainContentImg} />
        </div>
      </div>
    </div>
  );
}

export default Header;

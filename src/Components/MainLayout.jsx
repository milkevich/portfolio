import React, { useState, useEffect } from 'react';
import s from './MainLayout.module.scss';

const MainLayout = ({ children }) => {
    const [loadingProgress, setLoadingProgress] = useState('000');
    const [showPercentage, setShowPercentage] = useState(true);
    const [playAnimation, setPlayAnimation] = useState(false)

    useEffect(() => {
        let progress = 0;
        const interval = setInterval(() => {
            if (progress < 100) {
                const shouldPause = Math.random() < 0.5; 
                if (shouldPause && progress > 50) {
                    clearInterval(interval);
                    const timeout = Math.random() * 500 ;
                    setTimeout(() => {
                        const resumeInterval = setInterval(() => {
                            progress += 1;
                            setLoadingProgress(progress.toString().padStart(3, '0'));
                            if (progress >= 90) {
                                const finalTimeout = Math.random() * 500 + 200;
                                setPlayAnimation(true)
                                setTimeout(() => {
                                    setShowPercentage(false);
                                }, finalTimeout);
                            }
                            if (progress >= 100) {
                                clearInterval(resumeInterval);
                            }
                        }, 20);
                    }, timeout);
                } else {
                    progress += 1;
                    setLoadingProgress(progress.toString().padStart(3, '0'));
                }
            } else {
                clearInterval(interval); 
            }
        }, 20);

        return () => clearInterval(interval);
    }, []); 

    const vlHeight = loadingProgress / 1.325;
    console.log(vlHeight)


    return (
        <div>
            {showPercentage && (
                <div>
                <div className={`${s.percentage} ${playAnimation ? s.leave : ''}`}>
                    {loadingProgress}
                    <span>%</span>
                    
                </div>
                <div style={{ height: `${vlHeight}vh` }} className={s.vl}>
                    </div>
                </div>
            )}
            {!showPercentage && children}
        </div>
    );
}

export default MainLayout;

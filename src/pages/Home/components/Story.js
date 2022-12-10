import '../Home.css'
import "animate.css/animate.min.css";
import poster from "../../../images/index/coverphoto.png"


import { AnimationOnScroll } from 'react-animation-on-scroll';

function Story(){
    return( 
        <section className="storySec" aria-label="Story Section">
            <div className='story-content par'>
                <AnimationOnScroll animateIn='animate__fadeInUp' animateOut='animate__fadeOutDown' animatePreScroll="false">
                    <h2 className='story-header'>About Us</h2>
                </AnimationOnScroll>
                
                Founded in 1998, Insane Ink is an entrepreneurial course at Piedmont Hills High School where
                students are responsible for running an apparel customization company.
            </div>
            
            <div className="story-content img">
                <video controls={true} playsInline={true} autoPlay={true} loop={true} poster={poster} className="coverVid">
                    <source src={require("../../../videos/2020-2021/2022Commercial.mp4")} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    )
}

export default Story;
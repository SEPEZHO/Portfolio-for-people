import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import Tilt from 'src/Logics/Tilt';
import RenderImg from 'src/Components/RenderImg';

import Waiting from 'src/Static/Img/Icons/Slider/Waiting.svg';
import Heart from 'src/Static/Img/Icons/Slider/Heart.svg';
import Comments from 'src/Static/Img/Icons/Slider/Comments.svg';
import File from 'src/Static/Img/Icons/Slider/File.svg';
import Calendar from 'src/Static/Img/Icons/Slider/Calendar.svg';
import useResponsive from 'src/Logics/responsive';

import s from './Style/Slider.module.sass';

const SliderModule: React.FC = (props) => {
  const settings = {
    dots: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };  
  
  const renderSlide = instPost => {
    return(
        <div key={instPost.id} className={s.Slide}>
          <RenderImg url={instPost.thumbnail_resources[2].src} />
          <div>
            <div>
              <img src={Calendar} alt="" />
              <span>
                {/*SOME GENIUS CODE HERE :D*/}
                {(instPost.accessibility_caption?.split('.')[0].split(/([A-Z])/).reverse()[1] + instPost.accessibility_caption?.split('.')[0].split(/[A-Z]/).reverse()[0]) ? instPost.accessibility_caption?.split('.')[0].split(/([A-Z])/).reverse()[1] + instPost.accessibility_caption?.split('.')[0].split(/[A-Z]/).reverse()[0] : 'Unfound date'}
              </span>
            </div>
            <div>
              <img src={Heart} alt="" />
              <span>
                {instPost.edge_liked_by.count}
              </span>
            </div>
            <div>
              <img src={Comments} alt="" />
              <span>
                {instPost.edge_media_to_comment.count}
              </span>
            </div>
            <div className={s.SliderNote}>
              <img src={File} alt="" />
              <span>
                {/*AND HERE*/}
                {instPost.edge_media_to_caption.edges[0]?.node.text ? instPost.edge_media_to_caption.edges[0]?.node.text.length >= 70 ? `${instPost.edge_media_to_caption.edges[0]?.node.text.split(`\n`)[0].slice(0, 70)}...` : instPost.edge_media_to_caption.edges[0]?.node.text.split(`\n`)[0] : 'Unfound note'}
              </span>
            </div>
          </div>
        </div>
    )
  }
  
  const FilledSlider = (props) => {
    console.log(props)
    if (props.instData.edge_owner_to_timeline_media) {
      return (
        <Slider className={s.SliderContainer} {...settings}>
          {props.instData.edge_owner_to_timeline_media.edges.filter(e => !e.node.is_video).map((e) => e.node).slice(0, 10).map(e => renderSlide(e))}
        </Slider>
      );
    }
    return (
      <Slider {...settings} className={`${s.WaitingSlide} ${s.SliderContainer}`}>
        <img src={Waiting} alt="" />
      </Slider>
    );
  };

  return (
    <div className={s.SliderContainerMain}>
      <div className={s.Title}>
        {props.instData.username.toUpperCase()}
      </div>

      {
        useResponsive('(min-width: 950px)', true) ?
          <Tilt children={<FilledSlider className={s.SliderContainerItem} instData={props.instData} />} />
        :
          <FilledSlider className={s.SliderContainerItem} instData={props.instData} />
      }
      
      <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
    </div>
  );
};

const GetInstDataCatch = (state) => {
  return {
    instData: state.instData,
  };
};

export default connect(GetInstDataCatch)(SliderModule);
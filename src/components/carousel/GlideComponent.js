import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Glide from '@glidejs/glide';
import { getDirection } from 'helpers/Utils';
import '@glidejs/glide/dist/css/glide.core.min.css';

let resizeTimeOut = -1;
let mountTimeOut = -1;

function GlideComponent(props) {
  const { settings, children } = props;
  let carousel;
  let glideCarousel;
  const onResize = () => {
    clearTimeout(resizeTimeOut);
    resizeTimeOut = setTimeout(() => {
      glideCarousel.update();
      resizeTimeOut = -1;
    }, 500);
  };

  const initGlide = () => {
    glideCarousel = new Glide(carousel, {
      settings,
      direction: getDirection().direction,
    });
    glideCarousel.mount();
    glideCarousel.on('resize', onResize);
    mountTimeOut = setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 500);
  };

  const destroyGlide = () => {
    clearTimeout(resizeTimeOut);
    clearTimeout(mountTimeOut);
    if (glideCarousel) {
      glideCarousel.destroy();
    }
  };

  useEffect(() => {
    initGlide();
    return () => {
      destroyGlide();
    };
  }, []);

  const renderDots = () => {
    const total = React.Children.count(children);
    const dots = [];
    for (let i = 0; i < total; i++) {
      dots.push(
        <button
          type="button"
          className="glide__bullet slider-dot"
          key={i}
          data-glide-dir={`=${i}`}
        />
      );
    }
    return dots;
  };

  return (
    <div>
      <div className="glide" ref={(node) => (carousel = node)}>
        <div data-glide-el="track" className="glide__track">
          <div className="glide__slides">{props.children}</div>
        </div>
        {!props.settings.hideNav && (
          <div className="glide__arrows slider-nav" data-glide-el="controls">
            <button
              type="button"
              className="glide__arrow glide__arrow--left left-arrow btn btn-link"
              data-glide-dir="<"
            >
              <i className="simple-icon-arrow-left" />
            </button>

            <div
              className="glide__bullets slider-dot-container"
              data-glide-el="controls[nav]"
            >
              {renderDots()}
            </div>

            <button
              type="button"
              className="glide__arrow glide__arrow--right right-arrow btn btn-link"
              data-glide-dir=">"
            >
              <i className="simple-icon-arrow-right" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

GlideComponent.defaultProps = {
  settings: {},
};

GlideComponent.propTypes = {
  settings: PropTypes.shape({
    type: PropTypes.string,
    startAt: PropTypes.number,
    perView: PropTypes.number,
    focusAt: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    gap: PropTypes.number,
    autoplay: PropTypes.bool,
    hoverpause: PropTypes.bool,
    keyboard: PropTypes.bool,
    bound: PropTypes.bool,
    swipeThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
    dragThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
    perTouch: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
    touchRatio: PropTypes.number,
    touchAngle: PropTypes.number,
    animationDuration: PropTypes.number,
    rewind: PropTypes.bool,
    rewindDuration: PropTypes.number,
    animationTimingFunc: PropTypes.string,
    direction: PropTypes.string,
    peek: PropTypes.object,
    breakpoints: PropTypes.object,
    classes: PropTypes.object,
    throttle: PropTypes.number,
  }),
  // id: PropTypes.string,
  // className: PropTypes.string,
};

export default GlideComponent;

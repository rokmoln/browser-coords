import _ from 'lodash';
import _log from '../../log';
import screen from './screen';

import {
  roundRect
} from '../index';

let throttle = function(fn) {
  return _.throttle(fn, 1000);
};

export let _toJSON = function() {
  return roundRect({
    x: exports.client.x(),
    y: exports.client.y(),
    width: exports.client.width(),
    height: exports.client.height(),
    scroll: roundRect({
      x: exports.client.scroll.x(),
      y: exports.client.scroll.y()
    })
  });
};

// client relative to window | in device px
// aka visual viewport, viewport, client area
export let client = {
  _x: 0,
  _y: 0,

  x: function() {
    return exports.client._x;
  },

  y: function() {
    return exports.client._y;
  },

  width: throttle(function() {
    return window.innerWidth * screen.osZoomFactor();
  }),

  height: throttle(function() {
    return window.innerHeight * screen.osZoomFactor();
  }),

  scroll: {
    x: throttle(function() {
      return window.pageXOffset * screen.osZoomFactor();
    }),

    y: throttle(function() {
      return window.pageYOffset * screen.osZoomFactor();
    })
  },

  toJSON: exports._toJSON
};

export default client;
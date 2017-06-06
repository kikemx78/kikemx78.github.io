(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "Family Guy Freakin Mobile Game",
  "appstore-url": "https://itunes.apple.com/au/app/family-guy-another-freakin-mobile-game/id1139342866?mt=8",
  "googleplay-url": "https://play.google.com/store/apps/details?id=air.com.sgn.familyguy.gp&hl=en",
  "extra_fonts": [""],
  "css_fonts": [],
  "getapp_instead_of_title": false,
  "icon": "icon.jpg",
  "phaser": "2.6.2/phaser-arcade.js",
  "libs": [
    "localization.js",
    "utils.js",
    "image_loader.js"
  ]
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _globals = require('./../kernel/globals');

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file A set of utils functions to work with multi-resolution.
 * @copyright CrossInstall 2016
 * @author 62316e@gmail.com
 */

var LayoutUtils = function () {
  function LayoutUtils() {
    _classCallCheck(this, LayoutUtils);

    throw new Error('AbstractClassError');
  }

  _createClass(LayoutUtils, null, [{
    key: 'getDevicePixelRatio',
    value: function getDevicePixelRatio() {
      var ratio = 1;

      if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) ratio = window.screen.systemXDPI / window.screen.logicalXDPI;else if (window.devicePixelRatio !== undefined) ratio = window.devicePixelRatio;

      return ratio * LayoutUtils.RENDER_RESOLUTION;
    }
  }, {
    key: 'getHeaderHeight',
    value: function getHeaderHeight() {
      return LayoutUtils.HEADER_ELEMENT.clientHeight * LayoutUtils.getDevicePixelRatio() * LayoutUtils.INVS;
    }
  }, {
    key: 'refreshViewDimmensions',
    value: function refreshViewDimmensions() {
      LayoutUtils.CONTAINER = document.getElementById(LayoutUtils.CONTAINER_NAME);
      LayoutUtils.HEADER_ELEMENT = document.getElementById('ad_header');

      LayoutUtils.VIEW_WIDTH = window.innerWidth * LayoutUtils.getDevicePixelRatio();
      LayoutUtils.VIEW_HEIGHT = window.innerHeight * LayoutUtils.getDevicePixelRatio();

      if (LayoutUtils.IS_LANDSCAPE) {
        LayoutUtils.BASE_WIDTH = LayoutUtils.DEFAULT_BASE_WIDTH;
        LayoutUtils.BASE_HEIGHT = LayoutUtils.DEFAULT_BASE_HEIGHT;
      } else {
        LayoutUtils.BASE_WIDTH = LayoutUtils.DEFAULT_BASE_HEIGHT;
        LayoutUtils.BASE_HEIGHT = LayoutUtils.DEFAULT_BASE_WIDTH;
      }

      var scaleX = LayoutUtils.VIEW_WIDTH / LayoutUtils.BASE_WIDTH;
      var scaleY = LayoutUtils.VIEW_HEIGHT / LayoutUtils.BASE_HEIGHT;

      LayoutUtils.S = Math.min(scaleX, scaleY);
      LayoutUtils.INVS = 1 / LayoutUtils.S;

      LayoutUtils.LEFT_OFFSET = -(LayoutUtils.VIEW_WIDTH / 2 - LayoutUtils.BASE_WIDTH / 2 * LayoutUtils.S) * LayoutUtils.INVS;
      LayoutUtils.RIGHT_OFFSET = -LayoutUtils.LEFT_OFFSET + LayoutUtils.BASE_WIDTH;
      LayoutUtils.TOP_OFFSET = -(LayoutUtils.VIEW_HEIGHT / 2 - LayoutUtils.BASE_HEIGHT / 2 * LayoutUtils.S) * LayoutUtils.INVS;
      LayoutUtils.BOTTOM_OFFSET = -LayoutUtils.TOP_OFFSET + LayoutUtils.BASE_HEIGHT;
      LayoutUtils.FULL_GAME_WIDTH = LayoutUtils.RIGHT_OFFSET - LayoutUtils.LEFT_OFFSET;
      LayoutUtils.FULL_GAME_HEIGHT = LayoutUtils.BOTTOM_OFFSET - LayoutUtils.TOP_OFFSET;

      LayoutUtils.ASPECT_RATIO = Math.round(LayoutUtils.VIEW_HEIGHT / LayoutUtils.VIEW_WIDTH * 100) / 100; //TODO: check landscape

      //console.log('[' + LayoutUtils.MODULE_NAME + ']', 'orientation:', ad_orientation, 'view-size:', LayoutUtils.VIEW_SIZE, 'left-offset:', LayoutUtils.LEFT_OFFSET, 'right-offset:', LayoutUtils.RIGHT_OFFSET, 'top-offset:', LayoutUtils.TOP_OFFSET, 'bottom-offset:', LayoutUtils.BOTTOM_OFFSET, 'aspect:', LayoutUtils.ASPECT_RATIO);
      LayoutUtils.fixCanvasSize(true);
      LayoutUtils.__blockWrongOrientation();
    }
  }, {
    key: '__blockWrongOrientation',
    value: function __blockWrongOrientation() {
      if (ad_state !== 'live') return;

      if (LayoutUtils.IS_LANDSCAPE && LayoutUtils.VIEW_HEIGHT > LayoutUtils.VIEW_WIDTH) document.getElementById('orientation').style.display = 'block';else if (LayoutUtils.IS_PORTRAIT && LayoutUtils.VIEW_WIDTH > LayoutUtils.VIEW_HEIGHT) document.getElementById('orientation').style.display = 'block';else document.getElementById('orientation').style.display = 'none';
    }
  }, {
    key: 'fixCanvasSize',
    value: function fixCanvasSize() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (r) {
        setTimeout(function () {
          LayoutUtils.fixCanvasSize(false);
        }, 100);
        return;
      }

      window.scrollTo(0, 1);
    }
  }, {
    key: 'centerIntoView',
    value: function centerIntoView(object) {
      object.scale.set(LayoutUtils.S);
      object.x = LayoutUtils.VIEW_WIDTH / 2 - LayoutUtils.BASE_WIDTH / 2 * LayoutUtils.S;
      object.y = LayoutUtils.VIEW_HEIGHT / 2 - LayoutUtils.BASE_HEIGHT / 2 * LayoutUtils.S;
    }
  }, {
    key: 'fitIntoRect',
    value: function fitIntoRect(sprite, bounds, fillRect, align, spriteBounds) {
      var wD = spriteBounds ? spriteBounds.width / sprite.scale.x : sprite.width / sprite.scale.x;
      var hD = spriteBounds ? spriteBounds.height / sprite.scale.y : sprite.height / sprite.scale.y;

      var wR = bounds.width;
      var hR = bounds.height;

      var sX = wR / wD;
      var sY = hR / hD;

      var rD = wD / hD;
      var rR = wR / hR;

      var sH = fillRect ? sY : sX;
      var sV = fillRect ? sX : sY;

      var s = rD >= rR ? sH : sV;
      var w = wD * s;
      var h = hD * s;

      var tX = 0.0;
      var tY = 0.0;

      switch (align) {
        case 'left':
        case 'topLeft':
        case 'bottomLeft':
          tX = 0.0;
          break;

        case 'right':
        case 'topRight':
        case 'bottomRight':
          tX = w - wR;
          break;

        default:
          tX = 0.5 * (w - wR);
      }

      switch (align) {
        case 'top':
        case 'topLeft':
        case 'topRight':
          tY = 0.0;
          break;

        case 'bottom':
        case 'bottomLeft':
        case 'bottomRight':
          tY = h - hR;
          break;

        default:
          tY = 0.5 * (h - hR);
      }

      sprite.x = bounds.x - tX;
      sprite.y = bounds.y - tY;
      sprite.scale.set(s);
    }
  }]);

  return LayoutUtils;
}();

// Hum hum! 1 = 1:1 to device size. 0.5 means 50% to device pixel density. Make it smaller only if you need to get few more FPS.


LayoutUtils.RENDER_RESOLUTION = 1;

// MR related
LayoutUtils.CONTAINER_NAME = 'creative';
LayoutUtils.CONTAINER = document.getElementById(LayoutUtils.CONTAINER_NAME);

LayoutUtils.DEFAULT_BASE_WIDTH = 960;
LayoutUtils.DEFAULT_BASE_HEIGHT = 640;

LayoutUtils.BASE_WIDTH = 960;
LayoutUtils.BASE_HEIGHT = 640;

LayoutUtils.ASPECT_RATIO = 0;
LayoutUtils.S = 1; // SCALE
LayoutUtils.INVS = 1 / LayoutUtils.S; // SCALE INVERTED
LayoutUtils.VIEW_WIDTH = 0;
LayoutUtils.VIEW_HEIGHT = 0;

LayoutUtils.LEFT_OFFSET = 0;
LayoutUtils.RIGHT_OFFSET = 0;
LayoutUtils.TOP_OFFSET = 0;
LayoutUtils.BOTTOM_OFFSET = 0;

LayoutUtils.IS_LANDSCAPE = ad_orientation === 'landscape';
LayoutUtils.IS_PORTRAIT = !LayoutUtils.IS_LANDSCAPE;

// Fake
LayoutUtils.MODULE_NAME = 'LayoutUtils';
exports.default = LayoutUtils;

},{"./../kernel/globals":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file Stores oll game variables and constants.
 * @copyright CrossInstall 2016
 * @author 62316e@gmail.com
 */

var Globals = function Globals() {
  _classCallCheck(this, Globals);

  throw new Error('AbstractClassError');
};

// Static constants


exports.default = Globals;
Globals.FONT_IS_LOADED = false;
Globals.VERBOSE = true; // Must have feature
Globals.WEB_ROOT = ad_webroot + '/' + ad_name;
Globals.LAST_INTERACTION_TIME = 0;
Globals.REPLAYS_NUMBER = null;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveChips = exports.UserAction = exports.MoveSlotsAction = exports.BootAction = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint -W041 */


var _slot = require('m3e/slot');

var Slots = _interopRequireWildcard(_slot);

var _chip = require('m3e/chip');

var Chips = _interopRequireWildcard(_chip);

var _utils = require('m3e/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing game actions. */
var Action = function () {
  /**
   * Initialize base action faunctions.
   * @param {string} name - The name of action.
   * @param {M3E} m3e An m3e container.
   */
  function Action(name, m3e) {
    _classCallCheck(this, Action);

    this.mName = name;
    this.m3e = m3e;
    this.mPendingExit = false;
    this.nextActionName = false;
    this.startAsyncActionName = '';
  }

  /**
   * Returns name of action
   * @returns {string} Name of Action
   */


  _createClass(Action, [{
    key: 'exit',


    /**
     * Set exit for current action
     */
    value: function exit() {
      this.mPendingExit = true;
    }

    /**
     * Check for exit current action
     * @returns {boolean}
     */

  }, {
    key: 'name',
    get: function get() {
      return this.mName;
    }
  }, {
    key: 'isPendingExit',
    get: function get() {
      return this.mPendingExit;
    }
  }]);

  return Action;
}();

exports.default = Action;

var BootAction = function (_Action) {
  _inherits(BootAction, _Action);

  function BootAction(m3e) {
    _classCallCheck(this, BootAction);

    var _this = _possibleConstructorReturn(this, (BootAction.__proto__ || Object.getPrototypeOf(BootAction)).call(this, 'boot', m3e));

    _this.mPendingExit = false;
    return _this;
  }

  _createClass(BootAction, [{
    key: 'onUpdate',
    value: function onUpdate() {
      this.createField();
      this.m3e.setAllChipsMatchPending(true);
      //console.log('%c BootAction - %cField is created', 'color: #ff6e00', 'color: #fff400');
      if (this.m3e.level.autoMatchOnStart) this.nextActionName = 'moveChips';else {
        this.nextActionName = 'userAction';
      }
      this.mPendingExit = true;
    }
  }, {
    key: 'createField',
    value: function createField() {

      var field = this.m3e.level.fieldMask;
      var c = field.totalColumns;
      var r = field.totalRows;
      // init field array
      this.m3e.mSlots = Array.apply(null, Array(c + 1)).map(function (e) {
        return Array(r + 1).fill(1);
      });
      do {
        do {
          var newSlot = {};
          var newChip = {};
          var slotData = field.mask[c][r].split(',');
          var slotMaskType = parseInt(slotData[0]);
          if (slotMaskType < 0) {
            newSlot = new Slots.EmptySlot();
            newSlot.mI = c;
            newSlot.mJ = r;
            newSlot.updateData();
            newSlot.view = null;
          } else {
            var slotType = this.getBoardParameter('st', slotData);
            slotType = slotType.exist ? slotType.result : 1;
            switch (slotType) {
              case 1:
                newSlot = new Slots.RegularSlot(this.m3e.level.getMoveFunctions());
                break;
              case 2:
                newSlot = new Slots.ObstacleSlot(this.m3e.level.getMoveFunctions());
                break;
              default:
                newSlot = new Slots.CustomSlot(this.m3e.level.getMoveFunctions(), slotType);
                break;
            }

            newSlot.mI = c;
            newSlot.mJ = r;
            newSlot.updateData();
            newSlot.view = this.m3e.level.cbGetSlotView(newSlot);
            // let newChipColor = slotMaskType === 0 ? Utils.random(0, this.m3e.level.mGameSettings.maxColors) : slotMaskType;
            var newChipColor = this.getBoardParameter('c', slotData);
            if (newChipColor.exist && newChipColor.result > this.m3e.level.mGameSettings.maxColors) newChipColor.exist = false;
            newChipColor = newChipColor.exist ? newChipColor.result : _utils2.default.random(0, this.m3e.level.mGameSettings.maxColors);

            newChip = new Chips.RegularChip();
            newChip.position = { i: c, j: r };

            newChip.color = newChipColor;
            var newType = this.getBoardParameter('t', slotData);
            newType = newType.exist ? newType.result : 0;

            var settings = this.m3e.level.chipSettings.getChipSettings(newType);
            newChip.canFall = settings.canFall;
            newChip.canSwap = settings.canSwap;
            newChip.canMatch = settings.canMatch;

            newChip.type = newType;
            newChip.mView = this.m3e.level.cbGetChipView(newChip);

            this.m3e.assignChipToSlot(newSlot, newChip);
            newSlot.currentChip.saveTempPosition();
          }
          newSlot.mIsBoot = this.getBoardParameter('b', slotData).exist;
          this.m3e.mSlots[c][r] = newSlot;
        } while (0 !== r--);
        r = field.totalRows;
      } while (0 !== c--);
      this.createBorders();

      this.m3e.level.cbFitSlotsView();

      this.m3e.level.cbFitChipsView();

      if (this.m3e.level.dontMatchSortingEnable) this.m3e.dontMatchSorting();
    }
  }, {
    key: 'getBoardParameter',
    value: function getBoardParameter(targetParam, data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var str = _step.value;

          if (str.indexOf(targetParam) == 0) {
            var result = str.split('=');
            if (result.length > 1) {
              return { exist: true, result: parseInt(result[1]) };
            } else {
              return { exist: true };
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return { exist: false };
    }
  }, {
    key: 'createBorders',
    value: function createBorders() {
      var _this2 = this;

      // 'right', 'top-right', top, top-left, left, bottom-left, bottom, bottom-right
      var linesToAdd = [];
      var cornersToAdd = [];

      this.m3e.forEachSlot(function (item, c, r) {
        _this2.m3e.getAllNeighbours(item, function (borderType, c, r, newC, newR, sideNumber, neighbourSidesType, exist) {
          var curSlot = _this2.m3e.mSlots[c][r];
          if (curSlot.mType === 0) return;
          var newSlot = _this2.m3e.mSlots[newC][newR];
          if (newSlot.mType >= 0) {
            switch (sideNumber) {
              case 1:
                if (neighbourSidesType[0] < 1 && neighbourSidesType[2] < 1) {
                  if (newSlot.mType !== 0 && exist) borderType += '-outer-skew';
                  cornersToAdd.push({ borderType: borderType, slot: curSlot });
                }
                if (neighbourSidesType[0] > 0 && neighbourSidesType[2] > 0) {
                  borderType += '-outer';
                  if (newSlot.mType === 0) cornersToAdd.push({ borderType: borderType, slot: curSlot });
                }
                break;
              case 3:
                if (neighbourSidesType[4] < 1 && neighbourSidesType[2] < 1) {
                  if (newSlot.mType !== 0 && exist) borderType += '-outer-skew';
                  cornersToAdd.push({ borderType: borderType, slot: curSlot });
                }
                if (neighbourSidesType[4] > 0 && neighbourSidesType[2] > 0) {
                  borderType += '-outer';
                  if (newSlot.mType === 0) cornersToAdd.push({ borderType: borderType, slot: curSlot });
                }
                break;
              case 5:
                if (neighbourSidesType[4] < 1 && neighbourSidesType[6] < 1) {
                  if (newSlot.mType !== 0 && exist) borderType += '-outer-skew';
                  cornersToAdd.push({ borderType: borderType, slot: curSlot });
                }
                if (neighbourSidesType[4] > 0 && neighbourSidesType[6] > 0) {
                  borderType += '-outer';
                  if (newSlot.mType === 0) cornersToAdd.push({ borderType: borderType, slot: curSlot });
                }
                break;

              case 7:
                if (neighbourSidesType[0] < 1 && neighbourSidesType[6] < 1) {
                  if (newSlot.mType !== 0 && exist) borderType += '-outer-skew';
                  cornersToAdd.push({ borderType: borderType, slot: curSlot });
                }
                if (neighbourSidesType[0] > 0 && neighbourSidesType[6] > 0) {
                  borderType += '-outer';
                  if (newSlot.mType === 0) cornersToAdd.push({ borderType: borderType, slot: curSlot });
                }
                break;
              default:
                if (newSlot.mType === 0 || !exist) linesToAdd.push({ borderType: borderType, slot: curSlot });
                break;
            }
          }
        });
      });

      var i = 0;
      if (linesToAdd.length !== 0) {
        do {
          var border = new Slots.Border(linesToAdd[i].borderType, linesToAdd[i].slot);
          border.view = this.m3e.level.cbGetBorderView(border);
        } while (i++ < linesToAdd.length - 1);
      }

      i = 0;
      if (cornersToAdd.length !== 0) {
        do {
          var _border = new Slots.Border(cornersToAdd[i].borderType, cornersToAdd[i].slot);
          _border.view = this.m3e.level.cbGetBorderView(_border);
        } while (i++ < cornersToAdd.length - 1);
      }
    }
  }]);

  return BootAction;
}(Action);

var MoveSlotsAction = function (_Action2) {
  _inherits(MoveSlotsAction, _Action2);

  function MoveSlotsAction(m3e) {
    _classCallCheck(this, MoveSlotsAction);

    var _this3 = _possibleConstructorReturn(this, (MoveSlotsAction.__proto__ || Object.getPrototypeOf(MoveSlotsAction)).call(this, 'moveChips', m3e));

    _this3.mPendingExit = false;
    _this3._positionsUpdated = false;

    _this3.verticalPass = false;
    _this3.cornerPass = false;
    _this3.verticalSteps = 0;
    _this3.cornerSteps = 0;
    //console.log('%c MoveSlotsAction - %cStart', 'color: #ff6e00', 'color: #fff400');

    return _this3;
  }

  _createClass(MoveSlotsAction, [{
    key: 'addBootChips',
    value: function addBootChips() {
      var _this4 = this;

      this.m3e.forEachSlot(function (slot, c, r) {
        slot.mSkipPostMove = false;
        if (slot.mIsBoot) if (slot.currentChip == 'no_chip' && slot.mIsBoot) {
          var newChip = _this4.m3e.addNewChip(_utils2.default.random(0, _this4.m3e.level.mGameSettings.maxColors), c, r);
          newChip.view.setVisible(false);
          newChip.bootOffset = slot.mJ;
          slot.addToBootQueue(newChip);
          slot.currentChip.saveTempPosition();
        }
      });
    }
  }, {
    key: 'addNextMoveStep',
    value: function addNextMoveStep() {
      var _this5 = this;

      var makeChanges = false;

      this.m3e.forEachSlot(function (slot) {
        if (slot.currentChip != 'no_chip') {

          var bottomSlot = _this5.m3e.getNeighbourBySide(slot, 'bottom');
          if (bottomSlot.exist && bottomSlot.slot.currentChip == 'no_chip' && slot.currentChip.canFall) {
            slot.currentChip.mMoveSteps.push({ x: bottomSlot.slot.mI, y: bottomSlot.slot.mJ });

            bottomSlot.slot.assignChip(slot.currentChip);
            slot.pendingMatch = true;
            bottomSlot.slot.pendingMatch = true;
            slot.removeChip();
            makeChanges = true;
          }
        }
      });
      return makeChanges;
    }
  }, {
    key: 'addCornerMoves',
    value: function addCornerMoves() {
      var _this6 = this;

      var makeChanges = false;
      this.m3e.forEachSlot(function (slot) {
        if (slot.currentChip != 'no_chip') {
          var bottomSlot = _this6.m3e.getNeighbourBySide(slot, 'bottom');
          if (bottomSlot.exist && bottomSlot.slot.currentChip !== 'no_chip') {
            var fallingSide = false;
            var targetX = slot.mI;
            var bottomLeftSlot = _this6.m3e.getNeighbourBySide(slot, 'bottom-left');
            var bottomRightSlot = _this6.m3e.getNeighbourBySide(slot, 'bottom-right');

            var checkLeftSide = bottomLeftSlot.exist && bottomLeftSlot.slot.currentChip === 'no_chip';
            var checkRightSide = bottomRightSlot.exist && bottomRightSlot.slot.currentChip === 'no_chip';

            if (checkLeftSide && checkRightSide) {
              if (_utils2.default.random(0, 1) === 0) {
                fallingSide = bottomLeftSlot;
                targetX--;
              } else {
                fallingSide = bottomRightSlot;
                targetX++;
              }
            } else if (checkLeftSide) {
              fallingSide = bottomLeftSlot;
              targetX--;
            } else if (checkRightSide) {
              fallingSide = bottomRightSlot;
              targetX++;
            }

            if (fallingSide !== false && slot.currentChip.canFall) {
              slot.currentChip.mMoveSteps.push({ x: targetX, y: slot.mJ + 1 });
              fallingSide.slot.assignChip(slot.currentChip);
              slot.pendingMatch = true;
              fallingSide.slot.pendingMatch = true;
              slot.removeChip();
              makeChanges = true;
            }
          }
        }
      });
      return makeChanges;
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {
      if (!this._positionsUpdated) {
        this.verticalPass = false;
        this.cornerPass = false;

        this.verticalSteps = 0;
        this.cornerSteps = 0;
        do {
          this.addBootChips();
          this.verticalPass = this.addNextMoveStep();
          if (this.verticalPass) this.verticalSteps++;
        } while (this.verticalPass !== false);

        if (this.verticalSteps === 0) {
          do {
            this.addBootChips();
            this.cornerPass = this.addCornerMoves();
            if (this.cornerPass) this.cornerSteps++;
          } while (this.cornerPass !== false);
        }
        this._positionsUpdated = true;
      }
      var isDone = true;
      var postMoveStart = false;
      this.m3e.forEachSlot(function (slot) {
        var state = slot.onSlotUpdate(dt);
        if (!postMoveStart) {
          postMoveStart = state.postMoveStart;
        }
        if (isDone) {
          isDone = state.isDone;
          slot.resetBootQueue();
        }
      });

      if (isDone || postMoveStart) {
        this._positionsUpdated = false;
      }
      if (this.verticalSteps === 0 && this.cornerSteps === 0 && isDone) {
        //console.log(isDone, postMoveStart)

        var matchResult = this.m3e.matchAllChips(true);
        if (matchResult === true) {
          this.startAsyncActionName = 'removeChips';
          this.mPendingExit = true;
        } else {
          //console.log('%c MoveSlotsAction - %cChips move done', 'color: #ff6e00', 'color: #fff400');
          this.nextActionName = 'userAction';
          this.mPendingExit = true;
        }
      }
    }
  }]);

  return MoveSlotsAction;
}(Action);

var UserAction = function (_Action3) {
  _inherits(UserAction, _Action3);

  function UserAction(m3e, type) {
    _classCallCheck(this, UserAction);

    //console.log('%c UserAction - %cStart', 'color: #ff6e00', 'color: #fff400');
    var _this7 = _possibleConstructorReturn(this, (UserAction.__proto__ || Object.getPrototypeOf(UserAction)).call(this, 'userAction', m3e));

    _this7._type = type;
    _this7._firstSlot = 'empty';
    _this7._secondSlot = 'empty';
    _this7._canSwap = false;
    _this7._swapBack = false;
    _this7.m3e.level.checkEndGame();
    _this7.possibleMoves = _this7.m3e.defaultMatcher.getPossibleMoves();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _this7.possibleMoves[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var r = _step2.value;

        if (r.refreshedColors) {
          _this7.nextActionName = 'removeChips';
          _this7.mPendingExit = true;
          return _possibleConstructorReturn(_this7);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    _this7.showPossibleMove();
    return _this7;
  }

  _createClass(UserAction, [{
    key: 'showPossibleMove',
    value: function showPossibleMove() {
      this.m3e.level.cbShowHelpMove(this.possibleMoves, this.m3e.level.gameSettings.highlighHelperTime);
    }
  }, {
    key: 'getSlots',
    value: function getSlots() {
      var slotX = this.m3e.mInput.x;
      var slotY = this.m3e.mInput.y;

      var pickedSlot = this.m3e.getSlot(slotX, slotY);
      if (this._firstSlot == 'empty') {
        if (pickedSlot.exist && pickedSlot.slot.currentChip != 'no_chip' && pickedSlot.slot.currentChip.canSwap) this._firstSlot = pickedSlot.slot;
      } else {
        if (this._firstSlot.mI != slotX || this._firstSlot.mJ != slotY) {
          var deltaX = Math.sign(this._firstSlot.mI - slotX);
          var deltaY = Math.sign(this._firstSlot.mJ - slotY);
          if (Math.abs(deltaX) + Math.abs(deltaY) == 1) {
            slotX = this._firstSlot.mI - deltaX;
            slotY = this._firstSlot.mJ - deltaY;
            pickedSlot = this.m3e.getSlot(slotX, slotY);
            if (pickedSlot.exist && pickedSlot.slot.currentChip != 'no_chip' && pickedSlot.slot.currentChip.canSwap) this._secondSlot = pickedSlot.slot;
          }
        }
      }
    }
  }, {
    key: 'tapSlots',
    value: function tapSlots() {
      this.m3e.level.cbHideHelpMoves();
      this.m3e.resetPendingDestroy();
      this.m3e.setAllChipsMatchPending(false);
      var firstChipMatchedGroup = this.m3e.matchSlot(this._firstSlot.mI, this._firstSlot.mJ);
      if (firstChipMatchedGroup.exist) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = firstChipMatchedGroup.result[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;

            if (item.slot !== null) item.slot.pendingDestroy(item);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        this.m3e.decreaseMoves();
        return true;
      } else {
        this._firstSlot.currentChip.view.shake(500);
        return false;
      }
    }
  }, {
    key: 'swapSlots',
    value: function swapSlots() {
      this.m3e.level.cbHideHelpMoves();
      this.m3e.resetPendingDestroy();
      this.m3e.setAllChipsMatchPending(false);
      this._firstSlot.currentChip.mMoveSteps.push({ x: this._secondSlot.mI, y: this._secondSlot.mJ });
      this._secondSlot.currentChip.mMoveSteps.push({ x: this._firstSlot.mI, y: this._firstSlot.mJ });

      this._firstSlot.mSwapChip = true;
      this._secondSlot.mSwapChip = true;

      var tmpChip = this._secondSlot.currentChip;
      this._secondSlot.currentChip = this._firstSlot.currentChip;
      this._firstSlot.currentChip = tmpChip;

      if (this._firstSlot.currentChip.type > 0 && this._secondSlot.currentChip.type > 0 || this._firstSlot.currentChip.color == -1 || this._secondSlot.currentChip.color == -1) {
        var result = this.m3e.specialSlotsMatch(this._firstSlot, this._secondSlot);
        if (!result) this.swapSlotsBack();else this.m3e.decreaseMoves();
      } else {
        if (this._firstSlot.currentChip.mColor == this._secondSlot.currentChip.mColor) {
          this.swapSlotsBack();
          var _backEffect = this.m3e.level.view.effects.chipHighlight;
          this.backEffect = _backEffect != null ? this.m3e.level.view.effects.chipHighlight(this._firstSlot) : null;
          return;
        }
        var firstChipMatchedGroup = this.m3e.matchSlot(this._firstSlot.mI, this._firstSlot.mJ);
        if (firstChipMatchedGroup.exist) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = firstChipMatchedGroup.result[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var item = _step4.value;

              if (item.slot !== null) item.slot.pendingDestroy(item);
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
        var secondChipMatchedGroup = this.m3e.matchSlot(this._secondSlot.mI, this._secondSlot.mJ);
        if (secondChipMatchedGroup.exist) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = secondChipMatchedGroup.result[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _item = _step5.value;

              if (_item.slot !== null) _item.slot.pendingDestroy(_item);
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
        if (!firstChipMatchedGroup.exist && !secondChipMatchedGroup.exist) {
          this.swapSlotsBack();
        } else this.m3e.decreaseMoves();
      }

      var backEffect = this.m3e.level.view.effects.chipHighlight;
      this.backEffect = backEffect != null ? this.m3e.level.view.effects.chipHighlight(this._firstSlot) : null;
    }
  }, {
    key: 'swapSlotsBack',
    value: function swapSlotsBack() {
      //console.log('%c UserAction - %cSwap back', 'color: #ff6e00', 'color: #fff400');
      this._firstSlot.currentChip.mMoveSteps.push({ x: this._secondSlot.mI, y: this._secondSlot.mJ });
      this._secondSlot.currentChip.mMoveSteps.push({ x: this._firstSlot.mI, y: this._firstSlot.mJ });

      this._firstSlot.mSwapBack = true;
      this._secondSlot.mSwapBack = true;
      var tmpChip = this._secondSlot.currentChip;
      this._secondSlot.currentChip = this._firstSlot.currentChip;
      this._firstSlot.currentChip = tmpChip;
      this._swapBack = true;
      this.showPossibleMove();
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {
      var isDone = false;
      if (this.m3e.mInput.onDown) {
        this.getSlots();
      } else if (!this._canSwap) {
        if (this._type == 'swipe') {
          if (this._firstSlot != 'empty' && this._secondSlot != 'empty') {

            this.swapSlots();
            this._canSwap = true;
          }
        } else if (this._type == 'tap') {
          if (this._firstSlot != 'empty') {

            isDone = this.tapSlots();
          }
        }

        this._firstSlot = 'empty';
        this._secondSlot = 'empty';
      }
      if (this._canSwap) {
        isDone = true;
        this.m3e.forEachSlot(function (slot) {
          var state = slot.onSlotUpdate(dt);
          if (isDone) {
            isDone = state.isDone;
          }
        });
      }

      if (isDone) {
        if (this.backEffect) this.backEffect.remove();
        this._canSwap = false;
        if (!this._swapBack) {
          //console.log('%c UserAction - %cUser make swipe', 'color: #ff6e00', 'color: #fff400');
          this.nextActionName = 'removeChips';
          this.mPendingExit = true;
        } else {
          this._swapBack = false;
        }
      }
    }
  }]);

  return UserAction;
}(Action);

var RemoveChips = function (_Action4) {
  _inherits(RemoveChips, _Action4);

  function RemoveChips(m3e) {
    _classCallCheck(this, RemoveChips);

    //console.log('%c RemoveChips - %cStart', 'color: #ff6e00', 'color: #fff400');
    var _this8 = _possibleConstructorReturn(this, (RemoveChips.__proto__ || Object.getPrototypeOf(RemoveChips)).call(this, 'removeChips', m3e));

    _this8.startingDestroyEffect = false;
    _this8.removePendingChips();
    _this8.m3e.level.cbHideHelpMoves();
    return _this8;
  }

  _createClass(RemoveChips, [{
    key: 'removePendingChips',
    value: function removePendingChips() {
      var _this9 = this;

      var counter = 0;
      this.m3e.forEachSlot(function (slot) {
        if (slot.currentChip != 'no_chip') {
          if (slot.mPendingDestroy || slot.currentChip.type.length > 1) {
            slot.pendingMatch = true;
            if (slot.currentChip.type != 0) {
              _this9.m3e.removeSpecialChips(slot.currentChip.type, slot);
              slot.mPendingDestroy = false;
            } else {
              if (_this9.m3e.level.gameType.mType === 'recipe') {
                var recipeResult = _this9.m3e.decreaseRecipe(slot.currentChip);
                if (recipeResult !== false) {
                  slot.destroyChipEffect(recipeResult, counter);
                  counter++;
                } else {
                  slot.destroyChipEffect();
                }
              } else {
                slot.destroyChipEffect();
              }

              slot.mPendingDestroy = false;
            }
          }
        }
      });
      this.startingDestroyEffect = true;
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {
      var _this10 = this;

      if (!this.startingDestroyEffect) return;
      var isDone = true;
      this.m3e.forEachSlot(function (slot) {
        if (slot.currentChip != 'no_chip' && slot.currentChip.mStartDestroy) {
          if (!slot.currentChip.isDestroyed && isDone || slot.currentChip.isEffectShow) {
            isDone = false;
          } else {
            _this10.m3e.addScore(_this10.m3e.level.gameSettings.scoreAddByChip);
            slot.removeChip();
          }
        }
      });

      this.m3e.forEachSlot(function (slot) {
        var state = slot.onSlotUpdate(dt);

        if (isDone) {
          isDone = state.isDone;
        }
      });

      if (isDone) {
        //console.log('%c RemoveChips - %cRemove end', 'color: #ff6e00', 'color: #fff400');
        this.nextActionName = 'moveChips';
        this.mPendingExit = true;
      }
    }
  }]);

  return RemoveChips;
}(Action);

exports.BootAction = BootAction;
exports.MoveSlotsAction = MoveSlotsAction;
exports.UserAction = UserAction;
exports.RemoveChips = RemoveChips;

},{"m3e/chip":5,"m3e/slot":9,"m3e/utils":10}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint -W041 */
var Chip = function () {
  function Chip(type) {
    _classCallCheck(this, Chip);

    this.mType = type;
    this.mColor = -1;
    this.mView = null;
    this.mI = this.mJ = 0;
    this.mMoveSteps = [];
    this.mIsMoved = false;
    this.mStartDestroy = false;
    this.mDestroyed = false;
    //this.mIsEffectShow = false;
    this.mIgnoreDestroyEffect = false;

    this.mMoveTime = 0;
    this.mTempPos = {};
    this.mBootOffset = 0;
    this.mCanSwap = true;
    this.mCanFall = true;
    this.mCanMatch = true;
  }

  _createClass(Chip, [{
    key: "saveTempPosition",
    value: function saveTempPosition() {
      this.mTempPos.x = this.x;
      this.mTempPos.y = this.y;
    }
  }, {
    key: "onChipUpdateIndex",
    value: function onChipUpdateIndex() {}
  }, {
    key: "onChipUpdate",
    value: function onChipUpdate() {}
  }, {
    key: "destroy",
    value: function destroy(targetRecipe, delay) {
      var _this = this;

      if (this.mIgnoreDestroyEffect) {
        this.mDestroyed = true;
        return;
      }

      if (!this.mStartDestroy) {
        this.mStartDestroy = true;
        this.mView.destroyEffect(function () {
          _this.mDestroyed = true;
        }, targetRecipe, delay);
      }
    }
  }, {
    key: "specialDestroy",
    value: function specialDestroy(targetPos) {
      var _this2 = this;

      if (this.mIgnoreDestroyEffect) {
        this.mDestroyed = true;
        return;
      }
      if (!this.mStartDestroy) {
        this.mStartDestroy = true;

        this.mView.specialDestroyEffect(targetPos, function () {
          _this2.mDestroyed = true;
        });
      }
    }
  }, {
    key: "setType",
    value: function setType(newType, newColor) {
      var _this3 = this;

      if (!this.mStartDestroy) {
        this.mType = newType != null ? newType : this.mType;
        this.mColor = newColor != null ? newColor : this.mColor;
        this.mView.setNewType(function () {
          _this3.mStartDestroy = false;
        });
      }
    }
  }, {
    key: "canSwap",
    get: function get() {
      return this.mCanSwap;
    },
    set: function set(value) {
      this.mCanSwap = value;
    }
  }, {
    key: "canMatch",
    get: function get() {
      return this.mCanMatch;
    },
    set: function set(value) {
      this.mCanMatch = value;
    }
  }, {
    key: "canFall",
    get: function get() {
      return this.mCanFall;
    },
    set: function set(value) {
      this.mCanFall = value;
    }
  }, {
    key: "bootOffset",
    get: function get() {
      return this.mBootOffset;
    },
    set: function set(value) {
      this.mBootOffset = value;
    }
  }, {
    key: "x",
    get: function get() {
      return this.mView.getX();
    },
    set: function set(x) {
      this.mView.setX(x);
    }
  }, {
    key: "y",
    get: function get() {
      return this.mView.getY();
    },
    set: function set(y) {
      this.mView.setY(y);
    }

    // get isEffectShow() {
    //   return this.mIsEffectShow;
    // }
    //
    // set isEffectShow(value) {
    //   this.mIsEffectShow = value;
    // }

  }, {
    key: "color",
    get: function get() {
      return this.mColor;
    },
    set: function set(color) {
      this.mColor = color;
    }
  }, {
    key: "position",
    set: function set(pos) {
      this.mI = pos.i;
      this.mJ = pos.j;
    },
    get: function get() {
      return { i: this.mI, j: this.mJ };
    }
  }, {
    key: "type",
    set: function set(type) {
      this.mType = type;
    },
    get: function get() {
      return this.mType;
    }
  }, {
    key: "isDestroyed",
    get: function get() {
      return this.mDestroyed;
    }
  }, {
    key: "view",
    get: function get() {
      return this.mView;
    },
    set: function set(view) {
      this._mView = view;
    }
  }]);

  return Chip;
}();

var RegularChip = function (_Chip) {
  _inherits(RegularChip, _Chip);

  function RegularChip() {
    _classCallCheck(this, RegularChip);

    return _possibleConstructorReturn(this, (RegularChip.__proto__ || Object.getPrototypeOf(RegularChip)).call(this, 0));
  }

  return RegularChip;
}(Chip);

var CustomChip = function (_Chip2) {
  _inherits(CustomChip, _Chip2);

  function CustomChip(type, settings) {
    _classCallCheck(this, CustomChip);

    return _possibleConstructorReturn(this, (CustomChip.__proto__ || Object.getPrototypeOf(CustomChip)).call(this, type));
  }

  return CustomChip;
}(Chip);

// class BombChip extends Chip {
//   constructor() {
//     super(1);
//   }
// }

exports.RegularChip = RegularChip;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = function () {
  function Input() {
    _classCallCheck(this, Input);

    this._x = 0;
    this._y = 0;
    this._onDown = false;
  }

  _createClass(Input, [{
    key: "x",
    set: function set(value) {
      this._x = value;
    },
    get: function get() {
      return this._x;
    }
  }, {
    key: "y",
    set: function set(value) {
      this._y = value;
    },
    get: function get() {
      return this._y;
    }
  }, {
    key: "onDown",
    set: function set(value) {
      this._onDown = value;
    },
    get: function get() {
      return this._onDown;
    }
  }]);

  return Input;
}();

exports.default = Input;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint -W069 */
/*jshint -W041 */

var _action = require('m3e/action');

var _action2 = _interopRequireDefault(_action);

var _utils = require('m3e/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = function () {
  function Level(m3e) {
    _classCallCheck(this, Level);

    this.m3e = m3e;

    this.cbGetChipView = this.emptyFunction;
    this.cbGetSlotView = null;
    this.cbFitChipsView = null;
    this.cbFitSlotsView = null;
    this.cbShowHelpMove = null;
    this.cbHideHelpMoves = null;

    this.cbUpdateScoreUI = null;
    this.cbUpdateMovesUI = null;
    this.cbUpdateRecipesUI = null;
    this.cbShowCTA = null;

    this.initMoves();
    this.gameTypes = {};
    this.gameTypes['recipe'] = RecipeGameType;
    this.gameTypes['score'] = ScoreGameType;
    this.gameTypes['custom'] = CustomGameType;

    this.mView = null;

    this.matchPatterns = MatchPatterns;
    this.fieldGenerator = FieldGenerator;
    this.matchPatterns = new this.matchPatterns().getPatterns();
    this.dontMatchSortingEnable = false;
    this.autoMatchOnStart = true;
    this.canRefreshColours = true;
    this.fieldMask = new this.fieldGenerator();

    //s - canSwap , m - canMatch, f - canFall  -> 0-false, 1 true
    this.chipSettings = new ChipSettings(['7,s=0,m=0,f=0', '8,s=0,m=0,f=0']);

    this.mGameSettings = {
      maxColors: 4,
      gameType: 'recipe,2-10,2-10,2-10,2-10',
      maxMoves: 25,
      maxScore: 0,
      scoreAddByChip: 10,
      highlighHelperTime: 5,
      inputType: 'swipe'
    };
  }

  _createClass(Level, [{
    key: 'initGameType',
    value: function initGameType(type) {
      type = type.split(",");
      var gameType = type.shift();
      this.gameType = new this.gameTypes[gameType](this.gameSettings.maxColors, type);
    }
  }, {
    key: 'checkEndGame',
    value: function checkEndGame() {
      var state = {
        win: false,
        lose: false
      };
      if (this.m3e.currentScore >= this.gameSettings.maxScore && this.gameSettings.maxScore != 0) {
        state.win = true;
      }
      if (this.m3e.currentMoves <= 0) {
        state.lose = true;
      }

      var recipesDone = true;
      if (this.gameType.mType === 'recipe') {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.gameType.recipesInfo[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var r = _step.value;

            if (r.count > 0) recipesDone = false;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else recipesDone = false;

      if (recipesDone) state.win = true;
      if (state.win || state.lose) {
        this.cbShowCTA(state);
        this.m3e.removeAllActions();
        this.m3e.pauseAllActions();
      }
    }
  }, {
    key: 'initMoves',
    value: function initMoves() {
      this.cbChipsMoveFunction = this.linearMove;
      this.cbChipsMoveXEndFunction = this.linearMove;
      this.cbChipsMoveYEndFunction = this.linearMove;

      this.cbChipsMoveScaleXFunction = this.linearScale;
      this.cbChipsMoveScaleYFunction = this.linearScale;
      this.cbChipsMoveScaleXEndFunction = this.linearScale;
      this.cbChipsMoveScaleYEndFunction = this.linearScale;

      // if set to as null there no postmove effect
      this.cbChipsPostMoveXFunction = null;
      this.cbChipsPostMoveYFunction = null;
      this.cbChipsPostScaleXFunction = null;
      this.cbChipsPostScaleYFunction = null;
      this.cbChipsPostRotateFunction = null;

      this.cbChipsSwapMoveXFunction = this.linearMove;
      this.cbChipsSwapMoveYFunction = this.linearMove;
      this.cbChipsSwapScaleXFunction = this.linearScale;
      this.cbChipsSwapScaleYFunction = this.linearScale;

      this.cbChipsSwapMoveInXFunction = this.linearMove;
      this.cbChipsSwapMoveInYFunction = this.linearMove;
      this.cbChipsSwapScaleInXFunction = this.linearScale;
      this.cbChipsSwapScaleInYFunction = this.linearScale;

      this.cbChipsSwapMoveOutXFunction = this.linearMove;
      this.cbChipsSwapMoveOutYFunction = this.linearMove;
      this.cbChipsSwapScaleOutXFunction = this.linearScale;
      this.cbChipsSwapScaleOutYFunction = this.linearScale;
    }
  }, {
    key: 'getMoveFunctions',
    value: function getMoveFunctions() {
      return {
        move: this.cbChipsMoveFunction,
        moveXEnd: this.cbChipsMoveXEndFunction,
        moveYEnd: this.cbChipsMoveYEndFunction,
        scaleX: this.cbChipsMoveScaleXFunction,
        scaleY: this.cbChipsMoveScaleYFunction,
        scaleEndX: this.cbChipsMoveScaleXEndFunction,
        scaleEndY: this.cbChipsMoveScaleYEndFunction,
        postMoveX: this.cbChipsPostMoveXFunction,
        postMoveY: this.cbChipsPostMoveYFunction,
        postScaleX: this.cbChipsPostScaleXFunction,
        postScaleY: this.cbChipsPostScaleYFunction,
        postRotate: this.cbChipsPostRotateFunction,
        swapX: this.cbChipsSwapMoveXFunction,
        swapY: this.cbChipsSwapMoveYFunction,
        swapScaleX: this.cbChipsSwapScaleXFunction,
        swapScaleY: this.cbChipsSwapScaleYFunction,
        swapBackInX: this.cbChipsSwapMoveInXFunction,
        swapBackInY: this.cbChipsSwapMoveInYFunction,
        swapBackOutX: this.cbChipsSwapMoveOutXFunction,
        swapBackOutY: this.cbChipsSwapMoveOutYFunction,
        swapBackInScaleX: this.cbChipsSwapScaleInXFunction,
        swapBackInScaleY: this.cbChipsSwapScaleInYFunction,
        swapBackOutScaleX: this.cbChipsSwapScaleOutXFunction,
        swapBackOutScaleY: this.cbChipsSwapScaleOutYFunction
      };
    }
  }, {
    key: 'linearMove',
    value: function linearMove(curVal, newVal, time) {
      return _utils2.default.interpolation(function (k) {
        return k;
      }, curVal, newVal, time, 8);
    }
  }, {
    key: 'linearScale',
    value: function linearScale(curVal, time) {
      return _utils2.default.interpolation(function (k) {
        return k;
      }, curVal, curVal, time, 8);
    }
  }, {
    key: 'init',
    value: function init(levelData) {
      if (levelData) {
        this.mGameSettings = {
          maxColors: levelData.maxColors,
          gameType: levelData.gameType,
          maxMoves: levelData.maxMoves,
          maxScore: levelData.maxScore,
          scoreAddByChip: levelData.scoreAddByChip,
          highlighHelperTime: levelData.highlighHelperTime,
          inputType: levelData.inputType

        };
      }

      this.m3e.initMatcher(this.gameSettings.inputType);
      this.initGameType(this.gameSettings.gameType);
    }
  }, {
    key: 'gameSettings',
    get: function get() {
      return this.mGameSettings;
    }
  }, {
    key: 'view',
    get: function get() {
      return this.mView;
    }
  }]);

  return Level;
}();

exports.default = Level;

var FieldGenerator = function () {
  function FieldGenerator() {
    var customFieldPattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var maxColumns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    _classCallCheck(this, FieldGenerator);

    if (customFieldPattern.length == 0) return this.generate(maxColumns, maxRows);else return this.customField(customFieldPattern);
  }

  /**
   * Generate a field map array
   * @return {string[][]}; 0 - is random color, 1-... specified color, -1 empty slot, -2.. special slots
   */


  _createClass(FieldGenerator, [{
    key: 'generate',
    value: function generate(maxColumns, maxRows) {
      var field = [];
      field.mask = Array.apply(null, Array(maxColumns)).map(function (e) {
        return Array(maxRows).fill('0');
      });
      field.totalColumns = field.mask.length - 1;
      field.totalRows = field.mask[0].length - 1;
      for (var i = 0; i <= field.totalColumns; i++) {
        field.mask[i][0] += ',b';
      }
      return field;
    }

    //0 - empty 1 - regular slot, b-boot,

  }, {
    key: 'customField',
    value: function customField(fieldMask) {
      var field = {};
      field.mask = fieldMask;
      field.totalColumns = field.mask.length - 1;
      field.totalRows = field.mask[0].length - 1;
      field.mask = this.swapFieldMask(field.mask);
      var _ref = [field.totalRows, field.totalColumns];
      field.totalColumns = _ref[0];
      field.totalRows = _ref[1];

      return field;
    }
  }, {
    key: 'swapFieldMask',
    value: function swapFieldMask(field) {
      return Object.keys(field[0]).map(function (c) {
        return field.map(function (r) {
          return r[c];
        });
      });
    }
  }]);

  return FieldGenerator;
}();

var GameType = function GameType(type) {
  _classCallCheck(this, GameType);

  this.mType = type;
};

var ScoreGameType = function (_GameType) {
  _inherits(ScoreGameType, _GameType);

  function ScoreGameType() {
    _classCallCheck(this, ScoreGameType);

    var _this = _possibleConstructorReturn(this, (ScoreGameType.__proto__ || Object.getPrototypeOf(ScoreGameType)).call(this, 'score'));

    _this.mScore = 0;
    _this.mMaxScore = 1000;
    _this.mMinScore = 5000;
    return _this;
  }

  return ScoreGameType;
}(GameType);

var CustomGameType = function (_GameType2) {
  _inherits(CustomGameType, _GameType2);

  function CustomGameType() {
    _classCallCheck(this, CustomGameType);

    return _possibleConstructorReturn(this, (CustomGameType.__proto__ || Object.getPrototypeOf(CustomGameType)).call(this, 'custom'));
  }

  _createClass(CustomGameType, [{
    key: 'setProp',
    value: function setProp(propName, value) {
      this[propName] = value;
    }
  }, {
    key: 'getProp',
    value: function getProp(propName) {
      return this[propName];
    }
  }]);

  return CustomGameType;
}(GameType);

var RecipeGameType = function (_GameType3) {
  _inherits(RecipeGameType, _GameType3);

  function RecipeGameType(maxColors, params) {
    _classCallCheck(this, RecipeGameType);

    var _this3 = _possibleConstructorReturn(this, (RecipeGameType.__proto__ || Object.getPrototypeOf(RecipeGameType)).call(this, 'recipe'));

    _this3._maxRecipeItems = 0;
    _this3._itemSettings = [];
    //console.log(params)
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = params[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var p = _step2.value;


        p = p.split('|');
        var type = p[0];
        var color = p[1];
        p = p[2].split('-');
        //console.log(p, type)

        if (_this3._maxRecipeItems <= maxColors) {
          _this3._itemSettings.push({ min: parseInt(p[0]), max: parseInt(p[1]), type: type, color: color });
          _this3._maxRecipeItems++;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    _this3.mRecipe = [];
    _this3.generateRecipes();
    return _this3;
  }

  _createClass(RecipeGameType, [{
    key: 'generateRecipes',
    value: function generateRecipes() {
      while (--this._maxRecipeItems >= 0) {
        this.mRecipe.push({
          color: this._itemSettings[this._maxRecipeItems].color,
          type: this._itemSettings[this._maxRecipeItems].type,
          count: _utils2.default.random(this._itemSettings[this._maxRecipeItems].min, this._itemSettings[this._maxRecipeItems].max)
        });
      }
      //  this.mRecipe = Utils.shuffleArray(this.mRecipe);
    }
  }, {
    key: 'recipesInfo',
    get: function get() {
      return this.mRecipe;
    }
  }]);

  return RecipeGameType;
}(GameType);

var ChipSettings = function () {
  function ChipSettings(settings) {
    _classCallCheck(this, ChipSettings);

    this._settings = settings;
    this._chipSettings = [];
    this.initSettings();
  }

  _createClass(ChipSettings, [{
    key: 'initSettings',
    value: function initSettings() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._settings[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var s = _step3.value;

          var settings = s.split(',');
          var chipType = settings.shift();

          var canFall = this.getParams('f', settings);
          canFall = canFall.exist ? canFall.result === 0 ? false : true : true;

          var canSwap = this.getParams('s', settings);
          canSwap = canSwap.exist ? canSwap.result === 0 ? false : true : true;

          var canMatch = this.getParams('m', settings);
          canMatch = canMatch.exist ? canMatch.result === 0 ? false : true : true;

          this._chipSettings.push({
            chipType: parseInt(chipType),
            canFall: canFall,
            canSwap: canSwap,
            canMatch: canMatch
          });
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'getParams',
    value: function getParams(targetParam, data) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var str = _step4.value;

          if (str.indexOf(targetParam) == 0) {
            var result = str.split('=');
            if (result.length > 1) {
              return { exist: true, result: parseInt(result[1]) };
            } else {
              return { exist: false };
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return { exist: false };
    }
  }, {
    key: 'getChipSettings',
    value: function getChipSettings(type) {
      var canFall = true;
      var canSwap = true;
      var canMatch = true;

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._chipSettings[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var s = _step5.value;

          if (s.chipType == type) {
            canFall = s.canFall;
            canSwap = s.canSwap;
            canMatch = s.canMatch;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return { canFall: canFall, canSwap: canSwap, canMatch: canMatch };
    }
  }]);

  return ChipSettings;
}();

var MatchPatterns = function () {
  function MatchPatterns() {
    _classCallCheck(this, MatchPatterns);

    this.p_line_3_1 = [[1, 1, 1]];

    this.p_line_3_2 = [[1], [1], [1]];

    this.p_line_4_1 = [[1, 1, 1, 1]];

    this.p_line_4_2 = [[1], [1], [1], [1]];

    this.p_line_5_1 = [[1, 1, 1, 1, 1]];

    this.p_line_5_2 = [[1], [1], [1], [1], [1]];

    this.p_line_6_1 = [[1, 1, 1, 1, 1, 1]];

    this.p_line_6_2 = [[1], [1], [1], [1], [1], [1]];

    this.p_l_1 = [[1, 1, 1], [0, 0, 1], [0, 0, 1]];

    this.p_l_2 = [[0, 0, 1], [0, 0, 1], [1, 1, 1]];

    this.p_l_3 = [[1, 0, 0], [1, 0, 0], [1, 1, 1]];

    this.p_l_4 = [[1, 1, 1], [1, 0, 0], [1, 0, 0]];

    this.p_t_1 = [[1, 0, 0], [1, 1, 1], [1, 0, 0]];

    this.p_t_2 = [[0, 0, 1], [1, 1, 1], [0, 0, 1]];

    this.p_t_3 = [[1, 1, 1], [0, 1, 0], [0, 1, 0]];

    this.p_t_4 = [[0, 1, 0], [0, 1, 0], [1, 1, 1]];
  }

  _createClass(MatchPatterns, [{
    key: 'getPatterns',
    value: function getPatterns() {
      // chipType - chipType, chipColor (-1 universalColor match with all colors)
      return [{ pattern: this.p_line_6_1, chipType: null }, { pattern: this.p_line_6_2, chipType: null }, { pattern: this.p_line_5_1, chipType: null }, { pattern: this.p_line_5_2, chipType: null }, { pattern: this.p_line_4_1, chipType: '2' }, { pattern: this.p_line_4_2, chipType: '1' }, { pattern: this.p_l_1, chipType: '4' }, { pattern: this.p_l_2, chipType: '4' }, { pattern: this.p_l_3, chipType: '4' }, { pattern: this.p_l_4, chipType: '4' }, { pattern: this.p_t_1, chipType: '3' }, { pattern: this.p_t_2, chipType: '3' }, { pattern: this.p_t_3, chipType: '3' }, { pattern: this.p_t_4, chipType: '3' }, { pattern: this.p_line_3_1, chipType: null }, { pattern: this.p_line_3_2, chipType: null }];
    }
  }]);

  return MatchPatterns;
}();

},{"m3e/action":4,"m3e/utils":10}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint -W041 */
/*jshint -W069 */
/*jshint -W083 */

var _level = require('m3e/level');

var _level2 = _interopRequireDefault(_level);

var _action = require('m3e/action');

var Actions = _interopRequireWildcard(_action);

var _chip = require('m3e/chip');

var Chips = _interopRequireWildcard(_chip);

var _utils = require('m3e/utils');

var _utils2 = _interopRequireDefault(_utils);

var _input = require('m3e/input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing match3 engine. */
var M3E = function () {
  /**
   * Initialize with actions and level settings.
   */
  function M3E() {
    _classCallCheck(this, M3E);

    this.mInput = new _input2.default();
    this.mLevel = new _level2.default(this);
    this.mSlots = [];
    this.mChipsCache = [];
    this.mActions = {};
    this.mActions['boot'] = { action: Actions.BootAction };

    this.mActionQueue = [];
    this.mAsyncActionsQueue = [];
    this.mActionsPause = false;
    this.mInited = false;
    this.createAction('boot');
  }

  _createClass(M3E, [{
    key: 'initMatcher',
    value: function initMatcher(type) {
      var _this = this;

      this.mActions['moveChips'] = { action: Actions.MoveSlotsAction };
      this.mActions['userAction'] = { action: Actions.UserAction, params: type };
      this.mActions['removeChips'] = { action: Actions.RemoveChips };

      this.specialDestroyBehavior = new SpecialDestroyBehavior(this);
      this.defaultMatcher = type == 'swipe' ? new M3Matcher(this) : new TAPM3Matcher(this);
      this.matchSlot = function (c, r) {
        return _this.defaultMatcher.matchSlot(c, r);
      };
      this.matchAllChips = function (checkOnlyPending) {
        return _this.defaultMatcher.matchAllChips(checkOnlyPending);
      };
      this.setAllChipsMatchPending = function (value) {
        _this.defaultMatcher.setAllChipsMatchPending(value);
      };
      this.resetPendingDestroy = function () {
        _this.defaultMatcher.resetPendingDestroy();
      };
      this.specialSlotsMatch = function (slot1, slot2) {
        return _this.defaultMatcher.specialSlotsMatch(slot1, slot2);
      };
      this.removeSpecialChips = function (type, slot) {
        return _this.defaultMatcher.removeSpecialChips(type, slot);
      };
    }

    /**
     * Assigning chip to hte slot
     * @param {!Slot} slot Slot class
     * @param {!Chip} chip Chip class
     */

  }, {
    key: 'assignChipToSlot',
    value: function assignChipToSlot(slot, chip) {
      slot.assignChip(chip);
    }

    /**
     * Get the Level class
     * @returns {Level} The Level cass
     */

  }, {
    key: 'init',


    // TODO remake
    value: function init(levelData) {
      this.mInited = true;
      this.mLevel.init(levelData);
      this.currentScore = this.level.gameSettings.maxScore;
      this.currentMoves = this.level.gameSettings.maxMoves;
    }
  }, {
    key: 'addAction',
    value: function addAction(name, action, params) {
      this.mActions[name] = { action: action, params: params };
    }

    /**
     * Add an action to enqueue
     * @param {string} actionName Action name
     */

  }, {
    key: 'createAction',
    value: function createAction(actionName) {
      var a = new this.mActions[actionName].action(this, this.mActions[actionName].params);
      var cb = this['cb_' + a.name + '_onAdd'];
      if (cb != null) cb(a);
      this.enqueue(a);
    }

    /**
     * Add async action to enqueue
     * @param {string} actionName Action name
     */

  }, {
    key: 'createAsyncAction',
    value: function createAsyncAction(actionName) {
      var a = new this.mActions[actionName].action(this, this.mActions[actionName].params);
      this.asyncEnqueue(a);
    }

    /**
     * Add Action class to enqueue array
     * @param {Action} action Action class
     */

  }, {
    key: 'enqueue',
    value: function enqueue(action) {
      this.mActionQueue.push(action);
    }

    /**
     * Add Action class to async enqueu array
     * @param {Action} action Action class
     */

  }, {
    key: 'asyncEnqueue',
    value: function asyncEnqueue(action) {
      this.mAsyncActionsQueue.push(action);
    }

    /**
     * Remove all actions
     */

  }, {
    key: 'removeAllActions',
    value: function removeAllActions() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.mActionQueue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var a = _step.value;

          a.mPendingExit = true;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.mAsyncActionsQueue[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _a = _step2.value;

          _a.mPendingExit = true;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    /**
     * Pause all actions
     */

  }, {
    key: 'pauseAllActions',
    value: function pauseAllActions() {
      this.mActionsPause = true;
    }

    /**
     * Resume all actions
     */

  }, {
    key: 'resumeAllActions',
    value: function resumeAllActions() {
      this.mActionsPause = false;
    }

    /**
     * Call callback function for all slots on the field
     * @param {ForEachSlotsCallback} func Callback that contain slot data
     */

  }, {
    key: 'forEachSlot',
    value: function forEachSlot(func) {
      var c = this.level.fieldMask.totalColumns;
      var r = this.level.fieldMask.totalRows;
      do {
        do {
          func(this.mSlots[c][r], c, r);
        } while (0 !== r--);
        r = this.level.fieldMask.totalRows;
      } while (0 !== c--);
    }

    /**
     * Called for each slot
     * @callback ForEachSlotsCallback
     * @param {Slot} slot Slot
     * @param {number} c Column
     * @param {number} r Row
     */

    /**
     * Get slot by column and row
     * @param {number} c Column
     * @param {number} r Row
     * @returns {{exist: boolean, slot: Slot}} Slot if it's exist
     */

  }, {
    key: 'getSlot',
    value: function getSlot(c, r) {
      var tC = this.level.fieldMask.totalColumns;
      var tR = this.level.fieldMask.totalRows;
      var slot = null;
      var exist = false;
      if (c >= 0 && c <= tC && r >= 0 && r <= tR) {
        exist = true;
        slot = this.mSlots[c][r];
      }
      return { exist: exist, slot: slot };
    }

    /**
     * Get neighbour slot by side name
     * @param {Slot} curSlot
     * @param {string} sideName
     * @returns {{exist: boolean, slot: Slot}} Slot if it's exist
     */

  }, {
    key: 'getNeighbourBySide',
    value: function getNeighbourBySide(curSlot, sideName) {
      var side = _utils2.default.sideOffsets.find(function (x) {
        return x[2] == sideName;
      });
      var newC = curSlot.mI + side[0];
      var newR = curSlot.mJ + side[1];
      var slot = null;
      var exist = false;
      if (this.getSlot(newC, newR).exist && this.mSlots[newC][newR].mType > 0) {
        slot = this.mSlots[newC][newR];
        exist = true;
      }
      return { exist: exist, slot: slot };
    }

    // TODO remove straightSides and slantedSides choose
    /**
     * Call Callback function for all exist neighbour slots
     * @param {Sot} slot Current slot
     * @param @param {GetAllNeighboursCallback} func Callback that contain slot data
     * @param {boolean} [straightSides = true] include straight sides
     * @param {boolean} [slantedSides = true] include slanted sides
     */

  }, {
    key: 'getAllNeighbours',
    value: function getAllNeighbours(slot, func) {
      var straightSides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var slantedSides = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var callArgStack = [];
      var neighbourSides = [];
      var totalSides = _utils2.default.sideOffsets.length;
      var sideNumber = slantedSides && !straightSides ? 1 : 0;
      do {
        var newC = slot.mI + _utils2.default.sideOffsets[sideNumber][0];
        var newR = slot.mJ + _utils2.default.sideOffsets[sideNumber][1];
        if (this.getSlot(newC, newR).exist) {
          neighbourSides[sideNumber] = this.mSlots[newC][newR].mType;
          callArgStack.push({
            exist: true,
            sideName: _utils2.default.sideOffsets[sideNumber][2],
            c: slot.mI,
            r: slot.mJ,
            newC: newC,
            newR: newR,
            sideNumber: sideNumber
          });
        } else {
          neighbourSides[sideNumber] = -1;
          callArgStack.push({
            exist: false,
            sideName: _utils2.default.sideOffsets[sideNumber][2],
            c: slot.mI,
            r: slot.mJ,
            newC: 0,
            newR: 0,
            sideNumber: sideNumber
          });
        }
        sideNumber++;
        if (straightSides != slantedSides) sideNumber++;
      } while (sideNumber < totalSides);
      var i = 0;
      if (callArgStack.length === 0) return;
      do {
        var args = callArgStack[i];
        func(args.sideName, args.c, args.r, args.newC, args.newR, args.sideNumber, neighbourSides, args.exist);
      } while (i++ < callArgStack.length - 1);
    }

    /**
     * Called for all neighbour slots
     * @callback GetAllNeighboursCallback
     * @param {string} borderType Border side name
     * @param {number} c Current slot column
     * @param {number} r Current slot row
     * @param {number} newC Found column
     * @param {number} newR Found row
     * @param {number} sideNumber The array index of found side in Utils.sideOffsets
     * @param {number[]} neighbourSidesType All founded slot types for current slot
     * @param {boolean} exist If side is exist
     */

    /**
     * Change field chips colors in maneer than no each one can't make match patterns
     * @returns {boolean} if make changes or max фееуьеы ьщку ерфт 50
     */

  }, {
    key: 'dontMatchSorting',
    value: function dontMatchSorting() {
      var _this2 = this;

      var i = 0;
      var makeChanges = false;
      while (i < 50 && !makeChanges) {
        i++;
        this.forEachSlot(function (slot) {
          var curChip = slot.currentChip;
          var curColor = curChip != "no_chip" ? curChip.color : null;
          var sR1 = _this2.getSlot(curChip.mI + 1, curChip.mJ);
          var sR2 = _this2.getSlot(curChip.mI + 2, curChip.mJ);
          var sB1 = _this2.getSlot(curChip.mI, curChip.mJ + 1);
          var sB2 = _this2.getSlot(curChip.mI, curChip.mJ + 2);

          if (sR1.exist && sR2.exist && curColor != null) {
            var cR1 = sR1.slot.currentChip;
            var cR2 = sR2.slot.currentChip;

            if (cR1 != "no_chip" && cR2 != "no_chip") {
              if (cR1.color == curColor && cR2.color == curColor) {
                slot.currentChip.color = _utils2.default.randomExcept(0, _this2.level.mGameSettings.maxColors, curColor);
                slot.currentChip.view.updateView();
                makeChanges = true;
              }
            }
          }

          if (sB1.exist && sB2.exist && curColor != null) {
            var cB1 = sB1.slot.currentChip;
            var cB2 = sB2.slot.currentChip;
            if (cB1 != "no_chip" && cB2 != "no_chip") {
              if (cB1.color == curColor && cB2.color == curColor) {
                slot.currentChip.color = _utils2.default.randomExcept(0, _this2.level.mGameSettings.maxColors, curColor);
                slot.currentChip.view.updateView();
                makeChanges = true;
              }
            }
          }
        });
      }

      if (makeChanges) return this.dontMatchSorting();else return false;
    }

    /**
     * Add new chip on slot
     * @param {number} Target Color
     * @param {number} i Target column
     * @param {number} j Target Row
     * @returns {Chip} newChip Added Chip
     */

  }, {
    key: 'addNewChip',
    value: function addNewChip(color, i, j) {
      var newChip = null;
      var cachedChipsSize = this.mChipsCache.length;
      while (0 < cachedChipsSize--) {
        if (this.mChipsCache[i].mType == type) {
          newChip = this.mChipsCache[i];
          this.mChipsCache.splice(i, 1);
          break;
        }
      }
      if (newChip === null) {
        newChip = new Chips.RegularChip();
      }
      newChip.mI = i;
      newChip.mJ = j;

      newChip.color = color;
      newChip.mView = this.level.cbGetChipView(newChip);
      this.assignChipToSlot(this.mSlots[i][j], newChip);
      return newChip;
    }

    /**
     * Decrease recipes number and update UI view
     * @param chip
     * @returns {boolean || number} return decreased recipe number or false if none
     */

  }, {
    key: 'decreaseRecipe',
    value: function decreaseRecipe(chip) {
      var count = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.level.gameType.recipesInfo[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var r = _step3.value;

          if (chip.color == r.color && chip.type == r.type && r.count > 0) {
            r.count--;
            this.level.cbUpdateRecipesUI();
            return count;
          }
          count++;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return false;
    }

    /**
     * Decrease moves
     */

  }, {
    key: 'decreaseMoves',
    value: function decreaseMoves() {
      this.level.cbUpdateMovesUI(--this.currentMoves);
    }

    /**
     * Add score
     * @param {number} add score value
     */

  }, {
    key: 'addScore',
    value: function addScore(value) {
      this.currentScore += value;
      this.level.cbUpdateScoreUI(value);
    }

    /**
     * Check for slots equals
     * @param {Slot} slot1
     * @param {Slot} slot2
     * @returns {boolean} Are slots equal
     */

  }, {
    key: 'slotsEqual',
    value: function slotsEqual(slot1, slot2) {
      return slot1.mI == slot2.mI && slot1.mJ == slot2.mJ;
    }

    /**
     * Update loop
     * @param {number} dt Delta time
     */

  }, {
    key: 'update',
    value: function update(dt) {
      if (!this.mInited) return;

      var current = this.mActionQueue[0];
      if (!this.mActionsPause) {
        if (this.mActionQueue.length !== 0) {
          current.onUpdate(dt);
          var cb = this['cb_' + current.name + '_update'];
          if (cb != null) cb(current);
        }

        if (current && current.isPendingExit) {
          this.mActionQueue.shift();
          if (current.nextActionName !== false) this.createAction(current.nextActionName);
        }
      }

      /// Async actions part

      if (current && current.startAsyncActionName !== '') {
        this.createAsyncAction(current.startAsyncActionName);
        current.startAsyncActionName = '';
      }

      if (!this.mActionsPause) {
        for (var i = 0; i < this.mAsyncActionsQueue.length; i++) {
          var asyncAction = this.mAsyncActionsQueue[i];
          asyncAction.onUpdate(dt);
          var _cb = this['cb_' + asyncAction.name + '_update'];
          if (_cb != null) _cb(asyncAction);

          if (asyncAction && asyncAction.startAsyncActionName !== '') {
            this.createAsyncAction(asyncAction.startAsyncActionName);
            asyncAction.startAsyncActionName = '';
          }

          if (asyncAction && asyncAction.isPendingExit) {
            this.mAsyncActionsQueue.splice(i, 1);
            if (asyncAction.nextActionName !== false) this.createAction(asyncAction.nextActionName);
          }
        }
      }
    }
  }, {
    key: 'level',
    get: function get() {
      return this.mLevel;
    }
  }]);

  return M3E;
}();

exports.default = M3E;

var SpecialDestroyBehavior = function () {
  function SpecialDestroyBehavior(m3e) {
    _classCallCheck(this, SpecialDestroyBehavior);

    this._m3e = m3e;
    this.lineEffect = function () {};
    this.bombEffect = function () {};
    this.colorBombEffect = function () {};

    this.line = this.lineDestroy;
    this.crossLine = this.crossLineDestroy;
    this.bomb = this.bombDestroy;
    this.colorRemove = this.colorBombDestroy;
    this.destroyPatterns = [];
  }

  _createClass(SpecialDestroyBehavior, [{
    key: 'setDefaultPatterns',
    value: function setDefaultPatterns() {
      this.addPattern('1', [{ func: this.line, args: [false, 1] }], [{ func: this.lineEffect, args: [90, 1] }]);
      this.addPattern('2', [{ func: this.line, args: [true, 1] }], [{ func: this.lineEffect, args: [0, 1] }]);
      this.addPattern('3', [{ func: this.crossLine, args: [1] }], [{ func: this.lineEffect, args: [45, 1] }, { func: this.lineEffect, args: [-45, 1] }]);
      this.addPattern('4', [{ func: this.bomb, args: [3] }], [{ func: this.bombEffect, args: [3] }]);
      this.addPattern('5-x,6', [{ func: this.colorRemove, args: [] }], [{ func: this.colorBombEffect, args: [] }]);

      this.addPattern('1-1', [{ func: this.line, args: [false, 1] }, { func: this.line, args: [true, 1] }], [{ func: this.lineEffect, args: [0, 1] }, { func: this.lineEffect, args: [90, 1] }]);
      this.addPattern('1-2', [{ func: this.line, args: [false, 1] }, { func: this.line, args: [true, 1] }], [{ func: this.lineEffect, args: [0, 1] }, { func: this.lineEffect, args: [90, 1] }]);
      this.addPattern('2-2', [{ func: this.line, args: [false, 1] }, { func: this.line, args: [true, 1] }], [{ func: this.lineEffect, args: [0, 1] }, { func: this.lineEffect, args: [90, 1] }]);

      this.addPattern('3-1', [{ func: this.line, args: [false, 1] }, {
        func: this.line,
        args: [true, 1]
      }, { func: this.crossLine, args: [1] }], [{ func: this.lineEffect, args: [0, 1] }, { func: this.lineEffect, args: [90, 1] }, {
        func: this.lineEffect,
        args: [45, 1]
      }, { func: this.lineEffect, args: [-45, 1] }]);
      this.addPattern('3-2', [{ func: this.line, args: [false, 1] }, {
        func: this.line,
        args: [true, 1]
      }, { func: this.crossLine, args: [1] }], [{ func: this.lineEffect, args: [0, 1] }, { func: this.lineEffect, args: [90, 1] }, {
        func: this.lineEffect,
        args: [45, 1]
      }, { func: this.lineEffect, args: [-45, 1] }]);

      this.addPattern('4-1', [{ func: this.line, args: [false, 3] }], [{ func: this.lineEffect, args: [90, 3] }]);

      this.addPattern('4-2', [{ func: this.line, args: [true, 3] }], [{ func: this.lineEffect, args: [0, 3] }]);

      this.addPattern('4-3', [{ func: this.crossLine, args: [3] }], [{ func: this.lineEffect, args: [45, 3] }, { func: this.lineEffect, args: [-45, 3] }]);

      this.addPattern('4-4', [{ func: this.bomb, args: [7] }], [{ func: this.bombEffect, args: [7] }]);
    }
  }, {
    key: 'addPattern',
    value: function addPattern(chipType, func, effects) {
      this.destroyPatterns.push({
        type: chipType,
        func: func,
        effects: effects
      });
    }
  }, {
    key: 'lineDestroy',
    value: function lineDestroy(isVertical, size, slot) {

      var chipsToRemove = [];
      var curI = slot.mI;
      var curJ = slot.mJ;
      for (var i = -Math.floor(size / 2); i < Math.round(size / 2); i++) {
        var curSlot = this._m3e.getSlot(isVertical ? curI + i : curI, isVertical ? curJ : curJ + i);
        if (curSlot.exist) {
          var _i = 0;
          if (!isVertical) {
            for (_i = 0; _i <= this._m3e.mLevel.fieldMask.totalColumns; _i++) {
              var findChip = this._m3e.getSlot(_i, curSlot.slot.mJ);
              if (findChip.exist && findChip.slot.currentChip.canMatch) chipsToRemove.push(findChip);
            }
          } else {
            for (_i = 0; _i <= this._m3e.mLevel.fieldMask.totalRows; _i++) {
              var _findChip = this._m3e.getSlot(curSlot.slot.mI, _i);
              if (_findChip.exist && _findChip.slot.currentChip.canMatch) chipsToRemove.push(_findChip);
            }
          }
        }
      }
      return chipsToRemove;
    }
  }, {
    key: 'crossLineDestroy',
    value: function crossLineDestroy(size, slot) {
      var chipsToRemove = [];

      var curI = slot.mI;
      var curJ = slot.mJ;

      for (var i = -Math.floor(size / 2); i < Math.round(size / 2); i++) {
        var curSlot = this._m3e.getSlot(curI + i, curJ);
        if (curSlot.exist) {
          var c = curSlot.slot.mI;
          var r = curSlot.slot.mJ;
          var sum = c + r;

          for (var _i2 = 0; _i2 <= this._m3e.mLevel.fieldMask.totalColumns; _i2++) {
            for (var j = 0; j <= this._m3e.mLevel.fieldMask.totalRows; j++) {
              if (_i2 + j == sum || Math.abs(c - _i2) == Math.abs(r - j)) {
                var findChip = this._m3e.getSlot(_i2, j);
                if (findChip.exist && findChip.slot.currentChip.canMatch) chipsToRemove.push(findChip);
              }
            }
          }
        }
      }
      return chipsToRemove;
    }
  }, {
    key: 'bombDestroy',
    value: function bombDestroy(size, chip) {
      var chipsToRemove = [];

      for (var i = -Math.floor(size * 0.5); i < Math.round(size * 0.5); i++) {
        for (var j = -Math.floor(size * 0.5); j < Math.round(size * 0.5); j++) {
          var findChip = this._m3e.getSlot(i + chip.mI, j + chip.mJ);
          if (findChip.exist && findChip.slot.currentChip.canMatch) chipsToRemove.push(findChip);
        }
      }
      return chipsToRemove;
    }
  }, {
    key: 'colorBombDestroy',
    value: function colorBombDestroy(slot) {
      var _this3 = this;

      var chipsToRemove = [];
      this._m3e.forEachSlot(function (s) {
        var findChip = _this3._m3e.getSlot(s.mI, s.mJ);
        if (findChip.exist && findChip.slot.currentChip.color == slot.currentChip.color && findChip.slot.currentChip.color != -1 && findChip.slot.currentChip.canMatch) chipsToRemove.push(findChip);
      });
      return chipsToRemove;
    }
  }, {
    key: 'slotDestroy',
    value: function slotDestroy(type, slot) {
      var applyEffects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


      var findPattern = false;
      type = type.split(',');
      var matchType = type[0];
      var ignoredElements = [];
      if (type.length > 1) {
        for (var i = 1; i < type.length; i++) {
          ignoredElements.push(type[i]);
        }
      }

      for (var _i3 = 0; _i3 < this.destroyPatterns.length; _i3++) {
        var dp = this.destroyPatterns[_i3].type;
        dp = dp.split(',');
        var dpMatchType = dp[0];
        var dpIgnoreElements = [];

        if (dp.length > 1) {
          for (var _i4 = 1; _i4 < dp.length; _i4++) {
            dpIgnoreElements.push(dp[_i4]);
          }
        }

        if (dpMatchType == matchType) {
          if (ignoredElements.length == 1) {
            if (dpIgnoreElements.find(function (x) {
              return x == ignoredElements[0];
            }) == undefined) findPattern = _i3;
          } else if (ignoredElements.length == 2) {
            if (dpIgnoreElements.find(function (x) {
              return x == ignoredElements[0];
            }) == undefined && dpIgnoreElements.find(function (x) {
              return x == ignoredElements[1];
            }) == undefined) findPattern = _i3;
          } else if (ignoredElements.length == 0) findPattern = _i3;
        }
      }

      if (findPattern === false) return false;

      var df = this.destroyPatterns[findPattern];

      var removeChips = [this._m3e.getSlot(slot.mI, slot.mJ)];

      for (var _i5 = 0; _i5 < df.func.length; _i5++) {
        removeChips = removeChips.concat(df.func[_i5].func.apply(this, df.func[_i5].args.concat(slot)));
      }
      if (applyEffects) for (var _i6 = 0; _i6 < df.effects.length; _i6++) {
        df.effects[_i6].func.apply(this, df.effects[_i6].args.concat(slot, [removeChips]));
      }
      return removeChips;
    }
  }]);

  return SpecialDestroyBehavior;
}();

var M3Matcher = function () {
  function M3Matcher(m3e) {
    _classCallCheck(this, M3Matcher);

    this._m3e = m3e;
    //console.log('%c Swipe Match 3 Matcher - %cInitialized', 'color: #ff6e00', 'color: #fff400');
  }

  /**
   * Return matched groups for one slot
   * @param c Current column
   * @param r Current row
   * @returns {{exist: boolean, result: [{slot: Slot, simpleDestroy: boolean, targetSlot: Slot, newType: number }]}} Matching result
   */


  _createClass(M3Matcher, [{
    key: 'matchSlot',
    value: function matchSlot(c, r) {
      var slot = this._m3e.getSlot(c, r);
      if (!slot.exist && slot.slot.currentChip.mType < 1) return { exist: false, result: [] };

      var matchedGroup = this.findMatchGroups(slot.slot, true, true);
      if (!matchedGroup.exist) matchedGroup = this.findMatchGroups(slot.slot, false, true);
      return matchedGroup;
    }

    /**
     * Finding matched slots by colour and compare them with matched patterns
     * @param {Slot} slot Checked slot
     * @param {boolean} [horizontal=true] Start checking for horizontal or vertical comparing at first
     * @param [boolean} [checkSubGroups=false] check only subgroups (used for second pass)
     * @returns {Slot[] | {exist: boolean, result: [{slot: Slot, simpleDestroy: boolean, targetSlot: Slot, newType: number }]}} Matching result
     */

  }, {
    key: 'findMatchGroups',
    value: function findMatchGroups(slot) {
      var horizontal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var checkSubGroups = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var allSlots = [];
      var previousSlots = [];
      var nextSlots = [];
      var result = { exist: false, items: [] };

      var counter = horizontal ? slot.mI : slot.mJ;
      var end = horizontal ? this._m3e.mLevel.fieldMask.totalColumns : this._m3e.mLevel.fieldMask.totalRows;

      while (end > counter++) {
        var curSlot = this._m3e.getSlot(horizontal ? counter : slot.mI, horizontal ? slot.mJ : counter);

        if (!curSlot.slot.mPendingDestroy && curSlot.slot.currentChip != 'no_chip' && curSlot.slot.currentChip.mColor == slot.currentChip.mColor && curSlot.slot.currentChip.canMatch) {
          previousSlots.push(curSlot.slot);
        } else break;
      }

      counter = horizontal ? slot.mI : slot.mJ;
      while (0 < counter--) {

        var _curSlot = this._m3e.getSlot(horizontal ? counter : slot.mI, horizontal ? slot.mJ : counter);

        if (!_curSlot.slot.mPendingDestroy && _curSlot.slot.currentChip != 'no_chip' && _curSlot.slot.currentChip.mColor == slot.currentChip.mColor && _curSlot.slot.currentChip.canMatch) {
          nextSlots.push(_curSlot.slot);
        } else break;
      }

      if (checkSubGroups) {
        allSlots = allSlots.concat(previousSlots);
        allSlots = allSlots.concat(slot);
        allSlots = allSlots.concat(nextSlots);
      } else {
        allSlots = allSlots.concat(previousSlots);
        allSlots = allSlots.concat(nextSlots);
        return allSlots;
      }

      var itemsLength = allSlots.length;
      if (itemsLength > 1) {
        if (checkSubGroups) {
          var i = 0;
          do {
            var subGroup = this.findMatchGroups(allSlots[i], !horizontal);
            if (subGroup.length !== 0) {
              allSlots = allSlots.concat(subGroup);
            }
          } while (itemsLength - 1 > i++);
        }
        result = this.comparePatterns(this.createMatchPattern(allSlots), slot);
        if (result.exist) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = result.items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var r = _step4.value;

              r.slot.isMatched = true;
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      }
      return { exist: result.exist, result: result.items };
    }

    /**
     * Creating 2d array pattern based for  zero start coordinates
     * for next checking with predefined match patterns
     * @param {Slot[]} slots Matched slots
     * @returns {Slot[][]} Result match pattern
     */

  }, {
    key: 'createMatchPattern',
    value: function createMatchPattern(slots) {
      var result = [];
      var minColumn = Math.min.apply(Math, slots.map(function (x) {
        return x.mI;
      }));
      var maxColumn = Math.max.apply(Math, slots.map(function (x) {
        return x.mI;
      }));
      var minRow = Math.min.apply(Math, slots.map(function (x) {
        return x.mJ;
      }));
      var maxRow = Math.max.apply(Math, slots.map(function (x) {
        return x.mJ;
      }));

      var _loop = function _loop(i) {
        result[i] = [];

        var _loop2 = function _loop2(j) {
          var slot = slots.find(function (x) {
            return x.mI == minColumn + i && x.mJ == minRow + j;
          });
          result[i][j] = slot ? slot : 0;
        };

        for (var j = 0; j <= maxRow - minRow; j++) {
          _loop2(j);
        }
      };

      for (var i = 0; i <= maxColumn - minColumn; i++) {
        _loop(i);
      }
      return result;
    }

    /**
     * Compare matched patterns for matching
     * @param {Slot[][]}  slotsPattern Founded slots pattern
     * @param {Slot} startSlot Starting matching slot
     * @returns {{exist: boolean, items: [{slot: Slot, simpleDestroy: boolean, targetSlot: Slot, newType: number }]} Matching result if exist
     */

  }, {
    key: 'comparePatterns',
    value: function comparePatterns(slotsPattern, startSlot) {
      if (slotsPattern.length > 0) {
        var matchedItems = [];
        var patternsLength = this._m3e.level.matchPatterns.length;
        var spMaxColumns = slotsPattern.length;
        var spMaxRows = slotsPattern[0].length;
        var p = 0;
        var cOffset = 0;
        var rOffset = 0;

        for (p = 0; p < patternsLength; p++) {
          var mP = this._m3e.level.matchPatterns[p].pattern;
          var mPC = mP.length;
          var mPR = mP[0].length;
          if (mPC <= spMaxColumns && mPR <= spMaxRows) {

            for (cOffset = 0; cOffset <= spMaxColumns - mPC; cOffset++) {
              for (rOffset = 0; rOffset <= spMaxRows - mPR; rOffset++) {
                var matched = true;
                var startSlotMatched = false;
                matchedItems = [];
                for (var i = 0; i < mPC; i++) {
                  for (var j = 0; j < mPR; j++) {
                    var curSP = slotsPattern[i + cOffset][j + rOffset];
                    if (mP[i][j] == 1 && curSP !== 0) {
                      var newType = null;
                      var newColor = null;
                      var patternParams = this._m3e.level.matchPatterns[p].chipType;
                      if (patternParams != null) {
                        patternParams = this._m3e.level.matchPatterns[p].chipType.split(',');
                        if (patternParams.length == 2) {
                          newType = parseInt(patternParams[0]);
                          newColor = parseInt(patternParams[1]);
                        } else newType = patternParams[0];
                      }

                      if (curSP.mI == startSlot.mI && curSP.mJ == startSlot.mJ) startSlotMatched = true;
                      matchedItems.push({
                        slot: curSP,
                        simpleDestroy: this._m3e.level.matchPatterns[p].chipType === null,
                        targetSlot: startSlot,
                        newType: newType,
                        newColor: newColor
                      });
                    } else if (mP[i][j] != curSP) {
                      matched = false;
                    }
                  }
                }
                if (matched && startSlotMatched) {
                  return { exist: true, items: matchedItems };
                }
              }
            }
          }
        }
      }
      return { exist: false, items: [] };
    }

    /**
     * Set all chips pendingMatch value
     * @param {boolean} value
     */

  }, {
    key: 'setAllChipsMatchPending',
    value: function setAllChipsMatchPending(value) {
      this._m3e.forEachSlot(function (slot) {
        slot.pendingMatch = value;
      });
    }

    /**
     * Set all chips PendingDestroy value
     * @param {boolean} value
     */

  }, {
    key: 'resetPendingDestroy',
    value: function resetPendingDestroy() {
      this._m3e.forEachSlot(function (slot) {
        slot.mPendingDestroy = false;
        // slot.mThrowSpecialDestroy = false;
      });
    }

    /**
     * Match all or only lat Action moved chips
     * @param {boolean} checkOnlyPending check only last moved chips
     * {{exist: boolean, result: [{slot: Slot, simpleDestroy: boolean, targetSlot: Slot, newType: number }]}} Matching result
     */

  }, {
    key: 'matchAllChips',
    value: function matchAllChips() {
      var _this4 = this;

      var checkOnlyPending = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      //checkOnlyPending = false
      var findGroups = false;
      this._m3e.forEachSlot(function (slot, c, r) {
        //if (!slot.mPendingDestroy && (!checkOnlyPending || slot.pendingMatch) && slot.currentChip.canMatch) {
        if ((!checkOnlyPending || slot.pendingMatch) && slot.currentChip.canMatch) {
          var matchGroups = _this4.matchSlot(c, r);
          if (matchGroups.exist) {
            findGroups = true;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = matchGroups.result[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var item = _step5.value;

                if (item.slot !== null) {
                  item.slot.pendingDestroy(item);
                }
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }
          }
        }
      });

      this.setAllChipsMatchPending(false);
      return findGroups;
    }
  }, {
    key: 'specialSlotsMatch',
    value: function specialSlotsMatch(slot1, slot2) {
      var matchName = slot1.currentChip.type + '-' + slot2.currentChip.type;
      var matchNameReversed = slot2.currentChip.type + '-' + slot1.currentChip.type;
      var matchNameX = slot1.currentChip.type + '-x';
      var matchNameXReversed = slot2.currentChip.type + '-x';
      var tempType1 = slot1.currentChip.type;
      var tempType2 = slot2.currentChip.type;

      matchName += ',' + tempType1 + ',' + tempType2;
      matchNameReversed += ',' + tempType1 + ',' + tempType2;
      matchNameX += ',' + tempType1 + ',' + tempType2;
      matchNameXReversed += ',' + tempType1 + ',' + tempType2;

      var type = matchName;
      var result = this._m3e.specialDestroyBehavior.slotDestroy(matchName, slot1, false);
      if (result) {
        slot1.currentChip.type = 0;
        slot2.currentChip.type = type;
        return result;
      }

      if (!result) {
        result = this._m3e.specialDestroyBehavior.slotDestroy(matchNameReversed, slot1, false);
        type = matchNameReversed;
        if (result) {
          slot1.mThrowSpecialDestroy = true;
          slot1.currentChip.type = 0;
          slot2.currentChip.type = type;
          return result;
        }
      }

      if (!result && slot1.currentChip.type != slot2.currentChip.type) {
        result = this._m3e.specialDestroyBehavior.slotDestroy(matchNameX, slot1, false);
        type = matchNameX;
      }
      if (!result && slot1.currentChip.type != slot2.currentChip.type) {
        result = this._m3e.specialDestroyBehavior.slotDestroy(matchNameXReversed, slot1, false);
        type = matchNameXReversed;
      }
      if (result != false) {
        slot1.mThrowSpecialDestroy = true;
        slot2.currentChip.type = type;
      }
      if (result) {
        slot2.mThrowSpecialDestroy = true;
        slot1.currentChip.type = type;
      }

      slot1.pendingMatch = true;
      slot2.pendingMatch = true;
      return result;
    }
  }, {
    key: 'removeSpecialChips',
    value: function removeSpecialChips(type, slot, slotsToRemove) {
      var _this5 = this;

      slotsToRemove = slotsToRemove || [];
      var counter = 0;
      var chipsForRemove = this._m3e.specialDestroyBehavior.slotDestroy(type.toString(), slot);
      if (!chipsForRemove) {
        slot.destroyChipEffect();
        slot.mPendingDestroy = false;
      } else {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          var _loop3 = function _loop3() {
            var c = _step6.value;

            if (c.slot.currentChip != 'no_chip') {
              if (c.slot.currentChip.type != 0 && !_this5._m3e.slotsEqual(c.slot, slot) && slotsToRemove.find(function (x) {
                return _this5._m3e.slotsEqual(c.slot, x);
              }) == undefined && !c.slot.mThrowSpecialDestroy) {
                // c.slot.currentChip.mIgnoreDestroyEffect = true;
                // slot.currentChip.mIgnoreDestroyEffect = false;
                _this5.removeSpecialChips(c.slot.currentChip.type, c.slot, slotsToRemove);
              } else {
                slotsToRemove.push({ mI: c.slot.mI, mJ: c.slot.mJ });
                // if(c.slot.currentChip.type != 0)
                //   c.slot.currentChip.mIgnoreDestroyEffect = false;
                //slot.currentChip.mIgnoreDestroyEffect = false;

                c.slot.mThrowSpecialDestroy = false;
                c.slot.mSimpleDestroy = true;
                if (_this5._m3e.level.gameType.mType === 'recipe') {
                  var recipeResult = _this5._m3e.decreaseRecipe(c.slot.currentChip);
                  if (recipeResult !== false) {
                    c.slot.destroyChipEffect(recipeResult, counter);
                    counter++;
                  } else {
                    c.slot.destroyChipEffect();
                  }
                } else c.slot.destroyChipEffect();

                c.slot.mPendingDestroy = true;
                c.slot.currentChip.mStartDestroy = true;
                c.slot.pendingMatch = true;
              }
            }
          };

          for (var _iterator6 = chipsForRemove[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            _loop3();
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }

      slot.currentChip.mIgnoreDestroyEffect = false;
    }
  }, {
    key: 'getPossibleMoves',
    value: function getPossibleMoves(startRow) {
      var endRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      var tC = this._m3e.level.fieldMask.totalColumns;
      var tR = this._m3e.level.fieldMask.totalRows;

      startRow = startRow || 0;
      endRow = endRow == -1 ? tR : endRow;

      var result = [];
      result.refreshedColors = false;

      for (var i = 0; i < tC - 1; i++) {
        for (var j = startRow; j <= endRow; j++) {

          for (var k = 1; k <= 6; k++) {
            var offsetI = k <= 3 ? 1 - k % 3 : 0;
            var offsetJ = k > 3 ? 1 - k % 3 : 0;

            if (offsetI != offsetJ) {
              var slot1 = this._m3e.getSlot(i, j);
              var slot2 = this._m3e.getSlot(i + offsetI, j + offsetJ);
              if (slot1.exist && slot2.exist && slot1.slot.currentChip != 'no_chip' && slot2.slot.currentChip != 'no_chip' && slot1.slot.currentChip.color != slot2.slot.currentChip.color && slot1.slot.currentChip.canMatch && slot2.slot.currentChip.canMatch) {
                var _ref = [slot2.slot.currentChip.color, slot1.slot.currentChip.color];
                slot1.slot.currentChip.color = _ref[0];
                slot2.slot.currentChip.color = _ref[1];
                var _ref2 = [slot2.slot.currentChip.type, slot1.slot.currentChip.type];
                slot1.slot.currentChip.type = _ref2[0];
                slot2.slot.currentChip.type = _ref2[1];


                var matchResult = this.matchSlot(i + offsetI, j + offsetJ);
                var _ref3 = [slot1.slot.currentChip.color, slot2.slot.currentChip.color];
                slot2.slot.currentChip.color = _ref3[0];
                slot1.slot.currentChip.color = _ref3[1];
                var _ref4 = [slot1.slot.currentChip.type, slot2.slot.currentChip.type];
                slot2.slot.currentChip.type = _ref4[0];
                slot1.slot.currentChip.type = _ref4[1];


                if (matchResult.exist) {
                  result.push({
                    slot1: this._m3e.mSlots[i][j],
                    slot2: this._m3e.mSlots[i + offsetI][j + offsetJ],
                    result: matchResult.result
                  });
                  break;
                }
              }
            }
          }
        }
      }

      if (this._m3e.level.canRefreshColours && result.length == 0 && startRow == 0 && endRow == tR) {
        this.refreshColors();
        result = this.getPossibleMoves();
        result.refreshedColors = true;
      }
      return result;
    }
  }, {
    key: 'refreshColors',
    value: function refreshColors() {
      var _this6 = this;

      this._m3e.forEachSlot(function (slot, c, r) {
        var chip = slot.currentChip;
        if (chip != 'no_chip' && chip.color != -1) {
          chip.color = _utils2.default.random(0, _this6._m3e.level.mGameSettings.maxColors);
        }
      });
      this._m3e.dontMatchSorting();
      this._m3e.forEachSlot(function (slot, c, r) {
        var chip = slot.currentChip;
        if (chip != 'no_chip' && chip.color != -1) {
          chip.view.refreshColor();
        }
      });
      return true;
    }
  }]);

  return M3Matcher;
}();

var TAPM3Matcher = function () {
  function TAPM3Matcher(m3e) {
    _classCallCheck(this, TAPM3Matcher);

    this._m3e = m3e;
    //console.log('%c Tap Match 3 Matcher - %cInitialized', 'color: #ff6e00', 'color: #fff400');
  }

  /**
   * Return matched groups for one slot
   * @param c Current column
   * @param r Current row
   * @returns {{exist: boolean, result: [{slot: Slot, simpleDestroy: boolean, targetSlot: Slot, newType: number }]}} Matching result
   */


  _createClass(TAPM3Matcher, [{
    key: 'matchSlot',
    value: function matchSlot(c, r) {
      var slot = this._m3e.getSlot(c, r);
      if (!slot.exist && slot.slot.currentChip.mType < 1) return { exist: false, result: [] };

      var matchedGroup = this.findMatchGroups(slot.slot, true, true);
      if (!matchedGroup.exist) matchedGroup = this.findMatchGroups(slot.slot, false, true);
      return matchedGroup;
    }

    /**
     * Finding matched slots by colour and compare them with matched patterns
     * @param {Slot} slot Checked slot
     * @param {boolean} [horizontal=true] Start checking for horizontal or vertical comparing at first
     * @param [boolean} [checkSubGroups=false] check only subgroups (used for second pass)
     * @returns {Slot[] | {exist: boolean, result: [{slot: Slot, simpleDestroy: boolean, targetSlot: Slot, newType: number }]}} Matching result
     */

  }, {
    key: 'findMatchGroups',
    value: function findMatchGroups(slot) {
      var horizontal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var checkSubGroups = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var allSlots = [];
      var previousSlots = [];
      var nextSlots = [];
      var result = { exist: false, items: [] };

      var counter = horizontal ? slot.mI : slot.mJ;
      var end = horizontal ? this._m3e.mLevel.fieldMask.totalColumns : this._m3e.mLevel.fieldMask.totalRows;

      while (end > counter++) {
        var curSlot = this._m3e.getSlot(horizontal ? counter : slot.mI, horizontal ? slot.mJ : counter);

        if (!curSlot.slot.mPendingDestroy && curSlot.slot.currentChip != 'no_chip' && curSlot.slot.currentChip.mColor == slot.currentChip.mColor && curSlot.slot.currentChip.canMatch) {
          previousSlots.push(curSlot.slot);
        } else break;
      }

      counter = horizontal ? slot.mI : slot.mJ;
      while (0 < counter--) {

        var _curSlot2 = this._m3e.getSlot(horizontal ? counter : slot.mI, horizontal ? slot.mJ : counter);

        if (!_curSlot2.slot.mPendingDestroy && _curSlot2.slot.currentChip != 'no_chip' && _curSlot2.slot.currentChip.mColor == slot.currentChip.mColor && _curSlot2.slot.currentChip.canMatch) {
          nextSlots.push(_curSlot2.slot);
        } else break;
      }

      if (checkSubGroups) {
        allSlots = allSlots.concat(previousSlots);
        allSlots = allSlots.concat(slot);
        allSlots = allSlots.concat(nextSlots);
      } else {
        allSlots = allSlots.concat(previousSlots);
        allSlots = allSlots.concat(nextSlots);
        return allSlots;
      }

      var itemsLength = allSlots.length;
      if (itemsLength > 1) {
        if (checkSubGroups) {
          var i = 0;
          do {
            var subGroup = this.findMatchGroups(allSlots[i], !horizontal);
            if (subGroup.length !== 0) {
              allSlots = allSlots.concat(subGroup);
            }
          } while (itemsLength - 1 > i++);
        }
        result = this.comparePatterns(this.createMatchPattern(allSlots), slot);
        if (result.exist) {
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = result.items[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var r = _step7.value;

              r.slot.isMatched = true;
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      }
      return { exist: result.exist, result: result.items };
    }

    /**
     * Creating 2d array pattern based for  zero start coordinates
     * for next checking with predefined match patterns
     * @param {Slot[]} slots Matched slots
     * @returns {Slot[][]} Result match pattern
     */

  }, {
    key: 'createMatchPattern',
    value: function createMatchPattern(slots) {
      var result = [];
      var minColumn = Math.min.apply(Math, slots.map(function (x) {
        return x.mI;
      }));
      var maxColumn = Math.max.apply(Math, slots.map(function (x) {
        return x.mI;
      }));
      var minRow = Math.min.apply(Math, slots.map(function (x) {
        return x.mJ;
      }));
      var maxRow = Math.max.apply(Math, slots.map(function (x) {
        return x.mJ;
      }));

      var _loop4 = function _loop4(i) {
        result[i] = [];

        var _loop5 = function _loop5(j) {
          var slot = slots.find(function (x) {
            return x.mI == minColumn + i && x.mJ == minRow + j;
          });
          result[i][j] = slot ? slot : 0;
        };

        for (var j = 0; j <= maxRow - minRow; j++) {
          _loop5(j);
        }
      };

      for (var i = 0; i <= maxColumn - minColumn; i++) {
        _loop4(i);
      }
      return result;
    }

    /**
     * Compare matched patterns for matching
     * @param {Slot[][]}  slotsPattern Founded slots pattern
     * @param {Slot} startSlot Starting matching slot
     * @returns {{exist: boolean, items: [{slot: Slot, simpleDestroy: boolean, targetSlot: Slot, newType: number }]} Matching result if exist
     */

  }, {
    key: 'comparePatterns',
    value: function comparePatterns(slotsPattern, startSlot) {
      if (slotsPattern.length > 0) {
        var matchedItems = [];
        var patternsLength = this._m3e.level.matchPatterns.length;
        var spMaxColumns = slotsPattern.length;
        var spMaxRows = slotsPattern[0].length;
        var p = 0;
        var cOffset = 0;
        var rOffset = 0;

        for (p = 0; p < patternsLength; p++) {
          var mP = this._m3e.level.matchPatterns[p].pattern;
          var mPC = mP.length;
          var mPR = mP[0].length;
          if (mPC <= spMaxColumns && mPR <= spMaxRows) {

            for (cOffset = 0; cOffset <= spMaxColumns - mPC; cOffset++) {
              for (rOffset = 0; rOffset <= spMaxRows - mPR; rOffset++) {
                var matched = true;
                var startSlotMatched = false;
                matchedItems = [];
                for (var i = 0; i < mPC; i++) {
                  for (var j = 0; j < mPR; j++) {
                    var curSP = slotsPattern[i + cOffset][j + rOffset];
                    if (mP[i][j] == 1 && curSP !== 0) {
                      var newType = null;
                      var newColor = null;
                      var patternParams = this._m3e.level.matchPatterns[p].chipType;
                      if (patternParams != null) {
                        patternParams = this._m3e.level.matchPatterns[p].chipType.split(',');
                        if (patternParams.length == 2) {
                          newType = parseInt(patternParams[0]);
                          newColor = parseInt(patternParams[1]);
                        } else newType = patternParams[0];
                      }

                      if (curSP.mI == startSlot.mI && curSP.mJ == startSlot.mJ) startSlotMatched = true;
                      matchedItems.push({
                        slot: curSP,
                        simpleDestroy: this._m3e.level.matchPatterns[p].chipType === null,
                        targetSlot: startSlot,
                        newType: newType,
                        newColor: newColor
                      });
                    } else if (mP[i][j] != curSP) {
                      matched = false;
                    }
                  }
                }
                if (matched && startSlotMatched) {
                  return { exist: true, items: matchedItems };
                }
              }
            }
          }
        }
      }
      return { exist: false, items: [] };
    }

    /**
     * Set all chips pendingMatch value
     * @param {boolean} value
     */

  }, {
    key: 'setAllChipsMatchPending',
    value: function setAllChipsMatchPending(value) {
      this._m3e.forEachSlot(function (slot) {
        slot.pendingMatch = value;
      });
    }

    /**
     * Set all chips PendingDestroy value
     * @param {boolean} value
     */

  }, {
    key: 'resetPendingDestroy',
    value: function resetPendingDestroy() {
      this._m3e.forEachSlot(function (slot) {
        slot.mPendingDestroy = false;
        // slot.mThrowSpecialDestroy = false;
      });
    }

    /**
     * Match all or only lat Action moved chips
     * @param {boolean} checkOnlyPending check only last moved chips
     * {{exist: boolean, result: [{slot: Slot, simpleDestroy: boolean, targetSlot: Slot, newType: number }]}} Matching result
     */

  }, {
    key: 'matchAllChips',
    value: function matchAllChips() {
      var checkOnlyPending = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      return false; //checkOnlyPending = false
      // let findGroups = false;
      // this._m3e.forEachSlot((slot, c, r)=> {
      //   //if (!slot.mPendingDestroy && (!checkOnlyPending || slot.pendingMatch) && slot.currentChip.canMatch) {
      //   if ((!checkOnlyPending || slot.pendingMatch) && slot.currentChip.canMatch) {
      //     let matchGroups = this.matchSlot(c, r);
      //     if (matchGroups.exist) {
      //       findGroups = true;
      //       for (let item of matchGroups.result) {
      //         if (item.slot !== null) {
      //           item.slot.pendingDestroy(item);
      //         }
      //       }
      //     }
      //   }
      // });
      //
      // this.setAllChipsMatchPending(false);
      // return findGroups;
    }
  }, {
    key: 'specialSlotsMatch',
    value: function specialSlotsMatch(slot1, slot2) {
      var matchName = slot1.currentChip.type + '-' + slot2.currentChip.type;
      var matchNameReversed = slot2.currentChip.type + '-' + slot1.currentChip.type;
      var matchNameX = slot1.currentChip.type + '-x';
      var matchNameXReversed = slot2.currentChip.type + '-x';
      var type = matchName;
      var result = this._m3e.specialDestroyBehavior.slotDestroy(matchName, slot1, false);
      if (result) {
        slot1.currentChip.type = 0;
        slot2.currentChip.type = type;
        return result;
      }

      if (!result) {
        result = this._m3e.specialDestroyBehavior.slotDestroy(matchNameReversed, slot1, false);
        type = matchNameReversed;
        if (result) {
          slot1.mThrowSpecialDestroy = true;
          slot1.currentChip.type = 0;
          slot2.currentChip.type = type;
          return result;
        }
      }

      if (!result && slot1.currentChip.type != slot2.currentChip.type) {
        result = this._m3e.specialDestroyBehavior.slotDestroy(matchNameX, slot1, false);
        type = matchNameX;
      }
      if (!result && slot1.currentChip.type != slot2.currentChip.type) {
        result = this._m3e.specialDestroyBehavior.slotDestroy(matchNameXReversed, slot1, false);
        type = matchNameXReversed;
      }
      if (result != false) {
        slot1.mThrowSpecialDestroy = true;
        slot2.currentChip.type = type;
      }
      if (result) {
        slot2.mThrowSpecialDestroy = true;
        slot1.currentChip.type = type;
      }

      slot1.pendingMatch = true;
      slot2.pendingMatch = true;
      return result;
    }
  }, {
    key: 'removeSpecialChips',
    value: function removeSpecialChips(type, slot, slotsToRemove) {
      var _this7 = this;

      slotsToRemove = slotsToRemove || [];
      var counter = 0;
      var chipsForRemove = this._m3e.specialDestroyBehavior.slotDestroy(type.toString(), slot);
      if (!chipsForRemove) {
        slot.destroyChipEffect();
        slot.mPendingDestroy = false;
      } else {
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          var _loop6 = function _loop6() {
            var c = _step8.value;

            if (c.slot.currentChip != 'no_chip') {
              if (c.slot.currentChip.type != 0 && !_this7._m3e.slotsEqual(c.slot, slot) && slotsToRemove.find(function (x) {
                return _this7._m3e.slotsEqual(c.slot, x);
              }) == undefined && !c.slot.mThrowSpecialDestroy) {
                // c.slot.currentChip.mIgnoreDestroyEffect = true;
                // slot.currentChip.mIgnoreDestroyEffect = false;
                _this7.removeSpecialChips(c.slot.currentChip.type, c.slot, slotsToRemove);
              } else {
                slotsToRemove.push({ mI: c.slot.mI, mJ: c.slot.mJ });
                // if(c.slot.currentChip.type != 0)
                //   c.slot.currentChip.mIgnoreDestroyEffect = false;
                //slot.currentChip.mIgnoreDestroyEffect = false;

                c.slot.mThrowSpecialDestroy = false;
                c.slot.mSimpleDestroy = true;
                if (_this7._m3e.level.gameType.mType === 'recipe') {
                  var recipeResult = _this7._m3e.decreaseRecipe(c.slot.currentChip);
                  if (recipeResult !== false) {
                    c.slot.destroyChipEffect(recipeResult, counter);
                    counter++;
                  } else {
                    c.slot.destroyChipEffect();
                  }
                } else c.slot.destroyChipEffect();

                c.slot.mPendingDestroy = true;
                c.slot.currentChip.mStartDestroy = true;
                c.slot.pendingMatch = true;
              }
            }
          };

          for (var _iterator8 = chipsForRemove[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            _loop6();
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
              _iterator8.return();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      }

      slot.currentChip.mIgnoreDestroyEffect = false;
    }
  }, {
    key: 'getPossibleMoves',
    value: function getPossibleMoves(startRow) {
      var endRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      var tC = this._m3e.level.fieldMask.totalColumns;
      var tR = this._m3e.level.fieldMask.totalRows;

      startRow = startRow || 0;
      endRow = endRow == -1 ? tR : endRow;

      var result = [];
      result.refreshedColors = false;

      for (var i = 0; i < tC - 1; i++) {
        for (var j = startRow; j <= endRow; j++) {

          var slot = this._m3e.getSlot(i, j);
          if (slot.exist && slot.slot.currentChip != 'no_chip' && slot.slot.currentChip.canMatch) {

            var matchResult = this.matchSlot(i, j);

            if (matchResult.exist) {
              result.push({
                slot1: this._m3e.mSlots[i][j],
                slot2: this._m3e.mSlots[i][j],
                result: matchResult.result
              });
              break;
            }
          }
        }
      }

      if (this._m3e.level.canRefreshColours && result.length == 0 && startRow == 0 && endRow == tR) {
        this.refreshColors();
        result = this.getPossibleMoves();
        result.refreshedColors = true;
      }
      return result;
    }
  }, {
    key: 'refreshColors',
    value: function refreshColors() {
      var _this8 = this;

      this._m3e.forEachSlot(function (slot, c, r) {
        var chip = slot.currentChip;
        if (chip != 'no_chip' && chip.color != -1) {
          chip.color = _utils2.default.random(0, _this8._m3e.level.mGameSettings.maxColors);
        }
      });
      // this._m3e.dontMatchSorting();
      this._m3e.forEachSlot(function (slot, c, r) {
        var chip = slot.currentChip;
        if (chip != 'no_chip' && chip.color != -1) {
          chip.view.refreshColor();
        }
      });
      return true;
    }
  }]);

  return TAPM3Matcher;
}();

},{"m3e/action":4,"m3e/chip":5,"m3e/input":6,"m3e/level":7,"m3e/utils":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint -W041 */
var Slot = function () {
  function Slot(type, moveFunc) {
    _classCallCheck(this, Slot);

    this.mType = type;
    this.mIsSwapable = true;
    this.mI = 0;
    this.mJ = 0;
    this.mIsBoot = false;
    this.mView = null;
    this.mCurrentChip = Slot.NO_CHIP;
    this.mBootChipsQueue = [];
    this.mPendingDestroy = false;

    this.mSimpleDestroy = false;
    this.mTargetPosition = [];
    this.mNewType = null;
    this.mNewColor = null;
    this.mThrowSpecialDestroy = false;
    this.mSkipPostMove = false;
    this.mPendingMatch = false;
    //additional params
    this.mColorType = 0;
    this.mSwapChip = false;
    this.mSwapBack = false;
    this.mMoveFunctions = moveFunc;
  }

  _createClass(Slot, [{
    key: 'addToBootQueue',
    value: function addToBootQueue(chip) {
      this.mBootChipsQueue.push(chip);
      chip.x = this.mI;
      chip.y = this.mJ - this.mBootChipsQueue.length;
      // add bootQueue movement steps for bootSlot
      for (var i = 0; i < this.mBootChipsQueue.length; i++) {
        chip.mMoveSteps.push({ x: this.mI, y: this.mJ - (this.mBootChipsQueue.length - 1 - i) + 0 });
      }
    }
  }, {
    key: 'resetBootQueue',
    value: function resetBootQueue() {
      this.mBootChipsQueue = [];
    }
  }, {
    key: 'updateData',
    value: function updateData() {
      this.mColorType = (this.mI + this.mJ) % 2;
    }
  }, {
    key: 'onSlotUpdate',
    value: function onSlotUpdate(dt) {
      var updateStatus = { isDone: true, postMoveStart: false };
      if (this.currentChip != Slot.NO_CHIP) {
        if (!this.mSwapChip) updateStatus = this.updateChipMove(dt);else updateStatus = this.updateChipSwap(dt);
      }
      return updateStatus;
    }
  }, {
    key: 'updateChipMove',
    value: function updateChipMove(dt) {
      var isDone = true;
      var postMoveStart = false;
      if (this.currentChip.mMoveSteps.length !== 0) {
        var curStep = this.currentChip.mMoveSteps[0];
        if (this.currentChip.mMoveSteps.length != 1) {
          this.chipTransform(this.mMoveFunctions.move, this.mMoveFunctions.move, this.mMoveFunctions.scaleX, this.mMoveFunctions.scaleY, this.currentChip.mMoveTime, dt, curStep.x, curStep.y);
          if (this.currentChip.mMoveTime >= 1) {
            this.currentChip.mMoveTime = 0;
            this.currentChip.saveTempPosition();
            this.currentChip.mMoveSteps.shift();
          }
        } else {
          this.chipTransform(this.mMoveFunctions.moveXEnd, this.mMoveFunctions.moveYEnd, this.mMoveFunctions.scaleEndX, this.mMoveFunctions.scaleEndY, this.currentChip.mMoveTime, dt, curStep.x, curStep.y);
          if (this.currentChip.mMoveTime >= 1) {
            this.chipTransform(this.mMoveFunctions.moveXEnd, this.mMoveFunctions.moveYEnd, this.mMoveFunctions.scaleEndX, this.mMoveFunctions.scaleEndY, 1, dt, curStep.x, curStep.y);
            this.currentChip.mMoveTime = 0;
            this.currentChip.mIsMoved = true;
            this.currentChip.saveTempPosition();
            this.currentChip.mMoveSteps.shift();
          }
        }
        isDone = false;
      } else if (this.currentChip.mIsMoved && (this.mMoveFunctions.postMoveX != null || this.mMoveFunctions.postMoveY != null || this.mMoveFunctions.postScaleX != null || this.mMoveFunctions.postScaleY != null)) {
        if (this.mSkipPostMove == false) {
          postMoveStart = true;

          this.chipTransform(this.mMoveFunctions.postMoveX, this.mMoveFunctions.postMoveY, this.mMoveFunctions.postScaleX, this.mMoveFunctions.postScaleY, this.currentChip.mMoveTime, dt, false, false, this.mMoveFunctions.postRotate);
          if (this.currentChip.mMoveTime >= 1) {
            this.chipTransform(this.mMoveFunctions.postMoveX, this.mMoveFunctions.postMoveY, this.mMoveFunctions.postScaleX, this.mMoveFunctions.postScaleY, 1, dt, false, false, this.mMoveFunctions.postRotate);
            this.currentChip.mMoveTime = 0;
            this.currentChip.mIsMoved = false;
            this.currentChip.saveTempPosition();
            this.mSkipPostMove = false;
          }
          // else
          // {
          //   this.chipTransform(this.mMoveFunctions.postMoveX, this.mMoveFunctions.postMoveY, this.mMoveFunctions.postScaleX, this.mMoveFunctions.postScaleY, 1, dt);
          //   this.currentChip.mMoveTime = 0;
          //   this.currentChip.mIsMoved = false;
          //   this.currentChip.saveTempPosition();
          //   this.mSkipPostMove = false;
          // }
          isDone = false;
        }
      }
      this.currentChip.position = { i: this.mI, j: this.mJ };
      return { isDone: isDone, postMoveStart: postMoveStart };
    }
  }, {
    key: 'updateChipSwap',
    value: function updateChipSwap(dt) {
      var isDone = true;
      if (this.currentChip.mMoveSteps.length !== 0) {
        var curStep = this.currentChip.mMoveSteps[0];
        if (this.mSwapBack) {
          if (this.currentChip.mMoveSteps.length != 1) {
            this.chipTransform(this.mMoveFunctions.swapBackInX, this.mMoveFunctions.swapBackInY, this.mMoveFunctions.swapBackInScaleX, this.mMoveFunctions.swapBackInScaleY, this.currentChip.mMoveTime, dt, curStep.x, curStep.y);
            if (this.currentChip.mMoveTime >= 1) {
              this.chipTransform(this.mMoveFunctions.swapBackInX, this.mMoveFunctions.swapBackInY, this.mMoveFunctions.swapBackInScaleX, this.mMoveFunctions.swapBackInScaleY, 1, dt, curStep.x, curStep.y);
              this.currentChip.mMoveTime = 0;
              this.currentChip.saveTempPosition();
              this.currentChip.mMoveSteps.shift();
            }
          } else {
            this.chipTransform(this.mMoveFunctions.swapBackOutX, this.mMoveFunctions.swapBackOutY, this.mMoveFunctions.swapBackOutScaleX, this.mMoveFunctions.swapBackOutScaleY, this.currentChip.mMoveTime, dt, curStep.x, curStep.y);
            if (this.currentChip.mMoveTime >= 1) {
              this.chipTransform(this.mMoveFunctions.swapBackOutX, this.mMoveFunctions.swapBackOutY, this.mMoveFunctions.swapBackOutScaleX, this.mMoveFunctions.swapBackOutScaleY, 1, dt, curStep.x, curStep.y);
              this.currentChip.mMoveTime = 0;
              this.currentChip.mIsMoved = false;
              this.currentChip.saveTempPosition();
              this.currentChip.mMoveSteps.shift();
            }
          }
          isDone = false;
        } else {
          this.chipTransform(this.mMoveFunctions.swapX, this.mMoveFunctions.swapY, this.mMoveFunctions.swapScaleX, this.mMoveFunctions.swapScaleY, this.currentChip.mMoveTime, dt, curStep.x, curStep.y);
          if (this.currentChip.mMoveTime >= 1) {
            this.chipTransform(this.mMoveFunctions.swapX, this.mMoveFunctions.swapY, this.mMoveFunctions.swapScaleX, this.mMoveFunctions.swapScaleY, 1, dt, curStep.x, curStep.y);
            this.currentChip.mMoveTime = 0;
            this.currentChip.mIsMoved = false;
            this.currentChip.saveTempPosition();
            this.currentChip.mMoveSteps.shift();
          }
          isDone = false;
        }
      }
      if (isDone) {
        this.mSwapChip = false;
        this.mSwapBack = false;
      }
      return { isDone: isDone, postMoveStart: false };
    }
  }, {
    key: 'chipTransform',
    value: function chipTransform(moveX, moveY, scaleX, scaleY, time, dt) {
      var targetX = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var targetY = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var rotate = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;

      if (targetY !== false && targetY > this.currentChip.bootOffset - 0.5) this.currentChip.view.setVisible(true);

      var moveResultX = moveX(this.currentChip.mTempPos.x, targetX ? targetX : 0, time);
      var moveResultY = moveY(this.currentChip.mTempPos.y, targetY ? targetY : 0, time);
      this.currentChip.mMoveTime += dt * moveResultX.speed;
      this.currentChip.x = moveResultX.result;
      this.currentChip.y = moveResultY.result;

      var scaleResultX = scaleX(this.currentChip.view._sprite.scale.x, this.currentChip.mMoveTime);
      var scaleResultY = scaleY(this.currentChip.view._sprite.scale.y, this.currentChip.mMoveTime);
      this.currentChip.view._sprite.scale.x = scaleResultX.result;
      this.currentChip.view._sprite.scale.y = scaleResultY.result;

      if (rotate == null) return;
      var rotateResult = rotate(this.currentChip.view._sprite.angle, this.currentChip.mMoveTime);
      this.currentChip.view._sprite.angle = rotateResult.result;
    }
  }, {
    key: 'assignChip',
    value: function assignChip(chip) {
      this.currentChip = '';
      this.currentChip = chip;
    }
  }, {
    key: 'removeChip',
    value: function removeChip() {
      this.currentChip = Slot.NO_CHIP;
    }
  }, {
    key: 'pendingDestroy',
    value: function pendingDestroy(params) {

      this.mSimpleDestroy = params.simpleDestroy;
      var targetX = params.targetSlot.mI;
      var targetY = params.targetSlot.mJ;
      this.mTargetPosition = false;
      if (targetX == this.mI && targetY == this.mJ) {
        this.mNewType = params.newType;
        this.mNewColor = params.newColor;
      } else {
        var newTargetPosX = [];
        var newTargetPosY = [];

        newTargetPosX.push(this.mI + Math.sign(targetX - this.mI));
        newTargetPosY.push(this.mJ + Math.sign(targetY - this.mJ));
        var isDone = false;
        while (!isDone) {
          var doneX = false;
          var doneY = false;
          var newX = newTargetPosX[newTargetPosX.length - 1];
          var newY = newTargetPosY[newTargetPosY.length - 1];
          if (newX != targetX) newX = newX + Math.sign(targetX - newX);else doneX = true;
          if (newY != targetY) newY = newY + Math.sign(targetY - newY);else doneY = true;
          if (doneX && doneY) {
            isDone = true;
          } else {
            newTargetPosX.push(newX);
            newTargetPosY.push(newY);
          }
        }
        this.mTargetPosition = { x: newTargetPosX, y: newTargetPosY };
      }
      this.mPendingDestroy = true;
    }
  }, {
    key: 'destroyChipEffect',
    value: function destroyChipEffect() {
      var targetRecipe = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.currentChip != Slot.NO_CHIP) {
        this.mPendingDestroy = true;

        if (this.mSimpleDestroy) this.currentChip.destroy(targetRecipe, delay);else {
          if (this.mTargetPosition != false) this.currentChip.specialDestroy(this.mTargetPosition);else {
            this.currentChip.setType(this.mNewType, this.mNewColor);
          }
        }
      }
    }

    // setType(value) {
    //   this.mType = value;
    //   this.currentChip.mView.setNewType(value);
    //
    // }

  }, {
    key: 'currentChip',
    get: function get() {
      return this.mCurrentChip;
    },
    set: function set(value) {
      this.mCurrentChip = value;
    }
  }, {
    key: 'type',
    get: function get() {
      return this.mType;
    },
    set: function set(value) {
      this.mType = value;
    }
  }, {
    key: 'pendingMatch',
    get: function get() {
      return this.mPendingMatch;
    },
    set: function set(value) {
      this.mPendingMatch = value;
    }
  }, {
    key: 'view',
    get: function get() {
      return this.mView;
    },
    set: function set(view) {
      this.mView = view;
    }
  }]);

  return Slot;
}();

var EmptySlot = function (_Slot) {
  _inherits(EmptySlot, _Slot);

  function EmptySlot() {
    _classCallCheck(this, EmptySlot);

    var _this = _possibleConstructorReturn(this, (EmptySlot.__proto__ || Object.getPrototypeOf(EmptySlot)).call(this, 0));

    _this.mIsSwapable = false;
    return _this;
  }

  return EmptySlot;
}(Slot);

var CustomSlot = function (_Slot2) {
  _inherits(CustomSlot, _Slot2);

  function CustomSlot(moveFunctions, typeNumber) {
    _classCallCheck(this, CustomSlot);

    var _this2 = _possibleConstructorReturn(this, (CustomSlot.__proto__ || Object.getPrototypeOf(CustomSlot)).call(this, typeNumber, moveFunctions));

    if (typeNumber <= 2 && typeNumber >= 0) console.warn('please use another number for slot type cuase 0-2 are reserved');
    return _this2;
  }

  return CustomSlot;
}(Slot);

var RegularSlot = function (_Slot3) {
  _inherits(RegularSlot, _Slot3);

  function RegularSlot(moveFunctions) {
    _classCallCheck(this, RegularSlot);

    return _possibleConstructorReturn(this, (RegularSlot.__proto__ || Object.getPrototypeOf(RegularSlot)).call(this, 1, moveFunctions));
  }

  return RegularSlot;
}(Slot);

var ObstacleSlot = function (_Slot4) {
  _inherits(ObstacleSlot, _Slot4);

  function ObstacleSlot(moveFunctions) {
    _classCallCheck(this, ObstacleSlot);

    var _this4 = _possibleConstructorReturn(this, (ObstacleSlot.__proto__ || Object.getPrototypeOf(ObstacleSlot)).call(this, 2));

    _this4.mIsSwapable = false;
    return _this4;
  }

  return ObstacleSlot;
}(Slot);

var Border = function () {
  function Border(type, slot) {
    _classCallCheck(this, Border);

    this.mType = type;
    this.mView = null;
    this.parentSlot = slot;
  }

  _createClass(Border, [{
    key: 'view',
    get: function get() {
      return this.mView;
    },
    set: function set(view) {
      this.mView = view;
    }
  }]);

  return Border;
}();

exports.EmptySlot = EmptySlot;
exports.CustomSlot = CustomSlot;
exports.RegularSlot = RegularSlot;
exports.ObstacleSlot = ObstacleSlot;
exports.Border = Border;


Slot.NO_CHIP = "no_chip";
Slot.CHIP_MOVE_SPEED = 0.1;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'random',
    value: function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: 'shuffleArray',
    value: function shuffleArray(array) {
      var currentIndex = array.length,
          temporaryValue = void 0,
          randomIndex = void 0;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  }, {
    key: 'randomExcept',
    value: function randomExcept(min, max, except) {
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;
      return rand == except ? Utils.randomExcept(min, max, except) : rand;
    }
  }, {
    key: 'interpolation',
    value: function interpolation(easingFunc, curVal, newVal, time, speed) {
      var t = Math.min(1, time);
      var result = curVal + easingFunc(t) * (newVal - curVal);
      return { result: result, speed: speed };
    }
  }, {
    key: 'arrayInterpolation',
    value: function arrayInterpolation(easingFunc, curVal, newVal, time, speed) {
      var newValLength = newVal.length;
      var newValIndex = Math.min(newValLength - 1, Math.floor(newVal.length * time));
      curVal = newValIndex === 0 ? curVal : newVal[newValIndex - 1];
      var value = newVal[newValIndex];
      var newTime = time * newValLength - newValIndex;

      var result = curVal + easingFunc(newTime) * (value - curVal);
      return { result: result, speed: speed };
    }
  }]);

  return Utils;
}();

exports.default = Utils;


Utils.sideOffsets = [[1, 0, 'right'], [1, -1, 'top-right'], [0, -1, 'top'], [-1, -1, 'top-left'], [-1, 0, 'left'], [-1, 1, 'bottom-left'], [0, 1, 'bottom'], [1, 1, 'bottom-right']];

},{}],11:[function(require,module,exports){
'use strict';

var _layoutUtils = require('display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _preloaderState = require('./states/preloader-state');

var _preloaderState2 = _interopRequireDefault(_preloaderState);

var _gameState = require('./states/game-state');

var _gameState2 = _interopRequireDefault(_gameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('es5-shim');
require('es6-shim');

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, '100%', '100%', Phaser.CANVAS, _layoutUtils2.default.CONTAINER_NAME, null));

    _this.state.add('PreloaderState', _preloaderState2.default, false);
    _this.state.add('GameState', _gameState2.default, false);
    _this.state.start('PreloaderState');
    return _this;
  }

  return Game;
}(Phaser.Game);

new Game();

},{"./states/game-state":19,"./states/preloader-state":20,"display/layout-utils":2,"es5-shim":21,"es6-shim":22}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layoutUtils = require('display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _globals = require('kernel/globals');

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameCTA = function () {
  function GameCTA(game, view) {
    _classCallCheck(this, GameCTA);

    this._game = game;
    this._view = view;
    this._view.x = _layoutUtils2.default.LEFT_OFFSET;
    this._view.y = _layoutUtils2.default.TOP_OFFSET;
    this.testStyle = {
      font: "45px fresca",
      fill: '#ffffff',
      boundsAlignH: "center",
      boundsAlignV: "middle",
      align: "center",
      stroke: "#000000",
      strokeThickness: 8
    };
  }

  _createClass(GameCTA, [{
    key: 'show',
    value: function show() {
      var _this = this;

      this._game.time.events.add(1000, function () {
        wrapper_mark_cta();

        var canRetry = _globals2.default.REPLAYS_NUMBER > 0;
        var background_overlay = _this._game.add.graphics(0, 0);
        background_overlay.beginFill(0x000000, 1);
        background_overlay.drawRect(0, 0, _layoutUtils2.default.FULL_GAME_WIDTH, _layoutUtils2.default.FULL_GAME_HEIGHT);
        background_overlay.alpha = 0;
        background_overlay.endFill();
        background_overlay.inputEnabled = true;
        _this._view.add(background_overlay);
        var backTwn = _this._game.add.tween(background_overlay).to({
          alpha: 0.8
        }, 500, Phaser.Easing.Sinusoidal.InOut);
        backTwn.start();

        _this._game.time.events.add(500, function () {
          var gCTA = _this._game.add.group();
          background_overlay.events.onInputDown.add(function () {
            wrapper_click_go();
          });

          var img = imageLoader.sprite(0, 0, 'cta.png');
          img.anchor.set(0.5);

          var logo = imageLoader.sprite(0, -250, 'logo.png');
          logo.anchor.set(0.5);

          var continueBtn = imageLoader.sprite(canRetry ? 125 : 0, 230, 'green_button.png');
          continueBtn.anchor.set(0.5);
          var btnText = _this._game.add.text(0, 0, 'Play Now!', _this.testStyle);
          btnText.anchor.set(0.5);
          var retryBtn = null;
          var retryText = null;
          if (canRetry) {
            retryBtn = imageLoader.sprite(-125, 230, 'blue_button.png');
            retryBtn.anchor.set(0.5);
            retryBtn.inputEnabled = true;
            retryBtn.events.onInputDown.add(function () {
              _globals2.default.REPLAYS_NUMBER--;
              _this._game.state.start(_this._game.state.current);
            });

            retryText = _this._game.add.text(0, 0, 'Retry', _this.testStyle);
            retryText.anchor.set(0.5);
          }

          gCTA.add(img);
          img.addChild(logo);
          if (canRetry) img.addChild(retryBtn);
          img.addChild(continueBtn);

          _this._view.add(gCTA);

          continueBtn.addChild(btnText);
          if (canRetry) retryBtn.addChild(retryText);

          var heightScaleFactor = (_layoutUtils2.default.FULL_GAME_HEIGHT - _layoutUtils2.default.getHeaderHeight()) * 0.9 / gCTA.height;
          var widthScaleFactor = _layoutUtils2.default.FULL_GAME_WIDTH / gCTA.width * 0.9;
          gCTA.scale.set(Math.min(heightScaleFactor, widthScaleFactor));

          gCTA.x = _layoutUtils2.default.FULL_GAME_WIDTH * 0.5;
          gCTA.y = _layoutUtils2.default.FULL_GAME_HEIGHT * 0.5 + _layoutUtils2.default.getHeaderHeight();

          img.scale.set(0);
          logo.scale.set(0);
          continueBtn.scale.set(0);
          if (canRetry) retryBtn.scale.set(0);

          _this._game.add.tween(img.scale).to({
            x: 1,
            y: 1
          }, 800, Phaser.Easing.Elastic.Out, true, 0, 0, false);
          _this._game.add.tween(logo.scale).to({
            x: 1,
            y: 1
          }, 800, Phaser.Easing.Elastic.Out, true, 200, 0, false).onComplete.add(function () {
            _this._game.add.tween(logo.scale).to({
              x: [1.1, 1],
              y: [1.1, 1]
            }, 1500, Phaser.Easing.Linear.None, true, 0, -1, false);
          });

          _this._game.add.tween(logo).to({
            angle: [-3, 0, 3, 0, -1, 0, 1, 0]

          }, 1500, Phaser.Easing.Linear.None, true, 0, -1, false);

          _this._game.add.tween(continueBtn.scale).to({
            x: 1,
            y: 1
          }, 800, Phaser.Easing.Elastic.Out, true, 300, 0, false).onComplete.add(function () {
            _this._game.add.tween(continueBtn.scale).to({
              x: [0.95, 1, 1.05, 1],
              y: [1.05, 1, 0.95, 1]
            }, 1500, Phaser.Easing.Linear.None, true, 0, -1, false);
          });

          if (canRetry) {
            _this._game.add.tween(retryBtn.scale).to({
              x: 1,
              y: 1
            }, 800, Phaser.Easing.Elastic.Out, true, 300, 0, false).onComplete.add(function () {
              _this._game.add.tween(retryBtn.scale).to({
                x: [0.95, 1, 1.05, 1],
                y: [1.05, 1, 0.95, 1]
              }, 1500, Phaser.Easing.Linear.None, true, 0, -1, false);
            });
          }
        });
      });
    }
  }]);

  return GameCTA;
}();

exports.default = GameCTA;

},{"display/layout-utils":2,"kernel/globals":3}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint -W041 */


var _action = require('m3e/action');

var _action2 = _interopRequireDefault(_action);

var _utils = require('m3e/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameCustomActions = function () {
  function GameCustomActions(m3e, addSettings) {
    _classCallCheck(this, GameCustomActions);

    this.m3e = m3e;
    this.collectedPaws = 0;
    //  let self = this;
    this.m3e.addAction('tutorial', TutorialAction, addSettings);
    // this.m3e.addAction('foxMove', FoxMove, function () {
    //  return self.getCollectedPaws();
    //});
    //this.m3e.addAction('pawsShake', PawsShake);
  }

  _createClass(GameCustomActions, [{
    key: 'addCollectedPaws',
    value: function addCollectedPaws() {
      this.collectedPaws++;
    }
  }, {
    key: 'getCollectedPaws',
    value: function getCollectedPaws() {
      var paws = this.collectedPaws;
      this.resetCollectedPaws();
      return paws;
    }
  }, {
    key: 'resetCollectedPaws',
    value: function resetCollectedPaws() {
      this.collectedPaws = 0;
    }
  }]);

  return GameCustomActions;
}();

exports.default = GameCustomActions;

var TutorialAction = function (_Action) {
  _inherits(TutorialAction, _Action);

  function TutorialAction(m3e, addSettings) {
    _classCallCheck(this, TutorialAction);

    var _this = _possibleConstructorReturn(this, (TutorialAction.__proto__ || Object.getPrototypeOf(TutorialAction)).call(this, 'tutorial', m3e));

    _this._addSettings = addSettings;
    _this.mPendingExit = false;

    _this._firstSlot = 'empty';
    _this._secondSlot = 'empty';
    _this._canSwap = false;
    _this._stepNumber = 0;
    _this._tutorialView = m3e.level.tutorialView;
    _this.findMove = {};
    _this._canInput = false;

    _this.timer = 0;
    _this.step1MaxTime = _this._addSettings.max1Time;
    _this.step2MaxTime = _this._addSettings.max2Time;
    if (_this.step1MaxTime === 0) _this.startStep2();else _this.startStep1();

    return _this;
  }

  _createClass(TutorialAction, [{
    key: 'startStep1',
    value: function startStep1() {
      var _this2 = this;

      this._stepNumber = 1;
      //
      // let slotViews = [];
      // this.m3e.forEachSlot((slot)=> {
      //   if (slot.currentChip != 'no_ship' && slot.currentChip.type == 6) {
      //     slot.currentChip.view.shake();
      //     slotViews.push(slot.currentChip.view);
      //   }
      // });
      this._tutorialView.highlight();

      this._tutorialView.drawHelpPanelRecipes(function () {
        _this2._canInput = true;
      });
    }
  }, {
    key: 'startStep2',
    value: function startStep2() {
      var _this3 = this;

      this._stepNumber = 2;
      var endRow = 2;
      var possibleMoves = this.m3e.defaultMatcher.getPossibleMoves(0, endRow);

      if (possibleMoves.length === 0) {
        possibleMoves = this.m3e.defaultMatcher.getPossibleMoves();
        if (possibleMoves == false) return;
        this.findMove = possibleMoves[0];
      } else {
        this.findMove = possibleMoves[_utils2.default.random(0, possibleMoves.length - 1)];
      }
      var targetSprite1 = this.findMove.slot1.currentChip.view;
      var targetSprite2 = this.findMove.slot2.currentChip.view;
      var slotViews = [this.findMove.slot1.currentChip.view, this.findMove.slot2.currentChip.view];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.findMove.result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var result = _step.value;

          slotViews.push(result.slot.currentChip.view);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._tutorialView.highlightField(slotViews);
      this._tutorialView.moveElements(targetSprite1, targetSprite2, this.m3e.level.gameSettings.inputType == 'tap' ? this.findMove.result : null);
      this._tutorialView.drawHelpPanel(targetSprite1, ['Tips', 'Match 3 of the same gems\n to collect them!'], true, function () {
        _this3._canInput = true;
      });
    }
  }, {
    key: 'destroyStep1',
    value: function destroyStep1() {
      this._canInput = false;
      this._tutorialView.destroyHighlight();
      this._tutorialView.removeHelperPanel();
    }
  }, {
    key: 'destroyStep2',
    value: function destroyStep2() {
      if (this.step2MaxTime === 0) return;
      this._tutorialView.removeFieldHelper();
      this._tutorialView.removeHelperPanel(true);
    }
  }, {
    key: 'getSlots',
    value: function getSlots() {
      var slotX = this.m3e.mInput.x;
      var slotY = this.m3e.mInput.y;
      var pickedSlot = this.m3e.getSlot(slotX, slotY);
      if (this._firstSlot == 'empty') {

        if (pickedSlot.exist && pickedSlot.slot.currentChip != 'no_chip') this._firstSlot = pickedSlot.slot;
      } else {
        if (this._firstSlot.mI != slotX || this._firstSlot.mJ != slotY) {
          var deltaX = Math.sign(this._firstSlot.mI - slotX);
          var deltaY = Math.sign(this._firstSlot.mJ - slotY);
          if (Math.abs(deltaX) + Math.abs(deltaY) == 1) {
            slotX = this._firstSlot.mI - deltaX;
            slotY = this._firstSlot.mJ - deltaY;
            pickedSlot = this.m3e.getSlot(slotX, slotY);
            if (pickedSlot.exist && pickedSlot.slot.currentChip != 'no_chip') this._secondSlot = pickedSlot.slot;
          }
        }
      }
    }
  }, {
    key: 'tapSlots',
    value: function tapSlots() {
      this.m3e.level.cbHideHelpMoves();
      this.m3e.resetPendingDestroy();
      this.m3e.setAllChipsMatchPending(false);
      var firstChipMatchedGroup = this.m3e.matchSlot(this._firstSlot.mI, this._firstSlot.mJ);
      if (firstChipMatchedGroup.exist) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = firstChipMatchedGroup.result[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            if (item.slot !== null) item.slot.pendingDestroy(item);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.m3e.decreaseMoves();
        return true;
      } else {
        this._firstSlot.currentChip.view.shake(500);
        return false;
      }
    }
  }, {
    key: 'swapSlots',
    value: function swapSlots() {
      this.m3e.resetPendingDestroy();
      this.m3e.setAllChipsMatchPending(false);
      this._firstSlot.currentChip.mMoveSteps.push({ x: this._secondSlot.mI, y: this._secondSlot.mJ });
      this._secondSlot.currentChip.mMoveSteps.push({ x: this._firstSlot.mI, y: this._firstSlot.mJ });

      this._firstSlot.mSwapChip = true;
      this._secondSlot.mSwapChip = true;

      var tmpChip = this._secondSlot.currentChip;
      this._secondSlot.currentChip = this._firstSlot.currentChip;
      this._firstSlot.currentChip = tmpChip;

      if (this._firstSlot.currentChip.type > 0 && this._secondSlot.currentChip.type > 0 || this._firstSlot.currentChip.color == -1 || this._secondSlot.currentChip.color == -1) {
        this.m3e.specialSlotsMatch(this._firstSlot, this._secondSlot);
        this.m3e.decreaseMoves();
      } else {
        var firstChipMatchedGroup = this.m3e.matchSlot(this._firstSlot.mI, this._firstSlot.mJ);
        if (firstChipMatchedGroup.exist) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = firstChipMatchedGroup.result[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var item = _step3.value;

              if (item.slot !== null) item.slot.pendingDestroy(item);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }

        var secondChipMatchedGroup = this.m3e.matchSlot(this._secondSlot.mI, this._secondSlot.mJ);
        if (secondChipMatchedGroup.exist) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = secondChipMatchedGroup.result[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _item = _step4.value;

              if (_item.slot !== null) _item.slot.pendingDestroy(_item);
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
        if (firstChipMatchedGroup.exist || secondChipMatchedGroup.exist) this.m3e.decreaseMoves();
      }
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {
      this.timer += dt;
      switch (this._stepNumber) {
        case 0:
          break;
        case 1:
          if (this.timer >= this.step1MaxTime) {
            this.destroyStep1();
            if (this.step2MaxTime !== 0) {
              this._stepNumber = 2;
              this.startStep2();
            } else {
              this.nextActionName = 'userAction';
              this.mPendingExit = true;
            }
            this.timer = 0;
            return;
          }
          break;
        case 2:
          if (this.timer >= this.step2MaxTime) {
            this.destroyStep2();
            this.nextActionName = 'userAction';
            this.mPendingExit = true;
            return;
          }
          break;
      }

      var isDone = false;
      if (!this._canInput) return;
      if (this.m3e.mInput.onDown) {
        if (this._stepNumber == 2) this.getSlots();else {
          if (this._stepNumber == 1) {
            this.destroyStep1();
            if (this.step2MaxTime !== 0 && this._stepNumber == 1) this.startStep2();else {
              this.nextActionName = 'userAction';
              this.mPendingExit = true;
            }
          }
          this.timer = 0;
          return;
        }
      } else if (!this._canSwap && !isDone && this._stepNumber == 2) {

        if (this.m3e.level.gameSettings.inputType == 'swipe') {
          if (this._firstSlot != 'empty' && this._secondSlot != 'empty') {
            if (this.m3e.slotsEqual(this.findMove.slot1, this._firstSlot) && this.m3e.slotsEqual(this.findMove.slot2, this._secondSlot) || this.m3e.slotsEqual(this.findMove.slot2, this._firstSlot) && this.m3e.slotsEqual(this.findMove.slot1, this._secondSlot)) {
              this.destroyStep2();
              this.swapSlots();
              this._canSwap = true;
            }
          }
        } else if (this.m3e.level.gameSettings.inputType == 'tap') {
          if (this._firstSlot != 'empty') {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {

              for (var _iterator5 = this.findMove.result[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var s = _step5.value;

                if (this.m3e.slotsEqual(this._firstSlot, s.slot) || this.m3e.slotsEqual(this.findMove.slot1, this._firstSlot) || this.m3e.slotsEqual(this.findMove.slot2, this._firstSlot)) {
                  isDone = this.tapSlots();
                  this.destroyStep2();
                  break;
                }
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }
          }
        }
        this._firstSlot = 'empty';
        this._secondSlot = 'empty';
      }

      if (this._stepNumber != 2) return;
      if (this._canSwap) {
        isDone = true;
        this.m3e.forEachSlot(function (slot) {
          var state = slot.onSlotUpdate(dt);
          if (isDone) {
            isDone = state.isDone;
          }
        });
      }
      if (isDone) {
        this._canSwap = false;
        this.nextActionName = 'removeChips';
        this.mPendingExit = true;
      }
    }
  }]);

  return TutorialAction;
}(_action2.default);
/*
class FoxMove extends Action {
  constructor(m3e, getCollectedPaws) {
    super('foxMove', m3e);
    this._chipMoveDone = false;
    this._foxMoveDone = false;
    this._foxSlot = null;
    this._targetSlot = null;
    this._makeChanges = false;
    this.getEndState = false;
    // this.getCollectedPaws = getCollectedPaws;
    this._totalMoves = getCollectedPaws();
    this.moveFox(this._totalMoves);

  }

  moveFox() {
    this._chipMoveDone = false;
    this._foxMoveDone = false;
    let moves = this._totalMoves--;

    if (moves == 0) {

      if (this._makeChanges) {
        this.nextActionName = 'moveChips';
        this.mPendingExit = true;
      }
      else {
        this.nextActionName = 'userAction';
        this.mPendingExit = true;
      }
      return;
    }

    this._makeChanges = true;

    this._foxSlot = null;
    this._targetSlot = null;

    this.m3e.forEachSlot((slot)=> {
      let curChip = slot.currentChip;
      if (!this._foxSlot && curChip != 'no_chip' && curChip.type == 7)
        this._foxSlot = slot;
    });
    let slotFind = false;

    this.m3e.getAllNeighbours(this._foxSlot,
        (borderType, c, r, newC, newR) => {
          if (!slotFind && (borderType == 'right' || borderType == 'top' || borderType == 'bottom' )) {
            let slot = this.m3e.getSlot(newC, newR);

            if (slot.exist && slot.slot.type >= 3) {
              slotFind = true;
              this._targetSlot = slot.slot;
            }
          }
        });
    if (this._targetSlot.currentChip.type == 8) {
      this.getEndState = true;
    }

    let currentFoxMoves = this.m3e.level.gameType.getProp('currentFoxMoves');
    currentFoxMoves++;
    this.m3e.level.gameType.setProp('currentFoxMoves', currentFoxMoves);
    this.m3e.level.view._uiView.showStars(currentFoxMoves, this.m3e.level.gameType.getProp('maxFoxMoves'));

    [this._targetSlot.mCurrentChip, this._foxSlot.mCurrentChip] = [this._foxSlot.mCurrentChip, this._targetSlot.mCurrentChip];

    this._foxSlot.currentChip.view.moveToSlot(this._targetSlot.currentChip, ()=> {
      this._foxMoveDone = true;
      if (this._foxSlot.currentChip.type == 8) {

        this._foxSlot.currentChip.view.maximize();
        this.m3e.level.cbShowCTA({win: true, lose: false});
        this.m3e.removeAllActions();
        this.m3e.pauseAllActions();

        this.getEndState = true;
      }
    });
    this._targetSlot.currentChip.view.moveFoxTo(this._foxSlot.currentChip, ()=> {
      this._chipMoveDone = true;
    });
  }


  onUpdate(dt) {
    if (this._chipMoveDone && this._foxMoveDone && !this.mPendingExit) {
      //this._targetSlot.currentChip.view.updatePos(this._targetSlot.currentChip);
      // this._foxSlot.currentChip.view.updatePos(this._foxSlot.currentChip);
      this._targetSlot.currentChip.saveTempPosition();
      this._foxSlot.currentChip.saveTempPosition();
      [this._targetSlot, this._foxSlot] = [this._foxSlot, this._targetSlot];

      this._targetSlot.mPendingMatch = true;
      this._foxSlot.mPendingMatch = true;

      //
      // [this._foxSlot.currentChip.color, this._targetSlot.currentChip.color] = [this._targetSlot.currentChip.color, this._foxSlot.currentChip.color];
      // [this._foxSlot.currentChip.type, this._targetSlot.currentChip.type] = [this._targetSlot.currentChip.type, this._foxSlot.currentChip.type];


      // let tmpChip = this._targetSlot.currentChip;
      // this._targetSlot.currentChip = this._foxSlot.currentChip;
      // this._foxSlot.currentChip = tmpChip;

      if (!this.getEndState)

        this.moveFox();

    }
  }
}

class PawsShake extends Action {
  constructor(m3e) {
    super('pawsShake', m3e);
    this.m3e.forEachSlot((slot)=> {
      let curChip = slot.currentChip;
      if (curChip != 'no_chip' && curChip.type == 6)
        curChip.view.shake();
      this.mPendingExit = true;
    });

  }

  onUpdate(dt) {
  }

}
*/

},{"m3e/action":4,"m3e/utils":10}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameCustomDestroy = function () {
  function GameCustomDestroy(m3e, gameView, customActions, simpleMove) {
    _classCallCheck(this, GameCustomDestroy);

    this._m3e = m3e;
    this._gameView = gameView;
    if (!simpleMove) {
      this._m3e.specialDestroyBehavior.line = this.lineDestroy;
      this._m3e.specialDestroyBehavior.crossLine = this.crossLineDestroy;
      this._m3e.specialDestroyBehavior.bomb = this.bombDestroy;
      this._m3e.specialDestroyBehavior.moveSlotsEffect = this.moveSlotsEffect;
    }
    this.addNewPattern('6', [{ func: this.pawDestroy, args: [] }], [{
      func: this.pawEffect,
      args: [customActions, this._gameView]
    }]);
  }

  _createClass(GameCustomDestroy, [{
    key: 'addNewPattern',
    value: function addNewPattern(type, functions, effects) {
      this._m3e.specialDestroyBehavior.addPattern(type, functions, effects);
    }
  }, {
    key: 'pawDestroy',
    value: function pawDestroy(chip) {
      chip.currentChip.mIgnoreDestroyEffect = true;
      return [this._m3e.getSlot(chip.mI, chip.mJ)];
    }
  }, {
    key: 'pawEffect',
    value: function pawEffect(customActions, gameVeiw, slot) {
      var _this = this;

      customActions.addCollectedPaws();
      var targetChip = null;
      this._m3e.forEachSlot(function (slot) {
        var curChip = slot.currentChip;
        if (!_this._foxSlot && curChip != 'no_chip' && curChip.type == 7) targetChip = slot.currentChip;
      });

      gameVeiw.effects.pawDestroy(slot, targetChip);
    }
  }, {
    key: 'lineDestroy',
    value: function lineDestroy(isVertical, size, slot) {
      var chipsToRemove = [];
      var curI = slot.mI;
      var curJ = slot.mJ;
      for (var i = -Math.floor(size / 2); i < Math.round(size / 2); i++) {
        var curSlot = this._m3e.getSlot(isVertical ? curI + i : curI, isVertical ? curJ : curJ + i);
        if (curSlot.exist) {
          var _i = 0;
          if (!isVertical) {
            for (_i = 0; _i <= this._m3e.mLevel.fieldMask.totalColumns; _i++) {
              var findChip = this._m3e.getSlot(_i, curSlot.slot.mJ);
              if (findChip.exist && findChip.slot.currentChip.canMatch) chipsToRemove.push(findChip);
              this.moveSlotsEffect(findChip, false, false, true, true);
            }
          } else {
            for (_i = 0; _i <= this._m3e.mLevel.fieldMask.totalRows; _i++) {
              var _findChip = this._m3e.getSlot(curSlot.slot.mI, _i);
              if (_findChip.exist && _findChip.slot.currentChip.canMatch) chipsToRemove.push(_findChip);
              this.moveSlotsEffect(_findChip, true, true, false, false);
            }
          }
        }
      }
      return chipsToRemove;
    }
  }, {
    key: 'crossLineDestroy',
    value: function crossLineDestroy(size, slot) {
      var chipsToRemove = [];

      var curI = slot.mI;
      var curJ = slot.mJ;

      for (var i = -Math.floor(size / 2); i < Math.round(size / 2); i++) {
        var curSlot = this._m3e.getSlot(curI + i, curJ);
        if (curSlot.exist) {
          var c = curSlot.slot.mI;
          var r = curSlot.slot.mJ;
          var sum = c + r;

          for (var _i2 = 0; _i2 <= this._m3e.mLevel.fieldMask.totalColumns; _i2++) {
            for (var j = 0; j <= this._m3e.mLevel.fieldMask.totalRows; j++) {
              if (_i2 + j == sum || Math.abs(c - _i2) == Math.abs(r - j)) {
                var findChip = this._m3e.getSlot(_i2, j);
                if (findChip.exist && findChip.slot.currentChip.canMatch) {
                  chipsToRemove.push(findChip);
                  this.moveSlotsEffect(findChip, true, true, false, false);
                }
              }
            }
          }
        }
      }
      return chipsToRemove;
    }
  }, {
    key: 'moveSlotsEffect',
    value: function moveSlotsEffect(curSlot, left, right, top, bottom) {
      if (left) {
        var slotLeft = this._m3e.getSlot(curSlot.slot.mI - 1, curSlot.slot.mJ);
        if (slotLeft.exist && slotLeft.slot.currentChip != 'no_chip' && slotLeft.slot.currentChip.mMoveSteps.length === 0) {
          slotLeft.slot.currentChip.mMoveSteps.push({ x: slotLeft.slot.mI - 0.5, y: slotLeft.slot.mJ, skipPostMove: true });
          slotLeft.slot.currentChip.mMoveSteps.push({ x: slotLeft.slot.mI, y: slotLeft.slot.mJ, skipPostMove: true });
          slotLeft.slot.mSkipPostMove = true;
        }
      }

      if (right) {
        var slotRight = this._m3e.getSlot(curSlot.slot.mI + 1, curSlot.slot.mJ);
        if (slotRight.exist && slotRight.slot.currentChip != 'no_chip' && slotRight.slot.currentChip.mMoveSteps.length === 0) {
          slotRight.slot.currentChip.mMoveSteps.push({
            x: slotRight.slot.mI + 0.5,
            y: slotRight.slot.mJ,
            skipPostMove: true
          });
          slotRight.slot.currentChip.mMoveSteps.push({ x: slotRight.slot.mI, y: slotRight.slot.mJ, skipPostMove: true });
          slotRight.slot.mSkipPostMove = true;
        }
      }

      if (top) {
        var slotTop = this._m3e.getSlot(curSlot.slot.mI, curSlot.slot.mJ - 1);
        if (slotTop.exist && slotTop.slot.currentChip != 'no_chip' && slotTop.slot.currentChip.mMoveSteps.length === 0) {
          slotTop.slot.currentChip.mMoveSteps.push({ x: slotTop.slot.mI, y: slotTop.slot.mJ - 0.5, skipPostMove: true });
          slotTop.slot.currentChip.mMoveSteps.push({ x: slotTop.slot.mI, y: slotTop.slot.mJ, skipPostMove: true });
          slotTop.slot.mSkipPostMove = true;
        }
      }

      if (bottom) {
        var slotBottom = this._m3e.getSlot(curSlot.slot.mI, curSlot.slot.mJ + 1);
        if (slotBottom.exist && slotBottom.slot.currentChip != 'no_chip' && slotBottom.slot.currentChip.mMoveSteps.length === 0) {
          slotBottom.slot.currentChip.mMoveSteps.push({
            x: slotBottom.slot.mI,
            y: slotBottom.slot.mJ + 0.5,
            skipPostMove: true
          });
          slotBottom.slot.currentChip.mMoveSteps.push({ x: slotBottom.slot.mI, y: slotBottom.slot.mJ, skipPostMove: true });
          slotBottom.slot.mSkipPostMove = true;
        }
      }
    }
  }, {
    key: 'bombDestroy',
    value: function bombDestroy(size, chip) {
      var chipsToRemove = [];

      for (var i = -Math.floor(size * 0.5); i < Math.round(size * 0.5); i++) {
        for (var j = -Math.floor(size * 0.5); j < Math.round(size * 0.5); j++) {
          var findChip = this._m3e.getSlot(i + chip.mI, j + chip.mJ);
          if (findChip.exist && findChip.slot.currentChip.canMatch) {
            chipsToRemove.push(findChip);

            this.moveSlotsEffect(findChip, true, true, true, true);
          }
        }
      }
      return chipsToRemove;
    }
  }]);

  return GameCustomDestroy;
}();

exports.default = GameCustomDestroy;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layoutUtils = require('display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _m3e = require('m3e/m3e');

var _m3e2 = _interopRequireDefault(_m3e);

var _utils = require('m3e/utils');

var _utils2 = _interopRequireDefault(_utils);

var _gameView = require('objects/game-view');

var _gameView2 = _interopRequireDefault(_gameView);

var _gameCustomActions = require('objects/game-custom-actions');

var _gameCustomActions2 = _interopRequireDefault(_gameCustomActions);

var _gameCustomDestroy = require('objects/game-custom-destroy');

var _gameCustomDestroy2 = _interopRequireDefault(_gameCustomDestroy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameInit = function () {
  function GameInit(game, view, startSettings) {
    _classCallCheck(this, GameInit);

    this._game = game;
    this._view = view;
    this._startSettings = startSettings;
    this._gameView = new _gameView2.default(this._game, this._view);
    this._ctaTimer = new Date().getTime();
    this.startM3();
  }

  _createClass(GameInit, [{
    key: 'startM3',
    value: function startM3() {
      var _this = this;

      this._e = new _m3e2.default(this);

      this._e.init(this._startSettings);

      var viewSettings = this._gameView.viewSettings;
      viewSettings.useEmitters = this._startSettings.useEmitters;
      viewSettings.simpleChipMoves = this._startSettings.simpleChipMoves;
      viewSettings.useEffects = this._startSettings.useEffects;

      this.initInputEvents(this._gameView);

      this._e.level.mView = this._gameView;

      this._e.level.cbShowCTA = function (state) {
        _this._gameView._ctaView.show(state);
      };
      this._e.level.cbGetChipView = function (chip) {
        return new _this._gameView.chip(_this._game, _this._gameView.gChips, _this._gameView.gEffects, chip, viewSettings, _this._gameView);
      };

      this._e.level.cbGetSlotView = function (slot) {
        return new _this._gameView.slot(_this._game, _this._gameView.gSlots, slot, viewSettings);
      };

      this._e.level.cbGetBorderView = function (border) {
        return new _this._gameView.border(_this._game, _this._gameView.gSlots, border, viewSettings);
      };

      this._e.level.cbFitSlotsView = function () {
        _this._gameView.fitSlotsView();
      };

      this._e.level.cbFitChipsView = function () {
        _this._gameView.fitChipsView();
      };

      this._e.level.cbShowHelpMove = function (possibleMoves, time) {
        _this._gameView.showHelpMove(possibleMoves, time);
      };

      this._e.level.cbHideHelpMoves = function () {
        _this._gameView.hideHelpMoves();
      };

      // Adding custom actions

      var customActions = new _gameCustomActions2.default(this._e, {
        max1Time: this._startSettings.tutorialStep1Time,
        max2Time: this._startSettings.tutorialStep2Time
      });

      if (this._startSettings.showTutorial) {
        // init custom actions (tutorial)
        this._e.level.tutorialView = this._gameView._tutorialView;
        //use custom action after predefined boot action
        this._e.cb_boot_update = function (action) {
          if (action.mPendingExit) {
            action.nextActionName = 'tutorial';
          }
        };
      }

      // add custom special chips destroy patterns
      new _gameCustomDestroy2.default(this._e, this._gameView, customActions, this._startSettings.simpleChipMoves);

      // override chip move effects
      if (this._startSettings.simpleChipMoves === false) {
        var postEffectTime = 1.7;
        this._e.level.cbChipsPostMoveXFunction = function (curVal, newVal, time) {
          return _utils2.default.interpolation(Phaser.Easing.Linear.None, curVal, curVal, time, postEffectTime);
        };

        this._e.level.cbChipsPostMoveYFunction = function (curVal, newVal, time) {
          return _utils2.default.interpolation(Phaser.Easing.Linear.None, curVal, curVal, time, postEffectTime);
        };

        this._e.level.cbChipsPostScaleXFunction = function (curVal, time) {
          return _utils2.default.interpolation(Phaser.Easing.Linear.None, curVal, curVal, time, postEffectTime);
        };

        this._e.level.cbChipsPostScaleYFunction = function (curVal, time) {
          return _utils2.default.interpolation(Phaser.Easing.Linear.None, curVal, curVal, time, postEffectTime);
        };

        this._e.level.cbChipsPostRotateFunction = function (curVal, time) {
          return _utils2.default.arrayInterpolation(Phaser.Easing.Sinusoidal.InOut, curVal, [-7, 7, -5, 5, -3, 3, 0], time, postEffectTime);
        };
      }

      // if pattern array length is 0 generates cube field with maxColumns and maxRows
      // b - is boot slot, st - slot type number (f=0), t - set special type on boot (t=0)


      if (this._startSettings.useSmallField) {
        this._e.level.fieldMask = new this._e.level.fieldGenerator(this._startSettings.inputType == 'swipe' ? LP([['0,b,c=3', '0,b,c=1', '0,b,c=4', '0,b', '0,b', '0,b', '0,b'], ['0,c=1', '0,c=2', '0,c=1', '0,c=2', '0', '0', '0'], ['0,c=3', '0,c=3', '0,c=2', '0,c=4', '0', '0', '0']], [['0,b,c=3', '0,b,c=1', '0,b,c=4', '0,b', '0,b'], ['0,c=1', '0,c=2', '0,c=1', '0,c=2', '0'], ['0,c=3', '0,c=3', '0,c=2', '0,c=4', '0'], ['0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0']]) : LP([['0,b', '0,b', '0,b', '0,b', '0,b', '0,b', '0,b'], ['0,c=1', '0,c=2', '0,c=1', '0,c=2', '0', '0', '0'], ['0,c=3', '0,c=3', '0,c=3', '0,c=4', '0', '0', '0']], [['0,b,c=3', '0,b,c=3', '0,b,c=3', '0,b,c=2', '0,b'], ['0,c=1', '0,c=2', '0,c=1', '0,c=2', '0'], ['0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0']]), LP(7, 5), LP(3, 5));
      } else {
        this._e.level.fieldMask = new this._e.level.fieldGenerator(this._startSettings.inputType == 'swipe' ? LP([['0,b,c=3', '0,b,c=1', '0,b,c=4', '0,b', '0,b', '0,b', '0,b', '0,b', '0,b', '0,b'], ['0,c=1', '0,c=2', '0,c=1', '0,c=2', '0', '0', '0', '0', '0', '0'], ['0,c=3', '0,c=3', '0,c=2', '0,c=4', '0', '0', '0', '0', '0', '0']], [['0,b,c=3', '0,b,c=1', '0,b,c=4', '0,b', '0,b', '0,b', '0,b'], ['0,c=1', '0,c=2', '0,c=1', '0,c=2', '0', '0', '0'], ['0,c=3', '0,c=3', '0,c=2', '0,c=4', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0']]) : LP([['0,b', '0,b', '0,b', '0,b', '0,b', '0,b', '0,b', '0,b', '0,b', '0,b'], ['0,c=1', '0,c=2', '0,c=1', '0,c=2', '0', '0', '0', '0', '0', '0'], ['0,c=3', '0,c=3', '0,c=3', '0,c=4', '0', '0', '0', '0', '0', '0']], [['0,b,c=3', '0,b,c=3', '0,b,c=3', '0,b,с=2', '0,b', '0,b', '0,b'], ['0,c=1', '0,c=2', '0,c=1', '0,c=2', '0', '0', '0'], ['0,c=3', '0,c=3', '0,c=2', '0,c=4', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0']]), LP(10, 7), LP(3, 7));
      }
      // if (this._startSettings.useSmallField)
      //   this._e.level.fieldMask = new this._e.level.fieldGenerator([], LP(10, 5), LP(3, 5));
      // else
      //   this._e.level.fieldMask = new this._e.level.fieldGenerator([], LP(10, 7), LP(3, 7));


      this._e.level.autoMatchOnStart = this._startSettings.inputType != 'tap';
      this._e.level.canRefreshColours = true;

      this._e.level.dontMatchSortingEnable = this._startSettings.inputType != 'tap';

      this._e.specialDestroyBehavior.lineEffect = function (angle, size, slot) {
        _this._gameView.effects.line(angle, size, slot);
      };

      this._e.specialDestroyBehavior.colorBombEffect = function (slot, destroySlots) {
        _this._gameView.effects.colorBombEffect(slot, destroySlots);
      };

      this._e.specialDestroyBehavior.bombEffect = function (size, slot) {
        _this._gameView.effects.bombEffect(size, slot);
      };

      this._e.specialDestroyBehavior.setDefaultPatterns();

      // init UI
      this._gameView.initUI({
        recipesInfo: this._e.level.gameType.recipesInfo
      });

      this._e.level.cbUpdateScoreUI = function (value) {
        _this._gameView._uiView.updateScore(value);
      };

      this._e.level.cbUpdateMovesUI = function (value) {
        _this._gameView._uiView.updateMoves(value);
      };

      this._e.level.cbUpdateRecipesUI = function () {
        _this._gameView._uiView.updateRecipes();
      };

      this._gameView.fitUIView();
      this._gameView._uiView.updateScore(this._e.currentScore);
      this._gameView._uiView.updateMoves(this._e.currentMoves);
    }
  }, {
    key: 'initInputEvents',
    value: function initInputEvents(gameView) {
      var _this2 = this;

      this._game.input.onDown.add(function () {
        _this2._e.mInput.onDown = true;
        _this2._ctaTimer = new Date().getTime();
        wrapper_mark_interaction();
      });

      this._game.input.onUp.add(function () {
        _this2._e.mInput.onDown = false;
      });

      this._game.input.addMoveCallback(function (pointer, x, y) {
        var gridPos = _this2._game.input.getLocalPosition(gameView.gSlots, new Phaser.Point(x, y));
        _this2._e.mInput.x = Math.floor(gridPos.x / gameView.viewSettings.slot.width);
        _this2._e.mInput.y = Math.floor(gridPos.y / gameView.viewSettings.slot.height);
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var dt = this._game.time.elapsed * 0.001;
      this._e.update(dt);
      if (new Date().getTime() > this._ctaTimer + this._startSettings.ctaIdleTime && !this._e.mActionsPause) {
        this._gameView._tutorialView.removeAll();
        this._e.pauseAllActions();
        this._e.removeAllActions();
        this._e.level.cbShowCTA();
      }
    }
  }]);

  return GameInit;
}();

exports.default = GameInit;

},{"display/layout-utils":2,"m3e/m3e":8,"m3e/utils":10,"objects/game-custom-actions":13,"objects/game-custom-destroy":14,"objects/game-view":18}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint -W041 */


var _layoutUtils = require('display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameTutorial = function () {
  function GameTutorial(game, view, slotsView, viewSettings, uiView) {
    _classCallCheck(this, GameTutorial);

    this._game = game;
    this._view = view;
    this._slotsView = slotsView;
    this._viewSettings = viewSettings;
    this._uiView = uiView;

    this._gHighlight = this._game.add.group();
    this._gHelperPanel = this._game.add.group();
    this._helpPanelsTmp = [];

    this._view.add(this._gHighlight);
    this._view.add(this._gHelperPanel);
    this._cachedTweens = [];
  }

  _createClass(GameTutorial, [{
    key: 'highlightCircle',
    value: function highlightCircle(targetSprite) {
      var _this = this;

      var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 160;
      var scaleFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;


      this._game.time.events.add(this._game.time.timeToCall, function () {
        var bmd = _this._game.make.bitmapData(_layoutUtils2.default.FULL_GAME_WIDTH + 50, _layoutUtils2.default.FULL_GAME_HEIGHT + 50);
        var radius1 = radius * scaleFactor;
        var radius2 = 3 * Math.max(_layoutUtils2.default.FULL_GAME_WIDTH, _layoutUtils2.default.FULL_GAME_HEIGHT);
        var x = targetSprite.worldPosition.x;
        var y = targetSprite.worldPosition.y;
        var newPos = _this._game.input.getLocalPosition(_this._view, new Phaser.Point(x, y));
        var xOffset = -5 * scaleFactor;
        var yOffset = LP(40, 60) * scaleFactor;
        x = newPos.x - _layoutUtils2.default.LEFT_OFFSET + xOffset;

        y = newPos.y - _layoutUtils2.default.TOP_OFFSET - targetSprite.height * 0.5 * scaleFactor + yOffset;

        var innerCircle = new Phaser.Circle(x, y, radius1);
        var outerCircle = new Phaser.Circle(x, y, radius2);

        var grd = bmd.context.createRadialGradient(innerCircle.x, innerCircle.y, innerCircle.radius, outerCircle.x, outerCircle.y, outerCircle.radius);
        grd.addColorStop(0, 'rgba(0,0,0,0)');
        grd.addColorStop((radius1 - 1) / radius2, 'rgba(0,0,0,0)');
        grd.addColorStop(radius1 / radius2, 'rgba(0,0,0,0.7)');
        grd.addColorStop(radius1 * 5 / radius2, 'rgba(0,0,0,0.85)');
        grd.addColorStop(1, 'rgba(0,0,0,1)');
        bmd.circle(outerCircle.x, outerCircle.y, outerCircle.radius, grd);
        _this._circle = _this._game.add.sprite(_layoutUtils2.default.LEFT_OFFSET, _layoutUtils2.default.TOP_OFFSET, bmd);
        _this._gHighlight.add(_this._circle);
        _this._circle.alpha = 0;
        _this._game.add.tween(_this._circle).to({
          alpha: 1
        }, 1000, Phaser.Easing.Sinusoidal.Out, true).start();
      });
    }
  }, {
    key: 'highlightField',
    value: function highlightField(findResult) {
      var _this2 = this;

      this._game.time.events.add(this._game.time.timeToCall, function () {

        var height = _layoutUtils2.default.FULL_GAME_HEIGHT + (10 - _layoutUtils2.default.FULL_GAME_HEIGHT % 10);
        var width = _layoutUtils2.default.FULL_GAME_WIDTH + (10 - _layoutUtils2.default.FULL_GAME_WIDTH % 10);

        var bmd = _this2._game.make.bitmapData(width, height);
        var ctx = bmd.ctx;
        ctx.fillStyle = 'rgba(1,1,1,0.8)';
        ctx.fillRect(0, 0, width, height);

        var imgData = ctx.getImageData(0, 0, width, height);

        var slotViews = findResult;

        var gSlots = _this2._slotsView;
        var dx = gSlots.x - _layoutUtils2.default.LEFT_OFFSET;
        var dy = gSlots.y - _layoutUtils2.default.TOP_OFFSET;
        var sc = gSlots.scale.x;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = slotViews[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var slotView = _step.value;

            var x = (slotView.x - _this2._viewSettings.slot.width * 0.5) * sc + dx;
            var y = (slotView.y - _this2._viewSettings.slot.height * 0.5) * sc + dy;

            for (var i = 0; i < _this2._viewSettings.slot.width * sc; i++) {
              for (var j = 0; j < _this2._viewSettings.slot.height * sc; j++) {
                var alphaIndex = (~~(y + i) * width + ~~(x + j) << 2) + 3;
                imgData.data[alphaIndex] = 0;
              }
            }
            bmd.context.putImageData(imgData, 0, 0);
            bmd.update();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        _this2._maskSprite = _this2._game.make.sprite(_layoutUtils2.default.LEFT_OFFSET, _layoutUtils2.default.TOP_OFFSET, bmd);
        _this2._maskSprite.alpha = 0;
        _this2._gHighlight.add(_this2._maskSprite);

        // hack for fixing iOs bitmap bug
        _this2._game.time.events.add(500, function () {
          bmd.update();
          _this2._game.add.tween(_this2._maskSprite).to({
            alpha: 1
          }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false);
        });
      });
    }
  }, {
    key: 'highlight',
    value: function highlight() {
      var bmd = this._game.make.bitmapData(_layoutUtils2.default.FULL_GAME_WIDTH, _layoutUtils2.default.FULL_GAME_HEIGHT);
      var ctx = bmd.ctx;
      ctx.fillStyle = 'rgba(1,1,1,1)';
      ctx.fillRect(0, 0, _layoutUtils2.default.FULL_GAME_WIDTH, _layoutUtils2.default.FULL_GAME_HEIGHT);
      this._highlight = this._game.add.sprite(_layoutUtils2.default.LEFT_OFFSET, _layoutUtils2.default.TOP_OFFSET, bmd);
      this._gHelperPanel.add(this._highlight);
      this._highlight.alpha = 0;
      this._game.add.tween(this._highlight).to({
        alpha: 0.8
      }, 1000, Phaser.Easing.Sinusoidal.Out, true, 200, 0, false);
    }
  }, {
    key: 'destroyHighlight',
    value: function destroyHighlight() {
      var _this3 = this;

      this._game.add.tween(this._highlight).to({
        alpha: 0
      }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false).onComplete.add(function () {
        _this3._highlight.destroy();
      });
    }
  }, {
    key: 'moveElements',
    value: function moveElements(sprite1, sprite2) {
      var _this4 = this;

      var sprites = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this._game.time.events.add(this._game.time.timeToCall, function () {

        var temPos1 = { x: sprite1.x, y: sprite1.y };
        var temPos2 = { x: sprite2.x, y: sprite2.y };
        var arrowWidth = 150;

        _this4._arrow = imageLoader.sprite(0, 0, 'hand.png');
        _this4._arrow.anchor.setTo(0, 0.3);
        _this4._arrow.scale.set(0);

        var x1 = sprite1.worldPosition.x;
        var y1 = sprite1.worldPosition.y;
        var x2 = sprite2.worldPosition.x;
        var y2 = sprite2.worldPosition.y;

        var sprt1InViewPos = _this4._game.input.getLocalPosition(_this4._view, new Phaser.Point(x1, y1));
        var sprt2InViewPos = _this4._game.input.getLocalPosition(_this4._view, new Phaser.Point(x2, y2));

        if (temPos1.x != temPos2.x) {
          sprt1InViewPos.y += sprite1.height * 0.5;
          sprt2InViewPos.y += sprite1.height * 0.5;
          if (sprt1InViewPos.y + arrowWidth > _this4._view.height) {
            _this4._arrow.angle = 180;
            sprt1InViewPos.y -= sprite1.height;
            sprt2InViewPos.y -= sprite1.height;
          }
        } else {
          _this4._arrow.angle = 90;
          sprt1InViewPos.x -= sprite1.width * 0.5;
          sprt2InViewPos.x -= sprite1.width * 0.5;
          if (sprt1InViewPos.x - arrowWidth < arrowWidth) {
            _this4._arrow.angle = -90;
            sprt1InViewPos.x += sprite1.width;
            sprt2InViewPos.x += sprite1.width;
          }
          _this4._arrow.y = sprt1InViewPos.y;
        }
        _this4._arrow.x = sprt1InViewPos.x;
        _this4._arrow.y = sprt1InViewPos.y;
        _this4._gHighlight.add(_this4._arrow);

        if (sprites == null) {
          var twn1 = _this4._game.add.tween(sprite1).to({
            x: [temPos2.x, temPos1.x],
            y: [temPos2.y, temPos1.y]
          }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, -1, false);

          var twn2 = _this4._game.add.tween(_this4._arrow).to({
            x: [sprt2InViewPos.x, sprt1InViewPos.x],
            y: [sprt2InViewPos.y, sprt1InViewPos.y]
          }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, -1, false);

          var twn3 = _this4._game.add.tween(_this4._arrow.scale).to({
            x: 1,
            y: 1
          }, 1500, Phaser.Easing.Elastic.Out, true, 500, 0, false);

          var twn4 = _this4._game.add.tween(sprite2).to({
            x: [temPos1.x, temPos2.x],
            y: [temPos1.y, temPos2.y]
          }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, -1, false);

          _this4._cachedTweens.push(twn1);
          _this4._cachedTweens.push(twn2);
          _this4._cachedTweens.push(twn3);
          _this4._cachedTweens.push(twn4);
        } else {
          var view = sprites[1].slot.currentChip.view;
          var x = view.worldPosition.x + 30;
          var y = view.worldPosition.y;
          var targetPos = _this4._game.input.getLocalPosition(_this4._view, new Phaser.Point(x, y));

          _this4._arrow.x = targetPos.x;
          _this4._arrow.y = targetPos.y;
          _this4._arrow.scale.set(1);
          // let twn = this._game.add.tween(this._arrow).to({
          //   x: spritesX,
          //   y: spritesY,
          // }, 5000, Phaser.Easing.Linear.None, true, 0, -1, false);

          var twn = _this4._game.add.tween(_this4._arrow.scale).to({
            x: [0.8, 1],
            y: [0.8, 1]
          }, 1500, Phaser.Easing.Linear.None, true, 0, -1, false);

          // let twn2 = this._game.add.tween(this._arrow.scale).to({
          //   x: 1,
          //   y: 1
          // }, 1500, Phaser.Easing.Elastic.Out, true, 500, 0, false);
          _this4._cachedTweens.push(twn);
          // this._cachedTweens.push(twn2);

        }
      });
    }
  }, {
    key: 'drawHelpPanelRecipes',
    value: function drawHelpPanelRecipes(cb) {
      var _this5 = this;

      this._game.time.events.add(this._game.time.timeToCall + 200, function () {

        var gHelpPanel = _this5._game.add.group();
        gHelpPanel.y -= _layoutUtils2.default.FULL_GAME_HEIGHT * LP(0.4, 0.3);
        var backPanel = imageLoader.sprite(_layoutUtils2.default.FULL_GAME_WIDTH * 0.5, _layoutUtils2.default.FULL_GAME_HEIGHT, 'tutorial_back.png');

        backPanel.anchor.set(0.5);
        backPanel.y -= backPanel.height * 0.48 - _layoutUtils2.default.TOP_OFFSET;

        gHelpPanel.add(backPanel);

        var button = imageLoader.sprite(_layoutUtils2.default.FULL_GAME_WIDTH * 0.5, _layoutUtils2.default.FULL_GAME_HEIGHT, 'button.png');
        button.y += button.height;
        button.anchor.set(0.5);

        var textStype0 = {
          font: "50px fresca",
          fill: '#ffffff',
          boundsAlignH: "center",
          boundsAlignV: "middle",
          align: "center",
          stroke: "#000000",
          strokeThickness: 8
        };

        var continueTxt = _this5._game.add.text(0, 0, 'Continue', textStype0);
        continueTxt.anchor.set(0.5);
        button.addChild(continueTxt);

        var finger = imageLoader.sprite(button.width * 0.5 - 40, button.height * 0.5 - 40, 'hand.png');
        button.addChild(finger);

        _this5._game.add.tween(finger.scale).to({
          x: [1, 0.8, 1],
          y: [1, 0.8, 1]
        }, 1500, Phaser.Easing.Linear.None, true, 0, -1, false);

        gHelpPanel.add(button);

        gHelpPanel.x = -_layoutUtils2.default.FULL_GAME_WIDTH * 2;
        _this5._game.add.tween(gHelpPanel).to({
          x: _layoutUtils2.default.LEFT_OFFSET
        }, 400, Phaser.Easing.Sinusoidal.InOut).delay(600).start();

        var textStype1 = {
          font: "35px fresca",
          fill: '#000000',
          boundsAlignH: "center",
          boundsAlignV: "middle",
          align: "center"
        };

        var infoTxt = _this5._game.add.text(105, -55, 'Hey! These fellas need\ndrinks. Make matches to fill\norders!', textStype1);
        infoTxt.addFontWeight('bold', 0);

        backPanel.addChild(infoTxt);

        infoTxt.anchor.set(0.5);
        _this5._gHelperPanel.add(gHelpPanel);

        _this5._helpPanelsTmp.push(gHelpPanel);
        if (cb) {
          _this5._game.time.events.add(1000, cb);
        }
      });
    }
  }, {
    key: 'drawHelpPanel',
    value: function drawHelpPanel(targetSprite, text, leftOriented, cb) {
      var _this6 = this;

      leftOriented = true;
      this._game.time.events.add(this._game.time.timeToCall + 200, function () {
        var gHelpPanel = _this6._game.add.group();
        var backPanel = imageLoader.sprite(_layoutUtils2.default.FULL_GAME_WIDTH * 0.5, _layoutUtils2.default.FULL_GAME_HEIGHT * LP(0.55, 1), 'tutorial_back.png');

        backPanel.anchor.set(0.5);
        backPanel.y -= backPanel.height * 0.48 - _layoutUtils2.default.TOP_OFFSET + 6;

        gHelpPanel.add(backPanel);

        gHelpPanel.x = -_layoutUtils2.default.FULL_GAME_WIDTH * 2;
        _this6._game.add.tween(gHelpPanel).to({
          x: _layoutUtils2.default.LEFT_OFFSET
        }, 400, Phaser.Easing.Sinusoidal.InOut).delay(600).start();

        var textStype1 = {
          font: "35px fresca",
          fill: '#000000',
          boundsAlignH: "center",
          boundsAlignV: "middle",
          align: "center"
        };

        var infoTxt = _this6._game.add.text(105, -55, 'Make this match!', textStype1);
        infoTxt.addFontWeight('bold', 0);

        backPanel.addChild(infoTxt);

        infoTxt.anchor.set(0.5);
        _this6._gHelperPanel.add(gHelpPanel);

        _this6._helpPanelsTmp.push(gHelpPanel);
        if (cb) {
          _this6._game.time.events.add(1000, cb);
        }
      });
    }
  }, {
    key: 'removeFieldHelper',
    value: function removeFieldHelper() {
      var _this7 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var skipSpritesCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


      if (!skipSpritesCheck && (!this._maskSprite || !this._arrow)) return;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._cachedTweens[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var t = _step2.value;

          t.stop();
          t.target.x = t.timeline[0].vStartCache.x;
          t.target.y = t.timeline[0].vStartCache.y;
          this._game.tweens.remove(t);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (force) {
        this._maskSprite.destroy();

        return;
      }

      this._game.add.tween(this._maskSprite).to({
        alpha: 0
      }, 300, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false).onComplete.add(function () {
        _this7._maskSprite.destroy();
      });

      this._game.add.tween(this._arrow.scale).to({
        x: 0,
        y: 0
      }, 500, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false).onComplete.add(function () {
        _this7._maskSprite.destroy();
      });
    }
  }, {
    key: 'removeCircleHighlight',
    value: function removeCircleHighlight() {
      var _this8 = this;

      if (!this._circle) return;
      this._game.add.tween(this._circle).to({
        alpha: 0
      }, 300, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false).onComplete.add(function () {
        _this8._circle.destroy();
      });
    }
  }, {
    key: 'removeHelperPanel',
    value: function removeHelperPanel() {
      var destroy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


      if (this._helpPanelsTmp.length != 0) {
        var panel = this._helpPanelsTmp.pop();
        this._game.add.tween(panel).to({
          x: _layoutUtils2.default.RIGHT_OFFSET
        }, 400, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false).onComplete.add(function () {
          //if (destroy)
          panel.destroy();
        });
      } else return;
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.removeFieldHelper();
      this.removeCircleHighlight();
      this.removeHelperPanel();
    }
  }]);

  return GameTutorial;
}();

exports.default = GameTutorial;

},{"display/layout-utils":2}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint -W041 */
/*jshint -W083 */

var _layoutUtils = require('display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _globals = require('kernel/globals');

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameUI = function () {
  function GameUI(game, view, params) {
    var _this = this;

    _classCallCheck(this, GameUI);

    this._game = game;
    this._view = view;
    this._recipesInfo = params.recipesInfo;
    this._gUI = this._game.add.group();
    this._view.add(this._gUI);
    this._scoreTmp = 0;
    this.totalRecipesCount = 0;
    this.currentRecipesCount = 0;

    this.recipesTextStyle = {
      font: "30px Fresca",
      fill: '#000000',
      boundsAlignH: "center",
      boundsAlignV: "middle",
      align: "center"
    };

    this.movesTextStyle = {
      font: "30px Fresca",
      fill: '#ffffff',
      boundsAlignH: "center",
      boundsAlignV: "middle",
      align: "center"
    };

    this.movesCountTextStyle = {
      font: "70px Fresca",
      fill: '#000000',
      boundsAlignH: "center",
      boundsAlignV: "middle",
      stroke: "#070305",
      strokeThickness: 8,
      align: "center"
    };

    this.recipeItems = [];
    LP(this.initUILandscape, this.initUIPortrait).apply(this);
    this.textRedrawTimes = 0;
    this._game.time.events.add(100, function () {
      _this.redrawAllTextData();
    });
  }

  _createClass(GameUI, [{
    key: 'redrawAllTextData',
    value: function redrawAllTextData() {
      var _this2 = this;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._gUI.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.text != null) {
            item.addFontStyle('normal');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (++this.textRedrawTimes < 3) this._game.time.events.add(1000, function () {
        _this2.redrawAllTextData();
      });
    }
  }, {
    key: 'updateMoves',
    value: function updateMoves(value) {
      if (!this.movesText) return;
      this.movesText.text = value;
    }
  }, {
    key: 'updateScore',
    value: function updateScore(value) {
      //this.scoreFill.angle = 0;
    }
  }, {
    key: 'initUILandscape',
    value: function initUILandscape() {
      var _this3 = this;

      this.uiPanel = imageLoader.sprite(0, 0, 'topBackground');
      // let scaleFactor =  LU.FULL_GAME_WIDTH / this.uiPanel.width;
      this.uiPanel.nativeWidth = this.uiPanel.width;
      this.uiPanel.width = _layoutUtils2.default.FULL_GAME_WIDTH;
      this._gUI.add(this.uiPanel);

      var xPositions = [[this.uiPanel.width * 0.5], [this.uiPanel.width * 0.3, this.uiPanel.width * 0.7], [this.uiPanel.width * 0.5, this.uiPanel.width * 0.2, this.uiPanel.width * 0.8]];

      this.peter = imageLoader.sprite(this.uiPanel.width * 0.5, 300, 'peter_normal.png');
      this._game.add.tween(this.peter).to({
        angle: [-5, 0, 5, 0]
      }, 5000, Phaser.Easing.Linear.None, true, 0, -1, false);

      this.peter.anchor.setTo(0.5, 1);
      this._gUI.add(this.peter);

      if (this._recipesInfo.length > 1) {
        this.stewie = imageLoader.sprite(this.uiPanel.width * 0.2, 280, 'stewie_normal.png');
        this.stewie.anchor.setTo(0.5, 1);
        this._gUI.add(this.stewie);

        this._game.add.tween(this.stewie).to({
          angle: [-4, 0, 4, 0]
        }, 4000, Phaser.Easing.Linear.None, true, 750, -1, false);
      }

      if (this._recipesInfo.length > 3) {
        this.louis = imageLoader.sprite(this.uiPanel.width * 0.8, 300, 'lois_normal.png');
        this.louis.anchor.setTo(0.5, 1);
        this._gUI.add(this.louis);

        this._game.add.tween(this.louis).to({
          angle: [-3, 0, 3, 0]
        }, 3500, Phaser.Easing.Linear.None, true, 500, -1, false);
      }

      this.counter = imageLoader.sprite(0, this.uiPanel.height, 'counter.png');
      this.counter.height *= 0.65;
      this.counter.x = _layoutUtils2.default.FULL_GAME_WIDTH * 0.5 - this.counter.width * 0.5;
      this._gUI.add(this.counter);

      this.stewie.drink = function (glass) {
        _this3.stewie.frameName = 'stewie_drink.png';
        _this3.stewie.addChild(glass);
        _this3._game.tweens.removeFrom(_this3.stewie);
        _this3._game.add.tween(_this3.stewie.scale).to({
          x: [1.1, 1.05, 1.07, 1],
          y: [1.1, 1.05, 1.07, 1]
        }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
          _this3._game.add.tween(_this3.stewie).to({
            angle: 75,
            //  y: this.stewie.y+50,
            alpha: [1, 1, 0]
          }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        });
        glass.angle = 95;
        glass.scale.set(0.5);
        glass.y = -70;
        glass.x = -30;
      };

      this.louis.drink = function (glass) {
        _this3.louis.frameName = 'lois_drink.png';
        _this3.louis.addChild(glass);

        _this3._game.tweens.removeFrom(_this3.louis);
        _this3._game.add.tween(_this3.louis.scale).to({
          x: [1.1, 1.05, 1.07, 1],
          y: [1.1, 1.05, 1.07, 1]
        }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
          _this3._game.add.tween(_this3.louis).to({
            angle: 75,
            //   y: this.stewie.y+50
            alpha: [1, 1, 0]
          }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        });
        glass.angle = 100;
        glass.scale.set(0.7);
        glass.y = -175;
        glass.x = -40;
      };

      this.peter.drink = function (glass) {
        _this3.peter.frameName = 'peter_drink.png';
        _this3.peter.addChild(glass);

        _this3._game.tweens.removeFrom(_this3.peter);
        _this3._game.add.tween(_this3.peter.scale).to({
          x: [1.1, 1.05, 1.07, 1],
          y: [1.1, 1.05, 1.07, 1]
        }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
          _this3._game.add.tween(_this3.peter).to({
            angle: 60,
            alpha: [1, 1, 0]
          }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        });
        glass.angle = 95;
        glass.scale.set(0.8);
        glass.y = -240;
        glass.x = -50;
      };

      var xPos = [this.uiPanel.width * 0.2, this.uiPanel.width * 0.5, this.uiPanel.width * 0.8];
      var topOffset = 270;
      // const leftOffset = 140 +  LU.FULL_GAME_WIDTH*0.5 - counter.width*0.5;
      // const cellW = 220;
      var rCountOffsetX = 27;
      var rCountOffsetY = 5;

      var colours = ['#107fff', '#34a316', '#9a22d5', '#cd0110', '#ac6800', '#f64c01'];
      var heroesToDrink = [this.stewie, this.peter, this.louis];
      for (var i = 0; i < this._recipesInfo.length; i++) {
        var img = imageLoader.sprite(xPos[i], topOffset, 'chip_' + this._recipesInfo[i].color + '_0.png');
        img.anchor.set(0.5);
        img.scale.set(0.9);
        this._gUI.add(img);

        var score_disc = imageLoader.sprite(xPos[i] + rCountOffsetX, topOffset + rCountOffsetY, 'score_disc.png');
        score_disc.x += 15;
        score_disc.y += 15;
        score_disc.anchor.set(0.5);
        this._gUI.add(score_disc);

        var check = imageLoader.sprite(xPos[i] + rCountOffsetX, topOffset + rCountOffsetY, 'check.png');
        check.x += 15;
        check.y += 15;
        check.anchor.set(0.5);
        check.scale.set(0);
        this._gUI.add(check);
        console.log("addted text");
        var count = this._game.add.text(0, 2, this._recipesInfo[i].count, this.recipesTextStyle);
        count.fill = colours[this._recipesInfo[i].color];
        count.anchor.setTo(0.5, 0.5);

        this.totalRecipesCount += this._recipesInfo[i].count;
        score_disc.addChild(count);

        this.recipeItems.push({
          img: img,
          text: count,
          check: check,
          heroes: heroesToDrink[i]
        });
      }
    }
  }, {
    key: 'lateUIDrawLandscape',
    value: function lateUIDrawLandscape() {
      var _this4 = this;

      var uiBackScaleFactor = this.uiPanel.nativeWidth / this.uiPanel.width;
      this.uiPanel.y -= this.uiPanel.height * uiBackScaleFactor;
      this.uiPanel.height *= 1 + uiBackScaleFactor;

      var counterLeft = imageLoader.sprite(-this.counter.width, 0, 'counter.png');

      this.counter.addChild(counterLeft);

      var counterRight = imageLoader.sprite(this.counter.width, 0, 'counter.png');

      this.counter.addChild(counterRight);
      // let scaleFactor =  LU.FULL_GAME_WIDTH / this.uiPanel.width;
      // uiPanel.width = LU.FULL_GAME_WIDTH


      var scoreFillBack = imageLoader.sprite(21, 17, 'score_fill_back.png');
      scoreFillBack.scale.set(1.1);
      this._gUI.add(scoreFillBack);

      this.scoreFill = imageLoader.sprite(37, 27, 'score_fill.png');
      this._gUI.add(this.scoreFill);

      var minusAnlge = 88;
      this.scoreFill.angle = minusAnlge;

      var scoreUI = imageLoader.sprite(0, 0, 'score_ui.png');

      this._gUI.add(scoreUI);

      var starBack_1 = imageLoader.sprite(95, 110, 'ui_star_empty.png');
      starBack_1.anchor.set(0.5);
      this._gUI.add(starBack_1);
      var starBack_2 = imageLoader.sprite(127, 75, 'ui_star_empty.png');
      starBack_2.anchor.set(0.5);
      this._gUI.add(starBack_2);
      var starBack_3 = imageLoader.sprite(138, 30, 'ui_star_empty.png');
      starBack_3.anchor.set(0.5);
      this._gUI.add(starBack_3);

      this._star1 = imageLoader.sprite(starBack_1.x, starBack_1.y, 'ui_star.png');
      this._star1.anchor.set(0.5);
      this._gUI.add(this._star1);
      this._star2 = imageLoader.sprite(starBack_2.x, starBack_2.y, 'ui_star.png');
      this._star2.anchor.set(0.5);
      this._gUI.add(this._star2);
      this._star3 = imageLoader.sprite(starBack_3.x, starBack_3.y, 'ui_star.png');
      this._star3.anchor.set(0.5);
      this._gUI.add(this._star3);

      this._star1.scale.set(0);
      this._star2.scale.set(0);
      this._star3.scale.set(0);

      this._star1.show = function () {
        _this4._game.add.tween(_this4._star1.scale).to({
          x: [2, 1.4],
          y: [2, 1.4]
        }, 1000, Phaser.Easing.Elastic.Out, true, 1, 0, false);
      };
      this._star2.show = function () {
        _this4._game.add.tween(_this4._star2.scale).to({
          x: [2, 1.4],
          y: [2, 1.4]
        }, 1000, Phaser.Easing.Elastic.Out, true, 1, 0, false);
      };
      this._star3.show = function () {
        _this4._game.add.tween(_this4._star3.scale).to({
          x: [2, 1.4],
          y: [2, 1.4]
        }, 1000, Phaser.Easing.Elastic.Out, true, 1, 0, false);
      };

      var m = this._game.add.text(-5, 70, 'moves', this.movesTextStyle);

      this._gUI.add(m);

      m.setTextBounds(0, 0, 125, 30);
      this.movesText = this._game.add.text(-5, 17, '0', this.movesCountTextStyle);
      this.movesText.addFontWeight('bold', 0);

      var grd1 = this.movesText.context.createLinearGradient(0, 0, 0, this.movesText.canvas.height);
      grd1.addColorStop(0, '#fbdb35');
      grd1.addColorStop(1, '#f1f145');
      this.movesText.fill = grd1;

      this.movesText.setTextBounds(0, 0, 125, 50);
      this._gUI.add(this.movesText);
    }
  }, {
    key: 'lateUIDrawPortrait',
    value: function lateUIDrawPortrait() {
      var _this5 = this;

      var scoreFillBack = imageLoader.sprite(21, 17, 'score_fill_back.png');
      scoreFillBack.scale.set(1.1);
      this._gUI.add(scoreFillBack);

      this.scoreFill = imageLoader.sprite(37, 27, 'score_fill.png');
      this._gUI.add(this.scoreFill);

      var minusAnlge = 88;
      this.scoreFill.angle = minusAnlge;

      // this._game.add.tween( this.scoreFill).to({
      // angle:minusAnlge-80
      // }, 5000, Phaser.Easing.Linear.None, true, 0, 0, false);

      var scoreUI = imageLoader.sprite(0, 0, 'score_ui.png');

      this._gUI.add(scoreUI);

      var starBack_1 = imageLoader.sprite(95, 110, 'ui_star_empty.png');
      starBack_1.anchor.set(0.5);
      this._gUI.add(starBack_1);
      var starBack_2 = imageLoader.sprite(127, 75, 'ui_star_empty.png');
      starBack_2.anchor.set(0.5);
      this._gUI.add(starBack_2);
      var starBack_3 = imageLoader.sprite(138, 30, 'ui_star_empty.png');
      starBack_3.anchor.set(0.5);
      this._gUI.add(starBack_3);

      this._star1 = imageLoader.sprite(starBack_1.x, starBack_1.y, 'ui_star.png');
      this._star1.anchor.set(0.5);
      this._gUI.add(this._star1);
      this._star2 = imageLoader.sprite(starBack_2.x, starBack_2.y, 'ui_star.png');
      this._star2.anchor.set(0.5);
      this._gUI.add(this._star2);
      this._star3 = imageLoader.sprite(starBack_3.x, starBack_3.y, 'ui_star.png');
      this._star3.anchor.set(0.5);
      this._gUI.add(this._star3);

      this._star1.scale.set(0);
      this._star2.scale.set(0);
      this._star3.scale.set(0);

      this._star1.show = function () {
        _this5._game.add.tween(_this5._star1.scale).to({
          x: [2, 1.4],
          y: [2, 1.4]
        }, 1000, Phaser.Easing.Elastic.Out, true, 1, 0, false);
      };
      this._star2.show = function () {
        _this5._game.add.tween(_this5._star2.scale).to({
          x: [2, 1.4],
          y: [2, 1.4]
        }, 1000, Phaser.Easing.Elastic.Out, true, 1, 0, false);
      };
      this._star3.show = function () {
        _this5._game.add.tween(_this5._star3.scale).to({
          x: [2, 1.4],
          y: [2, 1.4]
        }, 1000, Phaser.Easing.Elastic.Out, true, 1, 0, false);
      };

      var m = this._game.add.text(-5, 70, 'moves', this.movesTextStyle);

      this._gUI.add(m);

      m.setTextBounds(0, 0, 125, 30);
      this.movesText = this._game.add.text(-5, 17, '25', this.movesCountTextStyle);
      //  this.movesText.addFontWeight('bold', 0);


      var grd1 = this.movesText.context.createLinearGradient(0, 0, 0, this.movesText.canvas.height);
      grd1.addColorStop(0, '#fbdb35');
      grd1.addColorStop(1, '#f1f145');
      this.movesText.fill = grd1;

      this.movesText.setTextBounds(0, 0, 125, 50);
      this._gUI.add(this.movesText);
    }
  }, {
    key: 'lateUIDraw',
    value: function lateUIDraw() {
      LP(this.lateUIDrawLandscape, this.lateUIDrawPortrait).apply(this);
    }
  }, {
    key: 'initUIPortrait',
    value: function initUIPortrait() {
      var _this6 = this;

      var uiPanel = imageLoader.sprite(0, 0, 'topBackground');
      this._gUI.add(uiPanel);

      var xPositions = [[uiPanel.width * 0.5], [uiPanel.width * 0.7, uiPanel.width * 0.3], [uiPanel.width * 0.5, uiPanel.width * 0.2, uiPanel.width * 0.8]];

      this.peter = imageLoader.sprite(xPositions[this._recipesInfo.length - 1][0], 300, 'peter_normal.png');
      this._game.add.tween(this.peter).to({
        angle: [-5, 0, 5, 0]
      }, 5000, Phaser.Easing.Linear.None, true, 0, -1, false);

      this.peter.anchor.setTo(0.5, 1);
      this._gUI.add(this.peter);

      if (this._recipesInfo.length > 1) {
        this.stewie = imageLoader.sprite(xPositions[this._recipesInfo.length - 1][1], 280, 'stewie_normal.png');
        this.stewie.anchor.setTo(0.5, 1);
        this._gUI.add(this.stewie);

        this._game.add.tween(this.stewie).to({
          angle: [-4, 0, 4, 0]
        }, 4000, Phaser.Easing.Linear.None, true, 750, -1, false);
      }

      if (this._recipesInfo.length > 2) {
        this.louis = imageLoader.sprite(xPositions[this._recipesInfo.length - 1][2], 300, 'lois_normal.png');
        this.louis.anchor.setTo(0.5, 1);
        this._gUI.add(this.louis);

        this._game.add.tween(this.louis).to({
          angle: [-3, 0, 3, 0]
        }, 3500, Phaser.Easing.Linear.None, true, 500, -1, false);
      }

      var counter = imageLoader.sprite(0, uiPanel.height, 'counter.png');
      this._gUI.add(counter);

      if (this._recipesInfo.length > 1) {
        this.stewie.drink = function (glass) {
          _this6.stewie.frameName = 'stewie_drink.png';
          _this6.stewie.addChild(glass);
          _this6._game.tweens.removeFrom(_this6.stewie);
          _this6._game.add.tween(_this6.stewie.scale).to({
            x: [1.1, 1.05, 1.07, 1],
            y: [1.1, 1.05, 1.07, 1]
          }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
            _this6._game.add.tween(_this6.stewie).to({
              angle: 75,
              //  y: this.stewie.y+50,
              alpha: [1, 1, 0]
            }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
          });
          glass.angle = 95;
          glass.scale.set(0.5);
          glass.y = -70;
          glass.x = -30;
        };
      }

      if (this._recipesInfo.length > 2) {
        this.louis.drink = function (glass) {
          _this6.louis.frameName = 'lois_drink.png';
          _this6.louis.addChild(glass);

          _this6._game.tweens.removeFrom(_this6.louis);
          _this6._game.add.tween(_this6.louis.scale).to({
            x: [1.1, 1.05, 1.07, 1],
            y: [1.1, 1.05, 1.07, 1]
          }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
            _this6._game.add.tween(_this6.louis).to({
              angle: 75,
              //   y: this.stewie.y+50
              alpha: [1, 1, 0]
            }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
          });
          glass.angle = 100;
          glass.scale.set(0.7);
          glass.y = -175;
          glass.x = -40;
        };
      }

      this.peter.drink = function (glass) {
        _this6.peter.frameName = 'peter_drink.png';
        _this6.peter.addChild(glass);

        _this6._game.tweens.removeFrom(_this6.peter);
        _this6._game.add.tween(_this6.peter.scale).to({
          x: [1.1, 1.05, 1.07, 1],
          y: [1.1, 1.05, 1.07, 1]
        }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
          _this6._game.add.tween(_this6.peter).to({
            angle: 60,
            alpha: [1, 1, 0]
          }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        });
        glass.angle = 95;
        glass.scale.set(0.8);
        glass.y = -240;
        glass.x = -50;
      };

      var topOffset = 270;
      var leftOffset = [340, 200, 140][this._recipesInfo.length - 1];
      var cellW = [220, 300, 220][this._recipesInfo.length - 1];
      var rCountOffsetX = 27;
      var rCountOffsetY = 5;

      var colours = ['#107fff', '#34a316', '#9a22d5', '#cd0110', '#ac6800', '#f64c01'];
      var heroesToDrink = [[this.peter], [this.stewie, this.peter], [this.stewie, this.peter, this.louis]][this._recipesInfo.length - 1];
      for (var i = 0; i < this._recipesInfo.length; i++) {
        var img = imageLoader.sprite(leftOffset + i * cellW, topOffset, 'chip_' + this._recipesInfo[i].color + '_0.png');
        img.anchor.set(0.5);
        img.scale.set(0.9);
        this._gUI.add(img);

        var score_disc = imageLoader.sprite(leftOffset + i * cellW + rCountOffsetX, topOffset + rCountOffsetY, 'score_disc.png');
        score_disc.x += 15;
        score_disc.y += 15;
        score_disc.anchor.set(0.5);
        this._gUI.add(score_disc);

        var check = imageLoader.sprite(leftOffset + i * cellW + rCountOffsetX, topOffset + rCountOffsetY, 'check.png');
        check.x += 15;
        check.y += 15;
        check.anchor.set(0.5);
        check.scale.set(0);
        this._gUI.add(check);
        console.log("addted text", this._recipesInfo[i].count);
        var count = this._game.add.text(0, 2, this._recipesInfo[i].count, this.recipesTextStyle);
        count.fill = colours[this._recipesInfo[i].color];
        count.anchor.setTo(0.5, 0.5);

        this.totalRecipesCount += this._recipesInfo[i].count;
        score_disc.addChild(count);

        this.recipeItems.push({
          img: img,
          text: count,
          check: check,
          heroes: heroesToDrink[i]
        });
      }

      // this.scoreText = this._game.add.text(480, 10, '1000', this.testStylePortrait3);
      // this.scoreText.setTextBounds(0, 0, 125, 50);
      // this._gUI.add(this.scoreText);
    }
  }, {
    key: 'getRecipeView',
    value: function getRecipeView(number) {
      if (this.recipeItems.length != 0) return this.recipeItems[number].img;
    }
  }, {
    key: 'getUIElementView',
    value: function getUIElementView(name) {
      return this[name];
    }
  }, {
    key: 'decreceRecipe',
    value: function decreceRecipe(number) {
      var _this7 = this;

      this._game.add.tween(this.recipeItems[number].img.scale).to({
        x: [1.5, 1],
        y: [1.5, 1]
      }, 300, Phaser.Easing.Sinusoidal.InOut, true).start().onComplete.add(function () {
        _this7.recipeItems[number].img.scale.set(1);
      });
    }

    // showStars(curVal, maxVal) {
    //
    //   const delta = maxVal / 3;
    //
    //   let number = curVal > delta * 0.5 ? (curVal > delta ? (curVal > delta * 2 ? 3 : 2) : 1) : 0;
    //
    //   switch (number) {
    //     case 1:
    //       this._star1.show();
    //       break;
    //     case 2:
    //       if (this._star1.scale.x == 0)
    //         this._star1.show();
    //       this._star2.show();
    //       break;
    //     case 3:
    //       if (this._star1.scale.x == 0)
    //         this._star1.show();
    //       if (this._star2.scale.x == 0)
    //         this._star2.show();
    //       this._star3.show();
    //       break;
    //     default:
    //       break;
    //   }
    // }

  }, {
    key: 'updateRecipes',
    value: function updateRecipes() {
      var _this8 = this;

      this.currentRecipesCount = 0;

      var _loop = function _loop(i) {
        var newCount = _this8._recipesInfo[i].count;
        _this8.currentRecipesCount += newCount;

        if (newCount == 0) {
          if (_this8.recipeItems[i].text.visible !== false) {
            _this8.recipeItems[i].text.visible = false;
            _this8._game.time.events.add(1000, function () {
              _this8.recipeItems[i].heroes.drink(_this8.recipeItems[i].img);
            });
            _this8._game.add.tween(_this8.recipeItems[i].check.scale).to({
              x: [2, 1],
              y: [2, 1]
            }, 600, Phaser.Easing.Sinusoidal.InOut, true).start();
          }
        } else {
          _this8.recipeItems[i].text.text = newCount;
        }
      };

      for (var i = 0; i < this.recipeItems.length; i++) {
        _loop(i);
      }

      var progressResult = 1 - this.currentRecipesCount / this.totalRecipesCount;
      // this._checkedStars = progressResult > 0.33 ? (progressResult > 0.66 ? (progressResult >= 1 ? 3 : 2) : 1) : 0;
      if (this._star1.scale.x == 0 && progressResult >= 0.333) {
        this._star1.show();
      }

      if (this._star2.scale.x == 0 && progressResult >= 0.666) {
        this._star2.show();
      }

      if (this._star3.scale.x == 0 && progressResult >= 1) {
        this._star3.show();
      }

      this._game.add.tween(this.scoreFill).to({
        angle: 88 - 88 * progressResult
      }, 400, Phaser.Easing.Linear.None, true, 0, 0, false);

      // this._game.add.tween(this.progressBar.scale).to({
      //   x: progressResult
      // }, 400, Phaser.Easing.Sinusoidal.Out, true).start();
    }
  }]);

  return GameUI;
}();

exports.default = GameUI;

},{"display/layout-utils":2,"kernel/globals":3}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint -W083 */
/*jshint -W041 */

var _layoutUtils = require('display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _gameUi = require('objects/game-ui');

var _gameUi2 = _interopRequireDefault(_gameUi);

var _gameTutorial = require('objects/game-tutorial');

var _gameTutorial2 = _interopRequireDefault(_gameTutorial);

var _gameCta = require('objects/game-cta');

var _gameCta2 = _interopRequireDefault(_gameCta);

var _utils = require('m3e/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(game, view) {
    _classCallCheck(this, GameView);

    this._game = game;
    this._view = view;
    // Add groups in layer order
    this.createGroups('Background', 'Slots', 'BackgroundEffects', 'Chips', 'UI', 'Effects', 'Blockers', 'Cover', 'Tutorial', 'CTA');

    this.viewSettings = {
      slot: {
        width: 80,
        height: 80,
        viewScale: { x: LP(90, 90), y: LP(100, 75) },
        viewOffset: { x: LP(51, 51), y: LP(0, 0) },
        anchor: { x: LP(0.5, 0.5), y: LP(0.5, 0.5) }
      },
      chip: {
        width: 80,
        height: 80,
        viewScale: { x: 90, y: 90 },
        viewOffset: { x: 50, y: 50 }
      },
      border: {
        scaleFactor: 1,
        innerCornerOffset: { x: 0, y: 0 },
        outerCornerOffset: { x: 0, y: 0 }
      },
      ui: {
        viewScale: { x: LP(100, 100), y: LP(100, 100) },
        viewOffset: { x: LP(0, 50), y: LP(0, 0) },
        anchor: { x: LP(0, 0.5), y: LP(0, 0) }
      },
      backgorund: {
        viewScale: { x: LP(100, 100), y: LP(100, 75) },
        viewOffset: { x: LP(0, 50), y: LP(50, 0) },
        anchor: { x: LP(0, 0.5), y: LP(0.5, 0) }
      }
    };

    this.chip = ChipView;
    this.slot = SlotView;
    this.border = BorderView;
    this.effects = new Effects(game, this.gEffects, this.gChips);
    this._uiView = null;
    this._tutorialView = new _gameTutorial2.default(game, this.gTutorial, this.gSlots, this.viewSettings, this._uiView);
    this._ctaView = new _gameCta2.default(game, this.gCTA);

    this.helperEventMain = null;

    this.helperEvent = [];
    this.hehlperTwn1 = [];
    this.hehlperTwn2 = [];
  }

  _createClass(GameView, [{
    key: 'initUI',
    value: function initUI(gameType) {
      this._uiView = new _gameUi2.default(this._game, this.gUI, gameType);
    }
  }, {
    key: 'createGroups',
    value: function createGroups() {
      for (var _len = arguments.length, Args = Array(_len), _key = 0; _key < _len; _key++) {
        Args[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var arg = _step.value;

          this['g' + arg] = this._game.add.group();
          this._view.add(this['g' + arg]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'fitSlotsView',
    value: function fitSlotsView() {
      this.fitGroup(this.gSlots, this.viewSettings.slot.viewScale, this.viewSettings.slot.viewOffset, true, true, this.viewSettings.slot.anchor);
    }
  }, {
    key: 'fitUIView',
    value: function fitUIView() {
      this.fitGroup(this.gUI, this.viewSettings.ui.viewScale, this.viewSettings.ui.viewOffset, true, false, this.viewSettings.ui.anchor);
      this.initBackgorund();

      var uiHeight = this.gUI.height;
      var newViewHeight = (_layoutUtils2.default.FULL_GAME_HEIGHT - uiHeight) * LP(0.85, 0.92);
      var newCentre = uiHeight + newViewHeight * 0.5;
      this.viewSettings.slot.viewOffset.y = (newCentre + _layoutUtils2.default.getHeaderHeight()) / _layoutUtils2.default.FULL_GAME_HEIGHT * 100;
      this.viewSettings.slot.viewScale.y = newViewHeight / _layoutUtils2.default.FULL_GAME_HEIGHT * 100;

      this._uiView.lateUIDraw();
    }
  }, {
    key: 'initBackgorund',
    value: function initBackgorund() {
      this.gBackground.x = _layoutUtils2.default.LEFT_OFFSET;
      this.gBackground.y = this.gUI.height * 0.9 + _layoutUtils2.default.getHeaderHeight() + _layoutUtils2.default.TOP_OFFSET;
      var background = imageLoader.sprite(0, 0, 'background');
      background.scale.set(_layoutUtils2.default.FULL_GAME_WIDTH / background.width);

      this.gBackground.add(background);
    }
  }, {
    key: 'fitChipsView',
    value: function fitChipsView() {
      this.gChips.x = this.gSlots.x;
      this.gChips.y = this.gSlots.y;
      this.gChips.scale.x = this.gSlots.scale.x;
      this.gChips.scale.y = this.gSlots.scale.y;

      this.gBackgroundEffects.x = this.gSlots.x;
      this.gBackgroundEffects.y = this.gSlots.y;
      this.gBackgroundEffects.scale.x = this.gSlots.scale.x;
      this.gBackgroundEffects.scale.y = this.gSlots.scale.y;

      this.gEffects.x = this.gSlots.x;
      this.gEffects.y = this.gSlots.y;
      this.gEffects.scale.x = this.gSlots.scale.x;
      this.gEffects.scale.y = this.gSlots.scale.y;
    }
  }, {
    key: 'fitGroup',
    value: function fitGroup(group) {
      var scaleFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 100, y: 100 };
      var offsetFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        x: 50,
        y: 50
      };
      var fitIntoFullView = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var cacheAsBitmap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var anchor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : { x: 0.5, y: 0.5 };

      var viewWidth = fitIntoFullView ? _layoutUtils2.default.FULL_GAME_WIDTH : _layoutUtils2.default.BASE_WIDTH;
      var viewHeight = fitIntoFullView ? _layoutUtils2.default.FULL_GAME_HEIGHT - _layoutUtils2.default.getHeaderHeight() : _layoutUtils2.default.BASE_HEIGHT;
      group.x = (fitIntoFullView ? _layoutUtils2.default.LEFT_OFFSET : 0) + viewWidth * (offsetFactor.x * 0.01) - group.width * anchor.x;
      group.y = (fitIntoFullView ? _layoutUtils2.default.TOP_OFFSET + _layoutUtils2.default.getHeaderHeight() : 0) + viewHeight * (offsetFactor.y * 0.01) - group.height * anchor.y;

      var scaleX = viewWidth * (scaleFactor.x * 0.01) / group.width;
      var scaleY = viewHeight * (scaleFactor.y * 0.01) / group.height;
      var s = Math.min(scaleX, scaleY);
      group.scale.x = s;
      group.scale.y = s;

      group.x = (fitIntoFullView ? _layoutUtils2.default.LEFT_OFFSET : 0) + viewWidth * (offsetFactor.x * 0.01) - group.width * anchor.x;
      group.y = (fitIntoFullView ? _layoutUtils2.default.TOP_OFFSET + _layoutUtils2.default.getHeaderHeight() : 0) + viewHeight * (offsetFactor.y * 0.01) - group.height * anchor.y;
      group.cacheAsBitmap = cacheAsBitmap;
    }
  }, {
    key: 'setToGroup',
    value: function setToGroup(group, sprite) {
      var x = sprite.worldPosition.x;
      var y = sprite.worldPosition.y;
      group.add(sprite);

      var newPos = this._game.input.getLocalPosition(group, new Phaser.Point(x, y));
      sprite.x = newPos.x;
      sprite.y = newPos.y;
    }
  }, {
    key: 'showHelpMove',
    value: function showHelpMove(possibleMoves, time) {
      var _this = this;

      this.hideHelpMoves();
      this.helperEventMain = null;
      this.helperEvent = [];
      this.hehlperTwn1 = [];
      this.hehlperTwn2 = [];

      this.helperEventMain = this._game.time.events.add(time * 1000, function () {
        _this.helpChipsHighlight(possibleMoves);
      });
    }
  }, {
    key: 'helpChipsHighlight',
    value: function helpChipsHighlight(obj) {
      var _this2 = this;

      var slots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var repeatTime = 3000;

      if (slots == null) {
        slots = [];
        var moveNumber = _utils2.default.random(0, obj.length - 1);
        var findSlots = obj[moveNumber].result;
        slots.push({ slot: obj[moveNumber].slot1 });
        //slots.push({slot: obj[moveNumber].slot2})

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = findSlots[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var s = _step2.value;

            if (!(s.slot.mI == obj[moveNumber].slot2.mI && s.slot.mJ == obj[moveNumber].slot2.mJ)) slots.push(s);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
      var event = this._game.time.events.add(repeatTime, function () {
        _this2.helpChipsHighlight(obj, slots);
      });

      this.helperEvent.push(event);

      var effectEvent = this._game.time.events.add(0, function () {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {

          for (var _iterator3 = slots[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _s = _step3.value;

            var slotView = _s.slot.currentChip.view;
            var twn1 = _this2._game.add.tween(slotView).to({
              angle: [-15, 0, 15, 0, -15, 0, 15, 0]
            }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1, 0, false);
            var twn2 = _this2._game.add.tween(slotView.scale).to({
              x: [slotView.scale.x * 1.1, slotView.scale.x],
              y: [slotView.scale.y * 1.1, slotView.scale.y]
            }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1, 0, false);

            _this2.hehlperTwn1.push(twn1);
            _this2.hehlperTwn2.push(twn2);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      });
      this.helperEvent.push(effectEvent);
    }
  }, {
    key: 'hideHelpMoves',
    value: function hideHelpMoves() {

      if (this.helperEventMain !== null) this.helperEventMain.pendingDelete = true;

      if (this.helperEvent.length !== 0) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.helperEvent[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var e = _step4.value;

            e.pendingDelete = true;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }

      this._game.time.events.clearPendingEvents();

      if (this.hehlperTwn1.length !== 0) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.hehlperTwn1[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var t = _step5.value;

            t.target.alpha = 1;
            this._game.tweens.remove(t);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }

      if (this.hehlperTwn2.length !== 0) {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.hehlperTwn2[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _t = _step6.value;

            _t.target.alpha = 1;
            this._game.tweens.remove(_t);
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }
    }
  }]);

  return GameView;
}();

exports.default = GameView;

var Effects = function () {
  function Effects(game, group, backgroundEffectsGroup) {
    _classCallCheck(this, Effects);

    this._group = group;
    this._backGroup = backgroundEffectsGroup;
    this._game = game;
  }

  _createClass(Effects, [{
    key: 'line',
    value: function line(angle, size, slot) {

      slot.currentChip.isEffectShow = true;
      var color = slot.currentChip.color;
      var x = slot.currentChip.view.x;
      var y = slot.currentChip.view.y;

      var effectTime = 1500;

      var effect = imageLoader.sprite(x, y, 'burst.png');
      this._group.add(effect);
      effect.scale.set(0);
      effect.anchor.setTo(0.5, 0.5);

      var emitter = this._game.add.emitter(x, y, 6);
      emitter.makeParticles('assets', 'sparkles.png');
      emitter.setAlpha(1, 0.7, 1000);
      emitter.setScale(1.2, 0.1, 1.2, 0.1, 10000, Phaser.Easing.Quintic.Out);
      emitter.minParticleSpeed.setTo(-200, -250);
      emitter.maxParticleSpeed.setTo(200, 200);
      emitter.gravity = 100;
      this._group.add(emitter);

      emitter.start(true, 500, null, 6);

      this._game.add.tween(effect).to({
        alpha: [0.8, 0]
      }, effectTime * 0.5, Phaser.Easing.Exponential.InOut, true);

      this._game.add.tween(effect.scale).to({
        x: 1.5,
        y: 1.5
      }, effectTime * 0.5, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
        effect.destroy();
      });

      //effect.blendMode = 1;

      var line_1 = imageLoader.sprite(x, y, color + '_streak.png');
      line_1.anchor.setTo(0.5, 0.5);
      //line_1.scale.setTo(0.8, 0);
      line_1.angle = angle;
      this._group.add(line_1);

      var line_2 = imageLoader.sprite(x, y, color + '_streak.png');
      line_2.anchor.setTo(0.5, 0.5);
      //  line_2.scale.setTo(0.8, 0);
      line_2.angle = angle + 180;
      this._group.add(line_2);

      // line_1.alpha = 0.6;
      // line_2.alpha = 0.6;

      line_1.blendMode = 1;
      line_2.blendMode = 1;

      // this._game.add.tween(line_1).to({
      //   alpha: 0
      // }, effectTime * 0.25, Phaser.Easing.Sinusoidal.In).delay(effectTime * 0.75).start();
      //
      // this._game.add.tween(line_2).to({
      //   alpha: 0
      // }, effectTime * 0.25, Phaser.Easing.Sinusoidal.In).delay(effectTime * 0.75).start();

      this._game.add.tween(line_1.anchor).to({
        y: 5

      }, effectTime, Phaser.Easing.Linear.InOut, true, 1, 0, false);

      this._game.add.tween(line_2.anchor).to({
        y: 5
      }, effectTime, Phaser.Easing.Linear.InOut, true, 1, 0, false).onComplete.add(function () {

        line_1.destroy();
        line_2.destroy();
      });

      this._game.time.events.add(effectTime * 0.5, function () {
        slot.currentChip.isEffectShow = false;
      });
    }
  }, {
    key: 'chipHighlight',
    value: function chipHighlight(slot) {
      return;
      // let x = slot.currentChip.view.x;
      // let y = slot.currentChip.view.y;
      // let x1 = slot.currentChip.mMoveSteps[0].x;
      // let y1 = slot.currentChip.mMoveSteps[0].y;
      //
      // let highlight = imageLoader.sprite(0, 0, 'chipBackHighlight.png');
      // highlight.anchor.set(0.5);
      // highlight.scale.set(1.1);
      //
      // slot.currentChip.view.add(highlight);
      // slot.currentChip.view.bringToTop(slot.currentChip.view._sprite);
      // this._backGroup.bringToTop(slot.currentChip.view);
      // let dx = x1 - x;
      // let dy = y1 - y;
      // highlight.update = () => {
      //   let curDistX = x1 - slot.currentChip.view.x;
      //   let curDistY = y1 - slot.currentChip.view.y;
      //   let timeY = dy > curDistY ? (dy / curDistY) : (curDistY / dy);
      //   let timeX = dx > curDistX ? (dx / curDistX) : (curDistX / dx);
      //
      //   timeX /= Math.max(1, slot.mI);
      //   timeY /= Math.max(1, slot.mJ);
      //   highlight.x = (dx - curDistX) * (-4 * Math.pow(timeX, 2) + 1.5 * timeX);
      //   highlight.y = (dy - curDistY) * (-4 * Math.pow(timeY, 2) + 1.5 * timeY);
      // };
      //
      // highlight.remove = () => {
      //   highlight.destroy();
      // };
      // return highlight;
    }
  }, {
    key: 'colorBombEffect',
    value: function colorBombEffect(slot, removedSlots) {
      var _this3 = this;

      //  if (slot.currentChip.isEffectShow == true) return;
      slot.currentChip.isEffectShow = true;
      var time = 1500;
      slot.currentChip.mIgnoreDestroyEffect = false;
      var startX = slot.currentChip.view.x;
      var startY = slot.currentChip.view.y;

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        var _loop = function _loop() {
          var s = _step7.value;

          var x = s.slot.currentChip.view.x;
          var y = s.slot.currentChip.view.y;

          var width = Phaser.Math.distance(x, y, startX, startY);

          var bolt = imageLoader.sprite(startX, startY, (width > 260 ? 'long' : 'short') + '_01.png');
          _this3._group.add(bolt);

          var scaleFactor = width / bolt.width;

          bolt.angle = Phaser.Math.radToDeg(Phaser.Math.angleBetween(startX, startY, x, y));
          bolt.scale.x = scaleFactor;
          bolt.anchor.setTo(0, 0.5);

          var boltFrameNames = Phaser.Animation.generateFrameNames((width > 260 ? 'long' : 'short') + '_', 1, 14, '.png', 2);
          boltFrameNames = boltFrameNames.concat(boltFrameNames.reverse());

          bolt.animations.add('splash', boltFrameNames, 30);
          bolt.animations.play('splash', _utils2.default.random(20, 35), false, true);

          _this3._game.time.events.add(width > 260 ? 80 : 120, function () {
            if (x != startX && y != startY || x == startX && y != startY || x != startX && y == startY) {
              var splash = imageLoader.sprite(x, y, 'bolt_end_splash.png');
              splash.anchor.set(0.5);
              _this3._group.add(splash);
              splash.scale.set(1);

              _this3._game.time.events.add(width > 260 ? 700 : 750, function () {
                splash.destroy();
              });
            }
          });
        };

        for (var _iterator7 = removedSlots[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      if (removedSlots.length > 1) {
        var bolt_splash = imageLoader.sprite(startX, startY, 'bolt_splash.png');

        bolt_splash.anchor.set(0.5);
        this._group.add(bolt_splash);
        bolt_splash.scale.set(1);

        this._game.add.tween(bolt_splash.scale).to({
          x: 1,
          y: 1
        }, 100, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false);

        this._game.add.tween(bolt_splash.scale).to({
          x: 0,
          y: 0
        }, 100, Phaser.Easing.Sinusoidal.Out, true, 1300, 0, false).onComplete.add(function () {
          bolt_splash.destroy();
        });
      }

      this._game.time.events.add(time, function () {
        slot.currentChip.isEffectShow = false;
      });
    }
  }, {
    key: 'bombEffect',
    value: function bombEffect(size, slot) {
      var effectTime = 800;
      slot.currentChip.isEffectShow = true;
      var x = slot.currentChip.view.x;
      var y = slot.currentChip.view.y;

      var flameEffect = this._game.add.emitter(x, y, 30);
      flameEffect.makeParticles('assets', 'flame.png');
      flameEffect.gravity = 0;
      flameEffect.setAlpha(1, 0.1, 5000);
      var speed = 300;

      flameEffect.minParticleSpeed.setTo(-speed, -speed);
      flameEffect.maxParticleSpeed.setTo(speed, speed);
      flameEffect.setScale(1, 0.5, 1, 0.5, 15000, Phaser.Easing.Quintic.Out);
      this._group.add(flameEffect);
      flameEffect.start(true, 800, null, 30);

      // for(let i=0; i<30;i++)
      // {
      //   let flame = imageLoader.sprite(x,y,'flame.png')
      //   flame.anchor.set(0,0.5)
      //   this._group.add(flame);
      //   flame.angle = i*(180/15);
      //   this._game.add.tween(flame.anchor).to({
      //     y: utils.random(1.1,2.5,)
      //   }, effectTime, Phaser.Easing.Linear.InOut, true, utils.random(0,100), 0, false);
      //   this._game.add.tween(flame).to({
      //     alpha: [1,1,0]
      //   }, effectTime, Phaser.Easing.Linear.InOut, true, 0, 0, false).onComplete.add(()=>{
      //     flame.destroy();
      //   });
      // }
      var effect = imageLoader.sprite(x, y, 'burst.png');
      this._group.add(effect);
      effect.scale.set(0);
      effect.anchor.setTo(0.5, 0.5);
      this._game.add.tween(effect).to({
        alpha: [0.8, 0]
      }, effectTime, Phaser.Easing.Exponential.InOut, true);

      this._game.add.tween(effect.scale).to({
        x: 1.5,
        y: 1.5
      }, effectTime, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
        effect.destroy();
      });

      this._game.time.events.add(effectTime, function () {
        slot.currentChip.isEffectShow = false;
        flameEffect.destroy();
      });
    }

    // pawDestroy(slot, foxChip) {
    //   // const effectTime = 1000;
    //   slot.currentChip.mIgnoreDestroyEffect = true;
    //   slot.currentChip.isEffectShow = true;
    //
    //   let chipView = slot.currentChip.view;
    //   this._group.add(chipView);
    //
    //   let targetView = foxChip.view;
    //   let targetX = targetView.x;
    //   let targetY = targetView.y;
    //
    //   let twnTime = 1000 * Utils.random(0.9, 1.1);
    //
    //   let twn = this._game.add.tween(chipView).to({
    //     x: [targetX + LP(200, (targetX - chipView.x > 0 ? 100 : -150)), targetX],
    //     y: [targetY + LP((targetY - chipView.y > 0 ? 100 : -100), 150), targetY],
    //   }, twnTime, Phaser.Easing.Linear.None, true);
    //   twn.interpolation(Phaser.Math.bezierInterpolation);
    //   twn.start();
    //
    //   this._game.add.tween(chipView.scale).to({
    //     x: [2, 1],
    //     y: [2, 1],
    //   }, twnTime, Phaser.Easing.Sinusoidal.Out, true, twnTime * 0.6, 0, false);
    //
    //   twn.onComplete.add(() => {
    //     targetView.setFoxHappy();
    //     chipView.destroy();
    //   });
    //
    //   this._game.time.events.add(twnTime * 0.8, () => {
    //     if (slot.currentChip != 'no_chip')
    //       slot.currentChip.isEffectShow = false;
    //   });
    // }

  }]);

  return Effects;
}();

var ChipView = function (_Phaser$Group) {
  _inherits(ChipView, _Phaser$Group);

  function ChipView(game, group, effectsGroup, chip, viewSettings, gameView) {
    _classCallCheck(this, ChipView);

    var _this4 = _possibleConstructorReturn(this, (ChipView.__proto__ || Object.getPrototypeOf(ChipView)).call(this, game));

    _this4.debugMode = ChipView.DEBUG_MODE;
    _this4._gameView = gameView;
    _this4._chip = chip;
    var spriteName = '';
    _this4.timeEvents = [];
    _this4.tweenEvents = [];

    spriteName = 'chip_' + chip.mColor + '_' + chip.mType + '.png';

    _this4._sprite = imageLoader.sprite(0, 0, spriteName);
    _this4.x = chip.mI * viewSettings.slot.width;
    _this4.y = chip.mJ * viewSettings.slot.height;
    _this4.add(_this4._sprite);
    _this4._chip = chip;
    _this4._viewSettings = viewSettings;
    _this4._game = game;
    _this4._group = group;
    _this4._effectsGroup = effectsGroup;
    _this4._sprite.anchor.setTo(0.5, 1);
    _this4._sprite.y += _this4._sprite.height * 0.5;
    _this4.x += _this4._viewSettings.slot.width * 0.5;
    _this4.y += _this4._viewSettings.slot.height * 0.5;
    _this4.scale.x = _this4._viewSettings.chip.viewScale.x * 0.01;
    _this4.scale.y = _this4._viewSettings.chip.viewScale.y * 0.01;
    _this4._nativeScale = _this4.scale.x;
    _this4._group.add(_this4);

    if (_this4.debugMode) {
      _this4.textStyle = {
        font: "30px Luckiest Guy",
        fill: '#000000',
        stroke: "#ffffff",
        strokeThickness: 3,
        boundsAlignH: "center",
        boundsAlignV: "middle"
      };
      _this4.initDebugUI();
    }
    return _this4;
  }

  _createClass(ChipView, [{
    key: 'destroyEffect',
    value: function destroyEffect(cb) {
      var _this5 = this;

      var targetRecipe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var delayFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


      if (this._chip.type == 6) {
        cb();
        return;
      }

      if (this._viewSettings.useEffects) {
        var emitter = this._game.add.emitter(this.x, this.y, 6);
        emitter.makeParticles('assets', 'slice_' + this._chip.color + '_1.png');
        emitter.setAlpha(1, 0.7, 1000);
        emitter.setScale(1.2, 0.1, 1.2, 0.1, 10000, Phaser.Easing.Quintic.Out);
        emitter.minParticleSpeed.setTo(-100, -150);
        emitter.maxParticleSpeed.setTo(100, 100);
        emitter.gravity = 300;
        this._effectsGroup.add(emitter);

        emitter.start(true, 500, null, 6);
      }
      if (targetRecipe !== false) {
        (function () {
          var targetView = _this5._gameView._uiView.getRecipeView(targetRecipe);
          var targetX = targetView.x;
          var targetY = targetView.y;

          var x = _this5._sprite.worldPosition.x;
          var y = _this5._sprite.worldPosition.y;

          var newPos = _this5._game.input.getLocalPosition(_this5._gameView.gUI, new Phaser.Point(x, y));

          var _loop2 = function _loop2(i) {
            _this5.game.time.events.add(i * 200, function () {
              var bubble1 = imageLoader.sprite(newPos.x, newPos.y, _this5._chip.color + '_bub_' + utils.random(1, 2) + '.png');
              bubble1.scale.set(utils.random(0.8, 1.5));
              _this5._gameView.gUI.add(bubble1);
              bubble1.anchor.set(0.5);
              bubble1.y -= _this5._sprite.height * 0.5;

              var twnTime = 800 * Math.max(0.15, 1 - 0.15 * delayFactor);

              var twn = _this5._game.add.tween(bubble1).to({
                x: [targetX + LP(200, targetX - bubble1.x > 0 ? 150 : -150) + utils.random(-100, 100), targetX],
                y: [targetY + LP(targetY - bubble1.y > 0 ? 150 : -150, 200) + utils.random(-50, 50), targetY]
              }, twnTime, Phaser.Easing.Linear.None, true);
              twn.interpolation(Phaser.Math.bezierInterpolation);
              twn.start();

              _this5._game.add.tween(bubble1.scale).to({
                x: 0,
                y: 0
              }, twnTime * 0.1, Phaser.Easing.Sinusoidal.Out, true, twnTime * 0.9, 0, false);
              if (i == 0) {
                twn.onComplete.add(function () {
                  _this5._gameView._uiView.decreceRecipe(targetRecipe);
                  if (_this5.debugMode && _this5.debugTxt) {
                    _this5.debugTxt.destroy();
                  }
                  _this5.destroy();
                });
              }
            });
          };

          for (var i = 0; i < 5; i++) {
            _loop2(i);
          }
        })();
      }

      var circle = imageLoader.sprite(this.x, this.y, this._chip.color + '_1.png');
      circle.anchor.set(0.5);

      // let animationNames = Phaser.Animation.generateFrameNames(`${this._chip.color}_`, 1, 3, '.png', 1);
      // animationNames = animationNames.reverse();
      // console.log(animationNames)
      // circle.animations.add('splash', animationNames, 30);
      // circle.animations.play('splash', 10, false, true);

      this._game.add.tween(circle.scale).to({
        x: 1.5,
        y: 1.5
      }, 500, Phaser.Easing.Sinusoidal.InOut, true);

      this._game.add.tween(circle).to({
        alpha: 0
      }, 500, Phaser.Easing.Sinusoidal.InOut, true);

      this._effectsGroup.add(circle);
      this._game.add.tween(this.scale).to({
        x: 0,
        y: 0
      }, 1000, Phaser.Easing.Sinusoidal.InOut, true).onComplete.add(function () {
        if (_this5.debugMode && _this5.debugTxt) {
          _this5.debugTxt.destroy();
        }
        _this5.destroy();
      });

      var starEmitter = null;
      // if (this._viewSettings.useEmitters) {
      //   starEmitter = this._game.add.emitter(this.x, this.y, 15);
      //   starEmitter.makeParticles('assets', 'startEffect.png');
      //   starEmitter.setAlpha(0.7, 0.1, 1000);
      //   starEmitter.minParticleSpeed.setTo(-200, -200);
      //   starEmitter.maxParticleSpeed.setTo(200, 200);
      //   starEmitter.setScale(0.4, 0.3, 0.4, 0.3, 10000, Phaser.Easing.Quintic.Out);
      //   starEmitter.start(true, 500, null, 15);
      //   this._effectsGroup.add(starEmitter);
      //
      // }

      this._game.time.events.add(300, function () {
        cb();
        // if (this._viewSettings.useEmitters)
        //   starEmitter.destroy();
      });
    }
  }, {
    key: 'setVisible',
    value: function setVisible(value) {
      this._sprite.visible = value;
    }
  }, {
    key: 'specialDestroyEffect',
    value: function specialDestroyEffect(targetPos, cb) {
      var _this6 = this;

      //this.destroyEffect(cb);
      var targetTime = targetPos.x.length * 100;
      var targetX = targetPos.x.map(function (x) {
        return x * _this6._viewSettings.slot.width + _this6._viewSettings.slot.width * 0.5;
      });
      var targetY = targetPos.y.map(function (x) {
        return x * _this6._viewSettings.slot.height + _this6._viewSettings.slot.height * 0.5;
      });
      this._game.add.tween(this).to({
        x: targetX,
        y: targetY,
        alpha: 0
      }, targetTime, Phaser.Easing.Linear.None, true).onComplete.add(function () {
        _this6.destroy();
      }, this);
      // this._game.add.tween(this.scale).to({
      //   x: 0,
      //   y: 0
      // }, targetTime, Phaser.Easing.Linear.None, true).start();
      this._game.time.events.add(targetTime, cb);
    }
  }, {
    key: 'setNewType',
    value: function setNewType(cb) {
      var _this7 = this;

      // let nativeScale = this.scale.x;
      // if (this._viewSettings.useEffects) {
      //   let effect = imageLoader.sprite(this.x, this.y, 'splash.png');
      //   this._group.add(effect);
      //   effect.scale.set(0);
      //   effect.anchor.setTo(0.5, 0.5);
      //   this._game.add.tween(effect)
      //       .to({
      //         alpha: 0,
      //       }, 600, Phaser.Easing.Sinusoidal.InOut, true);
      //
      //   this._game.add.tween(effect.scale).to({
      //     x: this._viewSettings.chip.viewScale.x * 0.01,
      //     y: this._viewSettings.chip.viewScale.y * 0.01,
      //   }, 300, Phaser.Easing.Sinusoidal.InOut, true).onComplete.add(() => {
      //     effect.destroy();
      //   });
      // }
      var emitter = null;
      // if (this._viewSettings.useEmitters) {
      //   let emitter = this._game.add.emitter(this.x, this.y, 5);
      //   emitter.makeParticles('assets', 'startEffect.png');
      //   emitter.alpha = 0.8;
      //   emitter.gravity = -50;
      //   this._group.add(emitter);
      //
      //   emitter.start(true, 500, null, 5);
      // }
      // this.game.tweens.removeFrom(this);
      this._game.add.tween(this.scale).to({
        x: 0,
        y: 0
      }, 100, Phaser.Easing.Sinusoidal.InOut, true).onComplete.add(function () {
        _this7._sprite.frameName = 'chip_' + _this7._chip.mColor + '_' + _this7._chip.mType + '.png';
        _this7._game.add.tween(_this7.scale).to({
          x: _this7._nativeScale,
          y: _this7._nativeScale
        }, 100, Phaser.Easing.Linear.None, true);
      });
      this._game.time.events.add(300, function () {
        cb();
        if (emitter && _this7._viewSettings.useEmitters) emitter.destroy();
      });
    }
  }, {
    key: 'getX',
    value: function getX() {
      return (this.x - this._viewSettings.slot.width * 0.5) / this._viewSettings.slot.width;
    }
  }, {
    key: 'setX',
    value: function setX(x) {
      this.x = x * this._viewSettings.slot.width + this._viewSettings.slot.width * 0.5;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return (this.y - this._viewSettings.slot.height * 0.5) / this._viewSettings.slot.height;
    }
  }, {
    key: 'setY',
    value: function setY(y) {
      this.y = y * this._viewSettings.slot.height + this._viewSettings.slot.height * 0.5;
    }
  }, {
    key: 'refreshColor',
    value: function refreshColor() {
      var _this8 = this;

      if (this._chip.mType === 7) return;
      if (this._chip.mType === 8) return;
      this._game.add.tween(this.scale).to({
        x: 0,
        y: 0
      }, 200, Phaser.Easing.Sinusoidal.InOut, true).onComplete.add(function () {
        _this8._sprite.frameName = 'chip_' + _this8._chip.mColor + '_' + _this8._chip.mType + '.png';
        _this8._game.add.tween(_this8.scale).to({
          x: _this8._viewSettings.chip.viewScale.x * 0.01,
          y: _this8._viewSettings.chip.viewScale.y * 0.01
        }, 200, Phaser.Easing.Sinusoidal.InOut, true);
      });

      if (this._chip.type === 6 && this._viewSettings.useEmitters) {
        var tintColor = "0xffffff";

        switch (this._chip.color) {
          case 0:
            tintColor = "0x00e9f6"; //blue
            break;
          case 1:
            tintColor = "0x92fe8d"; //green
            break;
          case 2:
            tintColor = "0xf0a3ff"; //violet
            break;
          case 3:
            tintColor = "0xffafab"; //red
            break;
          case 4:
            tintColor = "0xffffac"; //yellow
            break;
        }

        this._shine.tint = tintColor;
      }
    }

    // moveFoxTo(target, cb) {
    //
    //   this._sprite.animations.play('move', 29).onComplete.add(() => {
    //     this._sprite.animations.play('idle', 11, true);
    //   });
    //   this._game.add.tween(this).to({
    //     x: target.view.x,
    //     y: target.view.y
    //   }, 600, Phaser.Easing.Sinusoidal.Out, true, 1, 0, false).onComplete.add(() => {
    //     cb();
    //   });
    // }
    //
    // setFoxHappy() {
    //   this._sprite.animations.play('howl', 20).onComplete.add(() => {
    //     this._sprite.animations.play('happy1', 8).onComplete.add(() => {
    //       this._sprite.animations.play('happy2', 12, true);
    //     });
    //   });
    // }

    // moveToSlot(target, cb) {
    //
    //   if (this._chip.type == 8) {
    //     this._game.add.tween(this.effect1).to({
    //       x: target.view.x,
    //       y: target.view.y
    //     }, 600, Phaser.Easing.Sinusoidal.Out, true, 1, 0, false);
    //     this._game.add.tween(this.effect2).to({
    //       x: target.view.x,
    //       y: target.view.y
    //     }, 600, Phaser.Easing.Sinusoidal.Out, true, 1, 0, false);
    //   }
    //   this._game.add.tween(this).to({
    //     x: target.view.x,
    //     y: target.view.y
    //   }, 600, Phaser.Easing.Sinusoidal.Out, true, 1, 0, false).onComplete.add(() => {
    //     cb();
    //   });
    // }

  }, {
    key: 'updateView',
    value: function updateView() {
      if (this._chip.mType === 7) return;
      if (this._chip.mType === 8) return;
      this._sprite.frameName = 'chip_' + this._chip.mColor + '_' + this._chip.mType + '.png';
    }
  }, {
    key: 'shake',
    value: function shake() {
      if (this.game.tweens.isTweening(this)) return;
      this._game.add.tween(this).to({
        angle: [-15, 0, 15, 0, -15, 0, 15, 0]
      }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1, 0, false);
      this._game.add.tween(this.scale).to({
        x: [this._nativeScale * 1.1, this._nativeScale],
        y: [this._nativeScale * 1.1, this._nativeScale]
      }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1, 0, false);
    }
  }, {
    key: 'maximize',
    value: function maximize() {
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {

        for (var _iterator8 = this.tweenEvents[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var twn = _step8.value;

          this._game.tweens.remove(twn);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.timeEvents[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var te = _step9.value;

          this._game.time.events.remove(te);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      var sprites = [this.effect1, this.effect2, this];
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = sprites[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var s = _step10.value;

          this._game.add.tween(s.scale).to({
            x: 3,
            y: 3
          }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 1, 0, false);
          this._game.add.tween(s).to({
            x: this.x * 0.5 + this.width * 0.5,
            y: this.x * 0.5 + this.height * 0.5
          }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 1, 0, false);
          this._effectsGroup.bringToTop(s);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.debugMode && this.debugTxt) {
        this.debugTxt.x = this.x;
        this.debugTxt.y = this.y;
        this.debugTxt.text = '' + this._chip.mCanMatch;
        this._group.bringToTop(this.debugTxt);
      }
    }
  }, {
    key: 'initDebugUI',
    value: function initDebugUI() {

      this.debugTxt = this._game.add.text(this._chip.type, this._chip.color, '0', this.textStyle);
      this.debugTxt.anchor.set(0.5);
      this._group.add(this.debugTxt);
    }
  }]);

  return ChipView;
}(Phaser.Group);

var SlotView = function (_Phaser$Sprite) {
  _inherits(SlotView, _Phaser$Sprite);

  function SlotView(game, group, slot, viewSettings) {
    _classCallCheck(this, SlotView);

    var _this9 = _possibleConstructorReturn(this, (SlotView.__proto__ || Object.getPrototypeOf(SlotView)).call(this, game, slot.mI * viewSettings.slot.width, slot.mJ * viewSettings.slot.height, 'assets', 'boardTile_' + (slot.mColorType + 1) + '.png'));

    _this9.alpha = 1;
    group.add(_this9);

    switch (slot.type) {
      case 3:
        _this9.frameName = 'carpet.png';
        break;
      case 4:
        _this9.frameName = 'carpet.png';
        var carpetLeftBorder = imageLoader.sprite(_this9.x, _this9.y, 'carpet_side.png');
        group.add(carpetLeftBorder);
        break;
      case 5:
        _this9.frameName = 'carpet.png';
        var carpetRightBorder = imageLoader.sprite(_this9.x + viewSettings.slot.width, _this9.y, 'carpet_side.png');
        carpetRightBorder.scale.setTo(-1, 1);
        group.add(carpetRightBorder);
        break;
      case 6:
        _this9.frameName = 'carpet_corner.png';

        break;
      case 7:
        _this9.frameName = 'carpet_corner.png';
        _this9.anchor.set(0.5);
        _this9.angle = -180;
        _this9.x += _this9.width * 0.5;
        _this9.y += _this9.height * 0.5;
        break;
      case 8:
        _this9.frameName = 'carpet.png';
        _this9.anchor.set(0.5);
        _this9.angle = -180;
        _this9.x += _this9.width * 0.5;
        _this9.y += _this9.height * 0.5;
        break;
      case 9:
        _this9.frameName = 'carpet.png';
        _this9.anchor.set(0.5);
        _this9.angle = -180;
        _this9.x += _this9.width * 0.5;
        _this9.y += _this9.height * 0.5;
        var carpetRightBorderReversed = imageLoader.sprite(_this9.x + viewSettings.slot.width * 0.5, _this9.y, 'carpet_side.png');
        carpetRightBorderReversed.scale.setTo(-1, 1);
        carpetRightBorderReversed.anchor.set(0.5);
        group.add(carpetRightBorderReversed);
        break;
    }

    return _this9;
  }

  return SlotView;
}(Phaser.Sprite);

var BorderView = function (_Phaser$Sprite2) {
  _inherits(BorderView, _Phaser$Sprite2);

  function BorderView(game, group, border, viewSettings) {
    _classCallCheck(this, BorderView);

    var _this10 = _possibleConstructorReturn(this, (BorderView.__proto__ || Object.getPrototypeOf(BorderView)).call(this, game, 0, 0, 'assets', 'left.png'));

    switch (border.mType) {
      case 'right':
        _this10.frameName = 'left.png';
        _this10.scale.x *= -1;
        _this10.anchor.setTo(1, 0);
        _this10.x = (border.parentSlot.mI + 1) * viewSettings.slot.width - 1;
        _this10.y = border.parentSlot.mJ * viewSettings.slot.height;
        break;
      case 'left':
        _this10.frameName = 'left.png';
        _this10.anchor.setTo(1, 0);
        _this10.x = border.parentSlot.mI * viewSettings.slot.width + 1;
        _this10.y = border.parentSlot.mJ * viewSettings.slot.height;
        break;
      case 'top':
        _this10.frameName = 'up.png';
        //this.angle = 90;
        _this10.anchor.setTo(1, 1);
        _this10.x = (border.parentSlot.mI + 1) * viewSettings.slot.width;
        _this10.y = border.parentSlot.mJ * viewSettings.slot.height + 1;
        break;
      case 'bottom':
        _this10.frameName = 'up.png';
        //  this.angle = 90;
        _this10.scale.y *= -1;
        _this10.anchor.setTo(1, 1);
        _this10.x = (border.parentSlot.mI + 1) * viewSettings.slot.width;
        _this10.y = (border.parentSlot.mJ + 1) * viewSettings.slot.height - 1;
        break;
      case 'top-left':
        _this10.frameName = 'inner_corner.png';
        _this10.anchor.setTo(1, 1);
        _this10.x = border.parentSlot.mI * viewSettings.slot.width + viewSettings.border.innerCornerOffset.x;
        _this10.y = border.parentSlot.mJ * viewSettings.slot.height + viewSettings.border.innerCornerOffset.y;
        break;
      case 'top-right':
        _this10.frameName = 'inner_corner.png';
        _this10.scale.x *= -1;
        _this10.anchor.setTo(1, 1);
        _this10.x = (border.parentSlot.mI + 1) * viewSettings.slot.width - viewSettings.border.innerCornerOffset.x;
        _this10.y = border.parentSlot.mJ * viewSettings.slot.height + viewSettings.border.innerCornerOffset.y;
        break;
      case 'bottom-left':
        _this10.frameName = 'inner_corner.png';
        // this.angle = -90;
        _this10.scale.y *= -1;
        _this10.anchor.setTo(1, 1);
        _this10.x = border.parentSlot.mI * viewSettings.slot.width + viewSettings.border.innerCornerOffset.x;
        _this10.y = (border.parentSlot.mJ + 1) * viewSettings.slot.height - viewSettings.border.innerCornerOffset.y;
        break;
      case 'bottom-right':
        _this10.frameName = 'inner_corner.png';
        //this.angle = 180;
        _this10.scale.x *= -1;
        _this10.scale.y *= -1;
        _this10.anchor.setTo(1, 1);
        _this10.x = (border.parentSlot.mI + 1) * viewSettings.slot.width - viewSettings.border.innerCornerOffset.x;
        _this10.y = (border.parentSlot.mJ + 1) * viewSettings.slot.height - viewSettings.border.innerCornerOffset.y;
        break;
      case 'top-left-outer':
        _this10.frameName = 'outer_corner.png';
        _this10.anchor.setTo(1, 0);
        _this10.angle = 90;
        _this10.x = border.parentSlot.mI * viewSettings.slot.width - viewSettings.border.outerCornerOffset.x;
        _this10.y = border.parentSlot.mJ * viewSettings.slot.height + viewSettings.border.outerCornerOffset.y;
        break;
      case 'top-right-outer':
        _this10.frameName = 'outer_corner.png';
        _this10.angle = 180;
        _this10.anchor.setTo(1, 0);
        _this10.x = (border.parentSlot.mI + 1) * viewSettings.slot.width + viewSettings.border.outerCornerOffset.x;
        _this10.y = border.parentSlot.mJ * viewSettings.slot.height - viewSettings.border.outerCornerOffset.y;
        break;
      case 'bottom-left-outer':
        _this10.frameName = 'outer_corner.png';
        _this10.angle = 0;
        _this10.anchor.setTo(1, 0);
        _this10.x = border.parentSlot.mI * viewSettings.slot.width + viewSettings.border.outerCornerOffset.x;
        _this10.y = (border.parentSlot.mJ + 1) * viewSettings.slot.height + viewSettings.border.outerCornerOffset.y;
        break;
      case 'bottom-right-outer':
        _this10.frameName = 'outer_corner.png';
        _this10.angle = -90;
        _this10.anchor.setTo(1, 0);
        _this10.x = (border.parentSlot.mI + 1) * viewSettings.slot.width + viewSettings.border.outerCornerOffset.x;
        _this10.y = (border.parentSlot.mJ + 1) * viewSettings.slot.height - viewSettings.border.outerCornerOffset.y;
        break;
      case 'top-left-outer-skew':
        _this10.frameName = 'outer_corner.png';
        _this10.angle = 0;
        _this10.anchor.setTo(1, 0);
        _this10.x = border.parentSlot.mI * viewSettings.slot.width + viewSettings.border.outerCornerOffset.x;
        _this10.y = border.parentSlot.mJ * viewSettings.slot.height + viewSettings.border.outerCornerOffset.y;
        break;
      case 'top-right-outer-skew':
        _this10.frameName = 'outer_corner.png';
        _this10.angle = -90;
        _this10.anchor.setTo(1, 0);
        _this10.x = (border.parentSlot.mI + 1) * viewSettings.slot.width + viewSettings.border.outerCornerOffset.x;
        _this10.y = border.parentSlot.mJ * viewSettings.slot.height + viewSettings.border.outerCornerOffset.y;
        break;
      case 'bottom-left-outer-skew':
        _this10.frameName = 'outer_corner.png';
        _this10.angle = 90;
        _this10.anchor.setTo(1, 0);
        _this10.x = border.parentSlot.mI * viewSettings.slot.width - viewSettings.border.outerCornerOffset.x;
        _this10.y = (border.parentSlot.mJ + 1) * viewSettings.slot.height - viewSettings.border.outerCornerOffset.y;
        break;
      case 'bottom-right-outer-skew':
        _this10.frameName = 'outer_corner.png';
        _this10.angle = 180;
        _this10.anchor.setTo(1, 0);
        _this10.x = (border.parentSlot.mI + 1) * viewSettings.slot.width + viewSettings.border.outerCornerOffset.x;
        _this10.y = (border.parentSlot.mJ + 1) * viewSettings.slot.height - viewSettings.border.outerCornerOffset.y;
        break;
      default:
        break;
    }

    _this10.scale.x *= viewSettings.border.scaleFactor;
    _this10.scale.y *= viewSettings.border.scaleFactor;
    _this10.alpha = 1;
    group.add(_this10);
    return _this10;
  }

  _createClass(BorderView, [{
    key: 'onIndexUpdate',
    value: function onIndexUpdate() {}
  }]);

  return BorderView;
}(Phaser.Sprite);

ChipView.DEBUG_MODE = false;

},{"display/layout-utils":2,"m3e/utils":10,"objects/game-cta":12,"objects/game-tutorial":16,"objects/game-ui":17}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _globals = require('kernel/globals');

var _globals2 = _interopRequireDefault(_globals);

var _layoutUtils = require('display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _gameInit = require('objects/game-init');

var _gameInit2 = _interopRequireDefault(_gameInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint -W041 */


var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      // LU.RENDER_RESOLUTION = 1 / LU.getDevicePixelRatio();
      _layoutUtils2.default.refreshViewDimmensions();
      this.game.time.desiredFps = 60;
      this.game.time.advancedTiming = false;

      this.params = utils.getAdParameters({
        cta_on_idle_time: { type: 'int', default: 40000 },
        show_tutorial: { type: 'bool', default: true },
        tutorial_step_1_time: { type: 'int', default: 0 },
        tutorial_step_2_time: { type: 'int', default: 50 },
        max_score: { type: 'int', default: 0 },
        input_type: { type: 'string', default: 'swipe' }, // can be 'tap' or 'swipe'
        game_type_pattern: { type: 'string', default: 'recipe' }, // game type ,if recipe (6 - type, 0-color,1-1 min and max value for random)
        score_add_by_chip: { type: 'int', default: 10 },
        highligh_helper_time: { type: 'int', default: 5 },
        moves: { type: 'int', default: 10 },
        colors: { type: 'int', default: 3 },
        characters: { type: 'int', default: 3 },
        toCollect: { type: 'int', default: 10 },
        // performance /view settings
        performance_mode_auto: { type: 'bool', default: false }, // automatically set for using minimal effects in canvas mode and max in WebGL
        use_emitters: { type: 'bool', default: true },
        simple_chip_moves: { type: 'bool', default: false },
        use_effects: { type: 'bool', default: true },
        use_small_field: { type: 'bool', default: false },
        replays_number: { type: 'int', default: 1 }
      });

      this.params.colors--;

      if (_globals2.default.REPLAYS_NUMBER == null) _globals2.default.REPLAYS_NUMBER = this.params.replays_number;

      if (this.params.performance_mode_auto && this.game.renderType === Phaser.CANVAS) {
        this.params.use_emitters = false;
        this.params.simple_chip_moves = true;
        this.params.use_effects = false;
        this.params.use_small_field = true;
      }
      this.createUserInterface();
    }
  }, {
    key: 'createUserInterface',
    value: function createUserInterface() {
      var _this2 = this;

      // this.bg = imageLoader.sprite(0, 0, 'background');
      this.view = this.game.add.group();

      window.addEventListener("resize", function (x) {
        return _this2.onResize(x);
      });
      this.onResize(null);
      var startSettings = this.initStartSettings();
      this._gameStart = new _gameInit2.default(this.game, this.view, startSettings);
      // Hide MRAID overlay
      wrapper_hide_splash();
    }
  }, {
    key: 'getGameTypepattern',
    value: function getGameTypepattern() {
      var pattern = '';
      var colorsArray = ['0', '1', '2']; // hack only for current creative
      this.params.characters = this.params.toCollect < this.params.characters ? this.params.toCollect : this.params.characters;
      this.params.characters = Math.max(1, Math.min(3, this.params.characters));
      this.params.toCollect = Math.max(1, this.params.toCollect);
      pattern += this.params.game_type_pattern;
      if (pattern == 'recipe') {
        var totalCount = 0;
        for (var i = 0; i < this.params.characters; i++) {
          pattern += ',';

          var count = 0;
          if (i < this.params.characters - 1) {
            count = Math.round(this.params.toCollect / this.params.characters);
            totalCount += count;
          } else {
            count = this.params.toCollect - totalCount;
          }
          pattern += '0|' + colorsArray[i] + '|' + count + '-' + count;
        }
      }
      return pattern;
    }
  }, {
    key: 'initStartSettings',
    value: function initStartSettings() {
      this.params.colors = Math.min(Math.max(2, this.params.colors), 5);
      var settings = {
        ctaIdleTime: this.params.cta_on_idle_time,
        showTutorial: this.params.show_tutorial,
        tutorialStep1Time: this.params.tutorial_step_1_time,
        tutorialStep2Time: this.params.tutorial_step_2_time,
        maxMoves: this.params.moves,
        maxScore: this.params.max_score,
        maxColors: this.params.colors,
        gameType: this.getGameTypepattern(),
        scoreAddByChip: this.params.score_add_by_chip,
        highlighHelperTime: this.params.highligh_helper_time,
        inputType: this.params.input_type,

        useEmitters: this.params.use_emitters,
        simpleChipMoves: this.params.simple_chip_moves,
        useEffects: this.params.use_effects,
        useSmallField: this.params.use_small_field
      };
      return settings;
    }
  }, {
    key: 'update',
    value: function update() {
      _get(GameState.prototype.__proto__ || Object.getPrototypeOf(GameState.prototype), 'update', this).call(this);
      this._gameStart.update();
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      // Reconfigure layout to match viewport size
      _layoutUtils2.default.RENDER_RESOLUTION = Math.max(1, 1 / _layoutUtils2.default.getDevicePixelRatio());
      _layoutUtils2.default.refreshViewDimmensions();

      // VIEW_WIDTH and VIEW_HEIGHT are in 1:1 space
      // LU.fitIntoRect(this.bg, {
      //   x: 0,
      //   y: 0,
      //   width: LU.VIEW_WIDTH,
      //   height: LU.VIEW_HEIGHT
      // }, true, 'middleCenter');

      // fit the view group into viewport
      _layoutUtils2.default.centerIntoView(this.view);
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"display/layout-utils":2,"kernel/globals":3,"objects/game-init":15}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _globals = require('kernel/globals');

var _globals2 = _interopRequireDefault(_globals);

var _layoutUtils = require('display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _creative = require('../../creative.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*var wfconfig = {

    active: function() {
      setTimeout( ()=>{
          Globals.FONT_IS_LOADED=true
      },1000)

    },

    google: {
        families: ['Fresca']
    }

};

WebFont.load(wfconfig);*/

var FontFaceObserver = require('fontfaceobserver');
var font = new FontFaceObserver('Fresca');

font.load().then(function (font) {
  setTimeout(function () {
    _globals2.default.FONT_IS_LOADED = true;
  }, 1);
});

var PreloaderState = function (_Phaser$State) {
  _inherits(PreloaderState, _Phaser$State);

  function PreloaderState() {
    _classCallCheck(this, PreloaderState);

    return _possibleConstructorReturn(this, (PreloaderState.__proto__ || Object.getPrototypeOf(PreloaderState)).apply(this, arguments));
  }

  _createClass(PreloaderState, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.stage.backgroundColor = "#010101";
      this.stage.disableVisibilityChange = true;

      this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

      this.game.scale.setResizeCallback(function (x) {
        var userRatio = _this2.game.device.pixelRatio * _layoutUtils2.default.RENDER_RESOLUTION;

        x.setGameSize(window.innerWidth * userRatio, window.innerHeight * userRatio);
        x.setUserScale(1 / userRatio, 1 / userRatio);
      });
      this.game.scale.onSizeChange.add(function (x) {
        return _this2.game.state.callbackContext.resize();
      });

      this.scale.refresh();

      _layoutUtils2.default.refreshViewDimmensions();
    }
  }, {
    key: 'preload',
    value: function preload() {

      imageLoader.registerGame(this.game);

      var root = _globals2.default.WEB_ROOT + '/img/backgrounds/';

      imageLoader.loadImage('topBackground', root + 'bg.jpg');
      imageLoader.loadImage('background', root + 'back.jpg');

      // Preload an random background
      imageLoader.loadAtlas('assets', _globals2.default.WEB_ROOT + '/texture_sheets/assets.png');
      this.game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    }
  }, {
    key: 'create',
    value: function create() {
      WebFont.load({
        google: {
          // Put your fonts to load here.
          families: ['Fresca']
        }
      });
      wrapper_preload_complete();
    }
  }, {
    key: 'loadUpdate',
    value: function loadUpdate() {
      wrapper_load_progress(this.game.load.progress);
    }
  }, {
    key: 'update',
    value: function update() {

      if (ad_state === 'ready' && _globals2.default.FONT_IS_LOADED) {
        ad_state = 'live';
        this.state.start('GameState');
      }
    }
  }]);

  return PreloaderState;
}(Phaser.State);

exports.default = PreloaderState;

},{"../../creative.json":1,"display/layout-utils":2,"fontfaceobserver":23,"kernel/globals":3}],21:[function(require,module,exports){
/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */

// vim: ts=4 sts=4 sw=4 expandtab

// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
;

// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
(function (root, factory) {
    'use strict';

    /* global define, exports, module */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function () {
    /**
     * Brings an environment as close to ECMAScript 5 compliance
     * as is possible with the facilities of erstwhile engines.
     *
     * Annotated ES5: http://es5.github.com/ (specific links below)
     * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
     * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
     */

    // Shortcut to an often accessed properties, in order to avoid multiple
    // dereference that costs universally. This also holds a reference to known-good
    // functions.
    var $Array = Array;
    var ArrayPrototype = $Array.prototype;
    var $Object = Object;
    var ObjectPrototype = $Object.prototype;
    var $Function = Function;
    var FunctionPrototype = $Function.prototype;
    var $String = String;
    var StringPrototype = $String.prototype;
    var $Number = Number;
    var NumberPrototype = $Number.prototype;
    var array_slice = ArrayPrototype.slice;
    var array_splice = ArrayPrototype.splice;
    var array_push = ArrayPrototype.push;
    var array_unshift = ArrayPrototype.unshift;
    var array_concat = ArrayPrototype.concat;
    var array_join = ArrayPrototype.join;
    var call = FunctionPrototype.call;
    var apply = FunctionPrototype.apply;
    var max = Math.max;
    var min = Math.min;

    // Having a toString local variable name breaks in Opera so use to_string.
    var to_string = ObjectPrototype.toString;

    /* global Symbol */
    /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
    var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, constructorRegex = /^\s*class /, isES6ClassFn = function isES6ClassFn(value) { try { var fnStr = fnToStr.call(value); var singleStripped = fnStr.replace(/\/\/.*\n/g, ''); var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, ''); var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' '); return constructorRegex.test(spaceStripped); } catch (e) { return false; /* not a function */ } }, tryFunctionObject = function tryFunctionObject(value) { try { if (isES6ClassFn(value)) { return false; } fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]', isCallable = function isCallable(value) { if (!value) { return false; } if (typeof value !== 'function' && typeof value !== 'object') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } if (isES6ClassFn(value)) { return false; } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };

    var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
    var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };
    /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */

    /* inlined from http://npmjs.com/define-properties */
    var supportsDescriptors = $Object.defineProperty && (function () {
        try {
            var obj = {};
            $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
            for (var _ in obj) { // jscs:ignore disallowUnusedVariables
                return false;
            }
            return obj.x === obj;
        } catch (e) { /* this is ES3 */
            return false;
        }
    }());
    var defineProperties = (function (has) {
        // Define configurable, writable, and non-enumerable props
        // if they don't exist.
        var defineProperty;
        if (supportsDescriptors) {
            defineProperty = function (object, name, method, forceAssign) {
                if (!forceAssign && (name in object)) {
                    return;
                }
                $Object.defineProperty(object, name, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: method
                });
            };
        } else {
            defineProperty = function (object, name, method, forceAssign) {
                if (!forceAssign && (name in object)) {
                    return;
                }
                object[name] = method;
            };
        }
        return function defineProperties(object, map, forceAssign) {
            for (var name in map) {
                if (has.call(map, name)) {
                    defineProperty(object, name, map[name], forceAssign);
                }
            }
        };
    }(ObjectPrototype.hasOwnProperty));

    //
    // Util
    // ======
    //

    /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */
    var isPrimitive = function isPrimitive(input) {
        var type = typeof input;
        return input === null || (type !== 'object' && type !== 'function');
    };

    var isActualNaN = $Number.isNaN || function isActualNaN(x) {
        return x !== x;
    };

    var ES = {
        // ES5 9.4
        // http://es5.github.com/#x9.4
        // http://jsperf.com/to-integer
        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */
        ToInteger: function ToInteger(num) {
            var n = +num;
            if (isActualNaN(n)) {
                n = 0;
            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
            return n;
        },

        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */
        ToPrimitive: function ToPrimitive(input) {
            var val, valueOf, toStr;
            if (isPrimitive(input)) {
                return input;
            }
            valueOf = input.valueOf;
            if (isCallable(valueOf)) {
                val = valueOf.call(input);
                if (isPrimitive(val)) {
                    return val;
                }
            }
            toStr = input.toString;
            if (isCallable(toStr)) {
                val = toStr.call(input);
                if (isPrimitive(val)) {
                    return val;
                }
            }
            throw new TypeError();
        },

        // ES5 9.9
        // http://es5.github.com/#x9.9
        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */
        ToObject: function (o) {
            if (o == null) { // this matches both null and undefined
                throw new TypeError("can't convert " + o + ' to object');
            }
            return $Object(o);
        },

        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */
        ToUint32: function ToUint32(x) {
            return x >>> 0;
        }
    };

    //
    // Function
    // ========
    //

    // ES-5 15.3.4.5
    // http://es5.github.com/#x15.3.4.5

    var Empty = function Empty() {};

    defineProperties(FunctionPrototype, {
        bind: function bind(that) { // .length is 1
            // 1. Let Target be the this value.
            var target = this;
            // 2. If IsCallable(Target) is false, throw a TypeError exception.
            if (!isCallable(target)) {
                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
            }
            // 3. Let A be a new (possibly empty) internal list of all of the
            //   argument values provided after thisArg (arg1, arg2 etc), in order.
            // XXX slicedArgs will stand in for "A" if used
            var args = array_slice.call(arguments, 1); // for normal call
            // 4. Let F be a new native ECMAScript object.
            // 11. Set the [[Prototype]] internal property of F to the standard
            //   built-in Function prototype object as specified in 15.3.3.1.
            // 12. Set the [[Call]] internal property of F as described in
            //   15.3.4.5.1.
            // 13. Set the [[Construct]] internal property of F as described in
            //   15.3.4.5.2.
            // 14. Set the [[HasInstance]] internal property of F as described in
            //   15.3.4.5.3.
            var bound;
            var binder = function () {

                if (this instanceof bound) {
                    // 15.3.4.5.2 [[Construct]]
                    // When the [[Construct]] internal method of a function object,
                    // F that was created using the bind function is called with a
                    // list of arguments ExtraArgs, the following steps are taken:
                    // 1. Let target be the value of F's [[TargetFunction]]
                    //   internal property.
                    // 2. If target has no [[Construct]] internal method, a
                    //   TypeError exception is thrown.
                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Construct]] internal
                    //   method of target providing args as the arguments.

                    var result = apply.call(
                        target,
                        this,
                        array_concat.call(args, array_slice.call(arguments))
                    );
                    if ($Object(result) === result) {
                        return result;
                    }
                    return this;

                } else {
                    // 15.3.4.5.1 [[Call]]
                    // When the [[Call]] internal method of a function object, F,
                    // which was created using the bind function is called with a
                    // this value and a list of arguments ExtraArgs, the following
                    // steps are taken:
                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
                    //   property.
                    // 3. Let target be the value of F's [[TargetFunction]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Call]] internal method
                    //   of target providing boundThis as the this value and
                    //   providing args as the arguments.

                    // equiv: target.call(this, ...boundArgs, ...args)
                    return apply.call(
                        target,
                        that,
                        array_concat.call(args, array_slice.call(arguments))
                    );

                }

            };

            // 15. If the [[Class]] internal property of Target is "Function", then
            //     a. Let L be the length property of Target minus the length of A.
            //     b. Set the length own property of F to either 0 or L, whichever is
            //       larger.
            // 16. Else set the length own property of F to 0.

            var boundLength = max(0, target.length - args.length);

            // 17. Set the attributes of the length own property of F to the values
            //   specified in 15.3.5.1.
            var boundArgs = [];
            for (var i = 0; i < boundLength; i++) {
                array_push.call(boundArgs, '$' + i);
            }

            // XXX Build a dynamic function with desired amount of arguments is the only
            // way to set the length property of a function.
            // In environments where Content Security Policies enabled (Chrome extensions,
            // for ex.) all use of eval or Function costructor throws an exception.
            // However in all of these environments Function.prototype.bind exists
            // and so this code will never be executed.
            bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);

            if (target.prototype) {
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
                // Clean up dangling references.
                Empty.prototype = null;
            }

            // TODO
            // 18. Set the [[Extensible]] internal property of F to true.

            // TODO
            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
            // 20. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
            //   false.
            // 21. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
            //   and false.

            // TODO
            // NOTE Function objects created using Function.prototype.bind do not
            // have a prototype property or the [[Code]], [[FormalParameters]], and
            // [[Scope]] internal properties.
            // XXX can't delete prototype in pure-js.

            // 22. Return F.
            return bound;
        }
    });

    // _Please note: Shortcuts are defined after `Function.prototype.bind` as we
    // use it in defining shortcuts.
    var owns = call.bind(ObjectPrototype.hasOwnProperty);
    var toStr = call.bind(ObjectPrototype.toString);
    var arraySlice = call.bind(array_slice);
    var arraySliceApply = apply.bind(array_slice);
    var strSlice = call.bind(StringPrototype.slice);
    var strSplit = call.bind(StringPrototype.split);
    var strIndexOf = call.bind(StringPrototype.indexOf);
    var pushCall = call.bind(array_push);
    var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
    var arraySort = call.bind(ArrayPrototype.sort);

    //
    // Array
    // =====
    //

    var isArray = $Array.isArray || function isArray(obj) {
        return toStr(obj) === '[object Array]';
    };

    // ES5 15.4.4.12
    // http://es5.github.com/#x15.4.4.13
    // Return len+argCount.
    // [bugfix, ielt8]
    // IE < 8 bug: [].unshift(0) === undefined but should be "1"
    var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
    defineProperties(ArrayPrototype, {
        unshift: function () {
            array_unshift.apply(this, arguments);
            return this.length;
        }
    }, hasUnshiftReturnValueBug);

    // ES5 15.4.3.2
    // http://es5.github.com/#x15.4.3.2
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
    defineProperties($Array, { isArray: isArray });

    // The IsCallable() check in the Array functions
    // has been replaced with a strict check on the
    // internal class of the object to trap cases where
    // the provided function was actually a regular
    // expression literal, which in V8 and
    // JavaScriptCore is a typeof "function".  Only in
    // V8 are regular expression literals permitted as
    // reduce parameters, so it is desirable in the
    // general case for the shim to match the more
    // strict and common behavior of rejecting regular
    // expressions.

    // ES5 15.4.4.18
    // http://es5.github.com/#x15.4.4.18
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

    // Check failure of by-index access of string characters (IE < 9)
    // and failure of `0 in boxedString` (Rhino)
    var boxedString = $Object('a');
    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

    var properlyBoxesContext = function properlyBoxed(method) {
        // Check node 0.6.21 bug where third parameter is not boxed
        var properlyBoxesNonStrict = true;
        var properlyBoxesStrict = true;
        var threwException = false;
        if (method) {
            try {
                method.call('foo', function (_, __, context) {
                    if (typeof context !== 'object') {
                        properlyBoxesNonStrict = false;
                    }
                });

                method.call([1], function () {
                    'use strict';

                    properlyBoxesStrict = typeof this === 'string';
                }, 'x');
            } catch (e) {
                threwException = true;
            }
        }
        return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
    };

    defineProperties(ArrayPrototype, {
        forEach: function forEach(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var i = -1;
            var length = ES.ToUint32(self.length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.forEach callback must be a function');
            }

            while (++i < length) {
                if (i in self) {
                    // Invoke the callback function with call, passing arguments:
                    // context, property value, property key, thisArg object
                    if (typeof T === 'undefined') {
                        callbackfn(self[i], i, object);
                    } else {
                        callbackfn.call(T, self[i], i, object);
                    }
                }
            }
        }
    }, !properlyBoxesContext(ArrayPrototype.forEach));

    // ES5 15.4.4.19
    // http://es5.github.com/#x15.4.4.19
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
    defineProperties(ArrayPrototype, {
        map: function map(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var result = $Array(length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.map callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self) {
                    if (typeof T === 'undefined') {
                        result[i] = callbackfn(self[i], i, object);
                    } else {
                        result[i] = callbackfn.call(T, self[i], i, object);
                    }
                }
            }
            return result;
        }
    }, !properlyBoxesContext(ArrayPrototype.map));

    // ES5 15.4.4.20
    // http://es5.github.com/#x15.4.4.20
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
    defineProperties(ArrayPrototype, {
        filter: function filter(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var result = [];
            var value;
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.filter callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self) {
                    value = self[i];
                    if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {
                        pushCall(result, value);
                    }
                }
            }
            return result;
        }
    }, !properlyBoxesContext(ArrayPrototype.filter));

    // ES5 15.4.4.16
    // http://es5.github.com/#x15.4.4.16
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
    defineProperties(ArrayPrototype, {
        every: function every(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.every callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                    return false;
                }
            }
            return true;
        }
    }, !properlyBoxesContext(ArrayPrototype.every));

    // ES5 15.4.4.17
    // http://es5.github.com/#x15.4.4.17
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
    defineProperties(ArrayPrototype, {
        some: function some(callbackfn/*, thisArg */) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.some callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                    return true;
                }
            }
            return false;
        }
    }, !properlyBoxesContext(ArrayPrototype.some));

    // ES5 15.4.4.21
    // http://es5.github.com/#x15.4.4.21
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
    var reduceCoercesToObject = false;
    if (ArrayPrototype.reduce) {
        reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
            return list;
        }) === 'object';
    }
    defineProperties(ArrayPrototype, {
        reduce: function reduce(callbackfn/*, initialValue*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.reduce callback must be a function');
            }

            // no value to return if no initial value and an empty array
            if (length === 0 && arguments.length === 1) {
                throw new TypeError('reduce of empty array with no initial value');
            }

            var i = 0;
            var result;
            if (arguments.length >= 2) {
                result = arguments[1];
            } else {
                do {
                    if (i in self) {
                        result = self[i++];
                        break;
                    }

                    // if array contains no values, no initial value to return
                    if (++i >= length) {
                        throw new TypeError('reduce of empty array with no initial value');
                    }
                } while (true);
            }

            for (; i < length; i++) {
                if (i in self) {
                    result = callbackfn(result, self[i], i, object);
                }
            }

            return result;
        }
    }, !reduceCoercesToObject);

    // ES5 15.4.4.22
    // http://es5.github.com/#x15.4.4.22
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
    var reduceRightCoercesToObject = false;
    if (ArrayPrototype.reduceRight) {
        reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
            return list;
        }) === 'object';
    }
    defineProperties(ArrayPrototype, {
        reduceRight: function reduceRight(callbackfn/*, initial*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.reduceRight callback must be a function');
            }

            // no value to return if no initial value, empty array
            if (length === 0 && arguments.length === 1) {
                throw new TypeError('reduceRight of empty array with no initial value');
            }

            var result;
            var i = length - 1;
            if (arguments.length >= 2) {
                result = arguments[1];
            } else {
                do {
                    if (i in self) {
                        result = self[i--];
                        break;
                    }

                    // if array contains no values, no initial value to return
                    if (--i < 0) {
                        throw new TypeError('reduceRight of empty array with no initial value');
                    }
                } while (true);
            }

            if (i < 0) {
                return result;
            }

            do {
                if (i in self) {
                    result = callbackfn(result, self[i], i, object);
                }
            } while (i--);

            return result;
        }
    }, !reduceRightCoercesToObject);

    // ES5 15.4.4.14
    // http://es5.github.com/#x15.4.4.14
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
    defineProperties(ArrayPrototype, {
        indexOf: function indexOf(searchElement/*, fromIndex */) {
            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
            var length = ES.ToUint32(self.length);

            if (length === 0) {
                return -1;
            }

            var i = 0;
            if (arguments.length > 1) {
                i = ES.ToInteger(arguments[1]);
            }

            // handle negative indices
            i = i >= 0 ? i : max(0, length + i);
            for (; i < length; i++) {
                if (i in self && self[i] === searchElement) {
                    return i;
                }
            }
            return -1;
        }
    }, hasFirefox2IndexOfBug);

    // ES5 15.4.4.15
    // http://es5.github.com/#x15.4.4.15
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
    var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
    defineProperties(ArrayPrototype, {
        lastIndexOf: function lastIndexOf(searchElement/*, fromIndex */) {
            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
            var length = ES.ToUint32(self.length);

            if (length === 0) {
                return -1;
            }
            var i = length - 1;
            if (arguments.length > 1) {
                i = min(i, ES.ToInteger(arguments[1]));
            }
            // handle negative indices
            i = i >= 0 ? i : length - Math.abs(i);
            for (; i >= 0; i--) {
                if (i in self && searchElement === self[i]) {
                    return i;
                }
            }
            return -1;
        }
    }, hasFirefox2LastIndexOfBug);

    // ES5 15.4.4.12
    // http://es5.github.com/#x15.4.4.12
    var spliceNoopReturnsEmptyArray = (function () {
        var a = [1, 2];
        var result = a.splice();
        return a.length === 2 && isArray(result) && result.length === 0;
    }());
    defineProperties(ArrayPrototype, {
        // Safari 5.0 bug where .splice() returns undefined
        splice: function splice(start, deleteCount) {
            if (arguments.length === 0) {
                return [];
            } else {
                return array_splice.apply(this, arguments);
            }
        }
    }, !spliceNoopReturnsEmptyArray);

    var spliceWorksWithEmptyObject = (function () {
        var obj = {};
        ArrayPrototype.splice.call(obj, 0, 0, 1);
        return obj.length === 1;
    }());
    defineProperties(ArrayPrototype, {
        splice: function splice(start, deleteCount) {
            if (arguments.length === 0) {
                return [];
            }
            var args = arguments;
            this.length = max(ES.ToInteger(this.length), 0);
            if (arguments.length > 0 && typeof deleteCount !== 'number') {
                args = arraySlice(arguments);
                if (args.length < 2) {
                    pushCall(args, this.length - start);
                } else {
                    args[1] = ES.ToInteger(deleteCount);
                }
            }
            return array_splice.apply(this, args);
        }
    }, !spliceWorksWithEmptyObject);
    var spliceWorksWithLargeSparseArrays = (function () {
        // Per https://github.com/es-shims/es5-shim/issues/295
        // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
        var arr = new $Array(1e5);
        // note: the index MUST be 8 or larger or the test will false pass
        arr[8] = 'x';
        arr.splice(1, 1);
        // note: this test must be defined *after* the indexOf shim
        // per https://github.com/es-shims/es5-shim/issues/313
        return arr.indexOf('x') === 7;
    }());
    var spliceWorksWithSmallSparseArrays = (function () {
        // Per https://github.com/es-shims/es5-shim/issues/295
        // Opera 12.15 breaks on this, no idea why.
        var n = 256;
        var arr = [];
        arr[n] = 'a';
        arr.splice(n + 1, 0, 'b');
        return arr[n] === 'a';
    }());
    defineProperties(ArrayPrototype, {
        splice: function splice(start, deleteCount) {
            var O = ES.ToObject(this);
            var A = [];
            var len = ES.ToUint32(O.length);
            var relativeStart = ES.ToInteger(start);
            var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);
            var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);

            var k = 0;
            var from;
            while (k < actualDeleteCount) {
                from = $String(actualStart + k);
                if (owns(O, from)) {
                    A[k] = O[from];
                }
                k += 1;
            }

            var items = arraySlice(arguments, 2);
            var itemCount = items.length;
            var to;
            if (itemCount < actualDeleteCount) {
                k = actualStart;
                var maxK = len - actualDeleteCount;
                while (k < maxK) {
                    from = $String(k + actualDeleteCount);
                    to = $String(k + itemCount);
                    if (owns(O, from)) {
                        O[to] = O[from];
                    } else {
                        delete O[to];
                    }
                    k += 1;
                }
                k = len;
                var minK = len - actualDeleteCount + itemCount;
                while (k > minK) {
                    delete O[k - 1];
                    k -= 1;
                }
            } else if (itemCount > actualDeleteCount) {
                k = len - actualDeleteCount;
                while (k > actualStart) {
                    from = $String(k + actualDeleteCount - 1);
                    to = $String(k + itemCount - 1);
                    if (owns(O, from)) {
                        O[to] = O[from];
                    } else {
                        delete O[to];
                    }
                    k -= 1;
                }
            }
            k = actualStart;
            for (var i = 0; i < items.length; ++i) {
                O[k] = items[i];
                k += 1;
            }
            O.length = len - actualDeleteCount + itemCount;

            return A;
        }
    }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);

    var originalJoin = ArrayPrototype.join;
    var hasStringJoinBug;
    try {
        hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
    } catch (e) {
        hasStringJoinBug = true;
    }
    if (hasStringJoinBug) {
        defineProperties(ArrayPrototype, {
            join: function join(separator) {
                var sep = typeof separator === 'undefined' ? ',' : separator;
                return originalJoin.call(isString(this) ? strSplit(this, '') : this, sep);
            }
        }, hasStringJoinBug);
    }

    var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';
    if (hasJoinUndefinedBug) {
        defineProperties(ArrayPrototype, {
            join: function join(separator) {
                var sep = typeof separator === 'undefined' ? ',' : separator;
                return originalJoin.call(this, sep);
            }
        }, hasJoinUndefinedBug);
    }

    var pushShim = function push(item) {
        var O = ES.ToObject(this);
        var n = ES.ToUint32(O.length);
        var i = 0;
        while (i < arguments.length) {
            O[n + i] = arguments[i];
            i += 1;
        }
        O.length = n + i;
        return n + i;
    };

    var pushIsNotGeneric = (function () {
        var obj = {};
        var result = Array.prototype.push.call(obj, undefined);
        return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);
    }());
    defineProperties(ArrayPrototype, {
        push: function push(item) {
            if (isArray(this)) {
                return array_push.apply(this, arguments);
            }
            return pushShim.apply(this, arguments);
        }
    }, pushIsNotGeneric);

    // This fixes a very weird bug in Opera 10.6 when pushing `undefined
    var pushUndefinedIsWeird = (function () {
        var arr = [];
        var result = arr.push(undefined);
        return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);
    }());
    defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);

    // ES5 15.2.3.14
    // http://es5.github.io/#x15.4.4.10
    // Fix boxed string bug
    defineProperties(ArrayPrototype, {
        slice: function (start, end) {
            var arr = isString(this) ? strSplit(this, '') : this;
            return arraySliceApply(arr, arguments);
        }
    }, splitString);

    var sortIgnoresNonFunctions = (function () {
        try {
            [1, 2].sort(null);
            [1, 2].sort({});
            return true;
        } catch (e) {}
        return false;
    }());
    var sortThrowsOnRegex = (function () {
        // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`
        try {
            [1, 2].sort(/a/);
            return false;
        } catch (e) {}
        return true;
    }());
    var sortIgnoresUndefined = (function () {
        // applies in IE 8, for one.
        try {
            [1, 2].sort(undefined);
            return true;
        } catch (e) {}
        return false;
    }());
    defineProperties(ArrayPrototype, {
        sort: function sort(compareFn) {
            if (typeof compareFn === 'undefined') {
                return arraySort(this);
            }
            if (!isCallable(compareFn)) {
                throw new TypeError('Array.prototype.sort callback must be a function');
            }
            return arraySort(this, compareFn);
        }
    }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);

    //
    // Object
    // ======
    //

    // ES5 15.2.3.14
    // http://es5.github.com/#x15.2.3.14

    // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
    var hasDontEnumBug = !isEnum({ 'toString': null }, 'toString');
    var hasProtoEnumBug = isEnum(function () {}, 'prototype');
    var hasStringEnumBug = !owns('x', '0');
    var equalsConstructorPrototype = function (o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
    };
    var blacklistedKeys = {
        $window: true,
        $console: true,
        $parent: true,
        $self: true,
        $frame: true,
        $frames: true,
        $frameElement: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $external: true
    };
    var hasAutomationEqualityBug = (function () {
        /* globals window */
        if (typeof window === 'undefined') {
            return false;
        }
        for (var k in window) {
            try {
                if (!blacklistedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {
                    equalsConstructorPrototype(window[k]);
                }
            } catch (e) {
                return true;
            }
        }
        return false;
    }());
    var equalsConstructorPrototypeIfNotBuggy = function (object) {
        if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(object);
        }
        try {
            return equalsConstructorPrototype(object);
        } catch (e) {
            return false;
        }
    };
    var dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ];
    var dontEnumsLength = dontEnums.length;

    // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
    // can be replaced with require('is-arguments') if we ever use a build process instead
    var isStandardArguments = function isArguments(value) {
        return toStr(value) === '[object Arguments]';
    };
    var isLegacyArguments = function isArguments(value) {
        return value !== null &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            value.length >= 0 &&
            !isArray(value) &&
            isCallable(value.callee);
    };
    var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;

    defineProperties($Object, {
        keys: function keys(object) {
            var isFn = isCallable(object);
            var isArgs = isArguments(object);
            var isObject = object !== null && typeof object === 'object';
            var isStr = isObject && isString(object);

            if (!isObject && !isFn && !isArgs) {
                throw new TypeError('Object.keys called on a non-object');
            }

            var theKeys = [];
            var skipProto = hasProtoEnumBug && isFn;
            if ((isStr && hasStringEnumBug) || isArgs) {
                for (var i = 0; i < object.length; ++i) {
                    pushCall(theKeys, $String(i));
                }
            }

            if (!isArgs) {
                for (var name in object) {
                    if (!(skipProto && name === 'prototype') && owns(object, name)) {
                        pushCall(theKeys, $String(name));
                    }
                }
            }

            if (hasDontEnumBug) {
                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
                for (var j = 0; j < dontEnumsLength; j++) {
                    var dontEnum = dontEnums[j];
                    if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
                        pushCall(theKeys, dontEnum);
                    }
                }
            }
            return theKeys;
        }
    });

    var keysWorksWithArguments = $Object.keys && (function () {
        // Safari 5.0 bug
        return $Object.keys(arguments).length === 2;
    }(1, 2));
    var keysHasArgumentsLengthBug = $Object.keys && (function () {
        var argKeys = $Object.keys(arguments);
        return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
    }(1));
    var originalKeys = $Object.keys;
    defineProperties($Object, {
        keys: function keys(object) {
            if (isArguments(object)) {
                return originalKeys(arraySlice(object));
            } else {
                return originalKeys(object);
            }
        }
    }, !keysWorksWithArguments || keysHasArgumentsLengthBug);

    //
    // Date
    // ====
    //

    var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
    var aNegativeTestDate = new Date(-1509842289600292);
    var aPositiveTestDate = new Date(1449662400000);
    var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';
    var hasToDateStringFormatBug;
    var hasToStringFormatBug;
    var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();
    if (timeZoneOffset < -720) {
        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';
        hasToStringFormatBug = !(/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
    } else {
        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';
        hasToStringFormatBug = !(/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
    }

    var originalGetFullYear = call.bind(Date.prototype.getFullYear);
    var originalGetMonth = call.bind(Date.prototype.getMonth);
    var originalGetDate = call.bind(Date.prototype.getDate);
    var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);
    var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);
    var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);
    var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);
    var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);
    var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);
    var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);
    var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);
    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var daysInMonth = function daysInMonth(month, year) {
        return originalGetDate(new Date(year, month, 0));
    };

    defineProperties(Date.prototype, {
        getFullYear: function getFullYear() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetFullYear(this);
            if (year < 0 && originalGetMonth(this) > 11) {
                return year + 1;
            }
            return year;
        },
        getMonth: function getMonth() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetFullYear(this);
            var month = originalGetMonth(this);
            if (year < 0 && month > 11) {
                return 0;
            }
            return month;
        },
        getDate: function getDate() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetFullYear(this);
            var month = originalGetMonth(this);
            var date = originalGetDate(this);
            if (year < 0 && month > 11) {
                if (month === 12) {
                    return date;
                }
                var days = daysInMonth(0, year + 1);
                return (days - date) + 1;
            }
            return date;
        },
        getUTCFullYear: function getUTCFullYear() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetUTCFullYear(this);
            if (year < 0 && originalGetUTCMonth(this) > 11) {
                return year + 1;
            }
            return year;
        },
        getUTCMonth: function getUTCMonth() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetUTCFullYear(this);
            var month = originalGetUTCMonth(this);
            if (year < 0 && month > 11) {
                return 0;
            }
            return month;
        },
        getUTCDate: function getUTCDate() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetUTCFullYear(this);
            var month = originalGetUTCMonth(this);
            var date = originalGetUTCDate(this);
            if (year < 0 && month > 11) {
                if (month === 12) {
                    return date;
                }
                var days = daysInMonth(0, year + 1);
                return (days - date) + 1;
            }
            return date;
        }
    }, hasNegativeMonthYearBug);

    defineProperties(Date.prototype, {
        toUTCString: function toUTCString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var day = originalGetUTCDay(this);
            var date = originalGetUTCDate(this);
            var month = originalGetUTCMonth(this);
            var year = originalGetUTCFullYear(this);
            var hour = originalGetUTCHours(this);
            var minute = originalGetUTCMinutes(this);
            var second = originalGetUTCSeconds(this);
            return dayName[day] + ', ' +
                (date < 10 ? '0' + date : date) + ' ' +
                monthName[month] + ' ' +
                year + ' ' +
                (hour < 10 ? '0' + hour : hour) + ':' +
                (minute < 10 ? '0' + minute : minute) + ':' +
                (second < 10 ? '0' + second : second) + ' GMT';
        }
    }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);

    // Opera 12 has `,`
    defineProperties(Date.prototype, {
        toDateString: function toDateString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var day = this.getDay();
            var date = this.getDate();
            var month = this.getMonth();
            var year = this.getFullYear();
            return dayName[day] + ' ' +
                monthName[month] + ' ' +
                (date < 10 ? '0' + date : date) + ' ' +
                year;
        }
    }, hasNegativeMonthYearBug || hasToDateStringFormatBug);

    // can't use defineProperties here because of toString enumeration issue in IE <= 8
    if (hasNegativeMonthYearBug || hasToStringFormatBug) {
        Date.prototype.toString = function toString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var day = this.getDay();
            var date = this.getDate();
            var month = this.getMonth();
            var year = this.getFullYear();
            var hour = this.getHours();
            var minute = this.getMinutes();
            var second = this.getSeconds();
            var timezoneOffset = this.getTimezoneOffset();
            var hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
            var minutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);
            return dayName[day] + ' ' +
                monthName[month] + ' ' +
                (date < 10 ? '0' + date : date) + ' ' +
                year + ' ' +
                (hour < 10 ? '0' + hour : hour) + ':' +
                (minute < 10 ? '0' + minute : minute) + ':' +
                (second < 10 ? '0' + second : second) + ' GMT' +
                (timezoneOffset > 0 ? '-' : '+') +
                (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset) +
                (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);
        };
        if (supportsDescriptors) {
            $Object.defineProperty(Date.prototype, 'toString', {
                configurable: true,
                enumerable: false,
                writable: true
            });
        }
    }

    // ES5 15.9.5.43
    // http://es5.github.com/#x15.9.5.43
    // This function returns a String value represent the instance in time
    // represented by this Date object. The format of the String is the Date Time
    // string format defined in 15.9.1.15. All fields are present in the String.
    // The time zone is always UTC, denoted by the suffix Z. If the time value of
    // this object is not a finite Number a RangeError exception is thrown.
    var negativeDate = -62198755200000;
    var negativeYearString = '-000001';
    var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;
    var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';

    var getTime = call.bind(Date.prototype.getTime);

    defineProperties(Date.prototype, {
        toISOString: function toISOString() {
            if (!isFinite(this) || !isFinite(getTime(this))) {
                // Adope Photoshop requires the second check.
                throw new RangeError('Date.prototype.toISOString called on non-finite value.');
            }

            var year = originalGetUTCFullYear(this);

            var month = originalGetUTCMonth(this);
            // see https://github.com/es-shims/es5-shim/issues/111
            year += Math.floor(month / 12);
            month = (month % 12 + 12) % 12;

            // the date time string format is specified in 15.9.1.15.
            var result = [month + 1, originalGetUTCDate(this), originalGetUTCHours(this), originalGetUTCMinutes(this), originalGetUTCSeconds(this)];
            year = (
                (year < 0 ? '-' : (year > 9999 ? '+' : '')) +
                strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)
            );

            for (var i = 0; i < result.length; ++i) {
                // pad months, days, hours, minutes, and seconds to have two digits.
                result[i] = strSlice('00' + result[i], -2);
            }
            // pad milliseconds to have three digits.
            return (
                year + '-' + arraySlice(result, 0, 2).join('-') +
                'T' + arraySlice(result, 2).join(':') + '.' +
                strSlice('000' + originalGetUTCMilliseconds(this), -3) + 'Z'
            );
        }
    }, hasNegativeDateBug || hasSafari51DateBug);

    // ES5 15.9.5.44
    // http://es5.github.com/#x15.9.5.44
    // This function provides a String representation of a Date object for use by
    // JSON.stringify (15.12.3).
    var dateToJSONIsSupported = (function () {
        try {
            return Date.prototype.toJSON &&
                new Date(NaN).toJSON() === null &&
                new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&
                Date.prototype.toJSON.call({ // generic
                    toISOString: function () { return true; }
                });
        } catch (e) {
            return false;
        }
    }());
    if (!dateToJSONIsSupported) {
        Date.prototype.toJSON = function toJSON(key) {
            // When the toJSON method is called with argument key, the following
            // steps are taken:

            // 1.  Let O be the result of calling ToObject, giving it the this
            // value as its argument.
            // 2. Let tv be ES.ToPrimitive(O, hint Number).
            var O = $Object(this);
            var tv = ES.ToPrimitive(O);
            // 3. If tv is a Number and is not finite, return null.
            if (typeof tv === 'number' && !isFinite(tv)) {
                return null;
            }
            // 4. Let toISO be the result of calling the [[Get]] internal method of
            // O with argument "toISOString".
            var toISO = O.toISOString;
            // 5. If IsCallable(toISO) is false, throw a TypeError exception.
            if (!isCallable(toISO)) {
                throw new TypeError('toISOString property is not callable');
            }
            // 6. Return the result of calling the [[Call]] internal method of
            //  toISO with O as the this value and an empty argument list.
            return toISO.call(O);

            // NOTE 1 The argument is ignored.

            // NOTE 2 The toJSON function is intentionally generic; it does not
            // require that its this value be a Date object. Therefore, it can be
            // transferred to other kinds of objects for use as a method. However,
            // it does require that any such object have a toISOString method. An
            // object is free to use the argument key to filter its
            // stringification.
        };
    }

    // ES5 15.9.4.2
    // http://es5.github.com/#x15.9.4.2
    // based on work shared by Daniel Friesen (dantman)
    // http://gist.github.com/303249
    var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
    var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
    var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
    if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
        // XXX global assignment won't work in embeddings that use
        // an alternate object for the context.
        /* global Date: true */
        /* eslint-disable no-undef */
        var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;
        var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());
        /* eslint-disable no-implicit-globals */
        Date = (function (NativeDate) {
        /* eslint-enable no-implicit-globals */
        /* eslint-enable no-undef */
            // Date.length === 7
            var DateShim = function Date(Y, M, D, h, m, s, ms) {
                var length = arguments.length;
                var date;
                if (this instanceof NativeDate) {
                    var seconds = s;
                    var millis = ms;
                    if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
                        // work around a Safari 8/9 bug where it treats the seconds as signed
                        var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
                        var sToShift = Math.floor(msToShift / 1e3);
                        seconds += sToShift;
                        millis -= sToShift * 1e3;
                    }
                    date = length === 1 && $String(Y) === Y ? // isString(Y)
                        // We explicitly pass it through parse:
                        new NativeDate(DateShim.parse(Y)) :
                        // We have to manually make calls depending on argument
                        // length here
                        length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis) :
                        length >= 6 ? new NativeDate(Y, M, D, h, m, seconds) :
                        length >= 5 ? new NativeDate(Y, M, D, h, m) :
                        length >= 4 ? new NativeDate(Y, M, D, h) :
                        length >= 3 ? new NativeDate(Y, M, D) :
                        length >= 2 ? new NativeDate(Y, M) :
                        length >= 1 ? new NativeDate(Y instanceof NativeDate ? +Y : Y) :
                                      new NativeDate();
                } else {
                    date = NativeDate.apply(this, arguments);
                }
                if (!isPrimitive(date)) {
                    // Prevent mixups with unfixed Date object
                    defineProperties(date, { constructor: DateShim }, true);
                }
                return date;
            };

            // 15.9.1.15 Date Time String Format.
            var isoDateExpression = new RegExp('^' +
                '(\\d{4}|[+-]\\d{6})' + // four-digit year capture or sign +
                                          // 6-digit extended year
                '(?:-(\\d{2})' + // optional month capture
                '(?:-(\\d{2})' + // optional day capture
                '(?:' + // capture hours:minutes:seconds.milliseconds
                    'T(\\d{2})' + // hours capture
                    ':(\\d{2})' + // minutes capture
                    '(?:' + // optional :seconds.milliseconds
                        ':(\\d{2})' + // seconds capture
                        '(?:(\\.\\d{1,}))?' + // milliseconds capture
                    ')?' +
                '(' + // capture UTC offset component
                    'Z|' + // UTC capture
                    '(?:' + // offset specifier +/-hours:minutes
                        '([-+])' + // sign capture
                        '(\\d{2})' + // hours offset capture
                        ':(\\d{2})' + // minutes offset capture
                    ')' +
                ')?)?)?)?' +
            '$');

            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

            var dayFromMonth = function dayFromMonth(year, month) {
                var t = month > 1 ? 1 : 0;
                return (
                    months[month] +
                    Math.floor((year - 1969 + t) / 4) -
                    Math.floor((year - 1901 + t) / 100) +
                    Math.floor((year - 1601 + t) / 400) +
                    365 * (year - 1970)
                );
            };

            var toUTC = function toUTC(t) {
                var s = 0;
                var ms = t;
                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
                    // work around a Safari 8/9 bug where it treats the seconds as signed
                    var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
                    var sToShift = Math.floor(msToShift / 1e3);
                    s += sToShift;
                    ms -= sToShift * 1e3;
                }
                return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));
            };

            // Copy any custom methods a 3rd party library may have added
            for (var key in NativeDate) {
                if (owns(NativeDate, key)) {
                    DateShim[key] = NativeDate[key];
                }
            }

            // Copy "native" methods explicitly; they may be non-enumerable
            defineProperties(DateShim, {
                now: NativeDate.now,
                UTC: NativeDate.UTC
            }, true);
            DateShim.prototype = NativeDate.prototype;
            defineProperties(DateShim.prototype, {
                constructor: DateShim
            }, true);

            // Upgrade Date.parse to handle simplified ISO 8601 strings
            var parseShim = function parse(string) {
                var match = isoDateExpression.exec(string);
                if (match) {
                    // parse months, days, hours, minutes, seconds, and milliseconds
                    // provide default values if necessary
                    // parse the UTC offset component
                    var year = $Number(match[1]),
                        month = $Number(match[2] || 1) - 1,
                        day = $Number(match[3] || 1) - 1,
                        hour = $Number(match[4] || 0),
                        minute = $Number(match[5] || 0),
                        second = $Number(match[6] || 0),
                        millisecond = Math.floor($Number(match[7] || 0) * 1000),
                        // When time zone is missed, local offset should be used
                        // (ES 5.1 bug)
                        // see https://bugs.ecmascript.org/show_bug.cgi?id=112
                        isLocalTime = Boolean(match[4] && !match[8]),
                        signOffset = match[9] === '-' ? 1 : -1,
                        hourOffset = $Number(match[10] || 0),
                        minuteOffset = $Number(match[11] || 0),
                        result;
                    var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;
                    if (
                        hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25) &&
                        minute < 60 && second < 60 && millisecond < 1000 &&
                        month > -1 && month < 12 && hourOffset < 24 &&
                        minuteOffset < 60 && // detect invalid offsets
                        day > -1 &&
                        day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))
                    ) {
                        result = (
                            (dayFromMonth(year, month) + day) * 24 +
                            hour +
                            hourOffset * signOffset
                        ) * 60;
                        result = (
                            (result + minute + minuteOffset * signOffset) * 60 +
                            second
                        ) * 1000 + millisecond;
                        if (isLocalTime) {
                            result = toUTC(result);
                        }
                        if (-8.64e15 <= result && result <= 8.64e15) {
                            return result;
                        }
                    }
                    return NaN;
                }
                return NativeDate.parse.apply(this, arguments);
            };
            defineProperties(DateShim, { parse: parseShim });

            return DateShim;
        }(Date));
        /* global Date: false */
    }

    // ES5 15.9.4.4
    // http://es5.github.com/#x15.9.4.4
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    //
    // Number
    // ======
    //

    // ES5.1 15.7.4.5
    // http://es5.github.com/#x15.7.4.5
    var hasToFixedBugs = NumberPrototype.toFixed && (
      (0.00008).toFixed(3) !== '0.000' ||
      (0.9).toFixed(0) !== '1' ||
      (1.255).toFixed(2) !== '1.25' ||
      (1000000000000000128).toFixed(0) !== '1000000000000000128'
    );

    var toFixedHelpers = {
        base: 1e7,
        size: 6,
        data: [0, 0, 0, 0, 0, 0],
        multiply: function multiply(n, c) {
            var i = -1;
            var c2 = c;
            while (++i < toFixedHelpers.size) {
                c2 += n * toFixedHelpers.data[i];
                toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
                c2 = Math.floor(c2 / toFixedHelpers.base);
            }
        },
        divide: function divide(n) {
            var i = toFixedHelpers.size;
            var c = 0;
            while (--i >= 0) {
                c += toFixedHelpers.data[i];
                toFixedHelpers.data[i] = Math.floor(c / n);
                c = (c % n) * toFixedHelpers.base;
            }
        },
        numToString: function numToString() {
            var i = toFixedHelpers.size;
            var s = '';
            while (--i >= 0) {
                if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
                    var t = $String(toFixedHelpers.data[i]);
                    if (s === '') {
                        s = t;
                    } else {
                        s += strSlice('0000000', 0, 7 - t.length) + t;
                    }
                }
            }
            return s;
        },
        pow: function pow(x, n, acc) {
            return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
        },
        log: function log(x) {
            var n = 0;
            var x2 = x;
            while (x2 >= 4096) {
                n += 12;
                x2 /= 4096;
            }
            while (x2 >= 2) {
                n += 1;
                x2 /= 2;
            }
            return n;
        }
    };

    var toFixedShim = function toFixed(fractionDigits) {
        var f, x, s, m, e, z, j, k;

        // Test for NaN and round fractionDigits down
        f = $Number(fractionDigits);
        f = isActualNaN(f) ? 0 : Math.floor(f);

        if (f < 0 || f > 20) {
            throw new RangeError('Number.toFixed called with invalid number of decimals');
        }

        x = $Number(this);

        if (isActualNaN(x)) {
            return 'NaN';
        }

        // If it is too big or small, return the string value of the number
        if (x <= -1e21 || x >= 1e21) {
            return $String(x);
        }

        s = '';

        if (x < 0) {
            s = '-';
            x = -x;
        }

        m = '0';

        if (x > 1e-21) {
            // 1e-21 < x < 1e21
            // -70 < log2(x) < 70
            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));
            z *= 0x10000000000000; // Math.pow(2, 52);
            e = 52 - e;

            // -18 < e < 122
            // x = z / 2 ^ e
            if (e > 0) {
                toFixedHelpers.multiply(0, z);
                j = f;

                while (j >= 7) {
                    toFixedHelpers.multiply(1e7, 0);
                    j -= 7;
                }

                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
                j = e - 1;

                while (j >= 23) {
                    toFixedHelpers.divide(1 << 23);
                    j -= 23;
                }

                toFixedHelpers.divide(1 << j);
                toFixedHelpers.multiply(1, 1);
                toFixedHelpers.divide(2);
                m = toFixedHelpers.numToString();
            } else {
                toFixedHelpers.multiply(0, z);
                toFixedHelpers.multiply(1 << (-e), 0);
                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);
            }
        }

        if (f > 0) {
            k = m.length;

            if (k <= f) {
                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;
            } else {
                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);
            }
        } else {
            m = s + m;
        }

        return m;
    };
    defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);

    var hasToPrecisionUndefinedBug = (function () {
        try {
            return 1.0.toPrecision(undefined) === '1';
        } catch (e) {
            return true;
        }
    }());
    var originalToPrecision = NumberPrototype.toPrecision;
    defineProperties(NumberPrototype, {
        toPrecision: function toPrecision(precision) {
            return typeof precision === 'undefined' ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);
        }
    }, hasToPrecisionUndefinedBug);

    //
    // String
    // ======
    //

    // ES5 15.5.4.14
    // http://es5.github.com/#x15.5.4.14

    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
    // Many browsers do not split properly with regular expressions or they
    // do not perform the split correctly under obscure conditions.
    // See http://blog.stevenlevithan.com/archives/cross-browser-split
    // I've tested in many browsers and this seems to cover the deviant ones:
    //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
    //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
    //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
    //       [undefined, "t", undefined, "e", ...]
    //    ''.split(/.?/) should be [], not [""]
    //    '.'.split(/()()/) should be ["."], not ["", "", "."]

    if (
        'ab'.split(/(?:ab)*/).length !== 2 ||
        '.'.split(/(.?)(.?)/).length !== 4 ||
        'tesst'.split(/(s)*/)[1] === 't' ||
        'test'.split(/(?:)/, -1).length !== 4 ||
        ''.split(/.?/).length ||
        '.'.split(/()()/).length > 1
    ) {
        (function () {
            var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
            var maxSafe32BitInt = Math.pow(2, 32) - 1;

            StringPrototype.split = function (separator, limit) {
                var string = String(this);
                if (typeof separator === 'undefined' && limit === 0) {
                    return [];
                }

                // If `separator` is not a regex, use native split
                if (!isRegex(separator)) {
                    return strSplit(this, separator, limit);
                }

                var output = [];
                var flags = (separator.ignoreCase ? 'i' : '') +
                            (separator.multiline ? 'm' : '') +
                            (separator.unicode ? 'u' : '') + // in ES6
                            (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6
                    lastLastIndex = 0,
                    // Make `global` and avoid `lastIndex` issues by working with a copy
                    separator2, match, lastIndex, lastLength;
                var separatorCopy = new RegExp(separator.source, flags + 'g');
                if (!compliantExecNpcg) {
                    // Doesn't need flags gy, but they don't hurt
                    separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
                }
                /* Values for `limit`, per the spec:
                 * If undefined: 4294967295 // maxSafe32BitInt
                 * If 0, Infinity, or NaN: 0
                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
                 * If other: Type-convert, then use the above rules
                 */
                var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);
                match = separatorCopy.exec(string);
                while (match) {
                    // `separatorCopy.lastIndex` is not reliable cross-browser
                    lastIndex = match.index + match[0].length;
                    if (lastIndex > lastLastIndex) {
                        pushCall(output, strSlice(string, lastLastIndex, match.index));
                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
                        // nonparticipating capturing groups
                        if (!compliantExecNpcg && match.length > 1) {
                            /* eslint-disable no-loop-func */
                            match[0].replace(separator2, function () {
                                for (var i = 1; i < arguments.length - 2; i++) {
                                    if (typeof arguments[i] === 'undefined') {
                                        match[i] = void 0;
                                    }
                                }
                            });
                            /* eslint-enable no-loop-func */
                        }
                        if (match.length > 1 && match.index < string.length) {
                            array_push.apply(output, arraySlice(match, 1));
                        }
                        lastLength = match[0].length;
                        lastLastIndex = lastIndex;
                        if (output.length >= splitLimit) {
                            break;
                        }
                    }
                    if (separatorCopy.lastIndex === match.index) {
                        separatorCopy.lastIndex++; // Avoid an infinite loop
                    }
                    match = separatorCopy.exec(string);
                }
                if (lastLastIndex === string.length) {
                    if (lastLength || !separatorCopy.test('')) {
                        pushCall(output, '');
                    }
                } else {
                    pushCall(output, strSlice(string, lastLastIndex));
                }
                return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;
            };
        }());

    // [bugfix, chrome]
    // If separator is undefined, then the result array contains just one String,
    // which is the this value (converted to a String). If limit is not undefined,
    // then the output array is truncated so that it contains no more than limit
    // elements.
    // "0".split(undefined, 0) -> []
    } else if ('0'.split(void 0, 0).length) {
        StringPrototype.split = function split(separator, limit) {
            if (typeof separator === 'undefined' && limit === 0) {
                return [];
            }
            return strSplit(this, separator, limit);
        };
    }

    var str_replace = StringPrototype.replace;
    var replaceReportsGroupsCorrectly = (function () {
        var groups = [];
        'x'.replace(/x(.)?/g, function (match, group) {
            pushCall(groups, group);
        });
        return groups.length === 1 && typeof groups[0] === 'undefined';
    }());

    if (!replaceReportsGroupsCorrectly) {
        StringPrototype.replace = function replace(searchValue, replaceValue) {
            var isFn = isCallable(replaceValue);
            var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
            if (!isFn || !hasCapturingGroups) {
                return str_replace.call(this, searchValue, replaceValue);
            } else {
                var wrappedReplaceValue = function (match) {
                    var length = arguments.length;
                    var originalLastIndex = searchValue.lastIndex;
                    searchValue.lastIndex = 0;
                    var args = searchValue.exec(match) || [];
                    searchValue.lastIndex = originalLastIndex;
                    pushCall(args, arguments[length - 2], arguments[length - 1]);
                    return replaceValue.apply(this, args);
                };
                return str_replace.call(this, searchValue, wrappedReplaceValue);
            }
        };
    }

    // ECMA-262, 3rd B.2.3
    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
    // non-normative section suggesting uniform semantics and it should be
    // normalized across all browsers
    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
    var string_substr = StringPrototype.substr;
    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
    defineProperties(StringPrototype, {
        substr: function substr(start, length) {
            var normalizedStart = start;
            if (start < 0) {
                normalizedStart = max(this.length + start, 0);
            }
            return string_substr.call(this, normalizedStart, length);
        }
    }, hasNegativeSubstrBug);

    // ES5 15.5.4.20
    // whitespace from: http://es5.github.io/#x15.5.4.20
    var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
        '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
        '\u2029\uFEFF';
    var zeroWidth = '\u200b';
    var wsRegexChars = '[' + ws + ']';
    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
    var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
    defineProperties(StringPrototype, {
        // http://blog.stevenlevithan.com/archives/faster-trim-javascript
        // http://perfectionkills.com/whitespace-deviations/
        trim: function trim() {
            if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
        }
    }, hasTrimWhitespaceBug);
    var trim = call.bind(String.prototype.trim);

    var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;
    defineProperties(StringPrototype, {
        lastIndexOf: function lastIndexOf(searchString) {
            if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            var S = $String(this);
            var searchStr = $String(searchString);
            var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
            var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
            var start = min(max(pos, 0), S.length);
            var searchLen = searchStr.length;
            var k = start + searchLen;
            while (k > 0) {
                k = max(0, k - searchLen);
                var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);
                if (index !== -1) {
                    return k + index;
                }
            }
            return -1;
        }
    }, hasLastIndexBug);

    var originalLastIndexOf = StringPrototype.lastIndexOf;
    defineProperties(StringPrototype, {
        lastIndexOf: function lastIndexOf(searchString) {
            return originalLastIndexOf.apply(this, arguments);
        }
    }, StringPrototype.lastIndexOf.length !== 1);

    // ES-5 15.1.2.2
    /* eslint-disable radix */
    if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
    /* eslint-enable radix */
        /* global parseInt: true */
        parseInt = (function (origParseInt) {
            var hexRegex = /^[\-+]?0[xX]/;
            return function parseInt(str, radix) {
                var string = trim(String(str));
                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
                return origParseInt(string, defaultedRadix);
            };
        }(parseInt));
    }

    // https://es5.github.io/#x15.1.2.3
    if (1 / parseFloat('-0') !== -Infinity) {
        /* global parseFloat: true */
        parseFloat = (function (origParseFloat) {
            return function parseFloat(string) {
                var inputString = trim(String(string));
                var result = origParseFloat(inputString);
                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;
            };
        }(parseFloat));
    }

    if (String(new RangeError('test')) !== 'RangeError: test') {
        var errorToStringShim = function toString() {
            if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            var name = this.name;
            if (typeof name === 'undefined') {
                name = 'Error';
            } else if (typeof name !== 'string') {
                name = $String(name);
            }
            var msg = this.message;
            if (typeof msg === 'undefined') {
                msg = '';
            } else if (typeof msg !== 'string') {
                msg = $String(msg);
            }
            if (!name) {
                return msg;
            }
            if (!msg) {
                return name;
            }
            return name + ': ' + msg;
        };
        // can't use defineProperties here because of toString enumeration issue in IE <= 8
        Error.prototype.toString = errorToStringShim;
    }

    if (supportsDescriptors) {
        var ensureNonEnumerable = function (obj, prop) {
            if (isEnum(obj, prop)) {
                var desc = Object.getOwnPropertyDescriptor(obj, prop);
                if (desc.configurable) {
                    desc.enumerable = false;
                    Object.defineProperty(obj, prop, desc);
                }
            }
        };
        ensureNonEnumerable(Error.prototype, 'message');
        if (Error.prototype.message !== '') {
            Error.prototype.message = '';
        }
        ensureNonEnumerable(Error.prototype, 'name');
    }

    if (String(/a/mig) !== '/a/gim') {
        var regexToString = function toString() {
            var str = '/' + this.source + '/';
            if (this.global) {
                str += 'g';
            }
            if (this.ignoreCase) {
                str += 'i';
            }
            if (this.multiline) {
                str += 'm';
            }
            return str;
        };
        // can't use defineProperties here because of toString enumeration issue in IE <= 8
        RegExp.prototype.toString = regexToString;
    }
}));

},{}],22:[function(require,module,exports){
(function (process,global){
 /*!
  * https://github.com/paulmillr/es6-shim
  * @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
  *   and contributors,  MIT License
  * es6-shim: v0.35.1
  * see https://github.com/paulmillr/es6-shim/blob/0.35.1/LICENSE
  * Details and documentation:
  * https://github.com/paulmillr/es6-shim/
  */

// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  /*global define, module, exports */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(this, function () {
  'use strict';

  var _apply = Function.call.bind(Function.apply);
  var _call = Function.call.bind(Function.call);
  var isArray = Array.isArray;
  var keys = Object.keys;

  var not = function notThunker(func) {
    return function notThunk() {
      return !_apply(func, this, arguments);
    };
  };
  var throwsError = function (func) {
    try {
      func();
      return false;
    } catch (e) {
      return true;
    }
  };
  var valueOrFalseIfThrows = function valueOrFalseIfThrows(func) {
    try {
      return func();
    } catch (e) {
      return false;
    }
  };

  var isCallableWithoutNew = not(throwsError);
  var arePropertyDescriptorsSupported = function () {
    // if Object.defineProperty exists but throws, it's IE 8
    return !throwsError(function () {
      Object.defineProperty({}, 'x', { get: function () {} });
    });
  };
  var supportsDescriptors = !!Object.defineProperty && arePropertyDescriptorsSupported();
  var functionsHaveNames = (function foo() {}).name === 'foo'; // eslint-disable-line no-extra-parens

  var _forEach = Function.call.bind(Array.prototype.forEach);
  var _reduce = Function.call.bind(Array.prototype.reduce);
  var _filter = Function.call.bind(Array.prototype.filter);
  var _some = Function.call.bind(Array.prototype.some);

  var defineProperty = function (object, name, value, force) {
    if (!force && name in object) { return; }
    if (supportsDescriptors) {
      Object.defineProperty(object, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value
      });
    } else {
      object[name] = value;
    }
  };

  // Define configurable, writable and non-enumerable props
  // if they don’t exist.
  var defineProperties = function (object, map, forceOverride) {
    _forEach(keys(map), function (name) {
      var method = map[name];
      defineProperty(object, name, method, !!forceOverride);
    });
  };

  var _toString = Function.call.bind(Object.prototype.toString);
  var isCallable = typeof /abc/ === 'function' ? function IsCallableSlow(x) {
    // Some old browsers (IE, FF) say that typeof /abc/ === 'function'
    return typeof x === 'function' && _toString(x) === '[object Function]';
  } : function IsCallableFast(x) { return typeof x === 'function'; };

  var Value = {
    getter: function (object, name, getter) {
      if (!supportsDescriptors) {
        throw new TypeError('getters require true ES5 support');
      }
      Object.defineProperty(object, name, {
        configurable: true,
        enumerable: false,
        get: getter
      });
    },
    proxy: function (originalObject, key, targetObject) {
      if (!supportsDescriptors) {
        throw new TypeError('getters require true ES5 support');
      }
      var originalDescriptor = Object.getOwnPropertyDescriptor(originalObject, key);
      Object.defineProperty(targetObject, key, {
        configurable: originalDescriptor.configurable,
        enumerable: originalDescriptor.enumerable,
        get: function getKey() { return originalObject[key]; },
        set: function setKey(value) { originalObject[key] = value; }
      });
    },
    redefine: function (object, property, newValue) {
      if (supportsDescriptors) {
        var descriptor = Object.getOwnPropertyDescriptor(object, property);
        descriptor.value = newValue;
        Object.defineProperty(object, property, descriptor);
      } else {
        object[property] = newValue;
      }
    },
    defineByDescriptor: function (object, property, descriptor) {
      if (supportsDescriptors) {
        Object.defineProperty(object, property, descriptor);
      } else if ('value' in descriptor) {
        object[property] = descriptor.value;
      }
    },
    preserveToString: function (target, source) {
      if (source && isCallable(source.toString)) {
        defineProperty(target, 'toString', source.toString.bind(source), true);
      }
    }
  };

  // Simple shim for Object.create on ES3 browsers
  // (unlike real shim, no attempt to support `prototype === null`)
  var create = Object.create || function (prototype, properties) {
    var Prototype = function Prototype() {};
    Prototype.prototype = prototype;
    var object = new Prototype();
    if (typeof properties !== 'undefined') {
      keys(properties).forEach(function (key) {
        Value.defineByDescriptor(object, key, properties[key]);
      });
    }
    return object;
  };

  var supportsSubclassing = function (C, f) {
    if (!Object.setPrototypeOf) { return false; /* skip test on IE < 11 */ }
    return valueOrFalseIfThrows(function () {
      var Sub = function Subclass(arg) {
        var o = new C(arg);
        Object.setPrototypeOf(o, Subclass.prototype);
        return o;
      };
      Object.setPrototypeOf(Sub, C);
      Sub.prototype = create(C.prototype, {
        constructor: { value: Sub }
      });
      return f(Sub);
    });
  };

  var getGlobal = function () {
    /* global self, window, global */
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
  };

  var globals = getGlobal();
  var globalIsFinite = globals.isFinite;
  var _indexOf = Function.call.bind(String.prototype.indexOf);
  var _arrayIndexOfApply = Function.apply.bind(Array.prototype.indexOf);
  var _concat = Function.call.bind(Array.prototype.concat);
  // var _sort = Function.call.bind(Array.prototype.sort);
  var _strSlice = Function.call.bind(String.prototype.slice);
  var _push = Function.call.bind(Array.prototype.push);
  var _pushApply = Function.apply.bind(Array.prototype.push);
  var _shift = Function.call.bind(Array.prototype.shift);
  var _max = Math.max;
  var _min = Math.min;
  var _floor = Math.floor;
  var _abs = Math.abs;
  var _exp = Math.exp;
  var _log = Math.log;
  var _sqrt = Math.sqrt;
  var _hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
  var ArrayIterator; // make our implementation private
  var noop = function () {};

  var OrigMap = globals.Map;
  var origMapDelete = OrigMap && OrigMap.prototype['delete'];
  var origMapGet = OrigMap && OrigMap.prototype.get;
  var origMapHas = OrigMap && OrigMap.prototype.has;
  var origMapSet = OrigMap && OrigMap.prototype.set;

  var Symbol = globals.Symbol || {};
  var symbolSpecies = Symbol.species || '@@species';

  var numberIsNaN = Number.isNaN || function isNaN(value) {
    // NaN !== NaN, but they are identical.
    // NaNs are the only non-reflexive value, i.e., if x !== x,
    // then x is NaN.
    // isNaN is broken: it converts its argument to number, so
    // isNaN('foo') => true
    return value !== value;
  };
  var numberIsFinite = Number.isFinite || function isFinite(value) {
    return typeof value === 'number' && globalIsFinite(value);
  };
  var _sign = isCallable(Math.sign) ? Math.sign : function sign(value) {
    var number = Number(value);
    if (number === 0) { return number; }
    if (numberIsNaN(number)) { return number; }
    return number < 0 ? -1 : 1;
  };

  // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
  // can be replaced with require('is-arguments') if we ever use a build process instead
  var isStandardArguments = function isArguments(value) {
    return _toString(value) === '[object Arguments]';
  };
  var isLegacyArguments = function isArguments(value) {
    return value !== null &&
      typeof value === 'object' &&
      typeof value.length === 'number' &&
      value.length >= 0 &&
      _toString(value) !== '[object Array]' &&
      _toString(value.callee) === '[object Function]';
  };
  var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;

  var Type = {
    primitive: function (x) { return x === null || (typeof x !== 'function' && typeof x !== 'object'); },
    string: function (x) { return _toString(x) === '[object String]'; },
    regex: function (x) { return _toString(x) === '[object RegExp]'; },
    symbol: function (x) {
      return typeof globals.Symbol === 'function' && typeof x === 'symbol';
    }
  };

  var overrideNative = function overrideNative(object, property, replacement) {
    var original = object[property];
    defineProperty(object, property, replacement, true);
    Value.preserveToString(object[property], original);
  };

  // eslint-disable-next-line no-restricted-properties
  var hasSymbols = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' && Type.symbol(Symbol());

  // This is a private name in the es6 spec, equal to '[Symbol.iterator]'
  // we're going to use an arbitrary _-prefixed name to make our shims
  // work properly with each other, even though we don't have full Iterator
  // support.  That is, `Array.from(map.keys())` will work, but we don't
  // pretend to export a "real" Iterator interface.
  var $iterator$ = Type.symbol(Symbol.iterator) ? Symbol.iterator : '_es6-shim iterator_';
  // Firefox ships a partial implementation using the name @@iterator.
  // https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
  // So use that name if we detect it.
  if (globals.Set && typeof new globals.Set()['@@iterator'] === 'function') {
    $iterator$ = '@@iterator';
  }

  // Reflect
  if (!globals.Reflect) {
    defineProperty(globals, 'Reflect', {}, true);
  }
  var Reflect = globals.Reflect;

  var $String = String;

  /* global document */
  var domAll = (typeof document === 'undefined' || !document) ? null : document.all;
  /* jshint eqnull:true */
  var isNullOrUndefined = domAll == null ? function isNullOrUndefined(x) {
    /* jshint eqnull:true */
    return x == null;
  } : function isNullOrUndefinedAndNotDocumentAll(x) {
    /* jshint eqnull:true */
    return x == null && x !== domAll;
  };

  var ES = {
    // http://www.ecma-international.org/ecma-262/6.0/#sec-call
    Call: function Call(F, V) {
      var args = arguments.length > 2 ? arguments[2] : [];
      if (!ES.IsCallable(F)) {
        throw new TypeError(F + ' is not a function');
      }
      return _apply(F, V, args);
    },

    RequireObjectCoercible: function (x, optMessage) {
      if (isNullOrUndefined(x)) {
        throw new TypeError(optMessage || 'Cannot call method on ' + x);
      }
      return x;
    },

    // This might miss the "(non-standard exotic and does not implement
    // [[Call]])" case from
    // http://www.ecma-international.org/ecma-262/6.0/#sec-typeof-operator-runtime-semantics-evaluation
    // but we can't find any evidence these objects exist in practice.
    // If we find some in the future, you could test `Object(x) === x`,
    // which is reliable according to
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toobject
    // but is not well optimized by runtimes and creates an object
    // whenever it returns false, and thus is very slow.
    TypeIsObject: function (x) {
      if (x === void 0 || x === null || x === true || x === false) {
        return false;
      }
      return typeof x === 'function' || typeof x === 'object' || x === domAll;
    },

    ToObject: function (o, optMessage) {
      return Object(ES.RequireObjectCoercible(o, optMessage));
    },

    IsCallable: isCallable,

    IsConstructor: function (x) {
      // We can't tell callables from constructors in ES5
      return ES.IsCallable(x);
    },

    ToInt32: function (x) {
      return ES.ToNumber(x) >> 0;
    },

    ToUint32: function (x) {
      return ES.ToNumber(x) >>> 0;
    },

    ToNumber: function (value) {
      if (_toString(value) === '[object Symbol]') {
        throw new TypeError('Cannot convert a Symbol value to a number');
      }
      return +value;
    },

    ToInteger: function (value) {
      var number = ES.ToNumber(value);
      if (numberIsNaN(number)) { return 0; }
      if (number === 0 || !numberIsFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * _floor(_abs(number));
    },

    ToLength: function (value) {
      var len = ES.ToInteger(value);
      if (len <= 0) { return 0; } // includes converting -0 to +0
      if (len > Number.MAX_SAFE_INTEGER) { return Number.MAX_SAFE_INTEGER; }
      return len;
    },

    SameValue: function (a, b) {
      if (a === b) {
        // 0 === -0, but they are not identical.
        if (a === 0) { return 1 / a === 1 / b; }
        return true;
      }
      return numberIsNaN(a) && numberIsNaN(b);
    },

    SameValueZero: function (a, b) {
      // same as SameValue except for SameValueZero(+0, -0) == true
      return (a === b) || (numberIsNaN(a) && numberIsNaN(b));
    },

    IsIterable: function (o) {
      return ES.TypeIsObject(o) && (typeof o[$iterator$] !== 'undefined' || isArguments(o));
    },

    GetIterator: function (o) {
      if (isArguments(o)) {
        // special case support for `arguments`
        return new ArrayIterator(o, 'value');
      }
      var itFn = ES.GetMethod(o, $iterator$);
      if (!ES.IsCallable(itFn)) {
        // Better diagnostics if itFn is null or undefined
        throw new TypeError('value is not an iterable');
      }
      var it = ES.Call(itFn, o);
      if (!ES.TypeIsObject(it)) {
        throw new TypeError('bad iterator');
      }
      return it;
    },

    GetMethod: function (o, p) {
      var func = ES.ToObject(o)[p];
      if (isNullOrUndefined(func)) {
        return void 0;
      }
      if (!ES.IsCallable(func)) {
        throw new TypeError('Method not callable: ' + p);
      }
      return func;
    },

    IteratorComplete: function (iterResult) {
      return !!iterResult.done;
    },

    IteratorClose: function (iterator, completionIsThrow) {
      var returnMethod = ES.GetMethod(iterator, 'return');
      if (returnMethod === void 0) {
        return;
      }
      var innerResult, innerException;
      try {
        innerResult = ES.Call(returnMethod, iterator);
      } catch (e) {
        innerException = e;
      }
      if (completionIsThrow) {
        return;
      }
      if (innerException) {
        throw innerException;
      }
      if (!ES.TypeIsObject(innerResult)) {
        throw new TypeError("Iterator's return method returned a non-object.");
      }
    },

    IteratorNext: function (it) {
      var result = arguments.length > 1 ? it.next(arguments[1]) : it.next();
      if (!ES.TypeIsObject(result)) {
        throw new TypeError('bad iterator');
      }
      return result;
    },

    IteratorStep: function (it) {
      var result = ES.IteratorNext(it);
      var done = ES.IteratorComplete(result);
      return done ? false : result;
    },

    Construct: function (C, args, newTarget, isES6internal) {
      var target = typeof newTarget === 'undefined' ? C : newTarget;

      if (!isES6internal && Reflect.construct) {
        // Try to use Reflect.construct if available
        return Reflect.construct(C, args, target);
      }
      // OK, we have to fake it.  This will only work if the
      // C.[[ConstructorKind]] == "base" -- but that's the only
      // kind we can make in ES5 code anyway.

      // OrdinaryCreateFromConstructor(target, "%ObjectPrototype%")
      var proto = target.prototype;
      if (!ES.TypeIsObject(proto)) {
        proto = Object.prototype;
      }
      var obj = create(proto);
      // Call the constructor.
      var result = ES.Call(C, obj, args);
      return ES.TypeIsObject(result) ? result : obj;
    },

    SpeciesConstructor: function (O, defaultConstructor) {
      var C = O.constructor;
      if (C === void 0) {
        return defaultConstructor;
      }
      if (!ES.TypeIsObject(C)) {
        throw new TypeError('Bad constructor');
      }
      var S = C[symbolSpecies];
      if (isNullOrUndefined(S)) {
        return defaultConstructor;
      }
      if (!ES.IsConstructor(S)) {
        throw new TypeError('Bad @@species');
      }
      return S;
    },

    CreateHTML: function (string, tag, attribute, value) {
      var S = ES.ToString(string);
      var p1 = '<' + tag;
      if (attribute !== '') {
        var V = ES.ToString(value);
        var escapedV = V.replace(/"/g, '&quot;');
        p1 += ' ' + attribute + '="' + escapedV + '"';
      }
      var p2 = p1 + '>';
      var p3 = p2 + S;
      return p3 + '</' + tag + '>';
    },

    IsRegExp: function IsRegExp(argument) {
      if (!ES.TypeIsObject(argument)) {
        return false;
      }
      var isRegExp = argument[Symbol.match];
      if (typeof isRegExp !== 'undefined') {
        return !!isRegExp;
      }
      return Type.regex(argument);
    },

    ToString: function ToString(string) {
      return $String(string);
    }
  };

  // Well-known Symbol shims
  if (supportsDescriptors && hasSymbols) {
    var defineWellKnownSymbol = function defineWellKnownSymbol(name) {
      if (Type.symbol(Symbol[name])) {
        return Symbol[name];
      }
      // eslint-disable-next-line no-restricted-properties
      var sym = Symbol['for']('Symbol.' + name);
      Object.defineProperty(Symbol, name, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: sym
      });
      return sym;
    };
    if (!Type.symbol(Symbol.search)) {
      var symbolSearch = defineWellKnownSymbol('search');
      var originalSearch = String.prototype.search;
      defineProperty(RegExp.prototype, symbolSearch, function search(string) {
        return ES.Call(originalSearch, string, [this]);
      });
      var searchShim = function search(regexp) {
        var O = ES.RequireObjectCoercible(this);
        if (!isNullOrUndefined(regexp)) {
          var searcher = ES.GetMethod(regexp, symbolSearch);
          if (typeof searcher !== 'undefined') {
            return ES.Call(searcher, regexp, [O]);
          }
        }
        return ES.Call(originalSearch, O, [ES.ToString(regexp)]);
      };
      overrideNative(String.prototype, 'search', searchShim);
    }
    if (!Type.symbol(Symbol.replace)) {
      var symbolReplace = defineWellKnownSymbol('replace');
      var originalReplace = String.prototype.replace;
      defineProperty(RegExp.prototype, symbolReplace, function replace(string, replaceValue) {
        return ES.Call(originalReplace, string, [this, replaceValue]);
      });
      var replaceShim = function replace(searchValue, replaceValue) {
        var O = ES.RequireObjectCoercible(this);
        if (!isNullOrUndefined(searchValue)) {
          var replacer = ES.GetMethod(searchValue, symbolReplace);
          if (typeof replacer !== 'undefined') {
            return ES.Call(replacer, searchValue, [O, replaceValue]);
          }
        }
        return ES.Call(originalReplace, O, [ES.ToString(searchValue), replaceValue]);
      };
      overrideNative(String.prototype, 'replace', replaceShim);
    }
    if (!Type.symbol(Symbol.split)) {
      var symbolSplit = defineWellKnownSymbol('split');
      var originalSplit = String.prototype.split;
      defineProperty(RegExp.prototype, symbolSplit, function split(string, limit) {
        return ES.Call(originalSplit, string, [this, limit]);
      });
      var splitShim = function split(separator, limit) {
        var O = ES.RequireObjectCoercible(this);
        if (!isNullOrUndefined(separator)) {
          var splitter = ES.GetMethod(separator, symbolSplit);
          if (typeof splitter !== 'undefined') {
            return ES.Call(splitter, separator, [O, limit]);
          }
        }
        return ES.Call(originalSplit, O, [ES.ToString(separator), limit]);
      };
      overrideNative(String.prototype, 'split', splitShim);
    }
    var symbolMatchExists = Type.symbol(Symbol.match);
    var stringMatchIgnoresSymbolMatch = symbolMatchExists && (function () {
      // Firefox 41, through Nightly 45 has Symbol.match, but String#match ignores it.
      // Firefox 40 and below have Symbol.match but String#match works fine.
      var o = {};
      o[Symbol.match] = function () { return 42; };
      return 'a'.match(o) !== 42;
    }());
    if (!symbolMatchExists || stringMatchIgnoresSymbolMatch) {
      var symbolMatch = defineWellKnownSymbol('match');

      var originalMatch = String.prototype.match;
      defineProperty(RegExp.prototype, symbolMatch, function match(string) {
        return ES.Call(originalMatch, string, [this]);
      });

      var matchShim = function match(regexp) {
        var O = ES.RequireObjectCoercible(this);
        if (!isNullOrUndefined(regexp)) {
          var matcher = ES.GetMethod(regexp, symbolMatch);
          if (typeof matcher !== 'undefined') {
            return ES.Call(matcher, regexp, [O]);
          }
        }
        return ES.Call(originalMatch, O, [ES.ToString(regexp)]);
      };
      overrideNative(String.prototype, 'match', matchShim);
    }
  }

  var wrapConstructor = function wrapConstructor(original, replacement, keysToSkip) {
    Value.preserveToString(replacement, original);
    if (Object.setPrototypeOf) {
      // sets up proper prototype chain where possible
      Object.setPrototypeOf(original, replacement);
    }
    if (supportsDescriptors) {
      _forEach(Object.getOwnPropertyNames(original), function (key) {
        if (key in noop || keysToSkip[key]) { return; }
        Value.proxy(original, key, replacement);
      });
    } else {
      _forEach(Object.keys(original), function (key) {
        if (key in noop || keysToSkip[key]) { return; }
        replacement[key] = original[key];
      });
    }
    replacement.prototype = original.prototype;
    Value.redefine(original.prototype, 'constructor', replacement);
  };

  var defaultSpeciesGetter = function () { return this; };
  var addDefaultSpecies = function (C) {
    if (supportsDescriptors && !_hasOwnProperty(C, symbolSpecies)) {
      Value.getter(C, symbolSpecies, defaultSpeciesGetter);
    }
  };

  var addIterator = function (prototype, impl) {
    var implementation = impl || function iterator() { return this; };
    defineProperty(prototype, $iterator$, implementation);
    if (!prototype[$iterator$] && Type.symbol($iterator$)) {
      // implementations are buggy when $iterator$ is a Symbol
      prototype[$iterator$] = implementation;
    }
  };

  var createDataProperty = function createDataProperty(object, name, value) {
    if (supportsDescriptors) {
      Object.defineProperty(object, name, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: value
      });
    } else {
      object[name] = value;
    }
  };
  var createDataPropertyOrThrow = function createDataPropertyOrThrow(object, name, value) {
    createDataProperty(object, name, value);
    if (!ES.SameValue(object[name], value)) {
      throw new TypeError('property is nonconfigurable');
    }
  };

  var emulateES6construct = function (o, defaultNewTarget, defaultProto, slots) {
    // This is an es5 approximation to es6 construct semantics.  in es6,
    // 'new Foo' invokes Foo.[[Construct]] which (for almost all objects)
    // just sets the internal variable NewTarget (in es6 syntax `new.target`)
    // to Foo and then returns Foo().

    // Many ES6 object then have constructors of the form:
    // 1. If NewTarget is undefined, throw a TypeError exception
    // 2. Let xxx by OrdinaryCreateFromConstructor(NewTarget, yyy, zzz)

    // So we're going to emulate those first two steps.
    if (!ES.TypeIsObject(o)) {
      throw new TypeError('Constructor requires `new`: ' + defaultNewTarget.name);
    }
    var proto = defaultNewTarget.prototype;
    if (!ES.TypeIsObject(proto)) {
      proto = defaultProto;
    }
    var obj = create(proto);
    for (var name in slots) {
      if (_hasOwnProperty(slots, name)) {
        var value = slots[name];
        defineProperty(obj, name, value, true);
      }
    }
    return obj;
  };

  // Firefox 31 reports this function's length as 0
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1062484
  if (String.fromCodePoint && String.fromCodePoint.length !== 1) {
    var originalFromCodePoint = String.fromCodePoint;
    overrideNative(String, 'fromCodePoint', function fromCodePoint(codePoints) {
      return ES.Call(originalFromCodePoint, this, arguments);
    });
  }

  var StringShims = {
    fromCodePoint: function fromCodePoint(codePoints) {
      var result = [];
      var next;
      for (var i = 0, length = arguments.length; i < length; i++) {
        next = Number(arguments[i]);
        if (!ES.SameValue(next, ES.ToInteger(next)) || next < 0 || next > 0x10FFFF) {
          throw new RangeError('Invalid code point ' + next);
        }

        if (next < 0x10000) {
          _push(result, String.fromCharCode(next));
        } else {
          next -= 0x10000;
          _push(result, String.fromCharCode((next >> 10) + 0xD800));
          _push(result, String.fromCharCode((next % 0x400) + 0xDC00));
        }
      }
      return result.join('');
    },

    raw: function raw(callSite) {
      var cooked = ES.ToObject(callSite, 'bad callSite');
      var rawString = ES.ToObject(cooked.raw, 'bad raw value');
      var len = rawString.length;
      var literalsegments = ES.ToLength(len);
      if (literalsegments <= 0) {
        return '';
      }

      var stringElements = [];
      var nextIndex = 0;
      var nextKey, next, nextSeg, nextSub;
      while (nextIndex < literalsegments) {
        nextKey = ES.ToString(nextIndex);
        nextSeg = ES.ToString(rawString[nextKey]);
        _push(stringElements, nextSeg);
        if (nextIndex + 1 >= literalsegments) {
          break;
        }
        next = nextIndex + 1 < arguments.length ? arguments[nextIndex + 1] : '';
        nextSub = ES.ToString(next);
        _push(stringElements, nextSub);
        nextIndex += 1;
      }
      return stringElements.join('');
    }
  };
  if (String.raw && String.raw({ raw: { 0: 'x', 1: 'y', length: 2 } }) !== 'xy') {
    // IE 11 TP has a broken String.raw implementation
    overrideNative(String, 'raw', StringShims.raw);
  }
  defineProperties(String, StringShims);

  // Fast repeat, uses the `Exponentiation by squaring` algorithm.
  // Perf: http://jsperf.com/string-repeat2/2
  var stringRepeat = function repeat(s, times) {
    if (times < 1) { return ''; }
    if (times % 2) { return repeat(s, times - 1) + s; }
    var half = repeat(s, times / 2);
    return half + half;
  };
  var stringMaxLength = Infinity;

  var StringPrototypeShims = {
    repeat: function repeat(times) {
      var thisStr = ES.ToString(ES.RequireObjectCoercible(this));
      var numTimes = ES.ToInteger(times);
      if (numTimes < 0 || numTimes >= stringMaxLength) {
        throw new RangeError('repeat count must be less than infinity and not overflow maximum string size');
      }
      return stringRepeat(thisStr, numTimes);
    },

    startsWith: function startsWith(searchString) {
      var S = ES.ToString(ES.RequireObjectCoercible(this));
      if (ES.IsRegExp(searchString)) {
        throw new TypeError('Cannot call method "startsWith" with a regex');
      }
      var searchStr = ES.ToString(searchString);
      var position;
      if (arguments.length > 1) {
        position = arguments[1];
      }
      var start = _max(ES.ToInteger(position), 0);
      return _strSlice(S, start, start + searchStr.length) === searchStr;
    },

    endsWith: function endsWith(searchString) {
      var S = ES.ToString(ES.RequireObjectCoercible(this));
      if (ES.IsRegExp(searchString)) {
        throw new TypeError('Cannot call method "endsWith" with a regex');
      }
      var searchStr = ES.ToString(searchString);
      var len = S.length;
      var endPosition;
      if (arguments.length > 1) {
        endPosition = arguments[1];
      }
      var pos = typeof endPosition === 'undefined' ? len : ES.ToInteger(endPosition);
      var end = _min(_max(pos, 0), len);
      return _strSlice(S, end - searchStr.length, end) === searchStr;
    },

    includes: function includes(searchString) {
      if (ES.IsRegExp(searchString)) {
        throw new TypeError('"includes" does not accept a RegExp');
      }
      var searchStr = ES.ToString(searchString);
      var position;
      if (arguments.length > 1) {
        position = arguments[1];
      }
      // Somehow this trick makes method 100% compat with the spec.
      return _indexOf(this, searchStr, position) !== -1;
    },

    codePointAt: function codePointAt(pos) {
      var thisStr = ES.ToString(ES.RequireObjectCoercible(this));
      var position = ES.ToInteger(pos);
      var length = thisStr.length;
      if (position >= 0 && position < length) {
        var first = thisStr.charCodeAt(position);
        var isEnd = position + 1 === length;
        if (first < 0xD800 || first > 0xDBFF || isEnd) { return first; }
        var second = thisStr.charCodeAt(position + 1);
        if (second < 0xDC00 || second > 0xDFFF) { return first; }
        return ((first - 0xD800) * 1024) + (second - 0xDC00) + 0x10000;
      }
    }
  };
  if (String.prototype.includes && 'a'.includes('a', Infinity) !== false) {
    overrideNative(String.prototype, 'includes', StringPrototypeShims.includes);
  }

  if (String.prototype.startsWith && String.prototype.endsWith) {
    var startsWithRejectsRegex = throwsError(function () {
      /* throws if spec-compliant */
      '/a/'.startsWith(/a/);
    });
    var startsWithHandlesInfinity = valueOrFalseIfThrows(function () {
      return 'abc'.startsWith('a', Infinity) === false;
    });
    if (!startsWithRejectsRegex || !startsWithHandlesInfinity) {
      // Firefox (< 37?) and IE 11 TP have a noncompliant startsWith implementation
      overrideNative(String.prototype, 'startsWith', StringPrototypeShims.startsWith);
      overrideNative(String.prototype, 'endsWith', StringPrototypeShims.endsWith);
    }
  }
  if (hasSymbols) {
    var startsWithSupportsSymbolMatch = valueOrFalseIfThrows(function () {
      var re = /a/;
      re[Symbol.match] = false;
      return '/a/'.startsWith(re);
    });
    if (!startsWithSupportsSymbolMatch) {
      overrideNative(String.prototype, 'startsWith', StringPrototypeShims.startsWith);
    }
    var endsWithSupportsSymbolMatch = valueOrFalseIfThrows(function () {
      var re = /a/;
      re[Symbol.match] = false;
      return '/a/'.endsWith(re);
    });
    if (!endsWithSupportsSymbolMatch) {
      overrideNative(String.prototype, 'endsWith', StringPrototypeShims.endsWith);
    }
    var includesSupportsSymbolMatch = valueOrFalseIfThrows(function () {
      var re = /a/;
      re[Symbol.match] = false;
      return '/a/'.includes(re);
    });
    if (!includesSupportsSymbolMatch) {
      overrideNative(String.prototype, 'includes', StringPrototypeShims.includes);
    }
  }

  defineProperties(String.prototype, StringPrototypeShims);

  // whitespace from: http://es5.github.io/#x15.5.4.20
  // implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
  var ws = [
    '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
    '\u2029\uFEFF'
  ].join('');
  var trimRegexp = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
  var trimShim = function trim() {
    return ES.ToString(ES.RequireObjectCoercible(this)).replace(trimRegexp, '');
  };
  var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
  var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
  var isBadHexRegex = /^[-+]0x[0-9a-f]+$/i;
  var hasStringTrimBug = nonWS.trim().length !== nonWS.length;
  defineProperty(String.prototype, 'trim', trimShim, hasStringTrimBug);

  // Given an argument x, it will return an IteratorResult object,
  // with value set to x and done to false.
  // Given no arguments, it will return an iterator completion object.
  var iteratorResult = function (x) {
    return { value: x, done: arguments.length === 0 };
  };

  // see http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype-@@iterator
  var StringIterator = function (s) {
    ES.RequireObjectCoercible(s);
    this._s = ES.ToString(s);
    this._i = 0;
  };
  StringIterator.prototype.next = function () {
    var s = this._s;
    var i = this._i;
    if (typeof s === 'undefined' || i >= s.length) {
      this._s = void 0;
      return iteratorResult();
    }
    var first = s.charCodeAt(i);
    var second, len;
    if (first < 0xD800 || first > 0xDBFF || (i + 1) === s.length) {
      len = 1;
    } else {
      second = s.charCodeAt(i + 1);
      len = (second < 0xDC00 || second > 0xDFFF) ? 1 : 2;
    }
    this._i = i + len;
    return iteratorResult(s.substr(i, len));
  };
  addIterator(StringIterator.prototype);
  addIterator(String.prototype, function () {
    return new StringIterator(this);
  });

  var ArrayShims = {
    from: function from(items) {
      var C = this;
      var mapFn;
      if (arguments.length > 1) {
        mapFn = arguments[1];
      }
      var mapping, T;
      if (typeof mapFn === 'undefined') {
        mapping = false;
      } else {
        if (!ES.IsCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        if (arguments.length > 2) {
          T = arguments[2];
        }
        mapping = true;
      }

      // Note that that Arrays will use ArrayIterator:
      // https://bugs.ecmascript.org/show_bug.cgi?id=2416
      var usingIterator = typeof (isArguments(items) || ES.GetMethod(items, $iterator$)) !== 'undefined';

      var length, result, i;
      if (usingIterator) {
        result = ES.IsConstructor(C) ? Object(new C()) : [];
        var iterator = ES.GetIterator(items);
        var next, nextValue;

        i = 0;
        while (true) {
          next = ES.IteratorStep(iterator);
          if (next === false) {
            break;
          }
          nextValue = next.value;
          try {
            if (mapping) {
              nextValue = typeof T === 'undefined' ? mapFn(nextValue, i) : _call(mapFn, T, nextValue, i);
            }
            result[i] = nextValue;
          } catch (e) {
            ES.IteratorClose(iterator, true);
            throw e;
          }
          i += 1;
        }
        length = i;
      } else {
        var arrayLike = ES.ToObject(items);
        length = ES.ToLength(arrayLike.length);
        result = ES.IsConstructor(C) ? Object(new C(length)) : new Array(length);
        var value;
        for (i = 0; i < length; ++i) {
          value = arrayLike[i];
          if (mapping) {
            value = typeof T === 'undefined' ? mapFn(value, i) : _call(mapFn, T, value, i);
          }
          createDataPropertyOrThrow(result, i, value);
        }
      }

      result.length = length;
      return result;
    },

    of: function of() {
      var len = arguments.length;
      var C = this;
      var A = isArray(C) || !ES.IsCallable(C) ? new Array(len) : ES.Construct(C, [len]);
      for (var k = 0; k < len; ++k) {
        createDataPropertyOrThrow(A, k, arguments[k]);
      }
      A.length = len;
      return A;
    }
  };
  defineProperties(Array, ArrayShims);
  addDefaultSpecies(Array);

  // Our ArrayIterator is private; see
  // https://github.com/paulmillr/es6-shim/issues/252
  ArrayIterator = function (array, kind) {
    this.i = 0;
    this.array = array;
    this.kind = kind;
  };

  defineProperties(ArrayIterator.prototype, {
    next: function () {
      var i = this.i;
      var array = this.array;
      if (!(this instanceof ArrayIterator)) {
        throw new TypeError('Not an ArrayIterator');
      }
      if (typeof array !== 'undefined') {
        var len = ES.ToLength(array.length);
        for (; i < len; i++) {
          var kind = this.kind;
          var retval;
          if (kind === 'key') {
            retval = i;
          } else if (kind === 'value') {
            retval = array[i];
          } else if (kind === 'entry') {
            retval = [i, array[i]];
          }
          this.i = i + 1;
          return iteratorResult(retval);
        }
      }
      this.array = void 0;
      return iteratorResult();
    }
  });
  addIterator(ArrayIterator.prototype);

/*
  var orderKeys = function orderKeys(a, b) {
    var aNumeric = String(ES.ToInteger(a)) === a;
    var bNumeric = String(ES.ToInteger(b)) === b;
    if (aNumeric && bNumeric) {
      return b - a;
    } else if (aNumeric && !bNumeric) {
      return -1;
    } else if (!aNumeric && bNumeric) {
      return 1;
    } else {
      return a.localeCompare(b);
    }
  };

  var getAllKeys = function getAllKeys(object) {
    var ownKeys = [];
    var keys = [];

    for (var key in object) {
      _push(_hasOwnProperty(object, key) ? ownKeys : keys, key);
    }
    _sort(ownKeys, orderKeys);
    _sort(keys, orderKeys);

    return _concat(ownKeys, keys);
  };
  */

  // note: this is positioned here because it depends on ArrayIterator
  var arrayOfSupportsSubclassing = Array.of === ArrayShims.of || (function () {
    // Detects a bug in Webkit nightly r181886
    var Foo = function Foo(len) { this.length = len; };
    Foo.prototype = [];
    var fooArr = Array.of.apply(Foo, [1, 2]);
    return fooArr instanceof Foo && fooArr.length === 2;
  }());
  if (!arrayOfSupportsSubclassing) {
    overrideNative(Array, 'of', ArrayShims.of);
  }

  var ArrayPrototypeShims = {
    copyWithin: function copyWithin(target, start) {
      var o = ES.ToObject(this);
      var len = ES.ToLength(o.length);
      var relativeTarget = ES.ToInteger(target);
      var relativeStart = ES.ToInteger(start);
      var to = relativeTarget < 0 ? _max(len + relativeTarget, 0) : _min(relativeTarget, len);
      var from = relativeStart < 0 ? _max(len + relativeStart, 0) : _min(relativeStart, len);
      var end;
      if (arguments.length > 2) {
        end = arguments[2];
      }
      var relativeEnd = typeof end === 'undefined' ? len : ES.ToInteger(end);
      var finalItem = relativeEnd < 0 ? _max(len + relativeEnd, 0) : _min(relativeEnd, len);
      var count = _min(finalItem - from, len - to);
      var direction = 1;
      if (from < to && to < (from + count)) {
        direction = -1;
        from += count - 1;
        to += count - 1;
      }
      while (count > 0) {
        if (from in o) {
          o[to] = o[from];
        } else {
          delete o[to];
        }
        from += direction;
        to += direction;
        count -= 1;
      }
      return o;
    },

    fill: function fill(value) {
      var start;
      if (arguments.length > 1) {
        start = arguments[1];
      }
      var end;
      if (arguments.length > 2) {
        end = arguments[2];
      }
      var O = ES.ToObject(this);
      var len = ES.ToLength(O.length);
      start = ES.ToInteger(typeof start === 'undefined' ? 0 : start);
      end = ES.ToInteger(typeof end === 'undefined' ? len : end);

      var relativeStart = start < 0 ? _max(len + start, 0) : _min(start, len);
      var relativeEnd = end < 0 ? len + end : end;

      for (var i = relativeStart; i < len && i < relativeEnd; ++i) {
        O[i] = value;
      }
      return O;
    },

    find: function find(predicate) {
      var list = ES.ToObject(this);
      var length = ES.ToLength(list.length);
      if (!ES.IsCallable(predicate)) {
        throw new TypeError('Array#find: predicate must be a function');
      }
      var thisArg = arguments.length > 1 ? arguments[1] : null;
      for (var i = 0, value; i < length; i++) {
        value = list[i];
        if (thisArg) {
          if (_call(predicate, thisArg, value, i, list)) {
            return value;
          }
        } else if (predicate(value, i, list)) {
          return value;
        }
      }
    },

    findIndex: function findIndex(predicate) {
      var list = ES.ToObject(this);
      var length = ES.ToLength(list.length);
      if (!ES.IsCallable(predicate)) {
        throw new TypeError('Array#findIndex: predicate must be a function');
      }
      var thisArg = arguments.length > 1 ? arguments[1] : null;
      for (var i = 0; i < length; i++) {
        if (thisArg) {
          if (_call(predicate, thisArg, list[i], i, list)) {
            return i;
          }
        } else if (predicate(list[i], i, list)) {
          return i;
        }
      }
      return -1;
    },

    keys: function keys() {
      return new ArrayIterator(this, 'key');
    },

    values: function values() {
      return new ArrayIterator(this, 'value');
    },

    entries: function entries() {
      return new ArrayIterator(this, 'entry');
    }
  };
  // Safari 7.1 defines Array#keys and Array#entries natively,
  // but the resulting ArrayIterator objects don't have a "next" method.
  if (Array.prototype.keys && !ES.IsCallable([1].keys().next)) {
    delete Array.prototype.keys;
  }
  if (Array.prototype.entries && !ES.IsCallable([1].entries().next)) {
    delete Array.prototype.entries;
  }

  // Chrome 38 defines Array#keys and Array#entries, and Array#@@iterator, but not Array#values
  if (Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[$iterator$]) {
    defineProperties(Array.prototype, {
      values: Array.prototype[$iterator$]
    });
    if (Type.symbol(Symbol.unscopables)) {
      Array.prototype[Symbol.unscopables].values = true;
    }
  }
  // Chrome 40 defines Array#values with the incorrect name, although Array#{keys,entries} have the correct name
  if (functionsHaveNames && Array.prototype.values && Array.prototype.values.name !== 'values') {
    var originalArrayPrototypeValues = Array.prototype.values;
    overrideNative(Array.prototype, 'values', function values() { return ES.Call(originalArrayPrototypeValues, this, arguments); });
    defineProperty(Array.prototype, $iterator$, Array.prototype.values, true);
  }
  defineProperties(Array.prototype, ArrayPrototypeShims);

  if (1 / [true].indexOf(true, -0) < 0) {
    // indexOf when given a position arg of -0 should return +0.
    // https://github.com/tc39/ecma262/pull/316
    defineProperty(Array.prototype, 'indexOf', function indexOf(searchElement) {
      var value = _arrayIndexOfApply(this, arguments);
      if (value === 0 && (1 / value) < 0) {
        return 0;
      }
      return value;
    }, true);
  }

  addIterator(Array.prototype, function () { return this.values(); });
  // Chrome defines keys/values/entries on Array, but doesn't give us
  // any way to identify its iterator.  So add our own shimmed field.
  if (Object.getPrototypeOf) {
    addIterator(Object.getPrototypeOf([].values()));
  }

  // note: this is positioned here because it relies on Array#entries
  var arrayFromSwallowsNegativeLengths = (function () {
    // Detects a Firefox bug in v32
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1063993
    return valueOrFalseIfThrows(function () {
      return Array.from({ length: -1 }).length === 0;
    });
  }());
  var arrayFromHandlesIterables = (function () {
    // Detects a bug in Webkit nightly r181886
    var arr = Array.from([0].entries());
    return arr.length === 1 && isArray(arr[0]) && arr[0][0] === 0 && arr[0][1] === 0;
  }());
  if (!arrayFromSwallowsNegativeLengths || !arrayFromHandlesIterables) {
    overrideNative(Array, 'from', ArrayShims.from);
  }
  var arrayFromHandlesUndefinedMapFunction = (function () {
    // Microsoft Edge v0.11 throws if the mapFn argument is *provided* but undefined,
    // but the spec doesn't care if it's provided or not - undefined doesn't throw.
    return valueOrFalseIfThrows(function () {
      return Array.from([0], void 0);
    });
  }());
  if (!arrayFromHandlesUndefinedMapFunction) {
    var origArrayFrom = Array.from;
    overrideNative(Array, 'from', function from(items) {
      if (arguments.length > 1 && typeof arguments[1] !== 'undefined') {
        return ES.Call(origArrayFrom, this, arguments);
      } else {
        return _call(origArrayFrom, this, items);
      }
    });
  }

  var int32sAsOne = -(Math.pow(2, 32) - 1);
  var toLengthsCorrectly = function (method, reversed) {
    var obj = { length: int32sAsOne };
    obj[reversed ? (obj.length >>> 0) - 1 : 0] = true;
    return valueOrFalseIfThrows(function () {
      _call(method, obj, function () {
        // note: in nonconforming browsers, this will be called
        // -1 >>> 0 times, which is 4294967295, so the throw matters.
        throw new RangeError('should not reach here');
      }, []);
      return true;
    });
  };
  if (!toLengthsCorrectly(Array.prototype.forEach)) {
    var originalForEach = Array.prototype.forEach;
    overrideNative(Array.prototype, 'forEach', function forEach(callbackFn) {
      return ES.Call(originalForEach, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.map)) {
    var originalMap = Array.prototype.map;
    overrideNative(Array.prototype, 'map', function map(callbackFn) {
      return ES.Call(originalMap, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.filter)) {
    var originalFilter = Array.prototype.filter;
    overrideNative(Array.prototype, 'filter', function filter(callbackFn) {
      return ES.Call(originalFilter, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.some)) {
    var originalSome = Array.prototype.some;
    overrideNative(Array.prototype, 'some', function some(callbackFn) {
      return ES.Call(originalSome, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.every)) {
    var originalEvery = Array.prototype.every;
    overrideNative(Array.prototype, 'every', function every(callbackFn) {
      return ES.Call(originalEvery, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.reduce)) {
    var originalReduce = Array.prototype.reduce;
    overrideNative(Array.prototype, 'reduce', function reduce(callbackFn) {
      return ES.Call(originalReduce, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.reduceRight, true)) {
    var originalReduceRight = Array.prototype.reduceRight;
    overrideNative(Array.prototype, 'reduceRight', function reduceRight(callbackFn) {
      return ES.Call(originalReduceRight, this.length >= 0 ? this : [], arguments);
    }, true);
  }

  var lacksOctalSupport = Number('0o10') !== 8;
  var lacksBinarySupport = Number('0b10') !== 2;
  var trimsNonWhitespace = _some(nonWS, function (c) {
    return Number(c + 0 + c) === 0;
  });
  if (lacksOctalSupport || lacksBinarySupport || trimsNonWhitespace) {
    var OrigNumber = Number;
    var binaryRegex = /^0b[01]+$/i;
    var octalRegex = /^0o[0-7]+$/i;
    // Note that in IE 8, RegExp.prototype.test doesn't seem to exist: ie, "test" is an own property of regexes. wtf.
    var isBinary = binaryRegex.test.bind(binaryRegex);
    var isOctal = octalRegex.test.bind(octalRegex);
    var toPrimitive = function (O) { // need to replace this with `es-to-primitive/es6`
      var result;
      if (typeof O.valueOf === 'function') {
        result = O.valueOf();
        if (Type.primitive(result)) {
          return result;
        }
      }
      if (typeof O.toString === 'function') {
        result = O.toString();
        if (Type.primitive(result)) {
          return result;
        }
      }
      throw new TypeError('No default value');
    };
    var hasNonWS = nonWSregex.test.bind(nonWSregex);
    var isBadHex = isBadHexRegex.test.bind(isBadHexRegex);
    var NumberShim = (function () {
      // this is wrapped in an IIFE because of IE 6-8's wacky scoping issues with named function expressions.
      var NumberShim = function Number(value) {
        var primValue;
        if (arguments.length > 0) {
          primValue = Type.primitive(value) ? value : toPrimitive(value, 'number');
        } else {
          primValue = 0;
        }
        if (typeof primValue === 'string') {
          primValue = ES.Call(trimShim, primValue);
          if (isBinary(primValue)) {
            primValue = parseInt(_strSlice(primValue, 2), 2);
          } else if (isOctal(primValue)) {
            primValue = parseInt(_strSlice(primValue, 2), 8);
          } else if (hasNonWS(primValue) || isBadHex(primValue)) {
            primValue = NaN;
          }
        }
        var receiver = this;
        var valueOfSucceeds = valueOrFalseIfThrows(function () {
          OrigNumber.prototype.valueOf.call(receiver);
          return true;
        });
        if (receiver instanceof NumberShim && !valueOfSucceeds) {
          return new OrigNumber(primValue);
        }
        /* jshint newcap: false */
        return OrigNumber(primValue);
        /* jshint newcap: true */
      };
      return NumberShim;
    }());
    wrapConstructor(OrigNumber, NumberShim, {});
    // this is necessary for ES3 browsers, where these properties are non-enumerable.
    defineProperties(NumberShim, {
      NaN: OrigNumber.NaN,
      MAX_VALUE: OrigNumber.MAX_VALUE,
      MIN_VALUE: OrigNumber.MIN_VALUE,
      NEGATIVE_INFINITY: OrigNumber.NEGATIVE_INFINITY,
      POSITIVE_INFINITY: OrigNumber.POSITIVE_INFINITY
    });
    /* globals Number: true */
    /* eslint-disable no-undef, no-global-assign */
    /* jshint -W020 */
    Number = NumberShim;
    Value.redefine(globals, 'Number', NumberShim);
    /* jshint +W020 */
    /* eslint-enable no-undef, no-global-assign */
    /* globals Number: false */
  }

  var maxSafeInteger = Math.pow(2, 53) - 1;
  defineProperties(Number, {
    MAX_SAFE_INTEGER: maxSafeInteger,
    MIN_SAFE_INTEGER: -maxSafeInteger,
    EPSILON: 2.220446049250313e-16,

    parseInt: globals.parseInt,
    parseFloat: globals.parseFloat,

    isFinite: numberIsFinite,

    isInteger: function isInteger(value) {
      return numberIsFinite(value) && ES.ToInteger(value) === value;
    },

    isSafeInteger: function isSafeInteger(value) {
      return Number.isInteger(value) && _abs(value) <= Number.MAX_SAFE_INTEGER;
    },

    isNaN: numberIsNaN
  });
  // Firefox 37 has a conforming Number.parseInt, but it's not === to the global parseInt (fixed in v40)
  defineProperty(Number, 'parseInt', globals.parseInt, Number.parseInt !== globals.parseInt);

  // Work around bugs in Array#find and Array#findIndex -- early
  // implementations skipped holes in sparse arrays. (Note that the
  // implementations of find/findIndex indirectly use shimmed
  // methods of Number, so this test has to happen down here.)
  /*jshint elision: true */
  /* eslint-disable no-sparse-arrays */
  if ([, 1].find(function () { return true; }) === 1) {
    overrideNative(Array.prototype, 'find', ArrayPrototypeShims.find);
  }
  if ([, 1].findIndex(function () { return true; }) !== 0) {
    overrideNative(Array.prototype, 'findIndex', ArrayPrototypeShims.findIndex);
  }
  /* eslint-enable no-sparse-arrays */
  /*jshint elision: false */

  var isEnumerableOn = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable);
  var ensureEnumerable = function ensureEnumerable(obj, prop) {
    if (supportsDescriptors && isEnumerableOn(obj, prop)) {
      Object.defineProperty(obj, prop, { enumerable: false });
    }
  };
  var sliceArgs = function sliceArgs() {
    // per https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
    // and https://gist.github.com/WebReflection/4327762cb87a8c634a29
    var initial = Number(this);
    var len = arguments.length;
    var desiredArgCount = len - initial;
    var args = new Array(desiredArgCount < 0 ? 0 : desiredArgCount);
    for (var i = initial; i < len; ++i) {
      args[i - initial] = arguments[i];
    }
    return args;
  };
  var assignTo = function assignTo(source) {
    return function assignToSource(target, key) {
      target[key] = source[key];
      return target;
    };
  };
  var assignReducer = function (target, source) {
    var sourceKeys = keys(Object(source));
    var symbols;
    if (ES.IsCallable(Object.getOwnPropertySymbols)) {
      symbols = _filter(Object.getOwnPropertySymbols(Object(source)), isEnumerableOn(source));
    }
    return _reduce(_concat(sourceKeys, symbols || []), assignTo(source), target);
  };

  var ObjectShims = {
    // 19.1.3.1
    assign: function (target, source) {
      var to = ES.ToObject(target, 'Cannot convert undefined or null to object');
      return _reduce(ES.Call(sliceArgs, 1, arguments), assignReducer, to);
    },

    // Added in WebKit in https://bugs.webkit.org/show_bug.cgi?id=143865
    is: function is(a, b) {
      return ES.SameValue(a, b);
    }
  };
  var assignHasPendingExceptions = Object.assign && Object.preventExtensions && (function () {
    // Firefox 37 still has "pending exception" logic in its Object.assign implementation,
    // which is 72% slower than our shim, and Firefox 40's native implementation.
    var thrower = Object.preventExtensions({ 1: 2 });
    try {
      Object.assign(thrower, 'xy');
    } catch (e) {
      return thrower[1] === 'y';
    }
  }());
  if (assignHasPendingExceptions) {
    overrideNative(Object, 'assign', ObjectShims.assign);
  }
  defineProperties(Object, ObjectShims);

  if (supportsDescriptors) {
    var ES5ObjectShims = {
      // 19.1.3.9
      // shim from https://gist.github.com/WebReflection/5593554
      setPrototypeOf: (function (Object, magic) {
        var set;

        var checkArgs = function (O, proto) {
          if (!ES.TypeIsObject(O)) {
            throw new TypeError('cannot set prototype on a non-object');
          }
          if (!(proto === null || ES.TypeIsObject(proto))) {
            throw new TypeError('can only set prototype to an object or null' + proto);
          }
        };

        var setPrototypeOf = function (O, proto) {
          checkArgs(O, proto);
          _call(set, O, proto);
          return O;
        };

        try {
          // this works already in Firefox and Safari
          set = Object.getOwnPropertyDescriptor(Object.prototype, magic).set;
          _call(set, {}, null);
        } catch (e) {
          if (Object.prototype !== {}[magic]) {
            // IE < 11 cannot be shimmed
            return;
          }
          // probably Chrome or some old Mobile stock browser
          set = function (proto) {
            this[magic] = proto;
          };
          // please note that this will **not** work
          // in those browsers that do not inherit
          // __proto__ by mistake from Object.prototype
          // in these cases we should probably throw an error
          // or at least be informed about the issue
          setPrototypeOf.polyfill = setPrototypeOf(
            setPrototypeOf({}, null),
            Object.prototype
          ) instanceof Object;
          // setPrototypeOf.polyfill === true means it works as meant
          // setPrototypeOf.polyfill === false means it's not 100% reliable
          // setPrototypeOf.polyfill === undefined
          // or
          // setPrototypeOf.polyfill ==  null means it's not a polyfill
          // which means it works as expected
          // we can even delete Object.prototype.__proto__;
        }
        return setPrototypeOf;
      }(Object, '__proto__'))
    };

    defineProperties(Object, ES5ObjectShims);
  }

  // Workaround bug in Opera 12 where setPrototypeOf(x, null) doesn't work,
  // but Object.create(null) does.
  if (Object.setPrototypeOf && Object.getPrototypeOf &&
      Object.getPrototypeOf(Object.setPrototypeOf({}, null)) !== null &&
      Object.getPrototypeOf(Object.create(null)) === null) {
    (function () {
      var FAKENULL = Object.create(null);
      var gpo = Object.getPrototypeOf;
      var spo = Object.setPrototypeOf;
      Object.getPrototypeOf = function (o) {
        var result = gpo(o);
        return result === FAKENULL ? null : result;
      };
      Object.setPrototypeOf = function (o, p) {
        var proto = p === null ? FAKENULL : p;
        return spo(o, proto);
      };
      Object.setPrototypeOf.polyfill = false;
    }());
  }

  var objectKeysAcceptsPrimitives = !throwsError(function () { Object.keys('foo'); });
  if (!objectKeysAcceptsPrimitives) {
    var originalObjectKeys = Object.keys;
    overrideNative(Object, 'keys', function keys(value) {
      return originalObjectKeys(ES.ToObject(value));
    });
    keys = Object.keys;
  }
  var objectKeysRejectsRegex = throwsError(function () { Object.keys(/a/g); });
  if (objectKeysRejectsRegex) {
    var regexRejectingObjectKeys = Object.keys;
    overrideNative(Object, 'keys', function keys(value) {
      if (Type.regex(value)) {
        var regexKeys = [];
        for (var k in value) {
          if (_hasOwnProperty(value, k)) {
            _push(regexKeys, k);
          }
        }
        return regexKeys;
      }
      return regexRejectingObjectKeys(value);
    });
    keys = Object.keys;
  }

  if (Object.getOwnPropertyNames) {
    var objectGOPNAcceptsPrimitives = !throwsError(function () { Object.getOwnPropertyNames('foo'); });
    if (!objectGOPNAcceptsPrimitives) {
      var cachedWindowNames = typeof window === 'object' ? Object.getOwnPropertyNames(window) : [];
      var originalObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
      overrideNative(Object, 'getOwnPropertyNames', function getOwnPropertyNames(value) {
        var val = ES.ToObject(value);
        if (_toString(val) === '[object Window]') {
          try {
            return originalObjectGetOwnPropertyNames(val);
          } catch (e) {
            // IE bug where layout engine calls userland gOPN for cross-domain `window` objects
            return _concat([], cachedWindowNames);
          }
        }
        return originalObjectGetOwnPropertyNames(val);
      });
    }
  }
  if (Object.getOwnPropertyDescriptor) {
    var objectGOPDAcceptsPrimitives = !throwsError(function () { Object.getOwnPropertyDescriptor('foo', 'bar'); });
    if (!objectGOPDAcceptsPrimitives) {
      var originalObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      overrideNative(Object, 'getOwnPropertyDescriptor', function getOwnPropertyDescriptor(value, property) {
        return originalObjectGetOwnPropertyDescriptor(ES.ToObject(value), property);
      });
    }
  }
  if (Object.seal) {
    var objectSealAcceptsPrimitives = !throwsError(function () { Object.seal('foo'); });
    if (!objectSealAcceptsPrimitives) {
      var originalObjectSeal = Object.seal;
      overrideNative(Object, 'seal', function seal(value) {
        if (!ES.TypeIsObject(value)) { return value; }
        return originalObjectSeal(value);
      });
    }
  }
  if (Object.isSealed) {
    var objectIsSealedAcceptsPrimitives = !throwsError(function () { Object.isSealed('foo'); });
    if (!objectIsSealedAcceptsPrimitives) {
      var originalObjectIsSealed = Object.isSealed;
      overrideNative(Object, 'isSealed', function isSealed(value) {
        if (!ES.TypeIsObject(value)) { return true; }
        return originalObjectIsSealed(value);
      });
    }
  }
  if (Object.freeze) {
    var objectFreezeAcceptsPrimitives = !throwsError(function () { Object.freeze('foo'); });
    if (!objectFreezeAcceptsPrimitives) {
      var originalObjectFreeze = Object.freeze;
      overrideNative(Object, 'freeze', function freeze(value) {
        if (!ES.TypeIsObject(value)) { return value; }
        return originalObjectFreeze(value);
      });
    }
  }
  if (Object.isFrozen) {
    var objectIsFrozenAcceptsPrimitives = !throwsError(function () { Object.isFrozen('foo'); });
    if (!objectIsFrozenAcceptsPrimitives) {
      var originalObjectIsFrozen = Object.isFrozen;
      overrideNative(Object, 'isFrozen', function isFrozen(value) {
        if (!ES.TypeIsObject(value)) { return true; }
        return originalObjectIsFrozen(value);
      });
    }
  }
  if (Object.preventExtensions) {
    var objectPreventExtensionsAcceptsPrimitives = !throwsError(function () { Object.preventExtensions('foo'); });
    if (!objectPreventExtensionsAcceptsPrimitives) {
      var originalObjectPreventExtensions = Object.preventExtensions;
      overrideNative(Object, 'preventExtensions', function preventExtensions(value) {
        if (!ES.TypeIsObject(value)) { return value; }
        return originalObjectPreventExtensions(value);
      });
    }
  }
  if (Object.isExtensible) {
    var objectIsExtensibleAcceptsPrimitives = !throwsError(function () { Object.isExtensible('foo'); });
    if (!objectIsExtensibleAcceptsPrimitives) {
      var originalObjectIsExtensible = Object.isExtensible;
      overrideNative(Object, 'isExtensible', function isExtensible(value) {
        if (!ES.TypeIsObject(value)) { return false; }
        return originalObjectIsExtensible(value);
      });
    }
  }
  if (Object.getPrototypeOf) {
    var objectGetProtoAcceptsPrimitives = !throwsError(function () { Object.getPrototypeOf('foo'); });
    if (!objectGetProtoAcceptsPrimitives) {
      var originalGetProto = Object.getPrototypeOf;
      overrideNative(Object, 'getPrototypeOf', function getPrototypeOf(value) {
        return originalGetProto(ES.ToObject(value));
      });
    }
  }

  var hasFlags = supportsDescriptors && (function () {
    var desc = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags');
    return desc && ES.IsCallable(desc.get);
  }());
  if (supportsDescriptors && !hasFlags) {
    var regExpFlagsGetter = function flags() {
      if (!ES.TypeIsObject(this)) {
        throw new TypeError('Method called on incompatible type: must be an object.');
      }
      var result = '';
      if (this.global) {
        result += 'g';
      }
      if (this.ignoreCase) {
        result += 'i';
      }
      if (this.multiline) {
        result += 'm';
      }
      if (this.unicode) {
        result += 'u';
      }
      if (this.sticky) {
        result += 'y';
      }
      return result;
    };

    Value.getter(RegExp.prototype, 'flags', regExpFlagsGetter);
  }

  var regExpSupportsFlagsWithRegex = supportsDescriptors && valueOrFalseIfThrows(function () {
    return String(new RegExp(/a/g, 'i')) === '/a/i';
  });
  var regExpNeedsToSupportSymbolMatch = hasSymbols && supportsDescriptors && (function () {
    // Edge 0.12 supports flags fully, but does not support Symbol.match
    var regex = /./;
    regex[Symbol.match] = false;
    return RegExp(regex) === regex;
  }());

  var regexToStringIsGeneric = valueOrFalseIfThrows(function () {
    return RegExp.prototype.toString.call({ source: 'abc' }) === '/abc/';
  });
  var regexToStringSupportsGenericFlags = regexToStringIsGeneric && valueOrFalseIfThrows(function () {
    return RegExp.prototype.toString.call({ source: 'a', flags: 'b' }) === '/a/b';
  });
  if (!regexToStringIsGeneric || !regexToStringSupportsGenericFlags) {
    var origRegExpToString = RegExp.prototype.toString;
    defineProperty(RegExp.prototype, 'toString', function toString() {
      var R = ES.RequireObjectCoercible(this);
      if (Type.regex(R)) {
        return _call(origRegExpToString, R);
      }
      var pattern = $String(R.source);
      var flags = $String(R.flags);
      return '/' + pattern + '/' + flags;
    }, true);
    Value.preserveToString(RegExp.prototype.toString, origRegExpToString);
  }

  if (supportsDescriptors && (!regExpSupportsFlagsWithRegex || regExpNeedsToSupportSymbolMatch)) {
    var flagsGetter = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get;
    var sourceDesc = Object.getOwnPropertyDescriptor(RegExp.prototype, 'source') || {};
    var legacySourceGetter = function () {
      // prior to it being a getter, it's own + nonconfigurable
      return this.source;
    };
    var sourceGetter = ES.IsCallable(sourceDesc.get) ? sourceDesc.get : legacySourceGetter;

    var OrigRegExp = RegExp;
    var RegExpShim = (function () {
      return function RegExp(pattern, flags) {
        var patternIsRegExp = ES.IsRegExp(pattern);
        var calledWithNew = this instanceof RegExp;
        if (!calledWithNew && patternIsRegExp && typeof flags === 'undefined' && pattern.constructor === RegExp) {
          return pattern;
        }

        var P = pattern;
        var F = flags;
        if (Type.regex(pattern)) {
          P = ES.Call(sourceGetter, pattern);
          F = typeof flags === 'undefined' ? ES.Call(flagsGetter, pattern) : flags;
          return new RegExp(P, F);
        } else if (patternIsRegExp) {
          P = pattern.source;
          F = typeof flags === 'undefined' ? pattern.flags : flags;
        }
        return new OrigRegExp(pattern, flags);
      };
    }());
    wrapConstructor(OrigRegExp, RegExpShim, {
      $input: true // Chrome < v39 & Opera < 26 have a nonstandard "$input" property
    });
    /* globals RegExp: true */
    /* eslint-disable no-undef, no-global-assign */
    /* jshint -W020 */
    RegExp = RegExpShim;
    Value.redefine(globals, 'RegExp', RegExpShim);
    /* jshint +W020 */
    /* eslint-enable no-undef, no-global-assign */
    /* globals RegExp: false */
  }

  if (supportsDescriptors) {
    var regexGlobals = {
      input: '$_',
      lastMatch: '$&',
      lastParen: '$+',
      leftContext: '$`',
      rightContext: '$\''
    };
    _forEach(keys(regexGlobals), function (prop) {
      if (prop in RegExp && !(regexGlobals[prop] in RegExp)) {
        Value.getter(RegExp, regexGlobals[prop], function get() {
          return RegExp[prop];
        });
      }
    });
  }
  addDefaultSpecies(RegExp);

  var inverseEpsilon = 1 / Number.EPSILON;
  var roundTiesToEven = function roundTiesToEven(n) {
    // Even though this reduces down to `return n`, it takes advantage of built-in rounding.
    return (n + inverseEpsilon) - inverseEpsilon;
  };
  var BINARY_32_EPSILON = Math.pow(2, -23);
  var BINARY_32_MAX_VALUE = Math.pow(2, 127) * (2 - BINARY_32_EPSILON);
  var BINARY_32_MIN_VALUE = Math.pow(2, -126);
  var E = Math.E;
  var LOG2E = Math.LOG2E;
  var LOG10E = Math.LOG10E;
  var numberCLZ = Number.prototype.clz;
  delete Number.prototype.clz; // Safari 8 has Number#clz

  var MathShims = {
    acosh: function acosh(value) {
      var x = Number(value);
      if (numberIsNaN(x) || value < 1) { return NaN; }
      if (x === 1) { return 0; }
      if (x === Infinity) { return x; }
      return _log((x / E) + (_sqrt(x + 1) * _sqrt(x - 1) / E)) + 1;
    },

    asinh: function asinh(value) {
      var x = Number(value);
      if (x === 0 || !globalIsFinite(x)) {
        return x;
      }
      return x < 0 ? -asinh(-x) : _log(x + _sqrt((x * x) + 1));
    },

    atanh: function atanh(value) {
      var x = Number(value);
      if (numberIsNaN(x) || x < -1 || x > 1) {
        return NaN;
      }
      if (x === -1) { return -Infinity; }
      if (x === 1) { return Infinity; }
      if (x === 0) { return x; }
      return 0.5 * _log((1 + x) / (1 - x));
    },

    cbrt: function cbrt(value) {
      var x = Number(value);
      if (x === 0) { return x; }
      var negate = x < 0;
      var result;
      if (negate) { x = -x; }
      if (x === Infinity) {
        result = Infinity;
      } else {
        result = _exp(_log(x) / 3);
        // from http://en.wikipedia.org/wiki/Cube_root#Numerical_methods
        result = ((x / (result * result)) + (2 * result)) / 3;
      }
      return negate ? -result : result;
    },

    clz32: function clz32(value) {
      // See https://bugs.ecmascript.org/show_bug.cgi?id=2465
      var x = Number(value);
      var number = ES.ToUint32(x);
      if (number === 0) {
        return 32;
      }
      return numberCLZ ? ES.Call(numberCLZ, number) : 31 - _floor(_log(number + 0.5) * LOG2E);
    },

    cosh: function cosh(value) {
      var x = Number(value);
      if (x === 0) { return 1; } // +0 or -0
      if (numberIsNaN(x)) { return NaN; }
      if (!globalIsFinite(x)) { return Infinity; }
      if (x < 0) { x = -x; }
      if (x > 21) { return _exp(x) / 2; }
      return (_exp(x) + _exp(-x)) / 2;
    },

    expm1: function expm1(value) {
      var x = Number(value);
      if (x === -Infinity) { return -1; }
      if (!globalIsFinite(x) || x === 0) { return x; }
      if (_abs(x) > 0.5) {
        return _exp(x) - 1;
      }
      // A more precise approximation using Taylor series expansion
      // from https://github.com/paulmillr/es6-shim/issues/314#issuecomment-70293986
      var t = x;
      var sum = 0;
      var n = 1;
      while (sum + t !== sum) {
        sum += t;
        n += 1;
        t *= x / n;
      }
      return sum;
    },

    hypot: function hypot(x, y) {
      var result = 0;
      var largest = 0;
      for (var i = 0; i < arguments.length; ++i) {
        var value = _abs(Number(arguments[i]));
        if (largest < value) {
          result *= (largest / value) * (largest / value);
          result += 1;
          largest = value;
        } else {
          result += value > 0 ? (value / largest) * (value / largest) : value;
        }
      }
      return largest === Infinity ? Infinity : largest * _sqrt(result);
    },

    log2: function log2(value) {
      return _log(value) * LOG2E;
    },

    log10: function log10(value) {
      return _log(value) * LOG10E;
    },

    log1p: function log1p(value) {
      var x = Number(value);
      if (x < -1 || numberIsNaN(x)) { return NaN; }
      if (x === 0 || x === Infinity) { return x; }
      if (x === -1) { return -Infinity; }

      return (1 + x) - 1 === 0 ? x : x * (_log(1 + x) / ((1 + x) - 1));
    },

    sign: _sign,

    sinh: function sinh(value) {
      var x = Number(value);
      if (!globalIsFinite(x) || x === 0) { return x; }

      if (_abs(x) < 1) {
        return (Math.expm1(x) - Math.expm1(-x)) / 2;
      }
      return (_exp(x - 1) - _exp(-x - 1)) * E / 2;
    },

    tanh: function tanh(value) {
      var x = Number(value);
      if (numberIsNaN(x) || x === 0) { return x; }
      // can exit early at +-20 as JS loses precision for true value at this integer
      if (x >= 20) { return 1; }
      if (x <= -20) { return -1; }

      return (Math.expm1(x) - Math.expm1(-x)) / (_exp(x) + _exp(-x));
    },

    trunc: function trunc(value) {
      var x = Number(value);
      return x < 0 ? -_floor(-x) : _floor(x);
    },

    imul: function imul(x, y) {
      // taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
      var a = ES.ToUint32(x);
      var b = ES.ToUint32(y);
      var ah = (a >>> 16) & 0xffff;
      var al = a & 0xffff;
      var bh = (b >>> 16) & 0xffff;
      var bl = b & 0xffff;
      // the shift by 0 fixes the sign on the high part
      // the final |0 converts the unsigned value into a signed value
      return (al * bl) + ((((ah * bl) + (al * bh)) << 16) >>> 0) | 0;
    },

    fround: function fround(x) {
      var v = Number(x);
      if (v === 0 || v === Infinity || v === -Infinity || numberIsNaN(v)) {
        return v;
      }
      var sign = _sign(v);
      var abs = _abs(v);
      if (abs < BINARY_32_MIN_VALUE) {
        return sign * roundTiesToEven(
          abs / BINARY_32_MIN_VALUE / BINARY_32_EPSILON
        ) * BINARY_32_MIN_VALUE * BINARY_32_EPSILON;
      }
      // Veltkamp's splitting (?)
      var a = (1 + (BINARY_32_EPSILON / Number.EPSILON)) * abs;
      var result = a - (a - abs);
      if (result > BINARY_32_MAX_VALUE || numberIsNaN(result)) {
        return sign * Infinity;
      }
      return sign * result;
    }
  };
  defineProperties(Math, MathShims);
  // IE 11 TP has an imprecise log1p: reports Math.log1p(-1e-17) as 0
  defineProperty(Math, 'log1p', MathShims.log1p, Math.log1p(-1e-17) !== -1e-17);
  // IE 11 TP has an imprecise asinh: reports Math.asinh(-1e7) as not exactly equal to -Math.asinh(1e7)
  defineProperty(Math, 'asinh', MathShims.asinh, Math.asinh(-1e7) !== -Math.asinh(1e7));
  // Chrome 40 has an imprecise Math.tanh with very small numbers
  defineProperty(Math, 'tanh', MathShims.tanh, Math.tanh(-2e-17) !== -2e-17);
  // Chrome 40 loses Math.acosh precision with high numbers
  defineProperty(Math, 'acosh', MathShims.acosh, Math.acosh(Number.MAX_VALUE) === Infinity);
  // Firefox 38 on Windows
  defineProperty(Math, 'cbrt', MathShims.cbrt, Math.abs(1 - (Math.cbrt(1e-300) / 1e-100)) / Number.EPSILON > 8);
  // node 0.11 has an imprecise Math.sinh with very small numbers
  defineProperty(Math, 'sinh', MathShims.sinh, Math.sinh(-2e-17) !== -2e-17);
  // FF 35 on Linux reports 22025.465794806725 for Math.expm1(10)
  var expm1OfTen = Math.expm1(10);
  defineProperty(Math, 'expm1', MathShims.expm1, expm1OfTen > 22025.465794806719 || expm1OfTen < 22025.4657948067165168);

  var origMathRound = Math.round;
  // breaks in e.g. Safari 8, Internet Explorer 11, Opera 12
  var roundHandlesBoundaryConditions = Math.round(0.5 - (Number.EPSILON / 4)) === 0 &&
    Math.round(-0.5 + (Number.EPSILON / 3.99)) === 1;

  // When engines use Math.floor(x + 0.5) internally, Math.round can be buggy for large integers.
  // This behavior should be governed by "round to nearest, ties to even mode"
  // see http://www.ecma-international.org/ecma-262/6.0/#sec-terms-and-definitions-number-type
  // These are the boundary cases where it breaks.
  var smallestPositiveNumberWhereRoundBreaks = inverseEpsilon + 1;
  var largestPositiveNumberWhereRoundBreaks = (2 * inverseEpsilon) - 1;
  var roundDoesNotIncreaseIntegers = [
    smallestPositiveNumberWhereRoundBreaks,
    largestPositiveNumberWhereRoundBreaks
  ].every(function (num) {
    return Math.round(num) === num;
  });
  defineProperty(Math, 'round', function round(x) {
    var floor = _floor(x);
    var ceil = floor === -1 ? -0 : floor + 1;
    return x - floor < 0.5 ? floor : ceil;
  }, !roundHandlesBoundaryConditions || !roundDoesNotIncreaseIntegers);
  Value.preserveToString(Math.round, origMathRound);

  var origImul = Math.imul;
  if (Math.imul(0xffffffff, 5) !== -5) {
    // Safari 6.1, at least, reports "0" for this value
    Math.imul = MathShims.imul;
    Value.preserveToString(Math.imul, origImul);
  }
  if (Math.imul.length !== 2) {
    // Safari 8.0.4 has a length of 1
    // fixed in https://bugs.webkit.org/show_bug.cgi?id=143658
    overrideNative(Math, 'imul', function imul(x, y) {
      return ES.Call(origImul, Math, arguments);
    });
  }

  // Promises
  // Simplest possible implementation; use a 3rd-party library if you
  // want the best possible speed and/or long stack traces.
  var PromiseShim = (function () {
    var setTimeout = globals.setTimeout;
    // some environments don't have setTimeout - no way to shim here.
    if (typeof setTimeout !== 'function' && typeof setTimeout !== 'object') { return; }

    ES.IsPromise = function (promise) {
      if (!ES.TypeIsObject(promise)) {
        return false;
      }
      if (typeof promise._promise === 'undefined') {
        return false; // uninitialized, or missing our hidden field.
      }
      return true;
    };

    // "PromiseCapability" in the spec is what most promise implementations
    // call a "deferred".
    var PromiseCapability = function (C) {
      if (!ES.IsConstructor(C)) {
        throw new TypeError('Bad promise constructor');
      }
      var capability = this;
      var resolver = function (resolve, reject) {
        if (capability.resolve !== void 0 || capability.reject !== void 0) {
          throw new TypeError('Bad Promise implementation!');
        }
        capability.resolve = resolve;
        capability.reject = reject;
      };
      // Initialize fields to inform optimizers about the object shape.
      capability.resolve = void 0;
      capability.reject = void 0;
      capability.promise = new C(resolver);
      if (!(ES.IsCallable(capability.resolve) && ES.IsCallable(capability.reject))) {
        throw new TypeError('Bad promise constructor');
      }
    };

    // find an appropriate setImmediate-alike
    var makeZeroTimeout;
    /*global window */
    if (typeof window !== 'undefined' && ES.IsCallable(window.postMessage)) {
      makeZeroTimeout = function () {
        // from http://dbaron.org/log/20100309-faster-timeouts
        var timeouts = [];
        var messageName = 'zero-timeout-message';
        var setZeroTimeout = function (fn) {
          _push(timeouts, fn);
          window.postMessage(messageName, '*');
        };
        var handleMessage = function (event) {
          if (event.source === window && event.data === messageName) {
            event.stopPropagation();
            if (timeouts.length === 0) { return; }
            var fn = _shift(timeouts);
            fn();
          }
        };
        window.addEventListener('message', handleMessage, true);
        return setZeroTimeout;
      };
    }
    var makePromiseAsap = function () {
      // An efficient task-scheduler based on a pre-existing Promise
      // implementation, which we can use even if we override the
      // global Promise below (in order to workaround bugs)
      // https://github.com/Raynos/observ-hash/issues/2#issuecomment-35857671
      var P = globals.Promise;
      var pr = P && P.resolve && P.resolve();
      return pr && function (task) {
        return pr.then(task);
      };
    };
    /*global process */
    /* jscs:disable disallowMultiLineTernary */
    var enqueue = ES.IsCallable(globals.setImmediate) ?
      globals.setImmediate :
      typeof process === 'object' && process.nextTick ? process.nextTick :
      makePromiseAsap() ||
      (ES.IsCallable(makeZeroTimeout) ? makeZeroTimeout() :
      function (task) { setTimeout(task, 0); }); // fallback
    /* jscs:enable disallowMultiLineTernary */

    // Constants for Promise implementation
    var PROMISE_IDENTITY = function (x) { return x; };
    var PROMISE_THROWER = function (e) { throw e; };
    var PROMISE_PENDING = 0;
    var PROMISE_FULFILLED = 1;
    var PROMISE_REJECTED = 2;
    // We store fulfill/reject handlers and capabilities in a single array.
    var PROMISE_FULFILL_OFFSET = 0;
    var PROMISE_REJECT_OFFSET = 1;
    var PROMISE_CAPABILITY_OFFSET = 2;
    // This is used in an optimization for chaining promises via then.
    var PROMISE_FAKE_CAPABILITY = {};

    var enqueuePromiseReactionJob = function (handler, capability, argument) {
      enqueue(function () {
        promiseReactionJob(handler, capability, argument);
      });
    };

    var promiseReactionJob = function (handler, promiseCapability, argument) {
      var handlerResult, f;
      if (promiseCapability === PROMISE_FAKE_CAPABILITY) {
        // Fast case, when we don't actually need to chain through to a
        // (real) promiseCapability.
        return handler(argument);
      }
      try {
        handlerResult = handler(argument);
        f = promiseCapability.resolve;
      } catch (e) {
        handlerResult = e;
        f = promiseCapability.reject;
      }
      f(handlerResult);
    };

    var fulfillPromise = function (promise, value) {
      var _promise = promise._promise;
      var length = _promise.reactionLength;
      if (length > 0) {
        enqueuePromiseReactionJob(
          _promise.fulfillReactionHandler0,
          _promise.reactionCapability0,
          value
        );
        _promise.fulfillReactionHandler0 = void 0;
        _promise.rejectReactions0 = void 0;
        _promise.reactionCapability0 = void 0;
        if (length > 1) {
          for (var i = 1, idx = 0; i < length; i++, idx += 3) {
            enqueuePromiseReactionJob(
              _promise[idx + PROMISE_FULFILL_OFFSET],
              _promise[idx + PROMISE_CAPABILITY_OFFSET],
              value
            );
            promise[idx + PROMISE_FULFILL_OFFSET] = void 0;
            promise[idx + PROMISE_REJECT_OFFSET] = void 0;
            promise[idx + PROMISE_CAPABILITY_OFFSET] = void 0;
          }
        }
      }
      _promise.result = value;
      _promise.state = PROMISE_FULFILLED;
      _promise.reactionLength = 0;
    };

    var rejectPromise = function (promise, reason) {
      var _promise = promise._promise;
      var length = _promise.reactionLength;
      if (length > 0) {
        enqueuePromiseReactionJob(
          _promise.rejectReactionHandler0,
          _promise.reactionCapability0,
          reason
        );
        _promise.fulfillReactionHandler0 = void 0;
        _promise.rejectReactions0 = void 0;
        _promise.reactionCapability0 = void 0;
        if (length > 1) {
          for (var i = 1, idx = 0; i < length; i++, idx += 3) {
            enqueuePromiseReactionJob(
              _promise[idx + PROMISE_REJECT_OFFSET],
              _promise[idx + PROMISE_CAPABILITY_OFFSET],
              reason
            );
            promise[idx + PROMISE_FULFILL_OFFSET] = void 0;
            promise[idx + PROMISE_REJECT_OFFSET] = void 0;
            promise[idx + PROMISE_CAPABILITY_OFFSET] = void 0;
          }
        }
      }
      _promise.result = reason;
      _promise.state = PROMISE_REJECTED;
      _promise.reactionLength = 0;
    };

    var createResolvingFunctions = function (promise) {
      var alreadyResolved = false;
      var resolve = function (resolution) {
        var then;
        if (alreadyResolved) { return; }
        alreadyResolved = true;
        if (resolution === promise) {
          return rejectPromise(promise, new TypeError('Self resolution'));
        }
        if (!ES.TypeIsObject(resolution)) {
          return fulfillPromise(promise, resolution);
        }
        try {
          then = resolution.then;
        } catch (e) {
          return rejectPromise(promise, e);
        }
        if (!ES.IsCallable(then)) {
          return fulfillPromise(promise, resolution);
        }
        enqueue(function () {
          promiseResolveThenableJob(promise, resolution, then);
        });
      };
      var reject = function (reason) {
        if (alreadyResolved) { return; }
        alreadyResolved = true;
        return rejectPromise(promise, reason);
      };
      return { resolve: resolve, reject: reject };
    };

    var optimizedThen = function (then, thenable, resolve, reject) {
      // Optimization: since we discard the result, we can pass our
      // own then implementation a special hint to let it know it
      // doesn't have to create it.  (The PROMISE_FAKE_CAPABILITY
      // object is local to this implementation and unforgeable outside.)
      if (then === Promise$prototype$then) {
        _call(then, thenable, resolve, reject, PROMISE_FAKE_CAPABILITY);
      } else {
        _call(then, thenable, resolve, reject);
      }
    };
    var promiseResolveThenableJob = function (promise, thenable, then) {
      var resolvingFunctions = createResolvingFunctions(promise);
      var resolve = resolvingFunctions.resolve;
      var reject = resolvingFunctions.reject;
      try {
        optimizedThen(then, thenable, resolve, reject);
      } catch (e) {
        reject(e);
      }
    };

    var Promise$prototype, Promise$prototype$then;
    var Promise = (function () {
      var PromiseShim = function Promise(resolver) {
        if (!(this instanceof PromiseShim)) {
          throw new TypeError('Constructor Promise requires "new"');
        }
        if (this && this._promise) {
          throw new TypeError('Bad construction');
        }
        // see https://bugs.ecmascript.org/show_bug.cgi?id=2482
        if (!ES.IsCallable(resolver)) {
          throw new TypeError('not a valid resolver');
        }
        var promise = emulateES6construct(this, PromiseShim, Promise$prototype, {
          _promise: {
            result: void 0,
            state: PROMISE_PENDING,
            // The first member of the "reactions" array is inlined here,
            // since most promises only have one reaction.
            // We've also exploded the 'reaction' object to inline the
            // "handler" and "capability" fields, since both fulfill and
            // reject reactions share the same capability.
            reactionLength: 0,
            fulfillReactionHandler0: void 0,
            rejectReactionHandler0: void 0,
            reactionCapability0: void 0
          }
        });
        var resolvingFunctions = createResolvingFunctions(promise);
        var reject = resolvingFunctions.reject;
        try {
          resolver(resolvingFunctions.resolve, reject);
        } catch (e) {
          reject(e);
        }
        return promise;
      };
      return PromiseShim;
    }());
    Promise$prototype = Promise.prototype;

    var _promiseAllResolver = function (index, values, capability, remaining) {
      var alreadyCalled = false;
      return function (x) {
        if (alreadyCalled) { return; }
        alreadyCalled = true;
        values[index] = x;
        if ((--remaining.count) === 0) {
          var resolve = capability.resolve;
          resolve(values); // call w/ this===undefined
        }
      };
    };

    var performPromiseAll = function (iteratorRecord, C, resultCapability) {
      var it = iteratorRecord.iterator;
      var values = [];
      var remaining = { count: 1 };
      var next, nextValue;
      var index = 0;
      while (true) {
        try {
          next = ES.IteratorStep(it);
          if (next === false) {
            iteratorRecord.done = true;
            break;
          }
          nextValue = next.value;
        } catch (e) {
          iteratorRecord.done = true;
          throw e;
        }
        values[index] = void 0;
        var nextPromise = C.resolve(nextValue);
        var resolveElement = _promiseAllResolver(
          index, values, resultCapability, remaining
        );
        remaining.count += 1;
        optimizedThen(nextPromise.then, nextPromise, resolveElement, resultCapability.reject);
        index += 1;
      }
      if ((--remaining.count) === 0) {
        var resolve = resultCapability.resolve;
        resolve(values); // call w/ this===undefined
      }
      return resultCapability.promise;
    };

    var performPromiseRace = function (iteratorRecord, C, resultCapability) {
      var it = iteratorRecord.iterator;
      var next, nextValue, nextPromise;
      while (true) {
        try {
          next = ES.IteratorStep(it);
          if (next === false) {
            // NOTE: If iterable has no items, resulting promise will never
            // resolve; see:
            // https://github.com/domenic/promises-unwrapping/issues/75
            // https://bugs.ecmascript.org/show_bug.cgi?id=2515
            iteratorRecord.done = true;
            break;
          }
          nextValue = next.value;
        } catch (e) {
          iteratorRecord.done = true;
          throw e;
        }
        nextPromise = C.resolve(nextValue);
        optimizedThen(nextPromise.then, nextPromise, resultCapability.resolve, resultCapability.reject);
      }
      return resultCapability.promise;
    };

    defineProperties(Promise, {
      all: function all(iterable) {
        var C = this;
        if (!ES.TypeIsObject(C)) {
          throw new TypeError('Promise is not object');
        }
        var capability = new PromiseCapability(C);
        var iterator, iteratorRecord;
        try {
          iterator = ES.GetIterator(iterable);
          iteratorRecord = { iterator: iterator, done: false };
          return performPromiseAll(iteratorRecord, C, capability);
        } catch (e) {
          var exception = e;
          if (iteratorRecord && !iteratorRecord.done) {
            try {
              ES.IteratorClose(iterator, true);
            } catch (ee) {
              exception = ee;
            }
          }
          var reject = capability.reject;
          reject(exception);
          return capability.promise;
        }
      },

      race: function race(iterable) {
        var C = this;
        if (!ES.TypeIsObject(C)) {
          throw new TypeError('Promise is not object');
        }
        var capability = new PromiseCapability(C);
        var iterator, iteratorRecord;
        try {
          iterator = ES.GetIterator(iterable);
          iteratorRecord = { iterator: iterator, done: false };
          return performPromiseRace(iteratorRecord, C, capability);
        } catch (e) {
          var exception = e;
          if (iteratorRecord && !iteratorRecord.done) {
            try {
              ES.IteratorClose(iterator, true);
            } catch (ee) {
              exception = ee;
            }
          }
          var reject = capability.reject;
          reject(exception);
          return capability.promise;
        }
      },

      reject: function reject(reason) {
        var C = this;
        if (!ES.TypeIsObject(C)) {
          throw new TypeError('Bad promise constructor');
        }
        var capability = new PromiseCapability(C);
        var rejectFunc = capability.reject;
        rejectFunc(reason); // call with this===undefined
        return capability.promise;
      },

      resolve: function resolve(v) {
        // See https://esdiscuss.org/topic/fixing-promise-resolve for spec
        var C = this;
        if (!ES.TypeIsObject(C)) {
          throw new TypeError('Bad promise constructor');
        }
        if (ES.IsPromise(v)) {
          var constructor = v.constructor;
          if (constructor === C) {
            return v;
          }
        }
        var capability = new PromiseCapability(C);
        var resolveFunc = capability.resolve;
        resolveFunc(v); // call with this===undefined
        return capability.promise;
      }
    });

    defineProperties(Promise$prototype, {
      'catch': function (onRejected) {
        return this.then(null, onRejected);
      },

      then: function then(onFulfilled, onRejected) {
        var promise = this;
        if (!ES.IsPromise(promise)) { throw new TypeError('not a promise'); }
        var C = ES.SpeciesConstructor(promise, Promise);
        var resultCapability;
        var returnValueIsIgnored = arguments.length > 2 && arguments[2] === PROMISE_FAKE_CAPABILITY;
        if (returnValueIsIgnored && C === Promise) {
          resultCapability = PROMISE_FAKE_CAPABILITY;
        } else {
          resultCapability = new PromiseCapability(C);
        }
        // PerformPromiseThen(promise, onFulfilled, onRejected, resultCapability)
        // Note that we've split the 'reaction' object into its two
        // components, "capabilities" and "handler"
        // "capabilities" is always equal to `resultCapability`
        var fulfillReactionHandler = ES.IsCallable(onFulfilled) ? onFulfilled : PROMISE_IDENTITY;
        var rejectReactionHandler = ES.IsCallable(onRejected) ? onRejected : PROMISE_THROWER;
        var _promise = promise._promise;
        var value;
        if (_promise.state === PROMISE_PENDING) {
          if (_promise.reactionLength === 0) {
            _promise.fulfillReactionHandler0 = fulfillReactionHandler;
            _promise.rejectReactionHandler0 = rejectReactionHandler;
            _promise.reactionCapability0 = resultCapability;
          } else {
            var idx = 3 * (_promise.reactionLength - 1);
            _promise[idx + PROMISE_FULFILL_OFFSET] = fulfillReactionHandler;
            _promise[idx + PROMISE_REJECT_OFFSET] = rejectReactionHandler;
            _promise[idx + PROMISE_CAPABILITY_OFFSET] = resultCapability;
          }
          _promise.reactionLength += 1;
        } else if (_promise.state === PROMISE_FULFILLED) {
          value = _promise.result;
          enqueuePromiseReactionJob(
            fulfillReactionHandler, resultCapability, value
          );
        } else if (_promise.state === PROMISE_REJECTED) {
          value = _promise.result;
          enqueuePromiseReactionJob(
            rejectReactionHandler, resultCapability, value
          );
        } else {
          throw new TypeError('unexpected Promise state');
        }
        return resultCapability.promise;
      }
    });
    // This helps the optimizer by ensuring that methods which take
    // capabilities aren't polymorphic.
    PROMISE_FAKE_CAPABILITY = new PromiseCapability(Promise);
    Promise$prototype$then = Promise$prototype.then;

    return Promise;
  }());

  // Chrome's native Promise has extra methods that it shouldn't have. Let's remove them.
  if (globals.Promise) {
    delete globals.Promise.accept;
    delete globals.Promise.defer;
    delete globals.Promise.prototype.chain;
  }

  if (typeof PromiseShim === 'function') {
    // export the Promise constructor.
    defineProperties(globals, { Promise: PromiseShim });
    // In Chrome 33 (and thereabouts) Promise is defined, but the
    // implementation is buggy in a number of ways.  Let's check subclassing
    // support to see if we have a buggy implementation.
    var promiseSupportsSubclassing = supportsSubclassing(globals.Promise, function (S) {
      return S.resolve(42).then(function () {}) instanceof S;
    });
    var promiseIgnoresNonFunctionThenCallbacks = !throwsError(function () {
      globals.Promise.reject(42).then(null, 5).then(null, noop);
    });
    var promiseRequiresObjectContext = throwsError(function () { globals.Promise.call(3, noop); });
    // Promise.resolve() was errata'ed late in the ES6 process.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1170742
    //      https://code.google.com/p/v8/issues/detail?id=4161
    // It serves as a proxy for a number of other bugs in early Promise
    // implementations.
    var promiseResolveBroken = (function (Promise) {
      var p = Promise.resolve(5);
      p.constructor = {};
      var p2 = Promise.resolve(p);
      try {
        p2.then(null, noop).then(null, noop); // avoid "uncaught rejection" warnings in console
      } catch (e) {
        return true; // v8 native Promises break here https://code.google.com/p/chromium/issues/detail?id=575314
      }
      return p === p2; // This *should* be false!
    }(globals.Promise));

    // Chrome 46 (probably older too) does not retrieve a thenable's .then synchronously
    var getsThenSynchronously = supportsDescriptors && (function () {
      var count = 0;
      var thenable = Object.defineProperty({}, 'then', { get: function () { count += 1; } });
      Promise.resolve(thenable);
      return count === 1;
    }());

    var BadResolverPromise = function BadResolverPromise(executor) {
      var p = new Promise(executor);
      executor(3, function () {});
      this.then = p.then;
      this.constructor = BadResolverPromise;
    };
    BadResolverPromise.prototype = Promise.prototype;
    BadResolverPromise.all = Promise.all;
    // Chrome Canary 49 (probably older too) has some implementation bugs
    var hasBadResolverPromise = valueOrFalseIfThrows(function () {
      return !!BadResolverPromise.all([1, 2]);
    });

    if (!promiseSupportsSubclassing || !promiseIgnoresNonFunctionThenCallbacks ||
        !promiseRequiresObjectContext || promiseResolveBroken ||
        !getsThenSynchronously || hasBadResolverPromise) {
      /* globals Promise: true */
      /* eslint-disable no-undef, no-global-assign */
      /* jshint -W020 */
      Promise = PromiseShim;
      /* jshint +W020 */
      /* eslint-enable no-undef, no-global-assign */
      /* globals Promise: false */
      overrideNative(globals, 'Promise', PromiseShim);
    }
    if (Promise.all.length !== 1) {
      var origAll = Promise.all;
      overrideNative(Promise, 'all', function all(iterable) {
        return ES.Call(origAll, this, arguments);
      });
    }
    if (Promise.race.length !== 1) {
      var origRace = Promise.race;
      overrideNative(Promise, 'race', function race(iterable) {
        return ES.Call(origRace, this, arguments);
      });
    }
    if (Promise.resolve.length !== 1) {
      var origResolve = Promise.resolve;
      overrideNative(Promise, 'resolve', function resolve(x) {
        return ES.Call(origResolve, this, arguments);
      });
    }
    if (Promise.reject.length !== 1) {
      var origReject = Promise.reject;
      overrideNative(Promise, 'reject', function reject(r) {
        return ES.Call(origReject, this, arguments);
      });
    }
    ensureEnumerable(Promise, 'all');
    ensureEnumerable(Promise, 'race');
    ensureEnumerable(Promise, 'resolve');
    ensureEnumerable(Promise, 'reject');
    addDefaultSpecies(Promise);
  }

  // Map and Set require a true ES5 environment
  // Their fast path also requires that the environment preserve
  // property insertion order, which is not guaranteed by the spec.
  var testOrder = function (a) {
    var b = keys(_reduce(a, function (o, k) {
      o[k] = true;
      return o;
    }, {}));
    return a.join(':') === b.join(':');
  };
  var preservesInsertionOrder = testOrder(['z', 'a', 'bb']);
  // some engines (eg, Chrome) only preserve insertion order for string keys
  var preservesNumericInsertionOrder = testOrder(['z', 1, 'a', '3', 2]);

  if (supportsDescriptors) {

    var fastkey = function fastkey(key, skipInsertionOrderCheck) {
      if (!skipInsertionOrderCheck && !preservesInsertionOrder) {
        return null;
      }
      if (isNullOrUndefined(key)) {
        return '^' + ES.ToString(key);
      } else if (typeof key === 'string') {
        return '$' + key;
      } else if (typeof key === 'number') {
        // note that -0 will get coerced to "0" when used as a property key
        if (!preservesNumericInsertionOrder) {
          return 'n' + key;
        }
        return key;
      } else if (typeof key === 'boolean') {
        return 'b' + key;
      }
      return null;
    };

    var emptyObject = function emptyObject() {
      // accomodate some older not-quite-ES5 browsers
      return Object.create ? Object.create(null) : {};
    };

    var addIterableToMap = function addIterableToMap(MapConstructor, map, iterable) {
      if (isArray(iterable) || Type.string(iterable)) {
        _forEach(iterable, function (entry) {
          if (!ES.TypeIsObject(entry)) {
            throw new TypeError('Iterator value ' + entry + ' is not an entry object');
          }
          map.set(entry[0], entry[1]);
        });
      } else if (iterable instanceof MapConstructor) {
        _call(MapConstructor.prototype.forEach, iterable, function (value, key) {
          map.set(key, value);
        });
      } else {
        var iter, adder;
        if (!isNullOrUndefined(iterable)) {
          adder = map.set;
          if (!ES.IsCallable(adder)) { throw new TypeError('bad map'); }
          iter = ES.GetIterator(iterable);
        }
        if (typeof iter !== 'undefined') {
          while (true) {
            var next = ES.IteratorStep(iter);
            if (next === false) { break; }
            var nextItem = next.value;
            try {
              if (!ES.TypeIsObject(nextItem)) {
                throw new TypeError('Iterator value ' + nextItem + ' is not an entry object');
              }
              _call(adder, map, nextItem[0], nextItem[1]);
            } catch (e) {
              ES.IteratorClose(iter, true);
              throw e;
            }
          }
        }
      }
    };
    var addIterableToSet = function addIterableToSet(SetConstructor, set, iterable) {
      if (isArray(iterable) || Type.string(iterable)) {
        _forEach(iterable, function (value) {
          set.add(value);
        });
      } else if (iterable instanceof SetConstructor) {
        _call(SetConstructor.prototype.forEach, iterable, function (value) {
          set.add(value);
        });
      } else {
        var iter, adder;
        if (!isNullOrUndefined(iterable)) {
          adder = set.add;
          if (!ES.IsCallable(adder)) { throw new TypeError('bad set'); }
          iter = ES.GetIterator(iterable);
        }
        if (typeof iter !== 'undefined') {
          while (true) {
            var next = ES.IteratorStep(iter);
            if (next === false) { break; }
            var nextValue = next.value;
            try {
              _call(adder, set, nextValue);
            } catch (e) {
              ES.IteratorClose(iter, true);
              throw e;
            }
          }
        }
      }
    };

    var collectionShims = {
      Map: (function () {

        var empty = {};

        var MapEntry = function MapEntry(key, value) {
          this.key = key;
          this.value = value;
          this.next = null;
          this.prev = null;
        };

        MapEntry.prototype.isRemoved = function isRemoved() {
          return this.key === empty;
        };

        var isMap = function isMap(map) {
          return !!map._es6map;
        };

        var requireMapSlot = function requireMapSlot(map, method) {
          if (!ES.TypeIsObject(map) || !isMap(map)) {
            throw new TypeError('Method Map.prototype.' + method + ' called on incompatible receiver ' + ES.ToString(map));
          }
        };

        var MapIterator = function MapIterator(map, kind) {
          requireMapSlot(map, '[[MapIterator]]');
          this.head = map._head;
          this.i = this.head;
          this.kind = kind;
        };

        MapIterator.prototype = {
          next: function next() {
            var i = this.i;
            var kind = this.kind;
            var head = this.head;
            if (typeof this.i === 'undefined') {
              return iteratorResult();
            }
            while (i.isRemoved() && i !== head) {
              // back up off of removed entries
              i = i.prev;
            }
            // advance to next unreturned element.
            var result;
            while (i.next !== head) {
              i = i.next;
              if (!i.isRemoved()) {
                if (kind === 'key') {
                  result = i.key;
                } else if (kind === 'value') {
                  result = i.value;
                } else {
                  result = [i.key, i.value];
                }
                this.i = i;
                return iteratorResult(result);
              }
            }
            // once the iterator is done, it is done forever.
            this.i = void 0;
            return iteratorResult();
          }
        };
        addIterator(MapIterator.prototype);

        var Map$prototype;
        var MapShim = function Map() {
          if (!(this instanceof Map)) {
            throw new TypeError('Constructor Map requires "new"');
          }
          if (this && this._es6map) {
            throw new TypeError('Bad construction');
          }
          var map = emulateES6construct(this, Map, Map$prototype, {
            _es6map: true,
            _head: null,
            _map: OrigMap ? new OrigMap() : null,
            _size: 0,
            _storage: emptyObject()
          });

          var head = new MapEntry(null, null);
          // circular doubly-linked list.
          /* eslint no-multi-assign: 1 */
          head.next = head.prev = head;
          map._head = head;

          // Optionally initialize map from iterable
          if (arguments.length > 0) {
            addIterableToMap(Map, map, arguments[0]);
          }
          return map;
        };
        Map$prototype = MapShim.prototype;

        Value.getter(Map$prototype, 'size', function () {
          if (typeof this._size === 'undefined') {
            throw new TypeError('size method called on incompatible Map');
          }
          return this._size;
        });

        defineProperties(Map$prototype, {
          get: function get(key) {
            requireMapSlot(this, 'get');
            var entry;
            var fkey = fastkey(key, true);
            if (fkey !== null) {
              // fast O(1) path
              entry = this._storage[fkey];
              if (entry) {
                return entry.value;
              } else {
                return;
              }
            }
            if (this._map) {
              // fast object key path
              entry = origMapGet.call(this._map, key);
              if (entry) {
                return entry.value;
              } else {
                return;
              }
            }
            var head = this._head;
            var i = head;
            while ((i = i.next) !== head) {
              if (ES.SameValueZero(i.key, key)) {
                return i.value;
              }
            }
          },

          has: function has(key) {
            requireMapSlot(this, 'has');
            var fkey = fastkey(key, true);
            if (fkey !== null) {
              // fast O(1) path
              return typeof this._storage[fkey] !== 'undefined';
            }
            if (this._map) {
              // fast object key path
              return origMapHas.call(this._map, key);
            }
            var head = this._head;
            var i = head;
            while ((i = i.next) !== head) {
              if (ES.SameValueZero(i.key, key)) {
                return true;
              }
            }
            return false;
          },

          set: function set(key, value) {
            requireMapSlot(this, 'set');
            var head = this._head;
            var i = head;
            var entry;
            var fkey = fastkey(key, true);
            if (fkey !== null) {
              // fast O(1) path
              if (typeof this._storage[fkey] !== 'undefined') {
                this._storage[fkey].value = value;
                return this;
              } else {
                entry = this._storage[fkey] = new MapEntry(key, value); /* eslint no-multi-assign: 1 */
                i = head.prev;
                // fall through
              }
            } else if (this._map) {
              // fast object key path
              if (origMapHas.call(this._map, key)) {
                origMapGet.call(this._map, key).value = value;
              } else {
                entry = new MapEntry(key, value);
                origMapSet.call(this._map, key, entry);
                i = head.prev;
                // fall through
              }
            }
            while ((i = i.next) !== head) {
              if (ES.SameValueZero(i.key, key)) {
                i.value = value;
                return this;
              }
            }
            entry = entry || new MapEntry(key, value);
            if (ES.SameValue(-0, key)) {
              entry.key = +0; // coerce -0 to +0 in entry
            }
            entry.next = this._head;
            entry.prev = this._head.prev;
            entry.prev.next = entry;
            entry.next.prev = entry;
            this._size += 1;
            return this;
          },

          'delete': function (key) {
            requireMapSlot(this, 'delete');
            var head = this._head;
            var i = head;
            var fkey = fastkey(key, true);
            if (fkey !== null) {
              // fast O(1) path
              if (typeof this._storage[fkey] === 'undefined') {
                return false;
              }
              i = this._storage[fkey].prev;
              delete this._storage[fkey];
              // fall through
            } else if (this._map) {
              // fast object key path
              if (!origMapHas.call(this._map, key)) {
                return false;
              }
              i = origMapGet.call(this._map, key).prev;
              origMapDelete.call(this._map, key);
              // fall through
            }
            while ((i = i.next) !== head) {
              if (ES.SameValueZero(i.key, key)) {
                i.key = empty;
                i.value = empty;
                i.prev.next = i.next;
                i.next.prev = i.prev;
                this._size -= 1;
                return true;
              }
            }
            return false;
          },

          clear: function clear() {
             /* eslint no-multi-assign: 1 */
            requireMapSlot(this, 'clear');
            this._map = OrigMap ? new OrigMap() : null;
            this._size = 0;
            this._storage = emptyObject();
            var head = this._head;
            var i = head;
            var p = i.next;
            while ((i = p) !== head) {
              i.key = empty;
              i.value = empty;
              p = i.next;
              i.next = i.prev = head;
            }
            head.next = head.prev = head;
          },

          keys: function keys() {
            requireMapSlot(this, 'keys');
            return new MapIterator(this, 'key');
          },

          values: function values() {
            requireMapSlot(this, 'values');
            return new MapIterator(this, 'value');
          },

          entries: function entries() {
            requireMapSlot(this, 'entries');
            return new MapIterator(this, 'key+value');
          },

          forEach: function forEach(callback) {
            requireMapSlot(this, 'forEach');
            var context = arguments.length > 1 ? arguments[1] : null;
            var it = this.entries();
            for (var entry = it.next(); !entry.done; entry = it.next()) {
              if (context) {
                _call(callback, context, entry.value[1], entry.value[0], this);
              } else {
                callback(entry.value[1], entry.value[0], this);
              }
            }
          }
        });
        addIterator(Map$prototype, Map$prototype.entries);

        return MapShim;
      }()),

      Set: (function () {
        var isSet = function isSet(set) {
          return set._es6set && typeof set._storage !== 'undefined';
        };
        var requireSetSlot = function requireSetSlot(set, method) {
          if (!ES.TypeIsObject(set) || !isSet(set)) {
            // https://github.com/paulmillr/es6-shim/issues/176
            throw new TypeError('Set.prototype.' + method + ' called on incompatible receiver ' + ES.ToString(set));
          }
        };

        // Creating a Map is expensive.  To speed up the common case of
        // Sets containing only string or numeric keys, we use an object
        // as backing storage and lazily create a full Map only when
        // required.
        var Set$prototype;
        var SetShim = function Set() {
          if (!(this instanceof Set)) {
            throw new TypeError('Constructor Set requires "new"');
          }
          if (this && this._es6set) {
            throw new TypeError('Bad construction');
          }
          var set = emulateES6construct(this, Set, Set$prototype, {
            _es6set: true,
            '[[SetData]]': null,
            _storage: emptyObject()
          });
          if (!set._es6set) {
            throw new TypeError('bad set');
          }

          // Optionally initialize Set from iterable
          if (arguments.length > 0) {
            addIterableToSet(Set, set, arguments[0]);
          }
          return set;
        };
        Set$prototype = SetShim.prototype;

        var decodeKey = function (key) {
          var k = key;
          if (k === '^null') {
            return null;
          } else if (k === '^undefined') {
            return void 0;
          } else {
            var first = k.charAt(0);
            if (first === '$') {
              return _strSlice(k, 1);
            } else if (first === 'n') {
              return +_strSlice(k, 1);
            } else if (first === 'b') {
              return k === 'btrue';
            }
          }
          return +k;
        };
        // Switch from the object backing storage to a full Map.
        var ensureMap = function ensureMap(set) {
          if (!set['[[SetData]]']) {
            var m = new collectionShims.Map();
            set['[[SetData]]'] = m;
            _forEach(keys(set._storage), function (key) {
              var k = decodeKey(key);
              m.set(k, k);
            });
            set['[[SetData]]'] = m;
          }
          set._storage = null; // free old backing storage
        };

        Value.getter(SetShim.prototype, 'size', function () {
          requireSetSlot(this, 'size');
          if (this._storage) {
            return keys(this._storage).length;
          }
          ensureMap(this);
          return this['[[SetData]]'].size;
        });

        defineProperties(SetShim.prototype, {
          has: function has(key) {
            requireSetSlot(this, 'has');
            var fkey;
            if (this._storage && (fkey = fastkey(key)) !== null) {
              return !!this._storage[fkey];
            }
            ensureMap(this);
            return this['[[SetData]]'].has(key);
          },

          add: function add(key) {
            requireSetSlot(this, 'add');
            var fkey;
            if (this._storage && (fkey = fastkey(key)) !== null) {
              this._storage[fkey] = true;
              return this;
            }
            ensureMap(this);
            this['[[SetData]]'].set(key, key);
            return this;
          },

          'delete': function (key) {
            requireSetSlot(this, 'delete');
            var fkey;
            if (this._storage && (fkey = fastkey(key)) !== null) {
              var hasFKey = _hasOwnProperty(this._storage, fkey);
              return (delete this._storage[fkey]) && hasFKey;
            }
            ensureMap(this);
            return this['[[SetData]]']['delete'](key);
          },

          clear: function clear() {
            requireSetSlot(this, 'clear');
            if (this._storage) {
              this._storage = emptyObject();
            }
            if (this['[[SetData]]']) {
              this['[[SetData]]'].clear();
            }
          },

          values: function values() {
            requireSetSlot(this, 'values');
            ensureMap(this);
            return this['[[SetData]]'].values();
          },

          entries: function entries() {
            requireSetSlot(this, 'entries');
            ensureMap(this);
            return this['[[SetData]]'].entries();
          },

          forEach: function forEach(callback) {
            requireSetSlot(this, 'forEach');
            var context = arguments.length > 1 ? arguments[1] : null;
            var entireSet = this;
            ensureMap(entireSet);
            this['[[SetData]]'].forEach(function (value, key) {
              if (context) {
                _call(callback, context, key, key, entireSet);
              } else {
                callback(key, key, entireSet);
              }
            });
          }
        });
        defineProperty(SetShim.prototype, 'keys', SetShim.prototype.values, true);
        addIterator(SetShim.prototype, SetShim.prototype.values);

        return SetShim;
      }())
    };

    if (globals.Map || globals.Set) {
      // Safari 8, for example, doesn't accept an iterable.
      var mapAcceptsArguments = valueOrFalseIfThrows(function () { return new Map([[1, 2]]).get(1) === 2; });
      if (!mapAcceptsArguments) {
        globals.Map = function Map() {
          if (!(this instanceof Map)) {
            throw new TypeError('Constructor Map requires "new"');
          }
          var m = new OrigMap();
          if (arguments.length > 0) {
            addIterableToMap(Map, m, arguments[0]);
          }
          delete m.constructor;
          Object.setPrototypeOf(m, globals.Map.prototype);
          return m;
        };
        globals.Map.prototype = create(OrigMap.prototype);
        defineProperty(globals.Map.prototype, 'constructor', globals.Map, true);
        Value.preserveToString(globals.Map, OrigMap);
      }
      var testMap = new Map();
      var mapUsesSameValueZero = (function () {
        // Chrome 38-42, node 0.11/0.12, iojs 1/2 also have a bug when the Map has a size > 4
        var m = new Map([[1, 0], [2, 0], [3, 0], [4, 0]]);
        m.set(-0, m);
        return m.get(0) === m && m.get(-0) === m && m.has(0) && m.has(-0);
      }());
      var mapSupportsChaining = testMap.set(1, 2) === testMap;
      if (!mapUsesSameValueZero || !mapSupportsChaining) {
        overrideNative(Map.prototype, 'set', function set(k, v) {
          _call(origMapSet, this, k === 0 ? 0 : k, v);
          return this;
        });
      }
      if (!mapUsesSameValueZero) {
        defineProperties(Map.prototype, {
          get: function get(k) {
            return _call(origMapGet, this, k === 0 ? 0 : k);
          },
          has: function has(k) {
            return _call(origMapHas, this, k === 0 ? 0 : k);
          }
        }, true);
        Value.preserveToString(Map.prototype.get, origMapGet);
        Value.preserveToString(Map.prototype.has, origMapHas);
      }
      var testSet = new Set();
      var setUsesSameValueZero = (function (s) {
        s['delete'](0);
        s.add(-0);
        return !s.has(0);
      }(testSet));
      var setSupportsChaining = testSet.add(1) === testSet;
      if (!setUsesSameValueZero || !setSupportsChaining) {
        var origSetAdd = Set.prototype.add;
        Set.prototype.add = function add(v) {
          _call(origSetAdd, this, v === 0 ? 0 : v);
          return this;
        };
        Value.preserveToString(Set.prototype.add, origSetAdd);
      }
      if (!setUsesSameValueZero) {
        var origSetHas = Set.prototype.has;
        Set.prototype.has = function has(v) {
          return _call(origSetHas, this, v === 0 ? 0 : v);
        };
        Value.preserveToString(Set.prototype.has, origSetHas);
        var origSetDel = Set.prototype['delete'];
        Set.prototype['delete'] = function SetDelete(v) {
          return _call(origSetDel, this, v === 0 ? 0 : v);
        };
        Value.preserveToString(Set.prototype['delete'], origSetDel);
      }
      var mapSupportsSubclassing = supportsSubclassing(globals.Map, function (M) {
        var m = new M([]);
        // Firefox 32 is ok with the instantiating the subclass but will
        // throw when the map is used.
        m.set(42, 42);
        return m instanceof M;
      });
      // without Object.setPrototypeOf, subclassing is not possible
      var mapFailsToSupportSubclassing = Object.setPrototypeOf && !mapSupportsSubclassing;
      var mapRequiresNew = (function () {
        try {
          return !(globals.Map() instanceof globals.Map);
        } catch (e) {
          return e instanceof TypeError;
        }
      }());
      if (globals.Map.length !== 0 || mapFailsToSupportSubclassing || !mapRequiresNew) {
        globals.Map = function Map() {
          if (!(this instanceof Map)) {
            throw new TypeError('Constructor Map requires "new"');
          }
          var m = new OrigMap();
          if (arguments.length > 0) {
            addIterableToMap(Map, m, arguments[0]);
          }
          delete m.constructor;
          Object.setPrototypeOf(m, Map.prototype);
          return m;
        };
        globals.Map.prototype = OrigMap.prototype;
        defineProperty(globals.Map.prototype, 'constructor', globals.Map, true);
        Value.preserveToString(globals.Map, OrigMap);
      }
      var setSupportsSubclassing = supportsSubclassing(globals.Set, function (S) {
        var s = new S([]);
        s.add(42, 42);
        return s instanceof S;
      });
      // without Object.setPrototypeOf, subclassing is not possible
      var setFailsToSupportSubclassing = Object.setPrototypeOf && !setSupportsSubclassing;
      var setRequiresNew = (function () {
        try {
          return !(globals.Set() instanceof globals.Set);
        } catch (e) {
          return e instanceof TypeError;
        }
      }());
      if (globals.Set.length !== 0 || setFailsToSupportSubclassing || !setRequiresNew) {
        var OrigSet = globals.Set;
        globals.Set = function Set() {
          if (!(this instanceof Set)) {
            throw new TypeError('Constructor Set requires "new"');
          }
          var s = new OrigSet();
          if (arguments.length > 0) {
            addIterableToSet(Set, s, arguments[0]);
          }
          delete s.constructor;
          Object.setPrototypeOf(s, Set.prototype);
          return s;
        };
        globals.Set.prototype = OrigSet.prototype;
        defineProperty(globals.Set.prototype, 'constructor', globals.Set, true);
        Value.preserveToString(globals.Set, OrigSet);
      }
      var newMap = new globals.Map();
      var mapIterationThrowsStopIterator = !valueOrFalseIfThrows(function () {
        return newMap.keys().next().done;
      });
      /*
        - In Firefox < 23, Map#size is a function.
        - In all current Firefox, Set#entries/keys/values & Map#clear do not exist
        - https://bugzilla.mozilla.org/show_bug.cgi?id=869996
        - In Firefox 24, Map and Set do not implement forEach
        - In Firefox 25 at least, Map and Set are callable without "new"
      */
      if (
        typeof globals.Map.prototype.clear !== 'function' ||
        new globals.Set().size !== 0 ||
        newMap.size !== 0 ||
        typeof globals.Map.prototype.keys !== 'function' ||
        typeof globals.Set.prototype.keys !== 'function' ||
        typeof globals.Map.prototype.forEach !== 'function' ||
        typeof globals.Set.prototype.forEach !== 'function' ||
        isCallableWithoutNew(globals.Map) ||
        isCallableWithoutNew(globals.Set) ||
        typeof newMap.keys().next !== 'function' || // Safari 8
        mapIterationThrowsStopIterator || // Firefox 25
        !mapSupportsSubclassing
      ) {
        defineProperties(globals, {
          Map: collectionShims.Map,
          Set: collectionShims.Set
        }, true);
      }

      if (globals.Set.prototype.keys !== globals.Set.prototype.values) {
        // Fixed in WebKit with https://bugs.webkit.org/show_bug.cgi?id=144190
        defineProperty(globals.Set.prototype, 'keys', globals.Set.prototype.values, true);
      }

      // Shim incomplete iterator implementations.
      addIterator(Object.getPrototypeOf((new globals.Map()).keys()));
      addIterator(Object.getPrototypeOf((new globals.Set()).keys()));

      if (functionsHaveNames && globals.Set.prototype.has.name !== 'has') {
        // Microsoft Edge v0.11.10074.0 is missing a name on Set#has
        var anonymousSetHas = globals.Set.prototype.has;
        overrideNative(globals.Set.prototype, 'has', function has(key) {
          return _call(anonymousSetHas, this, key);
        });
      }
    }
    defineProperties(globals, collectionShims);
    addDefaultSpecies(globals.Map);
    addDefaultSpecies(globals.Set);
  }

  var throwUnlessTargetIsObject = function throwUnlessTargetIsObject(target) {
    if (!ES.TypeIsObject(target)) {
      throw new TypeError('target must be an object');
    }
  };

  // Some Reflect methods are basically the same as
  // those on the Object global, except that a TypeError is thrown if
  // target isn't an object. As well as returning a boolean indicating
  // the success of the operation.
  var ReflectShims = {
    // Apply method in a functional form.
    apply: function apply() {
      return ES.Call(ES.Call, null, arguments);
    },

    // New operator in a functional form.
    construct: function construct(constructor, args) {
      if (!ES.IsConstructor(constructor)) {
        throw new TypeError('First argument must be a constructor.');
      }
      var newTarget = arguments.length > 2 ? arguments[2] : constructor;
      if (!ES.IsConstructor(newTarget)) {
        throw new TypeError('new.target must be a constructor.');
      }
      return ES.Construct(constructor, args, newTarget, 'internal');
    },

    // When deleting a non-existent or configurable property,
    // true is returned.
    // When attempting to delete a non-configurable property,
    // it will return false.
    deleteProperty: function deleteProperty(target, key) {
      throwUnlessTargetIsObject(target);
      if (supportsDescriptors) {
        var desc = Object.getOwnPropertyDescriptor(target, key);

        if (desc && !desc.configurable) {
          return false;
        }
      }

      // Will return true.
      return delete target[key];
    },

    has: function has(target, key) {
      throwUnlessTargetIsObject(target);
      return key in target;
    }
  };

  if (Object.getOwnPropertyNames) {
    Object.assign(ReflectShims, {
      // Basically the result of calling the internal [[OwnPropertyKeys]].
      // Concatenating propertyNames and propertySymbols should do the trick.
      // This should continue to work together with a Symbol shim
      // which overrides Object.getOwnPropertyNames and implements
      // Object.getOwnPropertySymbols.
      ownKeys: function ownKeys(target) {
        throwUnlessTargetIsObject(target);
        var keys = Object.getOwnPropertyNames(target);

        if (ES.IsCallable(Object.getOwnPropertySymbols)) {
          _pushApply(keys, Object.getOwnPropertySymbols(target));
        }

        return keys;
      }
    });
  }

  var callAndCatchException = function ConvertExceptionToBoolean(func) {
    return !throwsError(func);
  };

  if (Object.preventExtensions) {
    Object.assign(ReflectShims, {
      isExtensible: function isExtensible(target) {
        throwUnlessTargetIsObject(target);
        return Object.isExtensible(target);
      },
      preventExtensions: function preventExtensions(target) {
        throwUnlessTargetIsObject(target);
        return callAndCatchException(function () {
          Object.preventExtensions(target);
        });
      }
    });
  }

  if (supportsDescriptors) {
    var internalGet = function get(target, key, receiver) {
      var desc = Object.getOwnPropertyDescriptor(target, key);

      if (!desc) {
        var parent = Object.getPrototypeOf(target);

        if (parent === null) {
          return void 0;
        }

        return internalGet(parent, key, receiver);
      }

      if ('value' in desc) {
        return desc.value;
      }

      if (desc.get) {
        return ES.Call(desc.get, receiver);
      }

      return void 0;
    };

    var internalSet = function set(target, key, value, receiver) {
      var desc = Object.getOwnPropertyDescriptor(target, key);

      if (!desc) {
        var parent = Object.getPrototypeOf(target);

        if (parent !== null) {
          return internalSet(parent, key, value, receiver);
        }

        desc = {
          value: void 0,
          writable: true,
          enumerable: true,
          configurable: true
        };
      }

      if ('value' in desc) {
        if (!desc.writable) {
          return false;
        }

        if (!ES.TypeIsObject(receiver)) {
          return false;
        }

        var existingDesc = Object.getOwnPropertyDescriptor(receiver, key);

        if (existingDesc) {
          return Reflect.defineProperty(receiver, key, {
            value: value
          });
        } else {
          return Reflect.defineProperty(receiver, key, {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }

      if (desc.set) {
        _call(desc.set, receiver, value);
        return true;
      }

      return false;
    };

    Object.assign(ReflectShims, {
      defineProperty: function defineProperty(target, propertyKey, attributes) {
        throwUnlessTargetIsObject(target);
        return callAndCatchException(function () {
          Object.defineProperty(target, propertyKey, attributes);
        });
      },

      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
        throwUnlessTargetIsObject(target);
        return Object.getOwnPropertyDescriptor(target, propertyKey);
      },

      // Syntax in a functional form.
      get: function get(target, key) {
        throwUnlessTargetIsObject(target);
        var receiver = arguments.length > 2 ? arguments[2] : target;

        return internalGet(target, key, receiver);
      },

      set: function set(target, key, value) {
        throwUnlessTargetIsObject(target);
        var receiver = arguments.length > 3 ? arguments[3] : target;

        return internalSet(target, key, value, receiver);
      }
    });
  }

  if (Object.getPrototypeOf) {
    var objectDotGetPrototypeOf = Object.getPrototypeOf;
    ReflectShims.getPrototypeOf = function getPrototypeOf(target) {
      throwUnlessTargetIsObject(target);
      return objectDotGetPrototypeOf(target);
    };
  }

  if (Object.setPrototypeOf && ReflectShims.getPrototypeOf) {
    var willCreateCircularPrototype = function (object, lastProto) {
      var proto = lastProto;
      while (proto) {
        if (object === proto) {
          return true;
        }
        proto = ReflectShims.getPrototypeOf(proto);
      }
      return false;
    };

    Object.assign(ReflectShims, {
      // Sets the prototype of the given object.
      // Returns true on success, otherwise false.
      setPrototypeOf: function setPrototypeOf(object, proto) {
        throwUnlessTargetIsObject(object);
        if (proto !== null && !ES.TypeIsObject(proto)) {
          throw new TypeError('proto must be an object or null');
        }

        // If they already are the same, we're done.
        if (proto === Reflect.getPrototypeOf(object)) {
          return true;
        }

        // Cannot alter prototype if object not extensible.
        if (Reflect.isExtensible && !Reflect.isExtensible(object)) {
          return false;
        }

        // Ensure that we do not create a circular prototype chain.
        if (willCreateCircularPrototype(object, proto)) {
          return false;
        }

        Object.setPrototypeOf(object, proto);

        return true;
      }
    });
  }
  var defineOrOverrideReflectProperty = function (key, shim) {
    if (!ES.IsCallable(globals.Reflect[key])) {
      defineProperty(globals.Reflect, key, shim);
    } else {
      var acceptsPrimitives = valueOrFalseIfThrows(function () {
        globals.Reflect[key](1);
        globals.Reflect[key](NaN);
        globals.Reflect[key](true);
        return true;
      });
      if (acceptsPrimitives) {
        overrideNative(globals.Reflect, key, shim);
      }
    }
  };
  Object.keys(ReflectShims).forEach(function (key) {
    defineOrOverrideReflectProperty(key, ReflectShims[key]);
  });
  var originalReflectGetProto = globals.Reflect.getPrototypeOf;
  if (functionsHaveNames && originalReflectGetProto && originalReflectGetProto.name !== 'getPrototypeOf') {
    overrideNative(globals.Reflect, 'getPrototypeOf', function getPrototypeOf(target) {
      return _call(originalReflectGetProto, globals.Reflect, target);
    });
  }
  if (globals.Reflect.setPrototypeOf) {
    if (valueOrFalseIfThrows(function () {
      globals.Reflect.setPrototypeOf(1, {});
      return true;
    })) {
      overrideNative(globals.Reflect, 'setPrototypeOf', ReflectShims.setPrototypeOf);
    }
  }
  if (globals.Reflect.defineProperty) {
    if (!valueOrFalseIfThrows(function () {
      var basic = !globals.Reflect.defineProperty(1, 'test', { value: 1 });
      // "extensible" fails on Edge 0.12
      var extensible = typeof Object.preventExtensions !== 'function' || !globals.Reflect.defineProperty(Object.preventExtensions({}), 'test', {});
      return basic && extensible;
    })) {
      overrideNative(globals.Reflect, 'defineProperty', ReflectShims.defineProperty);
    }
  }
  if (globals.Reflect.construct) {
    if (!valueOrFalseIfThrows(function () {
      var F = function F() {};
      return globals.Reflect.construct(function () {}, [], F) instanceof F;
    })) {
      overrideNative(globals.Reflect, 'construct', ReflectShims.construct);
    }
  }

  if (String(new Date(NaN)) !== 'Invalid Date') {
    var dateToString = Date.prototype.toString;
    var shimmedDateToString = function toString() {
      var valueOf = +this;
      if (valueOf !== valueOf) {
        return 'Invalid Date';
      }
      return ES.Call(dateToString, this);
    };
    overrideNative(Date.prototype, 'toString', shimmedDateToString);
  }

  // Annex B HTML methods
  // http://www.ecma-international.org/ecma-262/6.0/#sec-additional-properties-of-the-string.prototype-object
  var stringHTMLshims = {
    anchor: function anchor(name) { return ES.CreateHTML(this, 'a', 'name', name); },
    big: function big() { return ES.CreateHTML(this, 'big', '', ''); },
    blink: function blink() { return ES.CreateHTML(this, 'blink', '', ''); },
    bold: function bold() { return ES.CreateHTML(this, 'b', '', ''); },
    fixed: function fixed() { return ES.CreateHTML(this, 'tt', '', ''); },
    fontcolor: function fontcolor(color) { return ES.CreateHTML(this, 'font', 'color', color); },
    fontsize: function fontsize(size) { return ES.CreateHTML(this, 'font', 'size', size); },
    italics: function italics() { return ES.CreateHTML(this, 'i', '', ''); },
    link: function link(url) { return ES.CreateHTML(this, 'a', 'href', url); },
    small: function small() { return ES.CreateHTML(this, 'small', '', ''); },
    strike: function strike() { return ES.CreateHTML(this, 'strike', '', ''); },
    sub: function sub() { return ES.CreateHTML(this, 'sub', '', ''); },
    sup: function sub() { return ES.CreateHTML(this, 'sup', '', ''); }
  };
  _forEach(Object.keys(stringHTMLshims), function (key) {
    var method = String.prototype[key];
    var shouldOverwrite = false;
    if (ES.IsCallable(method)) {
      var output = _call(method, '', ' " ');
      var quotesCount = _concat([], output.match(/"/g)).length;
      shouldOverwrite = output !== output.toLowerCase() || quotesCount > 2;
    } else {
      shouldOverwrite = true;
    }
    if (shouldOverwrite) {
      overrideNative(String.prototype, key, stringHTMLshims[key]);
    }
  });

  var JSONstringifiesSymbols = (function () {
    // Microsoft Edge v0.12 stringifies Symbols incorrectly
    if (!hasSymbols) { return false; } // Symbols are not supported
    var stringify = typeof JSON === 'object' && typeof JSON.stringify === 'function' ? JSON.stringify : null;
    if (!stringify) { return false; } // JSON.stringify is not supported
    if (typeof stringify(Symbol()) !== 'undefined') { return true; } // Symbols should become `undefined`
    if (stringify([Symbol()]) !== '[null]') { return true; } // Symbols in arrays should become `null`
    var obj = { a: Symbol() };
    obj[Symbol()] = true;
    if (stringify(obj) !== '{}') { return true; } // Symbol-valued keys *and* Symbol-valued properties should be omitted
    return false;
  }());
  var JSONstringifyAcceptsObjectSymbol = valueOrFalseIfThrows(function () {
    // Chrome 45 throws on stringifying object symbols
    if (!hasSymbols) { return true; } // Symbols are not supported
    return JSON.stringify(Object(Symbol())) === '{}' && JSON.stringify([Object(Symbol())]) === '[{}]';
  });
  if (JSONstringifiesSymbols || !JSONstringifyAcceptsObjectSymbol) {
    var origStringify = JSON.stringify;
    overrideNative(JSON, 'stringify', function stringify(value) {
      if (typeof value === 'symbol') { return; }
      var replacer;
      if (arguments.length > 1) {
        replacer = arguments[1];
      }
      var args = [value];
      if (!isArray(replacer)) {
        var replaceFn = ES.IsCallable(replacer) ? replacer : null;
        var wrappedReplacer = function (key, val) {
          var parsedValue = replaceFn ? _call(replaceFn, this, key, val) : val;
          if (typeof parsedValue !== 'symbol') {
            if (Type.symbol(parsedValue)) {
              return assignTo({})(parsedValue);
            } else {
              return parsedValue;
            }
          }
        };
        args.push(wrappedReplacer);
      } else {
        // create wrapped replacer that handles an array replacer?
        args.push(replacer);
      }
      if (arguments.length > 2) {
        args.push(arguments[2]);
      }
      return origStringify.apply(this, args);
    });
  }

  return globals;
}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":24}],23:[function(require,module,exports){
/* Font Face Observer v2.0.13 - © Bram Stein. License: BSD-3-Clause */(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function r(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function t(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function y(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function z(a,b){function c(){var a=k;y(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);y(a)};function A(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var B=null,C=null,E=null,F=null;function G(){if(null===C)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);C=!!a&&603>parseInt(a[1],10)}else C=!1;return C}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
A.prototype.load=function(a,b){var c=this,k=a||"BESbswy",q=0,D=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=D?b():document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},function(){b()})}e()}),N=new Promise(function(a,c){q=setTimeout(c,D)});Promise.race([N,M]).then(function(){clearTimeout(q);a(c)},function(){b(c)})}else m(function(){function u(){var b;if(b=-1!=
f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===B&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),B=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=B&&(f==v&&g==v&&h==v||f==w&&g==w&&h==w||f==x&&g==x&&h==x)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(q),a(c))}function I(){if((new Date).getTime()-H>=D)d.parentNode&&d.parentNode.removeChild(d),b(c);else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,
g=n.a.offsetWidth,h=p.a.offsetWidth,u();q=setTimeout(I,50)}}var e=new r(k),n=new r(k),p=new r(k),f=-1,g=-1,h=-1,v=-1,w=-1,x=-1,d=document.createElement("div");d.dir="ltr";t(e,L(c,"sans-serif"));t(n,L(c,"serif"));t(p,L(c,"monospace"));d.appendChild(e.a);d.appendChild(n.a);d.appendChild(p.a);document.body.appendChild(d);v=e.a.offsetWidth;w=n.a.offsetWidth;x=p.a.offsetWidth;I();z(e,function(a){f=a;u()});t(e,L(c,'"'+c.family+'",sans-serif'));z(n,function(a){g=a;u()});t(n,L(c,'"'+c.family+'",serif'));
z(p,function(a){h=a;u()});t(p,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=A:(window.FontFaceObserver=A,window.FontFaceObserver.prototype.load=A.prototype.load);}());

},{}],24:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[11])
//# sourceMappingURL=code.js.map

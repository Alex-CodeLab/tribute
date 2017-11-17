(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tribute = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _TributeEvents = require("./TributeEvents");

var _TributeEvents2 = _interopRequireDefault(_TributeEvents);

var _TributeMenuEvents = require("./TributeMenuEvents");

var _TributeMenuEvents2 = _interopRequireDefault(_TributeMenuEvents);

var _TributeRange = require("./TributeRange");

var _TributeRange2 = _interopRequireDefault(_TributeRange);

var _TributeSearch = require("./TributeSearch");

var _TributeSearch2 = _interopRequireDefault(_TributeSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tribute = function () {
    function Tribute(_ref) {
        var _this = this;

        var _ref$values = _ref.values,
            values = _ref$values === undefined ? null : _ref$values,
            _ref$iframe = _ref.iframe,
            iframe = _ref$iframe === undefined ? null : _ref$iframe,
            _ref$selectClass = _ref.selectClass,
            selectClass = _ref$selectClass === undefined ? 'highlight' : _ref$selectClass,
            _ref$trigger = _ref.trigger,
            trigger = _ref$trigger === undefined ? '@' : _ref$trigger,
            _ref$selectTemplate = _ref.selectTemplate,
            selectTemplate = _ref$selectTemplate === undefined ? null : _ref$selectTemplate,
            _ref$menuItemTemplate = _ref.menuItemTemplate,
            menuItemTemplate = _ref$menuItemTemplate === undefined ? null : _ref$menuItemTemplate,
            _ref$lookup = _ref.lookup,
            lookup = _ref$lookup === undefined ? 'key' : _ref$lookup,
            _ref$fillAttr = _ref.fillAttr,
            fillAttr = _ref$fillAttr === undefined ? 'value' : _ref$fillAttr,
            _ref$collection = _ref.collection,
            collection = _ref$collection === undefined ? null : _ref$collection,
            _ref$menuContainer = _ref.menuContainer,
            menuContainer = _ref$menuContainer === undefined ? null : _ref$menuContainer,
            _ref$noMatchTemplate = _ref.noMatchTemplate,
            noMatchTemplate = _ref$noMatchTemplate === undefined ? null : _ref$noMatchTemplate,
            _ref$requireLeadingSp = _ref.requireLeadingSpace,
            requireLeadingSpace = _ref$requireLeadingSp === undefined ? true : _ref$requireLeadingSp,
            _ref$allowSpaces = _ref.allowSpaces,
            allowSpaces = _ref$allowSpaces === undefined ? false : _ref$allowSpaces,
            _ref$replaceTextSuffi = _ref.replaceTextSuffix,
            replaceTextSuffix = _ref$replaceTextSuffi === undefined ? null : _ref$replaceTextSuffi,
            _ref$positionMenu = _ref.positionMenu,
            positionMenu = _ref$positionMenu === undefined ? true : _ref$positionMenu,
            _ref$selectionContext = _ref.selectionContext,
            selectionContext = _ref$selectionContext === undefined ? null : _ref$selectionContext;

        _classCallCheck(this, Tribute);

        this.menuSelected = 0;
        this.current = {};
        this.inputEvent = false;
        this.isActive = false;
        this.menuContainer = menuContainer;
        this.allowSpaces = allowSpaces;
        this.replaceTextSuffix = replaceTextSuffix;
        this.positionMenu = positionMenu;
        this.selectionContext = selectionContext;

        if (values) {
            this.collection = [{
                // symbol that starts the lookup
                trigger: trigger,

                iframe: iframe,

                selectClass: selectClass,

                // function called on select that retuns the content to insert
                selectTemplate: (selectTemplate || Tribute.defaultSelectTemplate).bind(this),

                // function called that returns content for an item
                menuItemTemplate: (menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(this),

                // function called when menu is empty, disables hiding of menu.
                noMatchTemplate: function (t) {
                    if (typeof t === 'function') {
                        return t.bind(_this);
                    }

                    return function () {
                        return '<li class="no-match">No match!</li>';
                    }.bind(_this);
                }(noMatchTemplate),

                // column to search against in the object
                lookup: lookup,

                // column that contains the content to insert by default
                fillAttr: fillAttr,

                // array of objects or a function returning an array of objects
                values: values,

                requireLeadingSpace: requireLeadingSpace,

                allowSpaces: allowSpaces,

                replaceTextSuffix: replaceTextSuffix,

                positionMenu: positionMenu,

                selectionContext: selectionContext
            }];
        } else if (collection) {
            this.collection = collection.map(function (item) {
                return {
                    trigger: item.trigger || trigger,
                    iframe: item.iframe || iframe,
                    selectClass: item.selectClass || selectClass,
                    selectTemplate: (item.selectTemplate || Tribute.defaultSelectTemplate).bind(_this),
                    menuItemTemplate: (item.menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(_this),
                    // function called when menu is empty, disables hiding of menu.
                    noMatchTemplate: function (t) {
                        if (typeof t === 'function') {
                            return t.bind(_this);
                        }

                        return null;
                    }(noMatchTemplate),
                    lookup: item.lookup || lookup,
                    fillAttr: item.fillAttr || fillAttr,
                    values: item.values,
                    requireLeadingSpace: item.requireLeadingSpace,
                    allowSpaces: item.allowSpaces,
                    replaceTextSuffix: item.replaceTextSuffix,
                    positionMenu: item.positionMenu,
                    selectionContext: item.selectionContext
                };
            });
        } else {
            throw new Error('[Tribute] No collection specified.');
        }

        new _TributeRange2.default(this);
        new _TributeEvents2.default(this);
        new _TributeMenuEvents2.default(this);
        new _TributeSearch2.default(this);
    }

    _createClass(Tribute, [{
        key: "triggers",
        value: function triggers() {
            return this.collection.map(function (config) {
                return config.trigger;
            });
        }
    }, {
        key: "attach",
        value: function attach(el) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._attach(el[i]);
                }
            } else {
                this._attach(el);
            }
        }
    }, {
        key: "_attach",
        value: function _attach(el) {
            if (el.hasAttribute('data-tribute')) {
                console.warn('Tribute was already bound to ' + el.nodeName);
            }

            this.ensureEditable(el);
            this.events.bind(el);
            el.setAttribute('data-tribute', true);
        }
    }, {
        key: "ensureEditable",
        value: function ensureEditable(element) {
            if (Tribute.inputTypes().indexOf(element.nodeName) === -1) {
                if (element.contentEditable) {
                    element.contentEditable = true;
                } else {
                    throw new Error('[Tribute] Cannot bind to ' + element.nodeName);
                }
            }
        }
    }, {
        key: "createMenu",
        value: function createMenu() {
            var wrapper = this.range.getDocument().createElement('div'),
                ul = this.range.getDocument().createElement('ul');

            wrapper.className = 'tribute-container';
            wrapper.appendChild(ul);

            if (this.menuContainer) {
                return this.menuContainer.appendChild(wrapper);
            }

            return this.range.getDocument().body.appendChild(wrapper);
        }
    }, {
        key: "showMenuFor",
        value: function showMenuFor(element, scrollTo) {
            var _this2 = this;

            // Only proceed if menu isn't already shown for the current element & mentionText
            if (this.isActive && this.current.element === element && this.current.mentionText === this.currentMentionTextSnapshot) {
                return;
            }
            this.currentMentionTextSnapshot = this.current.mentionText;

            // create the menu if it doesn't exist.
            if (!this.menu) {
                this.menu = this.createMenu();
                this.menuEvents.bind(this.menu);
            }

            this.isActive = true;
            this.menuSelected = 0;

            if (!this.current.mentionText) {
                this.current.mentionText = '';
            }

            var processValues = function processValues(values) {
                // Tribute may not be active any more by the time the value callback returns
                if (!_this2.isActive) {
                    return;
                }

                var items = _this2.search.filter(_this2.current.mentionText, values, {
                    pre: '<span>',
                    post: '</span>',
                    extract: function extract(el) {
                        if (typeof _this2.current.collection.lookup === 'string') {
                            return el[_this2.current.collection.lookup];
                        } else if (typeof _this2.current.collection.lookup === 'function') {
                            return _this2.current.collection.lookup(el);
                        } else {
                            throw new Error('Invalid lookup attribute, lookup must be string or function.');
                        }
                    }
                });

                _this2.current.filteredItems = items;

                var ul = _this2.menu.querySelector('ul');

                _this2.range.positionMenuAtCaret(scrollTo);

                if (!items.length) {
                    var noMatchEvent = new CustomEvent('tribute-no-match', { detail: _this2.menu });
                    _this2.current.element.dispatchEvent(noMatchEvent);
                    if (!_this2.current.collection.noMatchTemplate) {
                        _this2.hideMenu();
                    } else {
                        ul.innerHTML = _this2.current.collection.noMatchTemplate();
                    }

                    return;
                }

                ul.innerHTML = '';

                items.forEach(function (item, index) {
                    var li = _this2.range.getDocument().createElement('li');
                    li.setAttribute('data-index', index);
                    li.addEventListener('mouseenter', function (e) {
                        var li = e.target;
                        var index = li.getAttribute('data-index');
                        _this2.events.setActiveLi(index);
                    });
                    if (_this2.menuSelected === index) {
                        li.className = _this2.current.collection.selectClass;
                    }
                    li.innerHTML = _this2.current.collection.menuItemTemplate(item);
                    ul.appendChild(li);
                });
            };

            if (typeof this.current.collection.values === 'function') {
                this.current.collection.values(this.current.mentionText, processValues);
            } else {
                processValues(this.current.collection.values);
            }
        }
    }, {
        key: "showMenuForCollection",
        value: function showMenuForCollection(element, collectionIndex) {
            if (element !== document.activeElement) {
                this.placeCaretAtEnd(element);
            }

            this.current.collection = this.collection[collectionIndex || 0];
            this.current.externalTrigger = true;
            this.current.element = element;

            if (element.isContentEditable) this.insertTextAtCursor(this.current.collection.trigger);else this.insertAtCaret(element, this.current.collection.trigger);

            this.showMenuFor(element);
        }

        // TODO: make sure this works for inputs/textareas

    }, {
        key: "placeCaretAtEnd",
        value: function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }

        // for contenteditable

    }, {
        key: "insertTextAtCursor",
        value: function insertTextAtCursor(text) {
            var sel, range, html;
            sel = window.getSelection();
            range = sel.getRangeAt(0);
            range.deleteContents();
            var textNode = document.createTextNode(text);
            range.insertNode(textNode);
            range.selectNodeContents(textNode);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }

        // for regular inputs

    }, {
        key: "insertAtCaret",
        value: function insertAtCaret(textarea, text) {
            var scrollPos = textarea.scrollTop;
            var caretPos = textarea.selectionStart;

            var front = textarea.value.substring(0, caretPos);
            var back = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
            textarea.value = front + text + back;
            caretPos = caretPos + text.length;
            textarea.selectionStart = caretPos;
            textarea.selectionEnd = caretPos;
            textarea.focus();
            textarea.scrollTop = scrollPos;
        }
    }, {
        key: "hideMenu",
        value: function hideMenu() {
            if (this.menu) {
                this.menu.style.cssText = 'display: none;';
                this.isActive = false;
                this.menuSelected = 0;
                this.current = {};
            }
        }
    }, {
        key: "selectItemAtIndex",
        value: function selectItemAtIndex(index, originalEvent) {
            index = parseInt(index);
            if (typeof index !== 'number') return;
            var item = this.current.filteredItems[index];
            var content = this.current.collection.selectTemplate(item);
            if (content !== null) this.replaceText(content, originalEvent, item);
        }
    }, {
        key: "replaceText",
        value: function replaceText(content, originalEvent, item) {
            this.range.replaceTriggerText(content, true, true, originalEvent, item);
        }
    }, {
        key: "_append",
        value: function _append(collection, newValues, replace) {
            if (typeof collection.values === 'function') {
                throw new Error('Unable to append to values, as it is a function.');
            } else if (!replace) {
                collection.values = collection.values.concat(newValues);
            } else {
                collection.values = newValues;
            }
        }
    }, {
        key: "append",
        value: function append(collectionIndex, newValues, replace) {
            var index = parseInt(collectionIndex);
            if (typeof index !== 'number') throw new Error('please provide an index for the collection to update.');

            var collection = this.collection[index];

            this._append(collection, newValues, replace);
        }
    }, {
        key: "appendCurrent",
        value: function appendCurrent(newValues, replace) {
            if (this.isActive) {
                this._append(this.current.collection, newValues, replace);
            } else {
                throw new Error('No active state. Please use append instead and pass an index.');
            }
        }
    }], [{
        key: "defaultSelectTemplate",
        value: function defaultSelectTemplate(item) {
            if (typeof item === 'undefined') return null;
            if (this.range.isContentEditable(this.current.element)) {
                return '<span class="tribute-mention">' + (this.current.collection.trigger + item.original[this.current.collection.fillAttr]) + '</span>';
            }

            return this.current.collection.trigger + item.original[this.current.collection.fillAttr];
        }
    }, {
        key: "defaultMenuItemTemplate",
        value: function defaultMenuItemTemplate(matchItem) {
            return matchItem.string;
        }
    }, {
        key: "inputTypes",
        value: function inputTypes() {
            return ['TEXTAREA', 'INPUT'];
        }
    }]);

    return Tribute;
}();

exports.default = Tribute;
module.exports = exports["default"];

},{"./TributeEvents":2,"./TributeMenuEvents":3,"./TributeRange":4,"./TributeSearch":5,"./utils":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeEvents = function () {
    function TributeEvents(tribute) {
        _classCallCheck(this, TributeEvents);

        this.tribute = tribute;
        this.tribute.events = this;
    }

    _createClass(TributeEvents, [{
        key: 'bind',
        value: function bind(element) {
            element.addEventListener('keydown', this.keydown.bind(element, this), false);
            element.addEventListener('keyup', this.keyup.bind(element, this), false);
            element.addEventListener('input', this.input.bind(element, this), false);
        }
    }, {
        key: 'keydown',
        value: function keydown(instance, event) {
            if (instance.shouldDeactivate(event)) {
                instance.tribute.isActive = false;
                instance.tribute.hideMenu();
            }

            var element = this;
            instance.commandEvent = false;

            TributeEvents.keys().forEach(function (o) {
                if (o.key === event.keyCode) {
                    instance.commandEvent = true;
                    instance.callbacks()[o.value.toLowerCase()](event, element);
                }
            });
        }
    }, {
        key: 'input',
        value: function input(instance, event) {
            instance.inputEvent = true;
            instance.keyup.call(this, instance, event);
        }
    }, {
        key: 'click',
        value: function click(instance, event) {
            var tribute = instance.tribute;
            if (tribute.menu && tribute.menu.contains(event.target)) {
                var li = event.target;
                event.preventDefault();
                event.stopPropagation();
                while (li.nodeName.toLowerCase() !== 'li') {
                    li = li.parentNode;
                    if (!li || li === tribute.menu) {
                        throw new Error('cannot find the <li> container for the click');
                    }
                }
                tribute.selectItemAtIndex(li.getAttribute('data-index'), event);
                tribute.hideMenu();

                // TODO: should fire with externalTrigger and target is outside of menu
            } else if (tribute.current.element && !tribute.current.externalTrigger) {
                tribute.current.externalTrigger = false;
                setTimeout(function () {
                    return tribute.hideMenu();
                });
            }
        }
    }, {
        key: 'keyup',
        value: function keyup(instance, event) {
            if (instance.inputEvent) {
                instance.inputEvent = false;
            }
            instance.updateSelection(this);

            if (event.keyCode === 27) return;

            if (!instance.tribute.isActive) {
                var keyCode = instance.getKeyCode(instance, this, event);

                if (isNaN(keyCode) || !keyCode) return;

                var trigger = instance.tribute.triggers().find(function (trigger) {
                    return trigger.charCodeAt(0) === keyCode;
                });

                if (typeof trigger !== 'undefined') {
                    instance.callbacks().triggerChar(event, this, trigger);
                }
            }

            if (instance.tribute.current.trigger && instance.commandEvent === false || instance.tribute.isActive && event.keyCode === 8) {
                instance.tribute.showMenuFor(this, true);
            }
        }
    }, {
        key: 'shouldDeactivate',
        value: function shouldDeactivate(event) {
            if (!this.tribute.isActive) return false;

            if (this.tribute.current.mentionText.length === 0) {
                var eventKeyPressed = false;
                TributeEvents.keys().forEach(function (o) {
                    if (event.keyCode === o.key) eventKeyPressed = true;
                });

                return !eventKeyPressed;
            }

            return false;
        }
    }, {
        key: 'getKeyCode',
        value: function getKeyCode(instance, el, event) {
            var char = void 0;
            var tribute = instance.tribute;
            var info = tribute.range.getTriggerInfo(false, false, true, tribute.allowSpaces);

            if (info) {
                return info.mentionTriggerChar.charCodeAt(0);
            } else {
                return false;
            }
        }
    }, {
        key: 'updateSelection',
        value: function updateSelection(el) {
            this.tribute.current.element = el;
            var info = this.tribute.range.getTriggerInfo(false, false, true, this.tribute.allowSpaces);

            if (info) {
                this.tribute.current.selectedPath = info.mentionSelectedPath;
                this.tribute.current.mentionText = info.mentionText;
                this.tribute.current.selectedOffset = info.mentionSelectedOffset;
            }
        }
    }, {
        key: 'callbacks',
        value: function callbacks() {
            var _this = this;

            return {
                triggerChar: function triggerChar(e, el, trigger) {
                    var tribute = _this.tribute;
                    tribute.current.trigger = trigger;

                    var collectionItem = tribute.collection.find(function (item) {
                        return item.trigger === trigger;
                    });

                    tribute.current.collection = collectionItem;
                    if (tribute.inputEvent) tribute.showMenuFor(el, true);
                },
                enter: function enter(e, el) {
                    // choose selection
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(function () {
                            _this.tribute.selectItemAtIndex(_this.tribute.menuSelected, e);
                            _this.tribute.hideMenu();
                        }, 0);
                    }
                },
                escape: function escape(e, el) {
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.tribute.isActive = false;
                        _this.tribute.hideMenu();
                    }
                },
                tab: function tab(e, el) {
                    // choose first match
                    _this.callbacks().enter(e, el);
                },
                up: function up(e, el) {
                    // navigate up ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length,
                            selected = _this.tribute.menuSelected;

                        if (count > selected && selected > 0) {
                            _this.tribute.menuSelected--;
                            _this.setActiveLi();
                        } else if (selected === 0) {
                            _this.tribute.menuSelected = count - 1;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = _this.tribute.menu.scrollHeight;
                        }
                    }
                },
                down: function down(e, el) {
                    // navigate down ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length - 1,
                            selected = _this.tribute.menuSelected;

                        if (count > selected) {
                            _this.tribute.menuSelected++;
                            _this.setActiveLi();
                        } else if (count === selected) {
                            _this.tribute.menuSelected = 0;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = 0;
                        }
                    }
                },
                delete: function _delete(e, el) {
                    if (_this.tribute.isActive && _this.tribute.current.mentionText.length < 1) {
                        _this.tribute.hideMenu();
                    } else if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(el);
                    }
                }
            };
        }
    }, {
        key: 'setActiveLi',
        value: function setActiveLi(index) {
            var lis = this.tribute.menu.querySelectorAll('li'),
                length = lis.length >>> 0;

            // get heights
            var menuFullHeight = this.getFullHeight(this.tribute.menu),
                liHeight = this.getFullHeight(lis[0]);

            if (index) this.tribute.menuSelected = index;

            for (var i = 0; i < length; i++) {
                var li = lis[i];
                if (i === this.tribute.menuSelected) {
                    var offset = liHeight * (i + 1);
                    var scrollTop = this.tribute.menu.scrollTop;
                    var totalScroll = scrollTop + menuFullHeight;

                    if (offset > totalScroll) {
                        this.tribute.menu.scrollTop += liHeight;
                    } else if (offset < totalScroll) {
                        this.tribute.menu.scrollTop -= liHeight;
                    }

                    li.className = this.tribute.current.collection.selectClass;
                } else {
                    li.className = '';
                }
            }
        }
    }, {
        key: 'getFullHeight',
        value: function getFullHeight(elem, includeMargin) {
            var height = elem.getBoundingClientRect().height;

            if (includeMargin) {
                var style = elem.currentStyle || window.getComputedStyle(elem);
                return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            }

            return height;
        }
    }], [{
        key: 'keys',
        value: function keys() {
            return [{
                key: 9,
                value: 'TAB'
            }, {
                key: 8,
                value: 'DELETE'
            }, {
                key: 13,
                value: 'ENTER'
            }, {
                key: 27,
                value: 'ESCAPE'
            }, {
                key: 38,
                value: 'UP'
            }, {
                key: 40,
                value: 'DOWN'
            }];
        }
    }]);

    return TributeEvents;
}();

exports.default = TributeEvents;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeMenuEvents = function () {
    function TributeMenuEvents(tribute) {
        _classCallCheck(this, TributeMenuEvents);

        this.tribute = tribute;
        this.tribute.menuEvents = this;
        this.menu = this.tribute.menu;
    }

    _createClass(TributeMenuEvents, [{
        key: 'bind',
        value: function bind(menu) {
            var _this = this;

            menu.addEventListener('keydown', this.tribute.events.keydown.bind(this.menu, this), false);
            this.tribute.range.getDocument().addEventListener('mousedown', this.tribute.events.click.bind(null, this), false);

            // fixes IE11 issues with mousedown
            this.tribute.range.getDocument().addEventListener('MSPointerDown', this.tribute.events.click.bind(null, this), false);

            window.addEventListener('resize', this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.range.positionMenuAtCaret(true);
                }
            }, 300, false));

            if (this.menuContainer) {
                this.menuContainer.addEventListener('scroll', this.debounce(function () {
                    if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(_this.tribute.current.element, false);
                    }
                }, 300, false), false);
            } else {
                window.onscroll = this.debounce(function () {
                    if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(_this.tribute.current.element, false);
                    }
                }, 300, false);
            }
        }
    }, {
        key: 'debounce',
        value: function debounce(func, wait, immediate) {
            var _this2 = this,
                _arguments = arguments;

            var timeout;
            return function () {
                var context = _this2,
                    args = _arguments;
                var later = function later() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    }]);

    return TributeMenuEvents;
}();

exports.default = TributeMenuEvents;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/jeff-collins/ment.io
var TributeRange = function () {
    function TributeRange(tribute) {
        _classCallCheck(this, TributeRange);

        this.tribute = tribute;
        this.tribute.range = this;
    }

    _createClass(TributeRange, [{
        key: 'getDocument',
        value: function getDocument() {
            var iframe = void 0;
            if (this.tribute.current.collection) {
                iframe = this.tribute.current.collection.iframe;
            }

            if (!iframe) {
                return document;
            }

            return iframe.contentWindow.document;
        }
    }, {
        key: 'positionMenuAtCaret',
        value: function positionMenuAtCaret(scrollTo) {
            var context = this.tribute.current,
                coordinates = void 0;

            var info = this.getTriggerInfo(false, false, true, this.tribute.allowSpaces);

            if (typeof info !== 'undefined') {

                if (!this.tribute.positionMenu) {
                    this.tribute.menu.style.cssText = 'display: block;';
                    return;
                }

                if (!this.isContentEditable(context.element)) {
                    coordinates = this.getTextAreaOrInputUnderlinePosition(this.getDocument().activeElement, info.mentionPosition);
                } else {
                    coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
                }

                // TODO: flip the dropdown if rendered off of screen edge.
                // let contentWidth = this.tribute.menu.offsetWidth + coordinates.left
                // let parentWidth;

                // if (this.tribute.menuContainer) {
                //     parentWidth = this.tribute.menuContainer.offsetWidth
                // } else {
                //     parentWidth = this.getDocument().body.offsetWidth
                // }

                // if (contentWidth > parentWidth) {
                //     let diff = contentWidth - parentWidth
                //     let removeFromLeft = this.tribute.menu.offsetWidth - diff
                //     let newLeft = coordinates.left - removeFromLeft

                //     if (newLeft > 0) {
                //         coordinates.left = newLeft
                //     } else {
                //         coordinates.left = 0
                //     }
                // }

                this.tribute.menu.style.cssText = 'top: ' + coordinates.top + 'px;\n                                     left: ' + coordinates.left + 'px;\n                                     position: absolute;\n                                     zIndex: 10000;\n                                     display: block;';

                if (scrollTo) this.scrollIntoView();
            } else {
                this.tribute.menu.style.cssText = 'display: none';
            }
        }
    }, {
        key: 'selectElement',
        value: function selectElement(targetElement, path, offset) {
            var range = void 0;
            var elem = targetElement;

            if (path) {
                for (var i = 0; i < path.length; i++) {
                    elem = elem.childNodes[path[i]];
                    if (elem === undefined) {
                        return;
                    }
                    while (elem.length < offset) {
                        offset -= elem.length;
                        elem = elem.nextSibling;
                    }
                    if (elem.childNodes.length === 0 && !elem.length) {
                        elem = elem.previousSibling;
                    }
                }
            }
            var sel = this.getWindowSelection();

            range = this.getDocument().createRange();
            range.setStart(elem, offset);
            range.setEnd(elem, offset);
            range.collapse(true);

            try {
                sel.removeAllRanges();
            } catch (error) {}

            sel.addRange(range);
            targetElement.focus();
        }

        // TODO: this may not be necessary anymore as we are using mouseup instead of click

    }, {
        key: 'resetSelection',
        value: function resetSelection(targetElement, path, offset) {
            if (!this.isContentEditable(targetElement)) {
                if (targetElement !== this.getDocument().activeElement) {
                    targetElement.focus();
                }
            } else {
                this.selectElement(targetElement, path, offset);
            }
        }
    }, {
        key: 'replaceTriggerText',
        value: function replaceTriggerText(text, requireLeadingSpace, hasTrailingSpace, originalEvent, item) {
            var context = this.tribute.current;
            // TODO: this may not be necessary anymore as we are using mouseup instead of click
            // this.resetSelection(context.element, context.selectedPath, context.selectedOffset)

            var info = this.getTriggerInfo(true, hasTrailingSpace, requireLeadingSpace, this.tribute.allowSpaces);

            // Create the event
            var replaceEvent = new CustomEvent('tribute-replaced', {
                detail: {
                    item: item,
                    event: originalEvent
                }
            });

            if (info !== undefined) {
                if (!this.isContentEditable(context.element)) {
                    var myField = this.getDocument().activeElement;
                    var textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : ' ';
                    text += textSuffix;
                    var startPos = info.mentionPosition;
                    var endPos = info.mentionPosition + info.mentionText.length + textSuffix.length;
                    myField.value = myField.value.substring(0, startPos) + text + myField.value.substring(endPos, myField.value.length);
                    myField.selectionStart = startPos + text.length;
                    myField.selectionEnd = startPos + text.length;
                } else {
                    // add a space to the end of the pasted text
                    var _textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : '\xA0';
                    text += _textSuffix;
                    this.pasteHtml(text, info.mentionPosition, info.mentionPosition + info.mentionText.length + 1);
                }

                context.element.dispatchEvent(replaceEvent);
            }
        }
    }, {
        key: 'pasteHtml',
        value: function pasteHtml(html, startPos, endPos) {
            var range = void 0,
                sel = void 0;
            sel = this.getWindowSelection();
            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, startPos);
            range.setEnd(sel.anchorNode, endPos);
            range.deleteContents();

            var el = this.getDocument().createElement('div');
            el.innerHTML = html;
            var frag = this.getDocument().createDocumentFragment(),
                node = void 0,
                lastNode = void 0;
            while (node = el.firstChild) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }, {
        key: 'getWindowSelection',
        value: function getWindowSelection() {
            if (this.tribute.collection.iframe) {
                return this.tribute.collection.iframe.contentWindow.getSelection();
            }

            return window.getSelection();
        }
    }, {
        key: 'getNodePositionInParent',
        value: function getNodePositionInParent(element) {
            if (element.parentNode === null) {
                return 0;
            }

            for (var i = 0; i < element.parentNode.childNodes.length; i++) {
                var node = element.parentNode.childNodes[i];

                if (node === element) {
                    return i;
                }
            }
        }
    }, {
        key: 'getContentEditableSelectedPath',
        value: function getContentEditableSelectedPath(ctx) {
            var sel = this.getWindowSelection();
            var selected = sel.anchorNode;
            var path = [];
            var offset = void 0;
            console.log('sel:', sel);
            if (selected != null) {
                var i = void 0;
                var ce = selected.contentEditable;
                while (selected !== null && ce !== 'true') {
                    i = this.getNodePositionInParent(selected);
                    path.push(i);
                    selected = selected.parentNode;
                    if (selected !== null) {
                        ce = selected.contentEditable;
                    }
                }
                path.reverse();

                // getRangeAt may not exist, need alternative
                offset = sel.getRangeAt(0).startOffset;
                console.log('offset: ', offset);
                return {
                    selected: selected,
                    path: path,
                    offset: offset
                };
            }
        }
    }, {
        key: 'getTextPrecedingCurrentSelection',
        value: function getTextPrecedingCurrentSelection() {
            var context = this.tribute.current,
                text = '';

            if (!this.isContentEditable(context.element)) {
                var textComponent = this.tribute.current.element;
                if (textComponent) {
                    var startPos = textComponent.selectionStart;
                    if (textComponent.value && startPos >= 0) {
                        text = textComponent.value.substring(0, startPos);
                    }
                }
            } else {
                var selectedElem = this.getWindowSelection().anchorNode;

                if (selectedElem != null) {
                    var workingNodeContent = selectedElem.textContent;
                    var selectStartOffset = this.getWindowSelection().getRangeAt(0).startOffset;

                    if (workingNodeContent && selectStartOffset >= 0) {
                        text = workingNodeContent.substring(0, selectStartOffset);
                    }
                }
            }

            return text;
        }
    }, {
        key: 'getTriggerInfo',
        value: function getTriggerInfo(menuAlreadyActive, hasTrailingSpace, requireLeadingSpace, allowSpaces) {
            var _this = this;

            var ctx = this.tribute.current;
            var selected = void 0,
                path = void 0,
                offset = void 0;

            if (!this.isContentEditable(ctx.element)) {
                selected = this.getDocument().activeElement;
            } else {
                var selectionInfo = this.getContentEditableSelectedPath(ctx);

                if (selectionInfo) {
                    selected = selectionInfo.selected;
                    path = selectionInfo.path;
                    offset = selectionInfo.offset;
                }
            }

            var effectiveRange = this.getTextPrecedingCurrentSelection();

            if (effectiveRange !== undefined && effectiveRange !== null) {
                var mostRecentTriggerCharPos = -1;
                var triggerChar = void 0;

                this.tribute.collection.forEach(function (config) {
                    var c = config.trigger;
                    var idx = config.requireLeadingSpace ? _this.lastIndexWithLeadingSpace(effectiveRange, c) : effectiveRange.lastIndexOf(c);

                    if (idx > mostRecentTriggerCharPos) {
                        mostRecentTriggerCharPos = idx;
                        triggerChar = c;
                        requireLeadingSpace = config.requireLeadingSpace;
                    }
                });

                if (mostRecentTriggerCharPos >= 0 && (mostRecentTriggerCharPos === 0 || !requireLeadingSpace || /[\xA0\s]/g.test(effectiveRange.substring(mostRecentTriggerCharPos - 1, mostRecentTriggerCharPos)))) {
                    var currentTriggerSnippet = effectiveRange.substring(mostRecentTriggerCharPos + 1, effectiveRange.length);

                    triggerChar = effectiveRange.substring(mostRecentTriggerCharPos, mostRecentTriggerCharPos + 1);
                    var firstSnippetChar = currentTriggerSnippet.substring(0, 1);
                    var leadingSpace = currentTriggerSnippet.length > 0 && (firstSnippetChar === ' ' || firstSnippetChar === '\xA0');
                    if (hasTrailingSpace) {
                        currentTriggerSnippet = currentTriggerSnippet.trim();
                    }

                    var regex = allowSpaces ? /[^\S ]/g : /[\xA0\s]/g;

                    if (!leadingSpace && (menuAlreadyActive || !regex.test(currentTriggerSnippet))) {
                        return {
                            mentionPosition: mostRecentTriggerCharPos,
                            mentionText: currentTriggerSnippet,
                            mentionSelectedElement: selected,
                            mentionSelectedPath: path,
                            mentionSelectedOffset: offset,
                            mentionTriggerChar: triggerChar
                        };
                    }
                }
            }
        }
    }, {
        key: 'lastIndexWithLeadingSpace',
        value: function lastIndexWithLeadingSpace(str, char) {
            var reversedStr = str.split('').reverse().join('');
            var index = -1;

            for (var cidx = 0, len = str.length; cidx < len; cidx++) {
                var firstChar = cidx === str.length - 1;
                var leadingSpace = /\s/.test(reversedStr[cidx + 1]);
                var match = char === reversedStr[cidx];

                if (match && (firstChar || leadingSpace)) {
                    index = str.length - 1 - cidx;
                    break;
                }
            }

            return index;
        }
    }, {
        key: 'isContentEditable',
        value: function isContentEditable(element) {
            return element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA';
        }
    }, {
        key: 'getTextAreaOrInputUnderlinePosition',
        value: function getTextAreaOrInputUnderlinePosition(element, position) {
            var properties = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing'];

            var isFirefox = window.mozInnerScreenX !== null;

            var div = this.getDocument().createElement('div');
            div.id = 'input-textarea-caret-position-mirror-div';
            this.getDocument().body.appendChild(div);

            var style = div.style;
            var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;

            style.whiteSpace = 'pre-wrap';
            if (element.nodeName !== 'INPUT') {
                style.wordWrap = 'break-word';
            }

            // position off-screen
            style.position = 'absolute';
            style.visibility = 'hidden';

            // transfer the element's properties to the div
            properties.forEach(function (prop) {
                style[prop] = computed[prop];
            });

            if (isFirefox) {
                style.width = parseInt(computed.width) - 2 + 'px';
                if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
            } else {
                style.overflow = 'hidden';
            }

            div.textContent = element.value.substring(0, position);

            if (element.nodeName === 'INPUT') {
                div.textContent = div.textContent.replace(/\s/g, ' ');
            }

            var span = this.getDocument().createElement('span');
            span.textContent = element.value.substring(position) || '.';
            div.appendChild(span);

            var rect = element.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            var coordinates = {
                top: rect.top + windowTop + span.offsetTop + parseInt(computed.borderTopWidth) + parseInt(computed.fontSize) - element.scrollTop,
                left: rect.left + windowLeft + span.offsetLeft + parseInt(computed.borderLeftWidth)
            };

            this.getDocument().body.removeChild(div);

            return coordinates;
        }
    }, {
        key: 'getContentEditableCaretPosition',
        value: function getContentEditableCaretPosition(selectedNodePosition) {
            var markerTextChar = '﻿';
            var markerEl = void 0,
                markerId = 'sel_' + new Date().getTime() + '_' + Math.random().toString().substr(2);
            var range = void 0;
            var sel = this.getWindowSelection();
            var prevRange = sel.getRangeAt(0);

            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, selectedNodePosition);
            range.setEnd(sel.anchorNode, selectedNodePosition);

            range.collapse(false);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = this.getDocument().createElement('span');
            markerEl.id = markerId;
            markerEl.appendChild(this.getDocument().createTextNode(markerTextChar));
            range.insertNode(markerEl);
            sel.removeAllRanges();
            sel.addRange(prevRange);

            var rect = markerEl.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            var coordinates = {
                left: rect.left + windowLeft,
                top: rect.top + markerEl.offsetHeight + windowTop
            };

            markerEl.parentNode.removeChild(markerEl);
            return coordinates;
        }
    }, {
        key: 'scrollIntoView',
        value: function scrollIntoView(elem) {
            var reasonableBuffer = 20,
                clientRect = void 0;
            var maxScrollDisplacement = 100;
            var e = this.menu;

            if (typeof e === 'undefined') return;

            while (clientRect === undefined || clientRect.height === 0) {
                clientRect = e.getBoundingClientRect();

                if (clientRect.height === 0) {
                    e = e.childNodes[0];
                    if (e === undefined || !e.getBoundingClientRect) {
                        return;
                    }
                }
            }

            var elemTop = clientRect.top;
            var elemBottom = elemTop + clientRect.height;

            if (elemTop < 0) {
                window.scrollTo(0, window.pageYOffset + clientRect.top - reasonableBuffer);
            } else if (elemBottom > window.innerHeight) {
                var maxY = window.pageYOffset + clientRect.top - reasonableBuffer;

                if (maxY - window.pageYOffset > maxScrollDisplacement) {
                    maxY = window.pageYOffset + maxScrollDisplacement;
                }

                var targetY = window.pageYOffset - (window.innerHeight - elemBottom);

                if (targetY > maxY) {
                    targetY = maxY;
                }

                window.scrollTo(0, targetY);
            }
        }
    }]);

    return TributeRange;
}();

exports.default = TributeRange;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/mattyork/fuzzy
var TributeSearch = function () {
    function TributeSearch(tribute) {
        _classCallCheck(this, TributeSearch);

        this.tribute = tribute;
        this.tribute.search = this;
    }

    _createClass(TributeSearch, [{
        key: 'simpleFilter',
        value: function simpleFilter(pattern, array) {
            var _this = this;

            return array.filter(function (string) {
                return _this.test(pattern, string);
            });
        }
    }, {
        key: 'test',
        value: function test(pattern, string) {
            return this.match(pattern, string) !== null;
        }
    }, {
        key: 'match',
        value: function match(pattern, string, opts) {
            opts = opts || {};
            var patternIdx = 0,
                result = [],
                len = string.length,
                totalScore = 0,
                currScore = 0,
                pre = opts.pre || '',
                post = opts.post || '',
                compareString = opts.caseSensitive && string || string.toLowerCase(),
                ch = void 0,
                compareChar = void 0;

            pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

            var patternCache = this.traverse(compareString, pattern, 0, 0, []);
            if (!patternCache) {
                return null;
            }

            return {
                rendered: this.render(string, patternCache.cache, pre, post),
                score: patternCache.score
            };
        }
    }, {
        key: 'traverse',
        value: function traverse(string, pattern, stringIndex, patternIndex, patternCache) {
            // if the pattern search at end
            if (pattern.length === patternIndex) {

                // calculate socre and copy the cache containing the indices where it's found
                return {
                    score: this.calculateScore(patternCache),
                    cache: patternCache.slice()
                };
            }

            // if string at end or remaining pattern > remaining string
            if (string.length === stringIndex || pattern.length - patternIndex > string.length - stringIndex) {
                return undefined;
            }

            var c = pattern[patternIndex];
            var index = string.indexOf(c, stringIndex);
            var best = void 0,
                temp = void 0;

            while (index > -1) {
                patternCache.push(index);
                temp = this.traverse(string, pattern, index + 1, patternIndex + 1, patternCache);
                patternCache.pop();

                // if downstream traversal failed, return best answer so far
                if (!temp) {
                    return best;
                }

                if (!best || best.score < temp.score) {
                    best = temp;
                }

                index = string.indexOf(c, index + 1);
            }

            return best;
        }
    }, {
        key: 'calculateScore',
        value: function calculateScore(patternCache) {
            var score = 0;
            var temp = 1;

            patternCache.forEach(function (index, i) {
                if (i > 0) {
                    if (patternCache[i - 1] + 1 === index) {
                        temp += temp + 1;
                    } else {
                        temp = 1;
                    }
                }

                score += temp;
            });

            return score;
        }
    }, {
        key: 'render',
        value: function render(string, indices, pre, post) {
            var rendered = string.substring(0, indices[0]);

            indices.forEach(function (index, i) {
                rendered += pre + string[index] + post + string.substring(index + 1, indices[i + 1] ? indices[i + 1] : string.length);
            });

            return rendered;
        }
    }, {
        key: 'filter',
        value: function filter(pattern, arr, opts) {
            var _this2 = this;

            opts = opts || {};
            return arr.reduce(function (prev, element, idx, arr) {
                var str = element;

                if (opts.extract) {
                    str = opts.extract(element);

                    if (!str) {
                        // take care of undefineds / nulls / etc.
                        str = '';
                    }
                }

                var rendered = _this2.match(pattern, str, opts);

                if (rendered != null) {
                    prev[prev.length] = {
                        string: rendered.rendered,
                        score: rendered.score,
                        index: idx,
                        original: element
                    };
                }

                return prev;
            }, []).sort(function (a, b) {
                var compare = b.score - a.score;
                if (compare) return compare;
                return a.index - b.index;
            });
        }
    }]);

    return TributeSearch;
}();

exports.default = TributeSearch;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tribute = require("./Tribute");

var _Tribute2 = _interopRequireDefault(_Tribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Tribute2.default; /**
                                     * Tribute.js
                                     * Native ES6 JavaScript @mention Plugin
                                     **/

module.exports = exports["default"];

},{"./Tribute":1}],7:[function(require,module,exports){
'use strict';

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

if (window && typeof window.CustomEvent !== "function") {
    var CustomEvent = function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };

    if (typeof window.Event !== 'undefined') {
        CustomEvent.prototype = window.Event.prototype;
    }

    window.CustomEvent = CustomEvent;
}

},{}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE87QUFDRiwyQkFpQkc7QUFBQTs7QUFBQSwrQkFoQkMsTUFnQkQ7QUFBQSxZQWhCQyxNQWdCRCwrQkFoQlUsSUFnQlY7QUFBQSwrQkFmQyxNQWVEO0FBQUEsWUFmQyxNQWVELCtCQWZVLElBZVY7QUFBQSxvQ0FkQyxXQWNEO0FBQUEsWUFkQyxXQWNELG9DQWRlLFdBY2Y7QUFBQSxnQ0FiQyxPQWFEO0FBQUEsWUFiQyxPQWFELGdDQWJXLEdBYVg7QUFBQSx1Q0FaQyxjQVlEO0FBQUEsWUFaQyxjQVlELHVDQVprQixJQVlsQjtBQUFBLHlDQVhDLGdCQVdEO0FBQUEsWUFYQyxnQkFXRCx5Q0FYb0IsSUFXcEI7QUFBQSwrQkFWQyxNQVVEO0FBQUEsWUFWQyxNQVVELCtCQVZVLEtBVVY7QUFBQSxpQ0FUQyxRQVNEO0FBQUEsWUFUQyxRQVNELGlDQVRZLE9BU1o7QUFBQSxtQ0FSQyxVQVFEO0FBQUEsWUFSQyxVQVFELG1DQVJjLElBUWQ7QUFBQSxzQ0FQQyxhQU9EO0FBQUEsWUFQQyxhQU9ELHNDQVBpQixJQU9qQjtBQUFBLHdDQU5DLGVBTUQ7QUFBQSxZQU5DLGVBTUQsd0NBTm1CLElBTW5CO0FBQUEseUNBTEMsbUJBS0Q7QUFBQSxZQUxDLG1CQUtELHlDQUx1QixJQUt2QjtBQUFBLG9DQUpDLFdBSUQ7QUFBQSxZQUpDLFdBSUQsb0NBSmUsS0FJZjtBQUFBLHlDQUhDLGlCQUdEO0FBQUEs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Z0IsSUFBSSxNQUFwQixFQUE0QixHQUE1QixFQUFpQztBQUM3QixvQkFBUSxLQUFLLENBQUwsQ0FBUjtBQUNBLGdCQUFJLFVBQVUsSUFBVixDQUFlLE9BQWYsRUFBd0IsS0FBeEIsRUFBK0IsQ0FBL0IsRUFBa0MsSUFBbEMsQ0FBSixFQUE2QztBQUN6Qyx1QkFBTyxLQUFQO0FBQ0g7QUFDSjtBQUNELGVBQU8sU0FBUDtBQUNILEtBbkJEO0FBb0JIOztBQUVELElBQUksVUFBVSxPQUFPLE9BQU8sV0FBZCxLQUE4QixVQUE1QyxFQUF3RDtBQUFBLFFBQzdDLFdBRDZDLEdBQ3RELFNBQVMsV0FBVCxDQUFxQixLQUFyQixFQUE0QixNQUE1QixFQUFvQztBQUNsQyxpQkFBUyxVQUFVO0FBQ2pCLHFCQUFTLEtBRFE7QUFFakIsd0JBQVksS0FGSztBQUdqQixvQkFBUTtBQUhTLFNBQW5CO0FBS0EsWUFBSSxNQUFNLFNBQVMsV0FBVCxDQUFxQixhQUFyQixDQUFWO0FBQ0EsWUFBSSxlQUFKLENBQW9CLEtBQXBCLEVBQTJCLE9BQU8sT0FBbEMsRUFBMkMsT0FBTyxVQUFsRCxFQUE4RCxPQUFPLE1BQXJFO0FBQ0EsZUFBTyxHQUFQO0FBQ0QsS0FWcUQ7O0FBWXZELFFBQUksT0FBTyxPQUFPLEtBQWQsS0FBd0IsV0FBNUIsRUFBeUM7QUFDdkMsb0JBQVksU0FBWixHQUF3QixPQUFPLEtBQVAsQ0FBYSxTQUFyQztBQUNEOztBQUVBLFdBQU8sV0FBUCxHQUFxQixXQUFyQjtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBUcmlidXRlVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBUcmlidXRlRXZlbnRzIGZyb20gXCIuL1RyaWJ1dGVFdmVudHNcIjtcbmltcG9ydCBUcmlidXRlTWVudUV2ZW50cyBmcm9tIFwiLi9UcmlidXRlTWVudUV2ZW50c1wiO1xuaW1wb3J0IFRyaWJ1dGVSYW5nZSBmcm9tIFwiLi9UcmlidXRlUmFuZ2VcIjtcbmltcG9ydCBUcmlidXRlU2VhcmNoIGZyb20gXCIuL1RyaWJ1dGVTZWFyY2hcIjtcblxuY2xhc3MgVHJpYnV0ZSB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICB2YWx1ZXMgPSBudWxsLFxuICAgICAgICBpZnJhbWUgPSBudWxsLFxuICAgICAgICBzZWxlY3RDbGFzcyA9ICdoaWdobGlnaHQnLFxuICAgICAgICB0cmlnZ2VyID0gJ0AnLFxuICAgICAgICBzZWxlY3RUZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIG1lbnVJdGVtVGVtcGxhdGUgPSBudWxsLFxuICAgICAgICBsb29rdXAgPSAna2V5JyxcbiAgICAgICAgZmlsbEF0dHIgPSAndmFsdWUnLFxuICAgICAgICBjb2xsZWN0aW9uID0gbnVsbCxcbiAgICAgICAgbWVudUNvbnRhaW5lciA9IG51bGwsXG4gICAgICAgIG5vTWF0Y2hUZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2UgPSB0cnVlLFxuICAgICAgICBhbGxvd1NwYWNlcyA9IGZhbHNlLFxuICAgICAgICByZXBsYWNlVGV4dFN1ZmZpeCA9IG51bGwsXG4gICAgICAgIHBvc2l0aW9uTWVudSA9IHRydWUsXG4gICAgICAgIHNlbGVjdGlvbkNvbnRleHQgPSBudWxsLFxuICAgIH0pIHtcblxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgdGhpcy5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lciA9IG1lbnVDb250YWluZXJcbiAgICAgICAgdGhpcy5hbGxvd1NwYWNlcyA9IGFsbG93U3BhY2VzXG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRTdWZmaXggPSByZXBsYWNlVGV4dFN1ZmZpeFxuICAgICAgICB0aGlzLnBvc2l0aW9uTWVudSA9IHBvc2l0aW9uTWVudVxuICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbnRleHQgPSBzZWxlY3Rpb25Db250ZXh0O1xuXG4gICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IFt7XG4gICAgICAgICAgICAgICAgLy8gc3ltYm9sIHRoYXQgc3RhcnRzIHRoZSBsb29rdXBcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxuXG4gICAgICAgICAgICAgICAgaWZyYW1lOiBpZnJhbWUsXG5cbiAgICAgICAgICAgICAgICBzZWxlY3RDbGFzczogc2VsZWN0Q2xhc3MsXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgb24gc2VsZWN0IHRoYXQgcmV0dW5zIHRoZSBjb250ZW50IHRvIGluc2VydFxuICAgICAgICAgICAgICAgIHNlbGVjdFRlbXBsYXRlOiAoc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgdGhhdCByZXR1cm5zIGNvbnRlbnQgZm9yIGFuIGl0ZW1cbiAgICAgICAgICAgICAgICBtZW51SXRlbVRlbXBsYXRlOiAobWVudUl0ZW1UZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgbm9NYXRjaFRlbXBsYXRlOiAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtyZXR1cm4gJzxsaSBjbGFzcz1cIm5vLW1hdGNoXCI+Tm8gbWF0Y2ghPC9saT4nfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgfSkobm9NYXRjaFRlbXBsYXRlKSxcblxuICAgICAgICAgICAgICAgIC8vIGNvbHVtbiB0byBzZWFyY2ggYWdhaW5zdCBpbiB0aGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgbG9va3VwOiBsb29rdXAsXG5cbiAgICAgICAgICAgICAgICAvLyBjb2x1bW4gdGhhdCBjb250YWlucyB0aGUgY29udGVudCB0byBpbnNlcnQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGZpbGxBdHRyOiBmaWxsQXR0cixcblxuICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIG9iamVjdHMgb3IgYSBmdW5jdGlvbiByZXR1cm5pbmcgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICAgIHZhbHVlczogdmFsdWVzLFxuXG4gICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZTogcmVxdWlyZUxlYWRpbmdTcGFjZSxcblxuICAgICAgICAgICAgICAgIGFsbG93U3BhY2VzOiBhbGxvd1NwYWNlcyxcblxuICAgICAgICAgICAgICAgIHJlcGxhY2VUZXh0U3VmZml4OiByZXBsYWNlVGV4dFN1ZmZpeCxcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9uTWVudTogcG9zaXRpb25NZW51LFxuXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uQ29udGV4dDogc2VsZWN0aW9uQ29udGV4dFxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBpdGVtLnRyaWdnZXIgfHwgdHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lOiBpdGVtLmlmcmFtZSB8fCBpZnJhbWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBpdGVtLnNlbGVjdENsYXNzIHx8IHNlbGVjdENsYXNzLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKGl0ZW0uc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChpdGVtLm1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuICAgICAgICAgICAgICAgICAgICBsb29rdXA6IGl0ZW0ubG9va3VwIHx8IGxvb2t1cCxcbiAgICAgICAgICAgICAgICAgICAgZmlsbEF0dHI6IGl0ZW0uZmlsbEF0dHIgfHwgZmlsbEF0dHIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogaXRlbS52YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2U6IGl0ZW0ucmVxdWlyZUxlYWRpbmdTcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dTcGFjZXM6IGl0ZW0uYWxsb3dTcGFjZXMsXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VUZXh0U3VmZml4OiBpdGVtLnJlcGxhY2VUZXh0U3VmZml4LFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbk1lbnU6IGl0ZW0ucG9zaXRpb25NZW51LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25Db250ZXh0OiBpdGVtLnNlbGVjdGlvbkNvbnRleHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTm8gY29sbGVjdGlvbiBzcGVjaWZpZWQuJylcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldyBUcmlidXRlUmFuZ2UodGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVNZW51RXZlbnRzKHRoaXMpXG4gICAgICAgIG5ldyBUcmlidXRlU2VhcmNoKHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRTZWxlY3RUZW1wbGF0ZShpdGVtKSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICh0aGlzLnJhbmdlLmlzQ29udGVudEVkaXRhYmxlKHRoaXMuY3VycmVudC5lbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCJ0cmlidXRlLW1lbnRpb25cIj4nICsgKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIgKyBpdGVtLm9yaWdpbmFsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmZpbGxBdHRyXSkgKyAnPC9zcGFuPic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyICsgaXRlbS5vcmlnaW5hbFt0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5maWxsQXR0cl07XG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKG1hdGNoSXRlbSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hJdGVtLnN0cmluZ1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnB1dFR5cGVzKCkge1xuICAgICAgICByZXR1cm4gWydURVhUQVJFQScsICdJTlBVVCddXG4gICAgfVxuXG4gICAgdHJpZ2dlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24ubWFwKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29uZmlnLnRyaWdnZXJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhdHRhY2goZWwpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTXVzdCBwYXNzIGluIGEgRE9NIG5vZGUgb3IgTm9kZUxpc3QuJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGlzIGEgalF1ZXJ5IGNvbGxlY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIGVsIGluc3RhbmNlb2YgalF1ZXJ5KSB7XG4gICAgICAgICAgICBlbCA9IGVsLmdldCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJcyBlbCBhbiBBcnJheS9BcnJheS1saWtlIG9iamVjdD9cbiAgICAgICAgaWYgKGVsLmNvbnN0cnVjdG9yID09PSBOb2RlTGlzdCB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gSFRNTENvbGxlY3Rpb24gfHwgZWwuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gZWwubGVuZ3RoXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXR0YWNoKGVsW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYXR0YWNoKGVsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2F0dGFjaChlbCkge1xuICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUcmlidXRlIHdhcyBhbHJlYWR5IGJvdW5kIHRvICcgKyBlbC5ub2RlTmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5zdXJlRWRpdGFibGUoZWwpXG4gICAgICAgIHRoaXMuZXZlbnRzLmJpbmQoZWwpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS10cmlidXRlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBlbnN1cmVFZGl0YWJsZShlbGVtZW50KSB7XG4gICAgICAgIGlmIChUcmlidXRlLmlucHV0VHlwZXMoKS5pbmRleE9mKGVsZW1lbnQubm9kZU5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1RyaWJ1dGVdIENhbm5vdCBiaW5kIHRvICcgKyBlbGVtZW50Lm5vZGVOYW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTWVudSgpIHtcbiAgICAgICAgbGV0IHdyYXBwZXIgPSB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICB1bCA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSAndHJpYnV0ZS1jb250YWluZXInXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodWwpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgfVxuXG4gICAgc2hvd01lbnVGb3IoZWxlbWVudCwgc2Nyb2xsVG8pIHtcbiAgICAgICAgLy8gT25seSBwcm9jZWVkIGlmIG1lbnUgaXNuJ3QgYWxyZWFkeSBzaG93biBmb3IgdGhlIGN1cnJlbnQgZWxlbWVudCAmIG1lbnRpb25UZXh0XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlICYmIHRoaXMuY3VycmVudC5lbGVtZW50ID09PSBlbGVtZW50ICYmIHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCA9PT0gdGhpcy5jdXJyZW50TWVudGlvblRleHRTbmFwc2hvdCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudE1lbnRpb25UZXh0U25hcHNob3QgPSB0aGlzLmN1cnJlbnQubWVudGlvblRleHRcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIG1lbnUgaWYgaXQgZG9lc24ndCBleGlzdC5cbiAgICAgICAgaWYgKCF0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMubWVudSA9IHRoaXMuY3JlYXRlTWVudSgpXG4gICAgICAgICAgICB0aGlzLm1lbnVFdmVudHMuYmluZCh0aGlzLm1lbnUpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcblxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudC5tZW50aW9uVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0ID0gJydcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb2Nlc3NWYWx1ZXMgPSAodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAvLyBUcmlidXRlIG1heSBub3QgYmUgYWN0aXZlIGFueSBtb3JlIGJ5IHRoZSB0aW1lIHRoZSB2YWx1ZSBjYWxsYmFjayByZXR1cm5zXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zZWFyY2guZmlsdGVyKHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCwgdmFsdWVzLCB7XG4gICAgICAgICAgICAgICAgcHJlOiAnPHNwYW4+JyxcbiAgICAgICAgICAgICAgICBwb3N0OiAnPC9zcGFuPicsXG4gICAgICAgICAgICAgICAgZXh0cmFjdDogKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cF1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwKGVsKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxvb2t1cCBhdHRyaWJ1dGUsIGxvb2t1cCBtdXN0IGJlIHN0cmluZyBvciBmdW5jdGlvbi4nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50LmZpbHRlcmVkSXRlbXMgPSBpdGVtc1xuXG5cbiAgICAgICAgICAgIGxldCB1bCA9IHRoaXMubWVudS5xdWVyeVNlbGVjdG9yKCd1bCcpXG5cbiAgICAgICAgICAgIHRoaXMucmFuZ2UucG9zaXRpb25NZW51QXRDYXJldChzY3JvbGxUbylcblxuICAgICAgICAgICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9NYXRjaEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0cmlidXRlLW5vLW1hdGNoJywgeyBkZXRhaWw6IHRoaXMubWVudSB9KVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC5lbGVtZW50LmRpc3BhdGNoRXZlbnQobm9NYXRjaEV2ZW50KVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubm9NYXRjaFRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVsLmlubmVySFRNTCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm5vTWF0Y2hUZW1wbGF0ZSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVsLmlubmVySFRNTCA9ICcnXG5cbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGxpID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleClcbiAgICAgICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBsaSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JylcbiAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNldEFjdGl2ZUxpKGluZGV4KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudVNlbGVjdGVkID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc05hbWUgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5zZWxlY3RDbGFzc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaS5pbm5lckhUTUwgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5tZW51SXRlbVRlbXBsYXRlKGl0ZW0pXG4gICAgICAgICAgICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcyh0aGlzLmN1cnJlbnQubWVudGlvblRleHQsIHByb2Nlc3NWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzVmFsdWVzKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dNZW51Rm9yQ29sbGVjdGlvbihlbGVtZW50LCBjb2xsZWN0aW9uSW5kZXgpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VDYXJldEF0RW5kKGVsZW1lbnQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltjb2xsZWN0aW9uSW5kZXggfHwgMF1cbiAgICAgICAgdGhpcy5jdXJyZW50LmV4dGVybmFsVHJpZ2dlciA9IHRydWVcbiAgICAgICAgdGhpcy5jdXJyZW50LmVsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuaXNDb250ZW50RWRpdGFibGUpXG4gICAgICAgICAgICB0aGlzLmluc2VydFRleHRBdEN1cnNvcih0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmluc2VydEF0Q2FyZXQoZWxlbWVudCwgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlcilcblxuICAgICAgICB0aGlzLnNob3dNZW51Rm9yKGVsZW1lbnQpXG4gICAgfVxuXG4gICAgLy8gVE9ETzogbWFrZSBzdXJlIHRoaXMgd29ya3MgZm9yIGlucHV0cy90ZXh0YXJlYXNcbiAgICBwbGFjZUNhcmV0QXRFbmQoZWwpIHtcbiAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuZ2V0U2VsZWN0aW9uICE9IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlUmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlbCk7XG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgICAgICAgICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIHRleHRSYW5nZSA9IGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICB0ZXh0UmFuZ2UubW92ZVRvRWxlbWVudFRleHQoZWwpO1xuICAgICAgICAgICAgdGV4dFJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICAgICAgICAgIHRleHRSYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvciBjb250ZW50ZWRpdGFibGVcbiAgICBpbnNlcnRUZXh0QXRDdXJzb3IodGV4dCkge1xuICAgICAgICB2YXIgc2VsLCByYW5nZSwgaHRtbDtcbiAgICAgICAgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xuICAgICAgICByYW5nZS5kZWxldGVDb250ZW50cygpO1xuICAgICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZSh0ZXh0Tm9kZSk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0ZXh0Tm9kZSlcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgfVxuXG4gICAgLy8gZm9yIHJlZ3VsYXIgaW5wdXRzXG4gICAgaW5zZXJ0QXRDYXJldCh0ZXh0YXJlYSwgdGV4dCkge1xuICAgICAgICB2YXIgc2Nyb2xsUG9zID0gdGV4dGFyZWEuc2Nyb2xsVG9wO1xuICAgICAgICB2YXIgY2FyZXRQb3MgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICB2YXIgZnJvbnQgPSAodGV4dGFyZWEudmFsdWUpLnN1YnN0cmluZygwLCBjYXJldFBvcyk7XG4gICAgICAgIHZhciBiYWNrID0gKHRleHRhcmVhLnZhbHVlKS5zdWJzdHJpbmcodGV4dGFyZWEuc2VsZWN0aW9uRW5kLCB0ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGZyb250ICsgdGV4dCArIGJhY2s7XG4gICAgICAgIGNhcmV0UG9zID0gY2FyZXRQb3MgKyB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBjYXJldFBvcztcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gY2FyZXRQb3M7XG4gICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgIHRleHRhcmVhLnNjcm9sbFRvcCA9IHNjcm9sbFBvcztcbiAgICB9XG5cbiAgICBoaWRlTWVudSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZTsnXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEl0ZW1BdEluZGV4KGluZGV4LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgICAgIGluZGV4ID0gcGFyc2VJbnQoaW5kZXgpXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm5cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmN1cnJlbnQuZmlsdGVyZWRJdGVtc1tpbmRleF1cbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5zZWxlY3RUZW1wbGF0ZShpdGVtKVxuICAgICAgICBpZiAoY29udGVudCAhPT0gbnVsbCkgdGhpcy5yZXBsYWNlVGV4dChjb250ZW50LCBvcmlnaW5hbEV2ZW50LCBpdGVtKVxuICAgIH1cblxuICAgIHJlcGxhY2VUZXh0KGNvbnRlbnQsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pIHtcbiAgICAgICAgdGhpcy5yYW5nZS5yZXBsYWNlVHJpZ2dlclRleHQoY29udGVudCwgdHJ1ZSwgdHJ1ZSwgb3JpZ2luYWxFdmVudCwgaXRlbSlcbiAgICB9XG5cbiAgICBfYXBwZW5kKGNvbGxlY3Rpb24sIG5ld1ZhbHVlcywgcmVwbGFjZSkge1xuICAgICAgICBpZiAodHlwZW9mIGNvbGxlY3Rpb24udmFsdWVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBhcHBlbmQgdG8gdmFsdWVzLCBhcyBpdCBpcyBhIGZ1bmN0aW9uLicpXG4gICAgICAgIH0gZWxzZSBpZiAoIXJlcGxhY2UpIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24udmFsdWVzID0gY29sbGVjdGlvbi52YWx1ZXMuY29uY2F0KG5ld1ZhbHVlcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24udmFsdWVzID0gbmV3VmFsdWVzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBlbmQoY29sbGVjdGlvbkluZGV4LCBuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gcGFyc2VJbnQoY29sbGVjdGlvbkluZGV4KVxuICAgICAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IEVycm9yKCdwbGVhc2UgcHJvdmlkZSBhbiBpbmRleCBmb3IgdGhlIGNvbGxlY3Rpb24gdG8gdXBkYXRlLicpXG5cbiAgICAgICAgbGV0IGNvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25baW5kZXhdXG5cbiAgICAgICAgdGhpcy5fYXBwZW5kKGNvbGxlY3Rpb24sIG5ld1ZhbHVlcywgcmVwbGFjZSlcbiAgICB9XG5cbiAgICBhcHBlbmRDdXJyZW50KG5ld1ZhbHVlcywgcmVwbGFjZSkge1xuICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5fYXBwZW5kKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFjdGl2ZSBzdGF0ZS4gUGxlYXNlIHVzZSBhcHBlbmQgaW5zdGVhZCBhbmQgcGFzcyBhbiBpbmRleC4nKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlO1xuIiwiY2xhc3MgVHJpYnV0ZUV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5ldmVudHMgPSB0aGlzXG4gICAgfVxuXG4gICAgc3RhdGljIGtleXMoKSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAga2V5OiA5LFxuICAgICAgICAgICAgdmFsdWU6ICdUQUInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogOCxcbiAgICAgICAgICAgIHZhbHVlOiAnREVMRVRFJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDEzLFxuICAgICAgICAgICAgdmFsdWU6ICdFTlRFUidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAyNyxcbiAgICAgICAgICAgIHZhbHVlOiAnRVNDQVBFJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDM4LFxuICAgICAgICAgICAgdmFsdWU6ICdVUCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiA0MCxcbiAgICAgICAgICAgIHZhbHVlOiAnRE9XTidcbiAgICAgICAgfV1cbiAgICB9XG5cbiAgICBiaW5kKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJyxcbiAgICAgICAgICAgIHRoaXMua2V5ZG93bi5iaW5kKGVsZW1lbnQsIHRoaXMpLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsXG4gICAgICAgICAgICB0aGlzLmtleXVwLmJpbmQoZWxlbWVudCwgdGhpcyksIGZhbHNlKVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JyxcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuYmluZChlbGVtZW50LCB0aGlzKSwgZmFsc2UpXG4gICAgfVxuXG4gICAga2V5ZG93bihpbnN0YW5jZSwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGluc3RhbmNlLnNob3VsZERlYWN0aXZhdGUoZXZlbnQpKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzXG4gICAgICAgIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9IGZhbHNlXG5cbiAgICAgICAgVHJpYnV0ZUV2ZW50cy5rZXlzKCkuZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgIGlmIChvLmtleSA9PT0gZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9IHRydWVcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKVtvLnZhbHVlLnRvTG93ZXJDYXNlKCldKGV2ZW50LCBlbGVtZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGlucHV0KGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBpbnN0YW5jZS5pbnB1dEV2ZW50ID0gdHJ1ZVxuICAgICAgICBpbnN0YW5jZS5rZXl1cC5jYWxsKHRoaXMsIGluc3RhbmNlLCBldmVudClcbiAgICB9XG5cbiAgICBjbGljayhpbnN0YW5jZSwgZXZlbnQpIHtcbiAgICAgICAgbGV0IHRyaWJ1dGUgPSBpbnN0YW5jZS50cmlidXRlXG4gICAgICAgIGlmICh0cmlidXRlLm1lbnUgJiYgdHJpYnV0ZS5tZW51LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIGxldCBsaSA9IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIHdoaWxlIChsaS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnbGknKSB7XG4gICAgICAgICAgICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKCFsaSB8fCBsaSA9PT0gdHJpYnV0ZS5tZW51KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGZpbmQgdGhlIDxsaT4gY29udGFpbmVyIGZvciB0aGUgY2xpY2snKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyaWJ1dGUuc2VsZWN0SXRlbUF0SW5kZXgobGkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIGV2ZW50KVxuICAgICAgICAgICAgdHJpYnV0ZS5oaWRlTWVudSgpXG5cbiAgICAgICAgLy8gVE9ETzogc2hvdWxkIGZpcmUgd2l0aCBleHRlcm5hbFRyaWdnZXIgYW5kIHRhcmdldCBpcyBvdXRzaWRlIG9mIG1lbnVcbiAgICAgICAgfSBlbHNlIGlmICh0cmlidXRlLmN1cnJlbnQuZWxlbWVudCAmJiAhdHJpYnV0ZS5jdXJyZW50LmV4dGVybmFsVHJpZ2dlcikge1xuICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LmV4dGVybmFsVHJpZ2dlciA9IGZhbHNlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWJ1dGUuaGlkZU1lbnUoKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGtleXVwKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2UuaW5wdXRFdmVudCkge1xuICAgICAgICAgICAgaW5zdGFuY2UuaW5wdXRFdmVudCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2UudXBkYXRlU2VsZWN0aW9uKHRoaXMpXG5cbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSByZXR1cm5cblxuICAgICAgICBpZiAoIWluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIGxldCBrZXlDb2RlID0gaW5zdGFuY2UuZ2V0S2V5Q29kZShpbnN0YW5jZSwgdGhpcywgZXZlbnQpXG5cbiAgICAgICAgICAgIGlmIChpc05hTihrZXlDb2RlKSB8fCAha2V5Q29kZSkgcmV0dXJuXG5cbiAgICAgICAgICAgIGxldCB0cmlnZ2VyID0gaW5zdGFuY2UudHJpYnV0ZS50cmlnZ2VycygpLmZpbmQodHJpZ2dlciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXIuY2hhckNvZGVBdCgwKSA9PT0ga2V5Q29kZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0cmlnZ2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpLnRyaWdnZXJDaGFyKGV2ZW50LCB0aGlzLCB0cmlnZ2VyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluc3RhbmNlLnRyaWJ1dGUuY3VycmVudC50cmlnZ2VyICYmIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9PT0gZmFsc2VcbiAgICAgICAgICAgIHx8IGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgJiYgZXZlbnQua2V5Q29kZSA9PT0gOCkge1xuICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuc2hvd01lbnVGb3IodGhpcywgdHJ1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZERlYWN0aXZhdGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHJldHVybiBmYWxzZVxuXG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCBldmVudEtleVByZXNzZWQgPSBmYWxzZVxuICAgICAgICAgICAgVHJpYnV0ZUV2ZW50cy5rZXlzKCkuZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gby5rZXkpIGV2ZW50S2V5UHJlc3NlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiAhZXZlbnRLZXlQcmVzc2VkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBnZXRLZXlDb2RlKGluc3RhbmNlLCBlbCwgZXZlbnQpIHtcbiAgICAgICAgbGV0IGNoYXJcbiAgICAgICAgbGV0IHRyaWJ1dGUgPSBpbnN0YW5jZS50cmlidXRlXG4gICAgICAgIGxldCBpbmZvID0gdHJpYnV0ZS5yYW5nZS5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgZmFsc2UsIHRydWUsIHRyaWJ1dGUuYWxsb3dTcGFjZXMpXG5cbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvLm1lbnRpb25UcmlnZ2VyQ2hhci5jaGFyQ29kZUF0KDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvbihlbCkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50ID0gZWxcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMpXG5cbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50LnNlbGVjdGVkUGF0aCA9IGluZm8ubWVudGlvblNlbGVjdGVkUGF0aFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQubWVudGlvblRleHQgPSBpbmZvLm1lbnRpb25UZXh0XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5zZWxlY3RlZE9mZnNldCA9IGluZm8ubWVudGlvblNlbGVjdGVkT2Zmc2V0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsYmFja3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmlnZ2VyQ2hhcjogKGUsIGVsLCB0cmlnZ2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHRyaWJ1dGUgPSB0aGlzLnRyaWJ1dGVcbiAgICAgICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQudHJpZ2dlciA9IHRyaWdnZXJcblxuICAgICAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uSXRlbSA9IHRyaWJ1dGUuY29sbGVjdGlvbi5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS50cmlnZ2VyID09PSB0cmlnZ2VyXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uID0gY29sbGVjdGlvbkl0ZW1cbiAgICAgICAgICAgICAgICBpZiAodHJpYnV0ZS5pbnB1dEV2ZW50KSB0cmlidXRlLnNob3dNZW51Rm9yKGVsLCB0cnVlKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudGVyOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjaG9vc2Ugc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zZWxlY3RJdGVtQXRJbmRleCh0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLCBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIGZpcnN0IG1hdGNoXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgdXAgdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gc2VsZWN0ZWQgJiYgc2VsZWN0ZWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLS1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IGNvdW50IC0gMVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCA9IHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd246IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG5hdmlnYXRlIGRvd24gdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKytcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlbGV0ZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSAmJiB0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKGVsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEFjdGl2ZUxpKGluZGV4KSB7XG4gICAgICAgIGxldCBsaXMgPSB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICAgICAgbGVuZ3RoID0gbGlzLmxlbmd0aCA+Pj4gMFxuXG4gICAgICAgIC8vIGdldCBoZWlnaHRzXG4gICAgICAgIGxldCBtZW51RnVsbEhlaWdodCA9IHRoaXMuZ2V0RnVsbEhlaWdodCh0aGlzLnRyaWJ1dGUubWVudSksXG4gICAgICAgICAgICBsaUhlaWdodCA9IHRoaXMuZ2V0RnVsbEhlaWdodChsaXNbMF0pXG5cbiAgICAgICAgaWYgKGluZGV4KSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gaW5kZXg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxpID0gbGlzW2ldXG4gICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSBsaUhlaWdodCAqIChpKzEpXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFRvcCA9IHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcFxuICAgICAgICAgICAgICAgIGxldCB0b3RhbFNjcm9sbCA9IHNjcm9sbFRvcCArIG1lbnVGdWxsSGVpZ2h0XG5cbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID4gdG90YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCArPSBsaUhlaWdodFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2Zmc2V0IDwgdG90YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCAtPSBsaUhlaWdodFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTmFtZSA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZ1bGxIZWlnaHQoZWxlbSwgaW5jbHVkZU1hcmdpbikge1xuICAgICAgbGV0IGhlaWdodCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG5cbiAgICAgIGlmIChpbmNsdWRlTWFyZ2luKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IGVsZW0uY3VycmVudFN0eWxlIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pXG4gICAgICAgIHJldHVybiBoZWlnaHQgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpblRvcCkgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpbkJvdHRvbSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlaWdodFxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlRXZlbnRzO1xuIiwiY2xhc3MgVHJpYnV0ZU1lbnVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUubWVudUV2ZW50cyA9IHRoaXNcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy50cmlidXRlLm1lbnVcbiAgICB9XG5cbiAgICBiaW5kKG1lbnUpIHtcbiAgICAgICAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJyxcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5ldmVudHMua2V5ZG93bi5iaW5kKHRoaXMubWVudSwgdGhpcyksIGZhbHNlKVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmV2ZW50cy5jbGljay5iaW5kKG51bGwsIHRoaXMpLCBmYWxzZSlcblxuICAgICAgICAvLyBmaXhlcyBJRTExIGlzc3VlcyB3aXRoIG1vdXNlZG93blxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJyxcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5ldmVudHMuY2xpY2suYmluZChudWxsLCB0aGlzKSwgZmFsc2UpXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMCwgZmFsc2UpKVxuXG4gICAgICAgIGlmICh0aGlzLm1lbnVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zaG93TWVudUZvcih0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50LCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAzMDAsIGZhbHNlKSwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cub25zY3JvbGwgPSB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zaG93TWVudUZvcih0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50LCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAzMDAsIGZhbHNlKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgdmFyIHRpbWVvdXRcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzXG4gICAgICAgICAgICB2YXIgbGF0ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGxcbiAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXRcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpXG4gICAgICAgICAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVNZW51RXZlbnRzO1xuIiwiLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9qZWZmLWNvbGxpbnMvbWVudC5pb1xuY2xhc3MgVHJpYnV0ZVJhbmdlIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlID0gdGhpc1xuICAgIH1cblxuICAgIGdldERvY3VtZW50KCkge1xuICAgICAgICBsZXQgaWZyYW1lXG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uLmlmcmFtZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50XG4gICAgfVxuXG4gICAgcG9zaXRpb25NZW51QXRDYXJldChzY3JvbGxUbykge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LFxuICAgICAgICAgICAgY29vcmRpbmF0ZXNcblxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMpXG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbmZvICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBpZighdGhpcy50cmlidXRlLnBvc2l0aW9uTWVudSl7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9IGBkaXNwbGF5OiBibG9jaztgXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLmdldFRleHRBcmVhT3JJbnB1dFVuZGVybGluZVBvc2l0aW9uKHRoaXMuZ2V0RG9jdW1lbnQoKS5hY3RpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBpbmZvLm1lbnRpb25Qb3NpdGlvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGVDYXJldFBvc2l0aW9uKGluZm8ubWVudGlvblBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPOiBmbGlwIHRoZSBkcm9wZG93biBpZiByZW5kZXJlZCBvZmYgb2Ygc2NyZWVuIGVkZ2UuXG4gICAgICAgICAgICAvLyBsZXQgY29udGVudFdpZHRoID0gdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGggKyBjb29yZGluYXRlcy5sZWZ0XG4gICAgICAgICAgICAvLyBsZXQgcGFyZW50V2lkdGg7XG5cbiAgICAgICAgICAgIC8vIGlmICh0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgLy8gICAgIHBhcmVudFdpZHRoID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIub2Zmc2V0V2lkdGhcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgcGFyZW50V2lkdGggPSB0aGlzLmdldERvY3VtZW50KCkuYm9keS5vZmZzZXRXaWR0aFxuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAvLyBpZiAoY29udGVudFdpZHRoID4gcGFyZW50V2lkdGgpIHtcbiAgICAgICAgICAgIC8vICAgICBsZXQgZGlmZiA9IGNvbnRlbnRXaWR0aCAtIHBhcmVudFdpZHRoXG4gICAgICAgICAgICAvLyAgICAgbGV0IHJlbW92ZUZyb21MZWZ0ID0gdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGggLSBkaWZmXG4gICAgICAgICAgICAvLyAgICAgbGV0IG5ld0xlZnQgPSBjb29yZGluYXRlcy5sZWZ0IC0gcmVtb3ZlRnJvbUxlZnRcblxuICAgICAgICAgICAgLy8gICAgIGlmIChuZXdMZWZ0ID4gMCkge1xuICAgICAgICAgICAgLy8gICAgICAgICBjb29yZGluYXRlcy5sZWZ0ID0gbmV3TGVmdFxuICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNvb3JkaW5hdGVzLmxlZnQgPSAwXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogJHtjb29yZGluYXRlcy50b3B9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJHtjb29yZGluYXRlcy5sZWZ0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO2BcblxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvKSB0aGlzLnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEVsZW1lbnQodGFyZ2V0RWxlbWVudCwgcGF0aCwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCByYW5nZVxuICAgICAgICBsZXQgZWxlbSA9IHRhcmdldEVsZW1lbnRcblxuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0uY2hpbGROb2Rlc1twYXRoW2ldXVxuICAgICAgICAgICAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlIChlbGVtLmxlbmd0aCA8IG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgLT0gZWxlbS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uY2hpbGROb2Rlcy5sZW5ndGggPT09IDAgJiYgIWVsZW0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLnByZXZpb3VzU2libGluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoZWxlbSwgb2Zmc2V0KVxuICAgICAgICByYW5nZS5zZXRFbmQoZWxlbSwgb2Zmc2V0KVxuICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG5cbiAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgICAgICB0YXJnZXRFbGVtZW50LmZvY3VzKClcbiAgICB9XG5cbiAgICAvLyBUT0RPOiB0aGlzIG1heSBub3QgYmUgbmVjZXNzYXJ5IGFueW1vcmUgYXMgd2UgYXJlIHVzaW5nIG1vdXNldXAgaW5zdGVhZCBvZiBjbGlja1xuICAgIHJlc2V0U2VsZWN0aW9uKHRhcmdldEVsZW1lbnQsIHBhdGgsIG9mZnNldCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUodGFyZ2V0RWxlbWVudCkpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50ICE9PSB0aGlzLmdldERvY3VtZW50KCkuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRhcmdldEVsZW1lbnQuZm9jdXMoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50KHRhcmdldEVsZW1lbnQsIHBhdGgsIG9mZnNldClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlcGxhY2VUcmlnZ2VyVGV4dCh0ZXh0LCByZXF1aXJlTGVhZGluZ1NwYWNlLCBoYXNUcmFpbGluZ1NwYWNlLCBvcmlnaW5hbEV2ZW50LCBpdGVtKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnRcbiAgICAgICAgLy8gVE9ETzogdGhpcyBtYXkgbm90IGJlIG5lY2Vzc2FyeSBhbnltb3JlIGFzIHdlIGFyZSB1c2luZyBtb3VzZXVwIGluc3RlYWQgb2YgY2xpY2tcbiAgICAgICAgLy8gdGhpcy5yZXNldFNlbGVjdGlvbihjb250ZXh0LmVsZW1lbnQsIGNvbnRleHQuc2VsZWN0ZWRQYXRoLCBjb250ZXh0LnNlbGVjdGVkT2Zmc2V0KVxuXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRUcmlnZ2VySW5mbyh0cnVlLCBoYXNUcmFpbGluZ1NwYWNlLCByZXF1aXJlTGVhZGluZ1NwYWNlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBldmVudFxuICAgICAgICBsZXQgcmVwbGFjZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0cmlidXRlLXJlcGxhY2VkJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgICAgICBldmVudDogb3JpZ2luYWxFdmVudFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChpbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG15RmllbGQgPSB0aGlzLmdldERvY3VtZW50KCkuYWN0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3VmZml4ID0gdHlwZW9mIHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeCA9PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgICAgICA6ICcgJ1xuICAgICAgICAgICAgICAgIHRleHQgKz0gdGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IGluZm8ubWVudGlvblBvc2l0aW9uXG4gICAgICAgICAgICAgICAgbGV0IGVuZFBvcyA9IGluZm8ubWVudGlvblBvc2l0aW9uICsgaW5mby5tZW50aW9uVGV4dC5sZW5ndGggKyB0ZXh0U3VmZml4Lmxlbmd0aFxuICAgICAgICAgICAgICAgIG15RmllbGQudmFsdWUgPSBteUZpZWxkLnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgKyB0ZXh0ICtcbiAgICAgICAgICAgICAgICAgICAgbXlGaWVsZC52YWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBteUZpZWxkLnZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBteUZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gc3RhcnRQb3MgKyB0ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgICAgIG15RmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB0ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgYSBzcGFjZSB0byB0aGUgZW5kIG9mIHRoZSBwYXN0ZWQgdGV4dFxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3VmZml4ID0gdHlwZW9mIHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeCA9PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgICAgICA6ICdcXHhBMCdcbiAgICAgICAgICAgICAgICB0ZXh0ICs9IHRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3RlSHRtbCh0ZXh0LCBpbmZvLm1lbnRpb25Qb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgaW5mby5tZW50aW9uUG9zaXRpb24gKyBpbmZvLm1lbnRpb25UZXh0Lmxlbmd0aCArIDEpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRleHQuZWxlbWVudC5kaXNwYXRjaEV2ZW50KHJlcGxhY2VFdmVudClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhc3RlSHRtbChodG1sLCBzdGFydFBvcywgZW5kUG9zKSB7XG4gICAgICAgIGxldCByYW5nZSwgc2VsXG4gICAgICAgIHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgICAgICByYW5nZS5zZXRTdGFydChzZWwuYW5jaG9yTm9kZSwgc3RhcnRQb3MpXG4gICAgICAgIHJhbmdlLnNldEVuZChzZWwuYW5jaG9yTm9kZSwgZW5kUG9zKVxuICAgICAgICByYW5nZS5kZWxldGVDb250ZW50cygpXG5cbiAgICAgICAgbGV0IGVsID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGVsLmlubmVySFRNTCA9IGh0bWxcbiAgICAgICAgbGV0IGZyYWcgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuICAgICAgICAgICAgbm9kZSwgbGFzdE5vZGVcbiAgICAgICAgd2hpbGUgKChub2RlID0gZWwuZmlyc3RDaGlsZCkpIHtcbiAgICAgICAgICAgIGxhc3ROb2RlID0gZnJhZy5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgICB9XG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUoZnJhZylcblxuICAgICAgICAvLyBQcmVzZXJ2ZSB0aGUgc2VsZWN0aW9uXG4gICAgICAgIGlmIChsYXN0Tm9kZSkge1xuICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5jbG9uZVJhbmdlKClcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0QWZ0ZXIobGFzdE5vZGUpXG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKVxuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRXaW5kb3dTZWxlY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY29sbGVjdGlvbi5pZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyaWJ1dGUuY29sbGVjdGlvbi5pZnJhbWUuY29udGVudFdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgIH1cblxuICAgIGdldE5vZGVQb3NpdGlvbkluUGFyZW50KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXNbaV1cblxuICAgICAgICAgICAgaWYgKG5vZGUgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudEVkaXRhYmxlU2VsZWN0ZWRQYXRoKGN0eCkge1xuICAgICAgICBsZXQgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuICAgICAgICBsZXQgc2VsZWN0ZWQgPSBzZWwuYW5jaG9yTm9kZVxuICAgICAgICBsZXQgcGF0aCA9IFtdXG4gICAgICAgIGxldCBvZmZzZXRcbiAgICAgICAgY29uc29sZS5sb2coJ3NlbDonLCBzZWwpXG4gICAgICAgIGlmIChzZWxlY3RlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgaVxuICAgICAgICAgICAgbGV0IGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICB3aGlsZSAoc2VsZWN0ZWQgIT09IG51bGwgJiYgY2UgIT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgIGkgPSB0aGlzLmdldE5vZGVQb3NpdGlvbkluUGFyZW50KHNlbGVjdGVkKVxuICAgICAgICAgICAgICAgIHBhdGgucHVzaChpKVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gc2VsZWN0ZWQucGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZSA9IHNlbGVjdGVkLmNvbnRlbnRFZGl0YWJsZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhdGgucmV2ZXJzZSgpXG5cbiAgICAgICAgICAgIC8vIGdldFJhbmdlQXQgbWF5IG5vdCBleGlzdCwgbmVlZCBhbHRlcm5hdGl2ZVxuICAgICAgICAgICAgb2Zmc2V0ID0gc2VsLmdldFJhbmdlQXQoMCkuc3RhcnRPZmZzZXRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvZmZzZXQ6ICcsIG9mZnNldClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKCkge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LFxuICAgICAgICAgICAgdGV4dCA9ICcnXG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGxldCB0ZXh0Q29tcG9uZW50ID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudDtcbiAgICAgICAgICAgIGlmICh0ZXh0Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0UG9zID0gdGV4dENvbXBvbmVudC5zZWxlY3Rpb25TdGFydFxuICAgICAgICAgICAgICAgIGlmICh0ZXh0Q29tcG9uZW50LnZhbHVlICYmIHN0YXJ0UG9zID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRleHRDb21wb25lbnQudmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRWxlbSA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKCkuYW5jaG9yTm9kZVxuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRFbGVtICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgd29ya2luZ05vZGVDb250ZW50ID0gc2VsZWN0ZWRFbGVtLnRleHRDb250ZW50XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdFN0YXJ0T2Zmc2V0ID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApLnN0YXJ0T2Zmc2V0XG5cbiAgICAgICAgICAgICAgICBpZiAod29ya2luZ05vZGVDb250ZW50ICYmIHNlbGVjdFN0YXJ0T2Zmc2V0ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHdvcmtpbmdOb2RlQ29udGVudC5zdWJzdHJpbmcoMCwgc2VsZWN0U3RhcnRPZmZzZXQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRleHRcbiAgICB9XG5cbiAgICBnZXRUcmlnZ2VySW5mbyhtZW51QWxyZWFkeUFjdGl2ZSwgaGFzVHJhaWxpbmdTcGFjZSwgcmVxdWlyZUxlYWRpbmdTcGFjZSwgYWxsb3dTcGFjZXMpIHtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50XG4gICAgICAgIGxldCBzZWxlY3RlZCwgcGF0aCwgb2Zmc2V0XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGN0eC5lbGVtZW50KSkge1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLmdldERvY3VtZW50KCkuYWN0aXZlRWxlbWVudFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZm8gPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aChjdHgpXG5cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25JbmZvKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3Rpb25JbmZvLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgcGF0aCA9IHNlbGVjdGlvbkluZm8ucGF0aFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IHNlbGVjdGlvbkluZm8ub2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWZmZWN0aXZlUmFuZ2UgPSB0aGlzLmdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKClcblxuICAgICAgICBpZiAoZWZmZWN0aXZlUmFuZ2UgIT09IHVuZGVmaW5lZCAmJiBlZmZlY3RpdmVSYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA9IC0xXG4gICAgICAgICAgICBsZXQgdHJpZ2dlckNoYXJcblxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmNvbGxlY3Rpb24uZm9yRWFjaChjb25maWcgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjID0gY29uZmlnLnRyaWdnZXJcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gY29uZmlnLnJlcXVpcmVMZWFkaW5nU3BhY2UgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbmRleFdpdGhMZWFkaW5nU3BhY2UoZWZmZWN0aXZlUmFuZ2UsIGMpIDpcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2UubGFzdEluZGV4T2YoYylcblxuICAgICAgICAgICAgICAgIGlmIChpZHggPiBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID0gaWR4XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJDaGFyID0gY1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlID0gY29uZmlnLnJlcXVpcmVMZWFkaW5nU3BhY2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID49IDAgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICAhcmVxdWlyZUxlYWRpbmdTcGFjZSB8fFxuICAgICAgICAgICAgICAgICAgICAvW1xceEEwXFxzXS9nLnRlc3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFRyaWdnZXJTbmlwcGV0ID0gZWZmZWN0aXZlUmFuZ2Uuc3Vic3RyaW5nKG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyArIDEsXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLmxlbmd0aClcblxuICAgICAgICAgICAgICAgIHRyaWdnZXJDaGFyID0gZWZmZWN0aXZlUmFuZ2Uuc3Vic3RyaW5nKG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcywgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zICsgMSlcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RTbmlwcGV0Q2hhciA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC5zdWJzdHJpbmcoMCwgMSlcbiAgICAgICAgICAgICAgICBsZXQgbGVhZGluZ1NwYWNlID0gY3VycmVudFRyaWdnZXJTbmlwcGV0Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RTbmlwcGV0Q2hhciA9PT0gJyAnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNuaXBwZXRDaGFyID09PSAnXFx4QTAnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBpZiAoaGFzVHJhaWxpbmdTcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHJpZ2dlclNuaXBwZXQgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQudHJpbSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlZ2V4ID0gYWxsb3dTcGFjZXMgPyAvW15cXFMgXS9nIDogL1tcXHhBMFxcc10vZztcblxuICAgICAgICAgICAgICAgIGlmICghbGVhZGluZ1NwYWNlICYmIChtZW51QWxyZWFkeUFjdGl2ZSB8fCAhKHJlZ2V4LnRlc3QoY3VycmVudFRyaWdnZXJTbmlwcGV0KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uUG9zaXRpb246IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25UZXh0OiBjdXJyZW50VHJpZ2dlclNuaXBwZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRFbGVtZW50OiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZFBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRPZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25UcmlnZ2VyQ2hhcjogdHJpZ2dlckNoYXJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJbmRleFdpdGhMZWFkaW5nU3BhY2UgKHN0ciwgY2hhcikge1xuICAgICAgICBsZXQgcmV2ZXJzZWRTdHIgPSBzdHIuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKVxuICAgICAgICBsZXQgaW5kZXggPSAtMVxuXG4gICAgICAgIGZvciAobGV0IGNpZHggPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBjaWR4IDwgbGVuOyBjaWR4KyspIHtcbiAgICAgICAgICAgIGxldCBmaXJzdENoYXIgPSBjaWR4ID09PSBzdHIubGVuZ3RoIC0gMVxuICAgICAgICAgICAgbGV0IGxlYWRpbmdTcGFjZSA9IC9cXHMvLnRlc3QocmV2ZXJzZWRTdHJbY2lkeCArIDFdKVxuICAgICAgICAgICAgbGV0IG1hdGNoID0gY2hhciA9PT0gcmV2ZXJzZWRTdHJbY2lkeF1cblxuICAgICAgICAgICAgaWYgKG1hdGNoICYmIChmaXJzdENoYXIgfHwgbGVhZGluZ1NwYWNlKSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gc3RyLmxlbmd0aCAtIDEgLSBjaWR4XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIGlzQ29udGVudEVkaXRhYmxlKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQubm9kZU5hbWUgIT09ICdJTlBVVCcgJiYgZWxlbWVudC5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJ1xuICAgIH1cblxuICAgIGdldFRleHRBcmVhT3JJbnB1dFVuZGVybGluZVBvc2l0aW9uKGVsZW1lbnQsIHBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gWydkaXJlY3Rpb24nLCAnYm94U2l6aW5nJywgJ3dpZHRoJywgJ2hlaWdodCcsICdvdmVyZmxvd1gnLFxuICAgICAgICAgICAgJ292ZXJmbG93WScsICdib3JkZXJUb3BXaWR0aCcsICdib3JkZXJSaWdodFdpZHRoJyxcbiAgICAgICAgICAgICdib3JkZXJCb3R0b21XaWR0aCcsICdib3JkZXJMZWZ0V2lkdGgnLCAncGFkZGluZ1RvcCcsXG4gICAgICAgICAgICAncGFkZGluZ1JpZ2h0JywgJ3BhZGRpbmdCb3R0b20nLCAncGFkZGluZ0xlZnQnLFxuICAgICAgICAgICAgJ2ZvbnRTdHlsZScsICdmb250VmFyaWFudCcsICdmb250V2VpZ2h0JywgJ2ZvbnRTdHJldGNoJyxcbiAgICAgICAgICAgICdmb250U2l6ZScsICdmb250U2l6ZUFkanVzdCcsICdsaW5lSGVpZ2h0JywgJ2ZvbnRGYW1pbHknLFxuICAgICAgICAgICAgJ3RleHRBbGlnbicsICd0ZXh0VHJhbnNmb3JtJywgJ3RleHRJbmRlbnQnLFxuICAgICAgICAgICAgJ3RleHREZWNvcmF0aW9uJywgJ2xldHRlclNwYWNpbmcnLCAnd29yZFNwYWNpbmcnXG4gICAgICAgIF1cblxuICAgICAgICBsZXQgaXNGaXJlZm94ID0gKHdpbmRvdy5tb3pJbm5lclNjcmVlblggIT09IG51bGwpXG5cbiAgICAgICAgbGV0IGRpdiA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBkaXYuaWQgPSAnaW5wdXQtdGV4dGFyZWEtY2FyZXQtcG9zaXRpb24tbWlycm9yLWRpdidcbiAgICAgICAgdGhpcy5nZXREb2N1bWVudCgpLmJvZHkuYXBwZW5kQ2hpbGQoZGl2KVxuXG4gICAgICAgIGxldCBzdHlsZSA9IGRpdi5zdHlsZVxuICAgICAgICBsZXQgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA/IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkgOiBlbGVtZW50LmN1cnJlbnRTdHlsZVxuXG4gICAgICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnXG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lICE9PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICBzdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJ1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcG9zaXRpb24gb2ZmLXNjcmVlblxuICAgICAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgICAgc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXG5cbiAgICAgICAgLy8gdHJhbnNmZXIgdGhlIGVsZW1lbnQncyBwcm9wZXJ0aWVzIHRvIHRoZSBkaXZcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgc3R5bGVbcHJvcF0gPSBjb21wdXRlZFtwcm9wXVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgIHN0eWxlLndpZHRoID0gYCR7KHBhcnNlSW50KGNvbXB1dGVkLndpZHRoKSAtIDIpfXB4YFxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gcGFyc2VJbnQoY29tcHV0ZWQuaGVpZ2h0KSlcbiAgICAgICAgICAgICAgICBzdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICB9XG5cbiAgICAgICAgZGl2LnRleHRDb250ZW50ID0gZWxlbWVudC52YWx1ZS5zdWJzdHJpbmcoMCwgcG9zaXRpb24pXG5cbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIGRpdi50ZXh0Q29udGVudCA9IGRpdi50ZXh0Q29udGVudC5yZXBsYWNlKC9cXHMvZywgJ8KgJylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcGFuID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gZWxlbWVudC52YWx1ZS5zdWJzdHJpbmcocG9zaXRpb24pIHx8ICcuJ1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoc3BhbilcblxuICAgICAgICBsZXQgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIGxldCB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcblxuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgd2luZG93VG9wICsgc3Bhbi5vZmZzZXRUb3AgKyBwYXJzZUludChjb21wdXRlZC5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUludChjb21wdXRlZC5mb250U2l6ZSkgLSBlbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbmRvd0xlZnQgKyBzcGFuLm9mZnNldExlZnQgKyBwYXJzZUludChjb21wdXRlZC5ib3JkZXJMZWZ0V2lkdGgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldERvY3VtZW50KCkuYm9keS5yZW1vdmVDaGlsZChkaXYpXG5cbiAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzXG4gICAgfVxuXG4gICAgZ2V0Q29udGVudEVkaXRhYmxlQ2FyZXRQb3NpdGlvbihzZWxlY3RlZE5vZGVQb3NpdGlvbikge1xuICAgICAgICBsZXQgbWFya2VyVGV4dENoYXIgPSAn77u/J1xuICAgICAgICBsZXQgbWFya2VyRWwsIG1hcmtlcklkID0gYHNlbF8ke25ldyBEYXRlKCkuZ2V0VGltZSgpfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMil9YFxuICAgICAgICBsZXQgcmFuZ2VcbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IHByZXZSYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApXG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgICAgICByYW5nZS5zZXRTdGFydChzZWwuYW5jaG9yTm9kZSwgc2VsZWN0ZWROb2RlUG9zaXRpb24pXG4gICAgICAgIHJhbmdlLnNldEVuZChzZWwuYW5jaG9yTm9kZSwgc2VsZWN0ZWROb2RlUG9zaXRpb24pXG5cbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBtYXJrZXIgZWxlbWVudCBjb250YWluaW5nIGEgc2luZ2xlIGludmlzaWJsZSBjaGFyYWN0ZXIgdXNpbmcgRE9NIG1ldGhvZHMgYW5kIGluc2VydCBpdFxuICAgICAgICBtYXJrZXJFbCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgbWFya2VyRWwuaWQgPSBtYXJrZXJJZFxuICAgICAgICBtYXJrZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlVGV4dE5vZGUobWFya2VyVGV4dENoYXIpKVxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKG1hcmtlckVsKVxuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgc2VsLmFkZFJhbmdlKHByZXZSYW5nZSlcblxuICAgICAgICBsZXQgcmVjdCA9IG1hcmtlckVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICAgICAgbGV0IHdpbmRvd0xlZnQgPSAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0KSAtIChkb2MuY2xpZW50TGVmdCB8fCAwKVxuICAgICAgICBsZXQgd2luZG93VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbmRvd0xlZnQsXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgbWFya2VyRWwub2Zmc2V0SGVpZ2h0ICsgd2luZG93VG9wXG4gICAgICAgIH1cblxuICAgICAgICBtYXJrZXJFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1hcmtlckVsKVxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBzY3JvbGxJbnRvVmlldyhlbGVtKSB7XG4gICAgICAgIGxldCByZWFzb25hYmxlQnVmZmVyID0gMjAsXG4gICAgICAgICAgICBjbGllbnRSZWN0XG4gICAgICAgIGxldCBtYXhTY3JvbGxEaXNwbGFjZW1lbnQgPSAxMDBcbiAgICAgICAgbGV0IGUgPSB0aGlzLm1lbnVcblxuICAgICAgICBpZiAodHlwZW9mIGUgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgd2hpbGUgKGNsaWVudFJlY3QgPT09IHVuZGVmaW5lZCB8fCBjbGllbnRSZWN0LmhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgY2xpZW50UmVjdCA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgICAgICAgaWYgKGNsaWVudFJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZSA9IGUuY2hpbGROb2Rlc1swXVxuICAgICAgICAgICAgICAgIGlmIChlID09PSB1bmRlZmluZWQgfHwgIWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtVG9wID0gY2xpZW50UmVjdC50b3BcbiAgICAgICAgbGV0IGVsZW1Cb3R0b20gPSBlbGVtVG9wICsgY2xpZW50UmVjdC5oZWlnaHRcblxuICAgICAgICBpZiAoZWxlbVRvcCA8IDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB3aW5kb3cucGFnZVlPZmZzZXQgKyBjbGllbnRSZWN0LnRvcCAtIHJlYXNvbmFibGVCdWZmZXIpXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbUJvdHRvbSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgbGV0IG1heFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBjbGllbnRSZWN0LnRvcCAtIHJlYXNvbmFibGVCdWZmZXJcblxuICAgICAgICAgICAgaWYgKG1heFkgLSB3aW5kb3cucGFnZVlPZmZzZXQgPiBtYXhTY3JvbGxEaXNwbGFjZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBtYXhZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgbWF4U2Nyb2xsRGlzcGxhY2VtZW50XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0YXJnZXRZID0gd2luZG93LnBhZ2VZT2Zmc2V0IC0gKHdpbmRvdy5pbm5lckhlaWdodCAtIGVsZW1Cb3R0b20pXG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRZID4gbWF4WSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFkgPSBtYXhZXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB0YXJnZXRZKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVSYW5nZTtcbiIsIi8vIFRoYW5rcyB0byBodHRwczovL2dpdGh1Yi5jb20vbWF0dHlvcmsvZnV6enlcbmNsYXNzIFRyaWJ1dGVTZWFyY2gge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUuc2VhcmNoID0gdGhpc1xuICAgIH1cblxuICAgIHNpbXBsZUZpbHRlcihwYXR0ZXJuLCBhcnJheSkge1xuICAgICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKHN0cmluZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXN0KHBhdHRlcm4sIHN0cmluZylcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0ZXN0KHBhdHRlcm4sIHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaChwYXR0ZXJuLCBzdHJpbmcpICE9PSBudWxsXG4gICAgfVxuXG4gICAgbWF0Y2gocGF0dGVybiwgc3RyaW5nLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgICAgIGxldCBwYXR0ZXJuSWR4ID0gMCxcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICAgICAgbGVuID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRvdGFsU2NvcmUgPSAwLFxuICAgICAgICAgICAgY3VyclNjb3JlID0gMCxcbiAgICAgICAgICAgIHByZSA9IG9wdHMucHJlIHx8ICcnLFxuICAgICAgICAgICAgcG9zdCA9IG9wdHMucG9zdCB8fCAnJyxcbiAgICAgICAgICAgIGNvbXBhcmVTdHJpbmcgPSBvcHRzLmNhc2VTZW5zaXRpdmUgJiYgc3RyaW5nIHx8IHN0cmluZy50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgY2gsIGNvbXBhcmVDaGFyXG5cbiAgICAgICAgcGF0dGVybiA9IG9wdHMuY2FzZVNlbnNpdGl2ZSAmJiBwYXR0ZXJuIHx8IHBhdHRlcm4udG9Mb3dlckNhc2UoKVxuXG4gICAgICAgIGxldCBwYXR0ZXJuQ2FjaGUgPSB0aGlzLnRyYXZlcnNlKGNvbXBhcmVTdHJpbmcsIHBhdHRlcm4sIDAsIDAsIFtdKVxuICAgICAgICBpZiAoIXBhdHRlcm5DYWNoZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZW5kZXJlZDogdGhpcy5yZW5kZXIoc3RyaW5nLCBwYXR0ZXJuQ2FjaGUuY2FjaGUsIHByZSwgcG9zdCksXG4gICAgICAgICAgICBzY29yZTogcGF0dGVybkNhY2hlLnNjb3JlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmF2ZXJzZShzdHJpbmcsIHBhdHRlcm4sIHN0cmluZ0luZGV4LCBwYXR0ZXJuSW5kZXgsIHBhdHRlcm5DYWNoZSkge1xuICAgICAgICAvLyBpZiB0aGUgcGF0dGVybiBzZWFyY2ggYXQgZW5kXG4gICAgICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA9PT0gcGF0dGVybkluZGV4KSB7XG5cbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBzb2NyZSBhbmQgY29weSB0aGUgY2FjaGUgY29udGFpbmluZyB0aGUgaW5kaWNlcyB3aGVyZSBpdCdzIGZvdW5kXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNjb3JlOiB0aGlzLmNhbGN1bGF0ZVNjb3JlKHBhdHRlcm5DYWNoZSksXG4gICAgICAgICAgICAgICAgY2FjaGU6IHBhdHRlcm5DYWNoZS5zbGljZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBzdHJpbmcgYXQgZW5kIG9yIHJlbWFpbmluZyBwYXR0ZXJuID4gcmVtYWluaW5nIHN0cmluZ1xuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA9PT0gc3RyaW5nSW5kZXggfHwgcGF0dGVybi5sZW5ndGggLSBwYXR0ZXJuSW5kZXggPiBzdHJpbmcubGVuZ3RoIC0gc3RyaW5nSW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjID0gcGF0dGVybltwYXR0ZXJuSW5kZXhdXG4gICAgICAgIGxldCBpbmRleCA9IHN0cmluZy5pbmRleE9mKGMsIHN0cmluZ0luZGV4KVxuICAgICAgICBsZXQgYmVzdCwgdGVtcFxuXG4gICAgICAgIHdoaWxlIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBwYXR0ZXJuQ2FjaGUucHVzaChpbmRleClcbiAgICAgICAgICAgIHRlbXAgPSB0aGlzLnRyYXZlcnNlKHN0cmluZywgcGF0dGVybiwgaW5kZXggKyAxLCBwYXR0ZXJuSW5kZXggKyAxLCBwYXR0ZXJuQ2FjaGUpXG4gICAgICAgICAgICBwYXR0ZXJuQ2FjaGUucG9wKClcblxuICAgICAgICAgICAgLy8gaWYgZG93bnN0cmVhbSB0cmF2ZXJzYWwgZmFpbGVkLCByZXR1cm4gYmVzdCBhbnN3ZXIgc28gZmFyXG4gICAgICAgICAgICBpZiAoIXRlbXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmVzdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWJlc3QgfHwgYmVzdC5zY29yZSA8IHRlbXAuc2NvcmUpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gdGVtcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmRleCA9IHN0cmluZy5pbmRleE9mKGMsIGluZGV4ICsgMSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZXN0XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlU2NvcmUocGF0dGVybkNhY2hlKSB7XG4gICAgICAgIGxldCBzY29yZSA9IDBcbiAgICAgICAgbGV0IHRlbXAgPSAxXG5cbiAgICAgICAgcGF0dGVybkNhY2hlLmZvckVhY2goKGluZGV4LCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGF0dGVybkNhY2hlW2kgLSAxXSArIDEgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXAgKz0gdGVtcCArIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY29yZSArPSB0ZW1wXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHNjb3JlXG4gICAgfVxuXG4gICAgcmVuZGVyKHN0cmluZywgaW5kaWNlcywgcHJlLCBwb3N0KSB7XG4gICAgICAgIHZhciByZW5kZXJlZCA9IHN0cmluZy5zdWJzdHJpbmcoMCwgaW5kaWNlc1swXSlcblxuICAgICAgICBpbmRpY2VzLmZvckVhY2goKGluZGV4LCBpKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJlZCArPSBwcmUgKyBzdHJpbmdbaW5kZXhdICsgcG9zdCArXG4gICAgICAgICAgICAgICAgc3RyaW5nLnN1YnN0cmluZyhpbmRleCArIDEsIChpbmRpY2VzW2kgKyAxXSkgPyBpbmRpY2VzW2kgKyAxXSA6IHN0cmluZy5sZW5ndGgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcmVkXG4gICAgfVxuXG4gICAgZmlsdGVyKHBhdHRlcm4sIGFyciwgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgICAgICByZXR1cm4gYXJyXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2LCBlbGVtZW50LCBpZHgsIGFycikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdHIgPSBlbGVtZW50XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5leHRyYWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IG9wdHMuZXh0cmFjdChlbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RyKSB7IC8vIHRha2UgY2FyZSBvZiB1bmRlZmluZWRzIC8gbnVsbHMgLyBldGMuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlbmRlcmVkID0gdGhpcy5tYXRjaChwYXR0ZXJuLCBzdHIsIG9wdHMpXG5cbiAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3ByZXYubGVuZ3RoXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZzogcmVuZGVyZWQucmVuZGVyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogcmVuZGVyZWQuc2NvcmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaWR4LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWw6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2XG4gICAgICAgICAgICB9LCBbXSlcblxuICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbXBhcmUgPSBiLnNjb3JlIC0gYS5zY29yZVxuICAgICAgICAgICAgaWYgKGNvbXBhcmUpIHJldHVybiBjb21wYXJlXG4gICAgICAgICAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXhcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVTZWFyY2g7IiwiLyoqXG4qIFRyaWJ1dGUuanNcbiogTmF0aXZlIEVTNiBKYXZhU2NyaXB0IEBtZW50aW9uIFBsdWdpblxuKiovXG5cbmltcG9ydCBUcmlidXRlIGZyb20gXCIuL1RyaWJ1dGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZTtcbiIsImlmICghQXJyYXkucHJvdG90eXBlLmZpbmQpIHtcbiAgICBBcnJheS5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmQgY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJylcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3QgPSBPYmplY3QodGhpcylcbiAgICAgICAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwXG4gICAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdXG4gICAgICAgIHZhciB2YWx1ZVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbHVlID0gbGlzdFtpXVxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG59XG5cbmlmICh3aW5kb3cgJiYgdHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge1xuICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgIGRldGFpbDogdW5kZWZpbmVkXG4gICAgfVxuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbClcbiAgICByZXR1cm4gZXZ0XG4gIH1cblxuIGlmICh0eXBlb2Ygd2luZG93LkV2ZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZVxuIH1cblxuICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudFxufSJdfQ==

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GlobalSearch;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.symbol.description.js");

var _react = _interopRequireWildcard(require("react"));

var _Modal = _interopRequireDefault(require("./Modal"));

var _useKeyPress = require("./useKeyPress");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
This component opens up in a modal and searches and navigates to the selected item.  

Items is an array of objects with the following properties:
    - name: string || React component
    - icon: React component
    - pathname: string 
    - onClick: function -- optional
    - search: string that will be searched for in the global search

*/
function GlobalSearch(_ref) {
  let {
    items = [],
    shorcutKey = 'k',
    searchProp = 'search',
    displayButton = true,
    displayButtonRender = "Search",
    modalTitle = 'Global Search',
    modalMaskClassName = '',
    modalMaskStyle = {},
    modalHeaderClassName = '',
    modalHeaderStyle = {},
    modalBodyClassName = '',
    modalBodyStyle = {},
    itemClassName = '',
    highlightedItemClassName = '',
    itemStyle = {},
    highlightedItemStyle = {},
    itemRender = (item, index) => {}
  } = _ref;
  const [searchOpen, setSearchOpen] = (0, _react.useState)(false); // For modal

  const [search, setSearch] = (0, _react.useState)(''); // For input box
  // This is for navigating through the up daown keys
  // We just set the index and use css to highlight the item
  // and also on click or enter pressed we sent the `item` to handleClick function  

  const [highlightedItem, setHighlightedItem] = (0, _react.useState)(0); // main options array

  const [filteredItems, setFilteredItems] = (0, _react.useState)(items); // On search change we set the highlighted item to 0

  const onSearchChange = e => {
    setSearch(e.target.value);
    setHighlightedItem(0);
  };

  const handleCancel = () => {
    setSearchOpen(false); // setSearch('');
  }; // On click we either run the function or we navigate to the page


  const handleClick = item => {
    if (!item) return;

    if (item.onClick) {
      item.onClick();
    } else {
      window.history.pushState(null, null, item.pathname);
    }

    setSearchOpen(false);
  }; // This is for the up donw keys highlight item 


  const arrowUpPressed = (0, _useKeyPress.useKeyPress)('ArrowUp');
  const arrowDownPressed = (0, _useKeyPress.useKeyPress)('ArrowDown');
  const enterPressed = (0, _useKeyPress.useKeyPress)('Enter');
  (0, _react.useEffect)(() => {
    if (searchOpen) {
      if (arrowUpPressed) {
        setHighlightedItem(prev => (highlightedItem - 1 + filteredItems.length) % filteredItems.length);
      }

      if (arrowDownPressed) {
        setHighlightedItem(prev => (prev + 1) % filteredItems.length);
      } // If enter is pressed the handleClick will take care of navigation / function


      if (enterPressed) {
        handleClick(filteredItems[highlightedItem]);
      }
    }
  }, [arrowUpPressed, arrowDownPressed, enterPressed]); // This is the search shortcut key .... Change the if to change the keys

  const handleSearchShortcut = e => {
    if (e.key === shorcutKey && e.ctrlKey) {
      e.preventDefault();
      setSearchOpen(true);
    }
  };

  _react.default.useEffect(() => {
    document.addEventListener('keydown', e => {
      handleSearchShortcut(e);
    });
    return () => document.removeEventListener('keydown', handleSearchShortcut);
  }, [searchOpen, highlightedItem]); // Whenever the search window closes we reset the search and item


  (0, _react.useEffect)(() => {
    if (!searchOpen) {
      setHighlightedItem(0);
      setSearch('');
    }
  }, [searchOpen]);
  (0, _react.useEffect)(() => {
    var trimmedSearch = search.trim(); // If no search show the items ( menu items )

    if (trimmedSearch === "") {
      setFilteredItems(items);
    } else {
      const newFilteredItems = items.filter(item => {
        if (item[searchProp]) {
          // return item.search.toLowerCase().includes(trimmedSearch.toLowerCase());
          return item[searchProp].toLowerCase().includes(trimmedSearch.toLowerCase());
        }

        return false;
      });
      setFilteredItems(newFilteredItems);
    }
  }, [search]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "global-search"
  }, /*#__PURE__*/_react.default.createElement(_Modal.default, {
    title: modalTitle,
    open: searchOpen,
    onClose: handleCancel,
    modalMaskClassName: modalMaskClassName,
    modalMaskStyle: modalMaskStyle,
    modalHeaderClassName: modalHeaderClassName,
    modalHeaderStyle: modalHeaderStyle,
    modalBodyClassName: modalBodyClassName,
    modalBodyStyle: modalBodyStyle
  }, /*#__PURE__*/_react.default.createElement("input", {
    placeholder: "Search",
    key: searchOpen,
    value: search,
    onChange: onSearchChange,
    autoFocus: true,
    className: "rgs-search-input"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "rgs-items-container"
  }, filteredItems.map((item, index) => {
    const className = "rgs-one-item " + itemClassName + (index === highlightedItem ? "rgs-highlighted-item " + highlightedItemClassName : "");
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      // The highlighted item is just for visulization and handled in CSS.
      className: className,
      style: _objectSpread(_objectSpread({}, itemStyle), index === highlightedItem ? highlightedItemStyle : {}) // Check logic and comments above
      ,
      onClick: () => handleClick(item) // if this is the highlighted item, scroll to it
      ,
      ref: index === highlightedItem ? el => {
        if (el) {
          el.scrollIntoView({
            behavior: 'auto',
            block: 'nearest'
          });
        }
      } : null // Mouse enter should highlight the item
      // But it should not be affected by the automatic scrolling
      ,
      onMouseEnter: () => {
        setHighlightedItem(index);
      },
      key: item.key || item.name
    }, itemRender(item, index) || /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      className: "rgs-item-icon"
    }, item.icon), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'inline-flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "rgs-item-name"
    }, item.name), /*#__PURE__*/_react.default.createElement("span", {
      className: "rgs-item-description"
    }, item.description)))), /*#__PURE__*/_react.default.createElement("div", {
      className: "rgs-item-divider"
    }));
  }))), displayButton && /*#__PURE__*/_react.default.createElement("div", {
    onClick: () => setSearchOpen(true)
  }, displayButtonRender));
}
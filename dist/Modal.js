"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './index.css'
function Modal(_ref) {
  let {
    open = true,
    setOpen = () => {},
    onClose = () => {
      setOpen(false);
    },
    title = 'Modal Title',
    children = 'Modal Content',
    modalMaskClassName = '',
    modalMaskStyle = {},
    modalHeaderClassName = '',
    modalHeaderStyle = {},
    modalBodyClassName = '',
    modalBodyStyle = {}
  } = _ref;

  // const closeOnEscapeKeyDown = (e) => {
  //     if ((e.charCode || e.keyCode) === 27) {
  //         onClose();
  //     }
  // };
  const closeOnEscapeKeyDown = _react.default.useCallback(e => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  }, [onClose]);

  _react.default.useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/_react.default.createElement("div", {
    className: " rgs-modal-mask ".concat(open ? 'rgs-modal-mask-open' : '', " ").concat(modalMaskClassName),
    style: modalMaskStyle,
    onClick: onClose
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "rgs-modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "rgs-modal-header ".concat(modalHeaderClassName),
    style: modalHeaderStyle
  }, title), /*#__PURE__*/_react.default.createElement("div", {
    className: "rgs-modal-body ".concat(modalBodyClassName),
    style: modalBodyStyle
  }, children))), document.getElementById('root'));
}
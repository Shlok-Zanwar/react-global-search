import React from 'react'
import ReactDOM from 'react-dom';
// import './index.css'

export default function Modal({
    open=true,
    setOpen=()=>{},
    onClose=()=>{setOpen(false)},
    title='Modal Title',
    children='Modal Content',

    modalWidth='500px',
    modalPositionTop='8%',

    modalMaskClassName='',
    modalMaskStyle={},
    modalContainerClassName='',
    modalContainerStyle={},
    modalHeaderClassName='',
    modalHeaderStyle={},
    modalBodyClassName='',
    modalBodyStyle={},
}) {

    // const closeOnEscapeKeyDown = (e) => {
    //     if ((e.charCode || e.keyCode) === 27) {
    //         onClose();
    //     }
    // };

    const closeOnEscapeKeyDown = React.useCallback((e) => {
        if ((e.charCode || e.keyCode) === 27) {
            onClose();
        }
    }, [onClose]);

    React.useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
        };
    }, [closeOnEscapeKeyDown]);


    return ReactDOM.createPortal( 
        (
            <div 
                className={` rgs-modal-mask ${open ? 'rgs-modal-mask-open' : ''} ${modalMaskClassName}`}
                style={modalMaskStyle}
                onClick={onClose}
            >
                <div 
                    className={`rgs-modal-container ${modalContainerClassName}`}
                    style={
                        {
                            width: modalWidth,
                            top: modalPositionTop,
                            ...modalContainerStyle,
                        }
                    }
                    onClick={e => e.stopPropagation()}
                >
                    <div className={`rgs-modal-header ${modalHeaderClassName}`} style={modalHeaderStyle}>
                        {title}
                    </div>
                    <div className={`rgs-modal-body ${modalBodyClassName}`} style={modalBodyStyle}>
                        {children}
                    </div>
                </div>
            </div>
        ), document.getElementById('root')
    );
}

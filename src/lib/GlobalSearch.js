import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import { useKeyPress } from './useKeyPress';
import './index.css'


/*
This component opens up in a modal and searches and navigates to the selected item.  

Items is an array of objects with the following properties:
    - name: string || React component
    - icon: React component
    - onClick: function -- optional
    - search: string that will be searched for in the global search
    - description: description of the item
*/
export default function GlobalSearch({
    items=[],
    shorcutKey='k',
    searchProp='search',

    closeOnClick=true,

    displayButton=true,
    displayButtonRender="Search",

    itemClassName='',
    highlightedItemClassName='',
    itemStyle={},
    highlightedItemStyle={},

    searchInputClassName='',
    searchInputStyle={},
    searchInputPlaceholder='Search...',

    itemRender=(item, index) => {},

    modalTitle='Global Search',
    modalWidth,
    modalPositionTop,
    modalMaskClassName,
    modalMaskStyle,
    modalContainerClassName,
    modalContainerStyle,
    modalHeaderClassName,
    modalHeaderStyle,
    modalBodyClassName,
    modalBodyStyle,

    
}) {
    const [searchOpen, setSearchOpen] = useState(false);    // For modal
    const [search, setSearch] = useState('');               // For input box


    // This is for navigating through the up daown keys
    // We just set the index and use css to highlight the item
    // and also on click or enter pressed we sent the `item` to handleClick function  
    const [highlightedItem, setHighlightedItem] = useState(0);

    // main options array
    const [filteredItems, setFilteredItems] = useState(items);


    // On search change we set the highlighted item to 0
    const onSearchChange = (e) => {
        setSearch(e.target.value);
        setHighlightedItem(0);
    }

    const handleCancel = () => {
        setSearchOpen(false);
        // setSearch('');
    }

    // On click we either run the function or we navigate to the page
    const handleClick = (item) => {
        if (!item) return;

        if (item.onClick) {
            item.onClick();
        } 

        if(closeOnClick) {
            setSearchOpen(false);
        }        
    }

    // This is for the up donw keys highlight item 
    const arrowUpPressed = useKeyPress('ArrowUp');
    const arrowDownPressed = useKeyPress('ArrowDown');
    const enterPressed = useKeyPress('Enter');
    useEffect(() => {
        if(searchOpen){
            if (arrowUpPressed) {
                setHighlightedItem(prev => (highlightedItem - 1 + filteredItems.length) % filteredItems.length);
            }
            if (arrowDownPressed) {
                setHighlightedItem(prev => (prev + 1) % filteredItems.length);
            }    
            // If enter is pressed the handleClick will take care of navigation / function
            if (enterPressed) {
                handleClick(filteredItems[highlightedItem]);
            }
        }
    }, [arrowUpPressed, arrowDownPressed, enterPressed]);
  

    // This is the search shortcut key .... Change the if to change the keys
    const handleSearchShortcut = (e) => {
        if (e.key === shorcutKey && e.ctrlKey) {
            e.preventDefault();
            setSearchOpen(true);
        }
    }
    React.useEffect(() => {
        document.addEventListener('keydown', (e) => {
            handleSearchShortcut(e);
        });
        return () => document.removeEventListener('keydown', handleSearchShortcut);
    }, [searchOpen, highlightedItem])

    // Whenever the search window closes we reset the search and item
    useEffect(() => {
        if (searchOpen) {
            setHighlightedItem(0);
            setSearch('');
        }
    }, [searchOpen])


    useEffect(() => {
        var trimmedSearch = search.trim();

        // If no search show the items ( menu items )
        if(trimmedSearch === ""){
            setFilteredItems(items);
        }
        else{
            const newFilteredItems = items.filter(item => {
                if (item[searchProp]) {
                    // return item.search.toLowerCase().includes(trimmedSearch.toLowerCase());
                    return item[searchProp].toLowerCase().includes(trimmedSearch.toLowerCase());
                }
                return false;
            })
            setFilteredItems(newFilteredItems);
        }
    }, [search])

    return (
        <div className="global-search">
            <Modal
                title={modalTitle}
                open={searchOpen}
                onClose={handleCancel}

                modalWidth={modalWidth}
                modalPositionTop={modalPositionTop}

                modalMaskClassName={modalMaskClassName}
                modalMaskStyle={modalMaskStyle}
                modalContainerClassName={modalContainerClassName}
                modalContainerStyle={modalContainerStyle}
                modalHeaderClassName={modalHeaderClassName}
                modalHeaderStyle={modalHeaderStyle}
                modalBodyClassName={modalBodyClassName}
                modalBodyStyle={modalBodyStyle}
            >
                <input
                    placeholder={searchInputPlaceholder}
                    key={searchOpen}
                    value={search}
                    onChange={onSearchChange}
                    autoFocus={true}
                    className={`rgs-search-input ${searchInputClassName}`}
                    style={searchInputStyle}
                />
                <div className='rgs-items-container'>
                    {
                        filteredItems.map((item, index) => {
                            const className = "rgs-one-item " + itemClassName
                                + (index === highlightedItem ? "rgs-highlighted-item " + highlightedItemClassName : "");
                            return (
                                <>
                                    <div
                                        // The highlighted item is just for visulization and handled in CSS.
                                        className={className}
                                        style={
                                            {
                                                ...itemStyle,
                                                ...(index === highlightedItem ? highlightedItemStyle : {})
                                            }
                                        }

                                        
                                        // Check logic and comments above
                                        onClick={() => handleClick(item) }

                                        // if this is the highlighted item, scroll to it
                                        ref={index === highlightedItem ? (el) => {
                                            if (el) {
                                                el.scrollIntoView({ behavior: 'auto', block: 'nearest' });
                                            }
                                        } : null}

                                        // Mouse enter should highlight the item
                                        // But it should not be affected by the automatic scrolling
                                        onMouseEnter={() => {
                                            setHighlightedItem(index);
                                        }}
                                        key={item.key || item.name}
                                    >
                                        {itemRender(item, index) || 
                                            (
                                                <>
                                                    <span className="rgs-item-icon">
                                                        {item.icon}
                                                    </span>
                                                    <div style={{display: 'inline-flex', flexDirection: 'column'}}>
                                                        <span className="rgs-item-name">
                                                            {item.name}
                                                        </span>
                                                        <span className="rgs-item-description">
                                                            {item.description}
                                                        </span>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className="rgs-item-divider"></div>
                                </>
                            )
                        })
                    }
                </div>
            </Modal>
            {
                displayButton &&
                <div 
                    onClick={() => setSearchOpen(true)}
                >
                    {displayButtonRender}
                </div>
            }
        </div>
    )
}

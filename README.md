# react-global-search

A Centralized Search Component for your React Application.

Use the shortcut key `ctrl + k` to open the search modal (Customizable).
Search through the items (you can add routes, components, etc) and navigate to the selected item.

Additionally, you can use the `Arrow keys` to navigate through the items and press `Enter` to choose the selected item.

Github Repo: https://github.com/Shlok-Zanwar/react-global-search

<img src="https://raw.githubusercontent.com/Shlok-Zanwar/react-global-search/master/demo-gif.gif" height="500px" >

## Installation

```bash
npm install react-global-search
```

## Usage

```jsx
import React from 'react'
import GlobalSearch from 'react-global-search'

const App = () => {
  return (
    <GlobalSearch
      items={[
        {
            name: 'Search Item 1',
            description: 'Search Item 1 Description',
            icon: <i className="fa fa-search" />,
            onClick: () => console.log('Search Item 1 Clicked'),
            pathname: '/search-item-1',
            search: 'search item 1 keywords',
        },
        {
            name: 'Search Item 2',
            description: 'Search Item 2 Description',
            icon: <i className="fa fa-search" />,
            onClick: () => console.log('Search Item 2 Clicked'),
            pathname: '/search-item-2',
            search: 'search item 2 keywords',
        },
      ]}
    />
  )
}

export default App
```

## Props

| Name  | Type                   | Default | Description                          |
|-------|------------------------| --- |--------------------------------------|
| items | Array                  | [] | Array of search items                |
| shorcutKey | String                 | 'k' | Shorcut key to open the search modal |
| searchProp | String                 | 'search' | The search query prop name           |
| closeOnClick | Boolean                 | true | Close the search modal on item click |
| displayButton | Boolean                | true | Display the search button            |
| displayButtonRender | String / React Element | 'Search' | The search button render             |
| itemClassName | String                 | '' | The search item class name           |
| itemStyle | Object                 | {} | The search item style                |
| highlightedItemStyle | Object                 | {} | The highlighted search item style    |
| highlightedItemClassName | String                 | '' | The highlighted search item class name |
| searchInputClassName | String                 | '' | The search input class name          |
| searchInputStyle | Object                 | {} | The search input style               |
| searchInputPlaceholder | String                 | 'Search...' | The search input placeholder |
| itemRender | Function               | &#40;item, index&#41; => {} | The search item render               |
| modalTitle | String / React Element | 'Global Search' | The search modal title               |
| modalMaskClassName | String                 | '' | The search modal mask class name     |
| modalMaskStyle | Object                 | {} | The search modal mask style          |
| modalContainerClassName | String                 | '' | The search modal container class name|
| modalContainerStyle | Object                 | {} | The search modal container style     |
| modalHeaderClassName | String                 | '' | The search modal header class name   |
| modalHeaderStyle | Object                 | {} | The search modal header style        |
| modalBodyClassName | String                 | '' | The search modal body class name     |
| modalBodyStyle | Object                 | {} | The search modal body style          |



## Item Props

When the user clicks or selects any item, the onClick function will be called. <br />

| Name  | Type           | Default | Description                          |
|-------|----------------| --- |--------------------------------------|
| name | String / React Element | '' | The search item name                 |
| description | String / React Element | '' | The search item description          |
| icon | String / React Element | '' | The search item icon                 |
| onClick | Function         | &#40;&#41; => {} | The search item click handler        |
| search | String         | '' | The search item search query         |

## Future Improvements / TODO

- [ ] Change to typescript
- [ ] Add Custom key bindings ( Array of key bindings )
- [ ] Support for multiple search props
- [ ] Support tree data structure for items.
- [ ] Add Custom search function / search algorithm
- [ ] Add more props to customize the search modal, items, etc


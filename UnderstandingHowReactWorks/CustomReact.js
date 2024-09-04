const ReactElement={
    type:'a',
    props:{
        href:'https://google.com',
        target:'_blank',

    },
    children:'Visit Google'

}

const mainContainer = document.querySelector('#root')

function CustomRender(ReactElement, Container)
{
    // One way
    /*
    const DomElement = document.createElement(ReactElement.type)
    DomElement.innerHTML = ReactElement.children
    DomElement.setAttribute('href', ReactElement.props.href)
    DomElement.setAttribute('target', ReactElement.props.target)
    */

    // Another way
    const DomElement = document.createElement(ReactElement.type)
    DomElement.innerHTML = ReactElement.children
    for (const prop in ReactElement.props) {
        if (prop === 'children') continue;
        DomElement.setAttribute(prop, ReactElement.props[prop])
    }

    Container.appendChild(DomElement)
    
}

CustomRender(ReactElement,mainContainer)

/*
This code provides a basic illustration of how React might convert
an element (described as a JavaScript object) into a real DOM node 
and render it on the page. It's a simplified look at the fundamental 
principles behind React’s rendering process.

In React, elements are plain objects that describe what should be displayed 
in the DOM. This object typically has a type (like a tag name), props (attributes), 
and children (content within the tag).

The customRender function mimics React’s rendering process, where an element (a plain object)
is translated into a real DOM node and inserted into the DOM tree.

The way props are applied to the DOM element shows how attributes are dynamically set on 
elements based on the properties provided in the React element object.
*/
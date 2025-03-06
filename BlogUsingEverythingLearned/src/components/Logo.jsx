import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div style={{width}}>
      Logo
    </div>
  )
}

export default Logo

// In the given React functional component, the Logo function accepts a props object containing a property named width. The syntax:
// function Logo({ width = '100px' }) {
// is an example of destructuring with a default value. Here's what it does step-by-step:

// 1. Destructuring Props
// When a React component receives props, it is usually an object containing all the properties passed to that component. For example:
// <Logo width="200px" />

// Here, props will be:
// { width: '200px' }
// Instead of accessing it using props.width inside the component, destructuring is used to directly extract the width property:
// function Logo({ width }) {
//   // Now 'width' contains the value of props.width
// }

// 2. Default Value ('100px')
// The = '100px' part specifies a default value for the width property. This is useful if the parent component does not pass a width prop. For instance:
// <Logo />
// In this case, props will be an empty object ({}), and width will default to '100px'. So:
// { width = '100px' } 
// ensures that width always has a value, either from the prop passed in or the default ('100px').
In the Card component, we follow the general React practice of building reusable UI elements by:

1. Component Definition:
The component is created as a functional component using function Card(). 
It accepts props, specifically username (a required property) and buttonText (with a default value of "Contact me"). Props are passed to the component to customize its behavior or content dynamically.

2. Props and Default Values:
The Card component is designed to be reusable, allowing different content to be displayed by passing different values for username and buttonText.
If no buttonText is provided, it defaults to "Contact me". 
This provides flexibility without requiring the prop in every usage.

3. Exporting the Component:
The Card component is exported using export default, allowing it to be imported and used in other parts of the application.

4. Using the Card Component
In app.jsx, we demonstrate how to use the Card component:

    Importing the Component:
        The Card component is imported from the card.jsx file, making it available for use in the main application.
    Rendering the Component:
        Two instances of the Card component are rendered within the JSX structure:
            In the first instance, both username and buttonText are provided: username="GirlOne" and buttonText="Click me".
            In the second instance, only username="GirlTwo" is provided, allowing the default buttonText of "Contact me" to be used.


General Structure:
The Card component follows a common React pattern where props are used to make the component reusable with varying content.
This modular approach allows for consistent UI elements across the application while maintaining flexibility by passing different data via props.
made the Context folder where the UserContext.js file is created and created context using createContext(), put it in a variable and exported it
const UserContext = createContext()

how it works is :
now when i use 'UserContext' as a wrapper for example
<UserContext.Provider value={/* some value */}>
    <Anything/>
    <Card>
        <Data/>
    </Card>
</UserContext.Provider>

This value prop is the data or state that you want to make accessible to all the components within this Provider. Then, you can access this value in any child component using useContext(UserContext).

check chatgpt
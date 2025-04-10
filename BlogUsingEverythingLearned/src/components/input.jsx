import React, { useId } from "react";

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    placeholder,
    Classname = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className={`w-full`}>
            {label && <label
                className="text-sm font-medium text-gray-700"
                htmlFor={id} >
                {label}
            </label>
            }

            <input
                type={type}
                placeholder={placeholder}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${Classname}`}
                {...props}
                ref={ref}
                id={id}
                test
            />
        </div>
    )
})
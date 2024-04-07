import React from "react"

const FormField = ({
  labelName,
  required,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
  mb = "mt-6",
}) => {
  return (
    <div className={`${mb} md:max-w-3xl xl:max-w-6xl`}>
      <label className="flex-1 max-w-3xl flex flex-col">
        {labelName && (
          <span className="block text-left m-2 text-sm font-medium text-gray-900 ">
            {labelName}
          </span>
        )}
        {isTextArea ? (
          <textarea
            required={required}
            value={value}
            onChange={handleChange}
            rows={5}
            placeholder={placeholder}
            className="textarea textarea-primary"
          />
        ) : (
          <input
            value={value}
            required={required}
            onChange={handleChange}
            type={inputType}
            placeholder={placeholder}
            className="input input-bordered input-primary  "
          />
        )}
      </label>
    </div>
  )
}

export default FormField

"use client"
import React from 'react'

const DatePicker: React.FC<{ name: string, value: string }> = ({ name, value }) => {
    value = "Hello world"
    return (
        <div>Date picker</div>
    )
}

export default DatePicker
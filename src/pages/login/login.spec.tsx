import {it,describe, expect} from 'vitest'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/react';

import LoginPage from './Login'

describe("Login page", ()=>{
    it("should render with required fields",()=>{

render(<LoginPage/>)
expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('UserName')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button',{name:"Log In"})).toBeInTheDocument()
        expect(screen.getByRole("checkbox",{name:"remember me"})).toBeInTheDocument()
        expect(screen.getByText("Forgot Password")).toBeInTheDocument()
    })
})